import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserRole = "member" | "instructor" | "manager";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  phone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePhoto?: string;
  memberSince: string;
  membershipTier: "bronze" | "silver" | "gold";
  membershipExpiry: string;
  isProfileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  completeProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "@myzgym_auth";

const mockUsers: Record<string, { password: string; user: User }> = {
  "member@zgym.com": {
    password: "member123",
    user: {
      id: "1",
      email: "member@zgym.com",
      role: "member",
      fullName: "Alex Johnson",
      phone: "+1 555-0123",
      emergencyContactName: "Sarah Johnson",
      emergencyContactPhone: "+1 555-0124",
      profilePhoto: undefined,
      memberSince: "2024-01-15",
      membershipTier: "gold",
      membershipExpiry: "2025-12-31",
      isProfileComplete: true,
    },
  },
  "instructor@zgym.com": {
    password: "instructor123",
    user: {
      id: "2",
      email: "instructor@zgym.com",
      role: "instructor",
      fullName: "Mike Trainer",
      phone: "+1 555-0125",
      memberSince: "2023-06-01",
      membershipTier: "gold",
      membershipExpiry: "2025-12-31",
      isProfileComplete: true,
    },
  },
  "manager@zgym.com": {
    password: "manager123",
    user: {
      id: "3",
      email: "manager@zgym.com",
      role: "manager",
      fullName: "Jane Manager",
      phone: "+1 555-0126",
      memberSince: "2022-01-01",
      membershipTier: "gold",
      membershipExpiry: "2025-12-31",
      isProfileComplete: true,
    },
  },
  "new@zgym.com": {
    password: "new123",
    user: {
      id: "4",
      email: "new@zgym.com",
      role: "member",
      fullName: "",
      memberSince: "2024-12-01",
      membershipTier: "bronze",
      membershipExpiry: "2025-12-01",
      isProfileComplete: false,
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to load auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.toLowerCase().trim();
    const mockUser = mockUsers[normalizedEmail];

    if (!mockUser) {
      return { success: false, error: "User not found" };
    }

    if (mockUser.password !== password) {
      return { success: false, error: "Incorrect password" };
    }

    setUser(mockUser.user);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser.user));
    return { success: true };
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const completeProfile = async (profileData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { 
      ...user, 
      ...profileData, 
      isProfileComplete: true 
    };
    setUser(updatedUser);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateProfile,
        completeProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

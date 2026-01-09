# Replit Export Prompt for My-ZGym Application

## Project Overview
Create a complete React Native + Express.js fitness management application called **My-ZGym** with the following comprehensive structure:

---

## Technology Stack

### Frontend
- React Native (0.81.5) with Expo SDK (54.0.29)
- React Navigation (native-stack + bottom-tabs)
- React Query (@tanstack/react-query) for API state management
- AsyncStorage for local persistence
- Zod for validation
- TypeScript for type safety
- React Native Reanimated, Gesture Handler, Safe Area Context
- Expo LinearGradient, BlurView, Image Picker, Video

### Backend
- Node.js 22 with Express.js (4.21.2)
- PostgreSQL with Drizzle ORM
- TypeScript with tsx execution
- esbuild for production bundling
- Zod for schema validation

### Build & Deployment
- Expo static builds
- Replit Cloud Run deployment
- Parallel development servers (Expo + Express)

---

## Complete File Structure

```
My-ZGym/
├── package.json
├── tsconfig.json
├── babel.config.js
├── app.json
├── drizzle.config.ts
├── .replit
├── replit.md
├── design_guidelines.md
├── client/
│   ├── index.js
│   ├── App.tsx
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorFallback.tsx
│   │   ├── HeaderTitle.tsx
│   │   ├── KeyboardAwareScrollViewCompat.tsx
│   │   ├── Spacer.tsx
│   │   ├── ThemedText.tsx
│   │   ├── ThemedView.tsx
│   │   └── instructor/
│   │       ├── ClientCard.tsx
│   │       ├── ClientSelector.tsx
│   │       ├── ExerciseCard.tsx
│   │       ├── ProgramAssignmentModal.tsx
│   │       └── RoutineCard.tsx
│   ├── constants/
│   │   └── theme.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── hooks/
│   │   ├── useColorScheme.ts
│   │   ├── useColorScheme.web.ts
│   │   ├── useScreenOptions.ts
│   │   └── useTheme.ts
│   ├── lib/
│   │   └── query-client.ts
│   ├── navigation/
│   │   ├── RootStackNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   ├── InstructorTabNavigator.tsx
│   │   ├── HomeStackNavigator.tsx
│   │   ├── ScheduleStackNavigator.tsx
│   │   ├── WorkoutsStackNavigator.tsx
│   │   ├── ProgressStackNavigator.tsx
│   │   ├── ProfileStackNavigator.tsx
│   │   ├── InstructorDashboardStackNavigator.tsx
│   │   ├── InstructorClientsStackNavigator.tsx
│   │   ├── InstructorWorkoutsStackNavigator.tsx
│   │   ├── InstructorAssessmentsStackNavigator.tsx
│   │   └── InstructorScheduleStackNavigator.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ProfileCompletionScreen.tsx
│   │   ├── ProgressScreen.tsx
│   │   ├── ScheduleScreen.tsx
│   │   ├── WorkoutsScreen.tsx
│   │   ├── MemberWorkoutsScreen.tsx
│   │   ├── onboarding/
│   │   │   ├── OnboardingStep1Screen.tsx
│   │   │   ├── OnboardingStep2Screen.tsx
│   │   │   ├── OnboardingStep3Screen.tsx
│   │   │   ├── OnboardingStep4Screen.tsx
│   │   │   ├── OnboardingHeightScreen.tsx
│   │   │   ├── OnboardingWeightScreen.tsx
│   │   │   ├── OnboardingGoalWeightScreen.tsx
│   │   │   ├── OnboardingExperienceScreen.tsx
│   │   │   ├── OnboardingAgeScreen.tsx
│   │   │   └── OnboardingFrequencyScreen.tsx
│   │   └── instructor/
│   │       ├── InstructorDashboardScreen.tsx
│   │       ├── InstructorClientsScreen.tsx
│   │       ├── ClientDetailScreen.tsx
│   │       ├── InstructorWorkoutsScreen.tsx
│   │       ├── WorkoutBuilderScreen.tsx
│   │       ├── ExerciseLibraryScreen.tsx
│   │       ├── InstructorProgramsScreen.tsx
│   │       ├── ProgramBuilderScreen.tsx
│   │       ├── InstructorAssessmentsScreen.tsx
│   │       ├── AssessmentBuilderScreen.tsx
│   │       ├── AssessmentDetailScreen.tsx
│   │       └── InstructorScheduleScreen.tsx
│   └── types/
│       └── assessment.ts
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── templates/
│       └── landing-page.html
├── shared/
│   └── schema.ts
├── docs/
│   └── PRD.md
├── scripts/
│   └── build.js
├── assets/
│   └── images/
│       ├── zgym-logo.png
│       ├── login-background.png
│       ├── onboarding/
│       └── android/
└── migrations/
```

---

## Configuration Files

### 1. package.json
```json
{
  "name": "my-zgym",
  "version": "1.0.0",
  "main": "client/index.js",
  "scripts": {
    "expo:dev": "npx expo start --port 8081",
    "server:dev": "NODE_ENV=development tsx watch server/index.ts",
    "all:dev": "npm-run-all --parallel expo:dev server:dev",
    "expo:static:build": "node scripts/build.js",
    "server:build": "npx esbuild server/index.ts --bundle --platform=node --packages=external --outfile=dist/index.js",
    "server:prod": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@expo/metro-runtime": "4.0.0",
    "@react-native-async-storage/async-storage": "2.1.0",
    "@react-navigation/bottom-tabs": "^7.2.0",
    "@react-navigation/native": "^7.0.13",
    "@react-navigation/native-stack": "^7.2.0",
    "@tanstack/react-query": "^5.64.2",
    "bcryptjs": "^2.4.3",
    "drizzle-orm": "^0.40.0",
    "drizzle-zod": "^0.7.0",
    "expo": "~54.0.29",
    "expo-av": "~15.0.1",
    "expo-blur": "~14.0.1",
    "expo-constants": "~17.0.3",
    "expo-font": "~13.0.1",
    "expo-image-picker": "~16.0.3",
    "expo-linear-gradient": "~14.0.1",
    "expo-linking": "~7.0.3",
    "expo-router": "~4.0.15",
    "expo-splash-screen": "~0.29.19",
    "expo-status-bar": "~2.0.0",
    "expo-system-ui": "~4.0.4",
    "expo-web-browser": "~14.0.1",
    "express": "^4.21.2",
    "postgres": "^3.4.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.81.5",
    "react-native-gesture-handler": "~2.21.2",
    "react-native-keyboard-controller": "^1.16.1",
    "react-native-reanimated": "~3.18.0",
    "react-native-safe-area-context": "4.14.0",
    "react-native-screens": "~4.4.0",
    "react-native-web": "~0.19.13",
    "react-native-worklets-core": "^1.5.0",
    "zod": "^3.24.1",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/bcryptjs": "^2.4.6",
    "@types/express": "^5.0.0",
    "@types/react": "~18.3.12",
    "drizzle-kit": "^0.31.4",
    "esbuild": "^0.24.2",
    "npm-run-all": "^4.1.5",
    "tsx": "^4.19.2",
    "typescript": "~5.3.3"
  }
}
```

### 2. tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./client/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

### 3. babel.config.js
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@': './client',
            '@shared': './shared',
          },
        },
      ],
    ],
  };
};
```

### 4. app.json
```json
{
  "expo": {
    "name": "My-ZGym",
    "slug": "my-zgym",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/zgym-logo.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/images/zgym-logo.png",
      "resizeMode": "contain",
      "backgroundColor": "#1A1A1A"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.zgym.myapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/android/adaptive-icon-foreground.png",
        "backgroundImage": "./assets/images/android/adaptive-icon-background.png",
        "monochromeImage": "./assets/images/android/adaptive-icon-monochrome.png",
        "backgroundColor": "#1A1A1A"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "single",
      "favicon": "./assets/images/zgym-logo.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/zgym-logo.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#1A1A1A"
        }
      ],
      "expo-web-browser",
      "expo-av"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### 5. drizzle.config.ts
```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 6. .replit
```toml
modules = ["nodejs-22"]
run = "npm run server:prod"

[deployment]
run = ["sh", "-c", "npm run expo:static:build && npm run server:build && npm run server:prod"]
deploymentTarget = "cloudrun"

[[ports]]
localPort = 5000
externalPort = 80

[[ports]]
localPort = 8081
externalPort = 8081

[[ports]]
localPort = 40773
externalPort = 3000
```

### 7. scripts/build.js
```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('Building Expo app for static hosting...');
execSync('npx expo export -p web --output-dir dist/client', { stdio: 'inherit' });
console.log('Expo build complete!');
```

---

## Design System (client/constants/theme.ts)

```typescript
export const colors = {
  primary: '#BFFF00',
  secondary: '#2C3E50',
  accent: '#F39C12',
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',

  light: {
    background: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    border: '#E0E0E0',
  },

  dark: {
    background: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#3A3A3A',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 56,
  inputHeight: 52,
  buttonHeight: 48,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '600' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  h4: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyLarge: { fontSize: 17, fontWeight: '400' as const },
  small: { fontSize: 13, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};
```

---

## Core Application Files

### client/index.js
```javascript
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
```

### client/App.tsx
```typescript
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { AuthProvider } from '@/context/AuthContext';
import { queryClient } from '@/lib/query-client';
import { RootStackNavigator } from '@/navigation/RootStackNavigator';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <StatusBar style="auto" />
              <RootStackNavigator />
            </AuthProvider>
          </QueryClientProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
```

---

## Authentication System

### client/context/AuthContext.tsx
```typescript
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  role: 'member' | 'instructor' | 'manager';
  fullName: string;
  phone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePhoto?: string;
  memberSince: string;
  membershipTier: 'bronze' | 'silver' | 'gold';
  membershipExpiry: string;
  isProfileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const MOCK_USERS: Record<string, User> = {
  'member@zgym.com': {
    id: '1',
    email: 'member@zgym.com',
    role: 'member',
    fullName: 'John Doe',
    phone: '123-456-7890',
    memberSince: '2024-01-01',
    membershipTier: 'gold',
    membershipExpiry: '2025-12-31',
    isProfileComplete: true,
  },
  'instructor@zgym.com': {
    id: '2',
    email: 'instructor@zgym.com',
    role: 'instructor',
    fullName: 'Jane Smith',
    memberSince: '2023-01-01',
    membershipTier: 'gold',
    membershipExpiry: '2025-12-31',
    isProfileComplete: true,
  },
  'manager@zgym.com': {
    id: '3',
    email: 'manager@zgym.com',
    role: 'manager',
    fullName: 'Admin Manager',
    memberSince: '2022-01-01',
    membershipTier: 'gold',
    membershipExpiry: '2025-12-31',
    isProfileComplete: true,
  },
  'new@zgym.com': {
    id: '4',
    email: 'new@zgym.com',
    role: 'member',
    fullName: 'New User',
    memberSince: '2024-12-01',
    membershipTier: 'bronze',
    membershipExpiry: '2025-12-31',
    isProfileComplete: false,
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from storage on mount
    AsyncStorage.getItem('user').then((data) => {
      if (data) setUser(JSON.parse(data));
    });
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication
    const mockUser = MOCK_USERS[email];
    if (!mockUser) throw new Error('Invalid credentials');

    setUser(mockUser);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const register = async (email: string, password: string, fullName: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role: 'member',
      fullName,
      memberSince: new Date().toISOString().split('T')[0],
      membershipTier: 'bronze',
      membershipExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isProfileComplete: false,
    };

    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

---

## Navigation Architecture

### client/navigation/RootStackNavigator.tsx
```typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import { MainTabNavigator } from './MainTabNavigator';
import { InstructorTabNavigator } from './InstructorTabNavigator';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import ProfileCompletionScreen from '@/screens/ProfileCompletionScreen';
// Import all onboarding screens
import OnboardingStep1Screen from '@/screens/onboarding/OnboardingStep1Screen';
import OnboardingStep2Screen from '@/screens/onboarding/OnboardingStep2Screen';
import OnboardingHeightScreen from '@/screens/onboarding/OnboardingHeightScreen';
import OnboardingWeightScreen from '@/screens/onboarding/OnboardingWeightScreen';
import OnboardingGoalWeightScreen from '@/screens/onboarding/OnboardingGoalWeightScreen';
import OnboardingExperienceScreen from '@/screens/onboarding/OnboardingExperienceScreen';
import OnboardingAgeScreen from '@/screens/onboarding/OnboardingAgeScreen';
import OnboardingFrequencyScreen from '@/screens/onboarding/OnboardingFrequencyScreen';
import OnboardingStep3Screen from '@/screens/onboarding/OnboardingStep3Screen';
import OnboardingStep4Screen from '@/screens/onboarding/OnboardingStep4Screen';

const Stack = createNativeStackNavigator();

export function RootStackNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : user.role === 'instructor' ? (
          // Instructor flow
          <Stack.Screen name="InstructorTabs" component={InstructorTabNavigator} />
        ) : !user.isProfileComplete ? (
          // Member onboarding flow
          <>
            <Stack.Screen name="OnboardingStep1" component={OnboardingStep1Screen} />
            <Stack.Screen name="OnboardingStep2" component={OnboardingStep2Screen} />
            <Stack.Screen name="OnboardingHeight" component={OnboardingHeightScreen} />
            <Stack.Screen name="OnboardingWeight" component={OnboardingWeightScreen} />
            <Stack.Screen name="OnboardingGoalWeight" component={OnboardingGoalWeightScreen} />
            <Stack.Screen name="OnboardingExperience" component={OnboardingExperienceScreen} />
            <Stack.Screen name="OnboardingAge" component={OnboardingAgeScreen} />
            <Stack.Screen name="OnboardingFrequency" component={OnboardingFrequencyScreen} />
            <Stack.Screen name="OnboardingStep3" component={OnboardingStep3Screen} />
            <Stack.Screen name="OnboardingStep4" component={OnboardingStep4Screen} />
            <Stack.Screen name="ProfileCompletion" component={ProfileCompletionScreen} />
          </>
        ) : (
          // Member main app
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### client/navigation/MainTabNavigator.tsx
```typescript
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { HomeStackNavigator } from './HomeStackNavigator';
import { ScheduleStackNavigator } from './ScheduleStackNavigator';
import { WorkoutsStackNavigator } from './WorkoutsStackNavigator';
import { ProgressStackNavigator } from './ProgressStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ScheduleTab"
        component={ScheduleStackNavigator}
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => <Feather name="calendar" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="WorkoutsTab"
        component={WorkoutsStackNavigator}
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size }) => <Feather name="activity" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressStackNavigator}
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <Feather name="trending-up" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
```

### client/navigation/InstructorTabNavigator.tsx
```typescript
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { InstructorDashboardStackNavigator } from './InstructorDashboardStackNavigator';
import { InstructorClientsStackNavigator } from './InstructorClientsStackNavigator';
import { InstructorWorkoutsStackNavigator } from './InstructorWorkoutsStackNavigator';
import { InstructorAssessmentsStackNavigator } from './InstructorAssessmentsStackNavigator';
import { InstructorScheduleStackNavigator } from './InstructorScheduleStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

export function InstructorTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={InstructorDashboardStackNavigator}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Feather name="pie-chart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ClientsTab"
        component={InstructorClientsStackNavigator}
        options={{
          title: 'Clients',
          tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="WorkoutsTab"
        component={InstructorWorkoutsStackNavigator}
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size }) => <Feather name="activity" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="AssessmentsTab"
        component={InstructorAssessmentsStackNavigator}
        options={{
          title: 'Assessments',
          tabBarIcon: ({ color, size }) => <Feather name="clipboard" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ScheduleTab"
        component={InstructorScheduleStackNavigator}
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => <Feather name="calendar" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
```

---

## Backend Setup

### server/index.ts
```typescript
import express from 'express';
import path from 'path';
import { apiRouter } from './routes';

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === 'development';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for development
if (isDev) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });
}

// API routes
app.use('/api', apiRouter);

// Health check
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static Expo app in production
if (!isDev) {
  const clientPath = path.join(__dirname, 'client');
  app.use(express.static(clientPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${isDev ? 'development' : 'production'} mode`);
});
```

### server/routes.ts
```typescript
import { Router } from 'express';
import { storage } from './storage';

export const apiRouter = Router();

// Auth routes
apiRouter.post('/auth/login', async (req, res) => {
  // Implement login logic
  res.json({ success: true });
});

apiRouter.post('/auth/register', async (req, res) => {
  // Implement registration logic
  res.json({ success: true });
});

// User routes
apiRouter.get('/user/profile', async (req, res) => {
  // Get user profile
  res.json({ success: true });
});

// Add more routes as needed
```

### server/storage.ts
```typescript
interface User {
  id: string;
  username: string;
  password: string;
}

interface Storage {
  getUser(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: Omit<User, 'id'>): Promise<User>;
}

class MemStorage implements Storage {
  private users: Map<string, User> = new Map();

  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return Array.from(this.users.values()).find(u => u.username === username) || null;
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser: User = { ...user, id: Date.now().toString() };
    this.users.set(newUser.id, newUser);
    return newUser;
  }
}

export const storage: Storage = new MemStorage();
```

### shared/schema.ts
```typescript
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof selectUserSchema>;
```

---

## Mock Data Structure (client/data/mockData.ts)

Include comprehensive mock data for:
- Gym classes with instructors, schedules, difficulty levels
- Workout routines with exercises, sets, reps
- Training programs (multi-week structured programs)
- Physical assessments (body composition, measurements, performance tests)
- Progress statistics (weekly data, achievements)
- Instructor clients and program assignments
- Exercise library (categorized by muscle group, equipment)

---

## Screen Templates

Create all screens listed in the file structure with:
- Proper TypeScript typing
- Theme hook usage for styling
- Navigation integration
- Error boundaries
- Loading states
- Responsive layouts

**Key Screens to Implement:**

1. **LoginScreen**: Email/password form with validation
2. **HomeScreen**: Dashboard with quick actions, upcoming classes, stats
3. **ScheduleScreen**: Class listing with filters, booking functionality
4. **ProgressScreen**: Charts, weekly stats, achievements
5. **MemberWorkoutsScreen**: Display assigned training program
6. **WorkoutBuilderScreen**: Create/edit workout routines (instructor)
7. **ProgramBuilderScreen**: Create multi-week programs (instructor)
8. **AssessmentBuilderScreen**: Physical assessment forms (instructor)
9. **ClientDetailScreen**: Client info, assigned programs, assessments
10. **Onboarding Screens**: Progressive data collection flow

---

## Component Library

### Button Component
```typescript
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing, typography, borderRadius } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({ title, onPress, variant = 'primary', loading, disabled, fullWidth }: ButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        variant === 'primary' && { backgroundColor: colors.primary },
        variant === 'secondary' && { backgroundColor: colors.secondary },
        variant === 'outline' && { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
        (disabled || loading) && { opacity: 0.5 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.background} />
      ) : (
        <Text style={[styles.text, variant === 'outline' && { color: colors.primary }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: spacing.buttonHeight,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    ...typography.button,
    color: '#1A1A1A',
  },
});
```

Create similar components for: Card, ThemedText, ThemedView, Spacer, etc.

---

## Important Implementation Notes

1. **TypeScript Types**: Define all types in appropriate files (navigation types, screen props, data models)

2. **React Query Setup**: Configure base URL from environment variable `EXPO_PUBLIC_DOMAIN`

3. **Hooks**:
   - `useTheme()`: Returns colors, spacing, typography based on color scheme
   - `useColorScheme()`: Detects system theme preference
   - `useScreenOptions()`: Provides consistent navigation header options

4. **Error Handling**: Implement ErrorBoundary and ErrorFallback components

5. **Assets**: Include placeholder images for logos, backgrounds, onboarding

6. **Environment Variables**:
   - `EXPO_PUBLIC_DOMAIN`: API base URL
   - `DATABASE_URL`: PostgreSQL connection string

7. **Navigation Flow**:
   - Unauthenticated → Login/Register
   - New Member → Onboarding (10 steps) → Profile Completion → Main Tabs
   - Existing Member → Main Tabs (5 tabs)
   - Instructor → Instructor Tabs (6 tabs)

8. **Mock Authentication**:
   - member@zgym.com / member123 (complete profile)
   - instructor@zgym.com / instructor123
   - manager@zgym.com / manager123
   - new@zgym.com / new123 (incomplete profile, triggers onboarding)

---

## Development Workflow

1. Run `npm install` to install dependencies
2. Run `npm run all:dev` to start both Expo and Express servers
3. Access Expo at `http://localhost:8081`
4. Access API at `http://localhost:5000`
5. For production: `npm run expo:static:build && npm run server:build && npm run server:prod`

---

## Deployment on Replit

The app is configured for Replit Cloud Run deployment:
- Builds static Expo web app → `dist/client/`
- Bundles Express server → `dist/index.js`
- Serves static files from Express in production
- Exposes port 5000 for HTTP traffic
- Health check available at `/status`

---

## Final Notes

- This is a comprehensive fitness management platform with distinct member and instructor experiences
- The instructor module includes client management, workout programming, and assessment tools
- The member experience focuses on class booking, workout tracking, and progress visualization
- All screens should use the centralized theme system for consistent styling
- Navigation is role-based and profile-completion-aware
- Mock data is provided for development; implement real API integration as needed

**Generate this complete application with all files, proper TypeScript typing, React Native best practices, and responsive design following the theme system.**

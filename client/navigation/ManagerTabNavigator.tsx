import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";

import ManagerDashboardStackNavigator from "@/navigation/ManagerDashboardStackNavigator";
import ManagerMembersStackNavigator from "@/navigation/ManagerMembersStackNavigator";
import ManagerStaffStackNavigator from "@/navigation/ManagerStaffStackNavigator";
import ManagerScheduleStackNavigator from "@/navigation/ManagerScheduleStackNavigator";
import ManagerProductsStackNavigator from "@/navigation/ManagerProductsStackNavigator";
import ManagerSettingsStackNavigator from "@/navigation/ManagerSettingsStackNavigator";
import ProfileStackNavigator from "@/navigation/ProfileStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors } from "@/constants/theme";

export type ManagerTabParamList = {
  ManagerDashboardTab: undefined;
  ManagerMembersTab: undefined;
  ManagerStaffTab: undefined;
  ManagerScheduleTab: undefined;
  ManagerProductsTab: undefined;
  ManagerSettingsTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<ManagerTabParamList>();

export default function ManagerTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="ManagerDashboardTab"
      screenOptions={{
        tabBarActiveTintColor: BrandColors.primary,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ManagerDashboardTab"
        component={ManagerDashboardStackNavigator}
        options={{
          title: "Painel",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ManagerMembersTab"
        component={ManagerMembersStackNavigator}
        options={{
          title: "Membros",
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ManagerStaffTab"
        component={ManagerStaffStackNavigator}
        options={{
          title: "Equipe",
          tabBarIcon: ({ color, size }) => (
            <Feather name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ManagerScheduleTab"
        component={ManagerScheduleStackNavigator}
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ManagerProductsTab"
        component={ManagerProductsStackNavigator}
        options={{
          title: "Produtos",
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ManagerSettingsTab"
        component={ManagerSettingsStackNavigator}
        options={{
          title: "Config",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

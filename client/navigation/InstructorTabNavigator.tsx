import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";

import InstructorDashboardStackNavigator from "@/navigation/InstructorDashboardStackNavigator";
import InstructorClientsStackNavigator from "@/navigation/InstructorClientsStackNavigator";
import InstructorWorkoutsStackNavigator from "@/navigation/InstructorWorkoutsStackNavigator";
import InstructorScheduleStackNavigator from "@/navigation/InstructorScheduleStackNavigator";
import ProfileStackNavigator from "@/navigation/ProfileStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors } from "@/constants/theme";

export type InstructorTabParamList = {
  InstructorDashboardTab: undefined;
  InstructorClientsTab: undefined;
  InstructorWorkoutsTab: undefined;
  InstructorScheduleTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<InstructorTabParamList>();

export default function InstructorTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="InstructorDashboardTab"
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
        name="InstructorDashboardTab"
        component={InstructorDashboardStackNavigator}
        options={{
          title: "Painel",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="InstructorClientsTab"
        component={InstructorClientsStackNavigator}
        options={{
          title: "Clientes",
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="InstructorWorkoutsTab"
        component={InstructorWorkoutsStackNavigator}
        options={{
          title: "Treinos",
          tabBarIcon: ({ color, size }) => (
            <Feather name="clipboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="InstructorScheduleTab"
        component={InstructorScheduleStackNavigator}
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
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

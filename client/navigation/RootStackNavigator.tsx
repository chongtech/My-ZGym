import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabNavigator from "@/navigation/MainTabNavigator";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import ProfileCompletionScreen from "@/screens/ProfileCompletionScreen";
import OnboardingStep1Screen from "@/screens/onboarding/OnboardingStep1Screen";
import OnboardingStep2Screen from "@/screens/onboarding/OnboardingStep2Screen";
import OnboardingHeightScreen from "@/screens/onboarding/OnboardingHeightScreen";
import OnboardingWeightScreen from "@/screens/onboarding/OnboardingWeightScreen";
import OnboardingGoalWeightScreen from "@/screens/onboarding/OnboardingGoalWeightScreen";
import OnboardingExperienceScreen from "@/screens/onboarding/OnboardingExperienceScreen";
import OnboardingAgeScreen from "@/screens/onboarding/OnboardingAgeScreen";
import OnboardingFrequencyScreen from "@/screens/onboarding/OnboardingFrequencyScreen";
import OnboardingStep3Screen from "@/screens/onboarding/OnboardingStep3Screen";
import OnboardingStep4Screen from "@/screens/onboarding/OnboardingStep4Screen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors } from "@/constants/theme";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  OnboardingStep1: undefined;
  OnboardingStep2: undefined;
  OnboardingHeight: { sex: 'male' | 'female' };
  OnboardingWeight: { sex: 'male' | 'female'; height: number };
  OnboardingGoalWeight: { sex: 'male' | 'female'; height: number; currentWeight: number };
  OnboardingExperience: { sex: 'male' | 'female'; height: number; currentWeight: number; goalWeight: number };
  OnboardingAge: { sex: 'male' | 'female'; height: number; currentWeight: number; goalWeight: number; experienceLevel: string };
  OnboardingFrequency: { sex: 'male' | 'female'; height: number; currentWeight: number; goalWeight: number; experienceLevel: string; age: number };
  OnboardingStep3: { sex: 'male' | 'female'; height: number; currentWeight: number; goalWeight: number; experienceLevel: string; age: number; frequency: string };
  OnboardingStep4: { sex: 'male' | 'female'; height: number; currentWeight: number; goalWeight: number; experienceLevel: string; age: number; frequency: string; mainGoal: string };
  ProfileCompletion: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();
  const { user, isLoading, isAuthenticated, hasSkippedOnboarding } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundRoot }]}>
        <ActivityIndicator size="large" color={BrandColors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (!user?.isProfileComplete && !hasSkippedOnboarding) ? (
        <>
          <Stack.Screen
            name="OnboardingStep1"
            component={OnboardingStep1Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingStep2"
            component={OnboardingStep2Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingHeight"
            component={OnboardingHeightScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingWeight"
            component={OnboardingWeightScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingGoalWeight"
            component={OnboardingGoalWeightScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingExperience"
            component={OnboardingExperienceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingAge"
            component={OnboardingAgeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingFrequency"
            component={OnboardingFrequencyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingStep3"
            component={OnboardingStep3Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingStep4"
            component={OnboardingStep4Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileCompletion"
            component={ProfileCompletionScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

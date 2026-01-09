import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { HeaderButton } from "@react-navigation/elements";

import ProfileScreen from "@/screens/ProfileScreen";
import MembershipManagementScreen from "@/screens/MembershipManagementScreen";
import PaymentMethodsScreen from "@/screens/PaymentMethodsScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";
import { MembershipTier } from "@/types/payment";

export type ProfileStackParamList = {
  Profile: undefined;
  MembershipManagement: undefined;
  PaymentMethods: {
    planTier: MembershipTier;
    amount: number;
    billingCycle: 'monthly' | 'annual';
    changeType: 'upgrade' | 'downgrade';
  };
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  const screenOptions = useScreenOptions();
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
          headerRight: () => (
            <HeaderButton onPress={() => {}}>
              <Feather name="settings" size={20} color={theme.text} />
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen
        name="MembershipManagement"
        component={MembershipManagementScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

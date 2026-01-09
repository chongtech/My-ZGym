import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FacilitySettingsScreen from "@/screens/manager/FacilitySettingsScreen";
import PricingScreen from "@/screens/manager/PricingScreen";
import NotificationSettingsScreen from "@/screens/manager/NotificationSettingsScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type ManagerSettingsStackParamList = {
  FacilitySettings: undefined;
  Pricing: undefined;
  NotificationSettings: undefined;
};

const Stack = createNativeStackNavigator<ManagerSettingsStackParamList>();

export default function ManagerSettingsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="FacilitySettings"
        component={FacilitySettingsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Configurações da Academia" />,
        }}
      />
      <Stack.Screen
        name="Pricing"
        component={PricingScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Preços" />,
        }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Notificações" />,
        }}
      />
    </Stack.Navigator>
  );
}

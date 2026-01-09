import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { HeaderButton } from "@react-navigation/elements";

import ManagerDashboardScreen from "@/screens/manager/ManagerDashboardScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";

export type ManagerDashboardStackParamList = {
  ManagerDashboard: undefined;
};

const Stack = createNativeStackNavigator<ManagerDashboardStackParamList>();

export default function ManagerDashboardStackNavigator() {
  const screenOptions = useScreenOptions();
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ManagerDashboard"
        component={ManagerDashboardScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Painel do Gerente" />,
          headerRight: () => (
            <HeaderButton onPress={() => {}}>
              <Feather name="bell" size={20} color={theme.text} />
            </HeaderButton>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

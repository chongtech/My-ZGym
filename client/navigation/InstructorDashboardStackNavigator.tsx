import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { HeaderButton } from "@react-navigation/elements";

import InstructorDashboardScreen from "@/screens/instructor/InstructorDashboardScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";

export type InstructorDashboardStackParamList = {
  InstructorDashboard: undefined;
};

const Stack = createNativeStackNavigator<InstructorDashboardStackParamList>();

export default function InstructorDashboardStackNavigator() {
  const screenOptions = useScreenOptions();
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="InstructorDashboard"
        component={InstructorDashboardScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Painel do Instrutor" />,
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

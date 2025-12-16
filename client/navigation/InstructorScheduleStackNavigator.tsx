import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InstructorScheduleScreen from "@/screens/instructor/InstructorScheduleScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type InstructorScheduleStackParamList = {
  InstructorSchedule: undefined;
};

const Stack = createNativeStackNavigator<InstructorScheduleStackParamList>();

export default function InstructorScheduleStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="InstructorSchedule"
        component={InstructorScheduleScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Agenda Semanal" />,
        }}
      />
    </Stack.Navigator>
  );
}

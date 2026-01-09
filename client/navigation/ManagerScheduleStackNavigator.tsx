import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClassScheduleScreen from "@/screens/manager/ClassScheduleScreen";
import ClassDetailScreen from "@/screens/manager/ClassDetailScreen";
import CreateClassScreen from "@/screens/manager/CreateClassScreen";
import EditClassScreen from "@/screens/manager/EditClassScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type ManagerScheduleStackParamList = {
  ClassSchedule: undefined;
  ClassDetail: { classId: string };
  CreateClass: undefined;
  EditClass: { classId: string };
};

const Stack = createNativeStackNavigator<ManagerScheduleStackParamList>();

export default function ManagerScheduleStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ClassSchedule"
        component={ClassScheduleScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Agenda de Aulas" />,
        }}
      />
      <Stack.Screen
        name="ClassDetail"
        component={ClassDetailScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Detalhes da Aula" />,
        }}
      />
      <Stack.Screen
        name="CreateClass"
        component={CreateClassScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Criar Aula" />,
        }}
      />
      <Stack.Screen
        name="EditClass"
        component={EditClassScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Editar Aula" />,
        }}
      />
    </Stack.Navigator>
  );
}

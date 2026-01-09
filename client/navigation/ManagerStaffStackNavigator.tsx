import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InstructorsListScreen from "@/screens/manager/InstructorsListScreen";
import InstructorDetailScreen from "@/screens/manager/InstructorDetailScreen";
import AddInstructorScreen from "@/screens/manager/AddInstructorScreen";
import EditInstructorScreen from "@/screens/manager/EditInstructorScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type ManagerStaffStackParamList = {
  InstructorsList: undefined;
  InstructorDetail: { instructorId: string };
  AddInstructor: undefined;
  EditInstructor: { instructorId: string };
};

const Stack = createNativeStackNavigator<ManagerStaffStackParamList>();

export default function ManagerStaffStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="InstructorsList"
        component={InstructorsListScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Equipe" />,
        }}
      />
      <Stack.Screen
        name="InstructorDetail"
        component={InstructorDetailScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Detalhes do Instrutor" />,
        }}
      />
      <Stack.Screen
        name="AddInstructor"
        component={AddInstructorScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Adicionar Instrutor" />,
        }}
      />
      <Stack.Screen
        name="EditInstructor"
        component={EditInstructorScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Editar Instrutor" />,
        }}
      />
    </Stack.Navigator>
  );
}

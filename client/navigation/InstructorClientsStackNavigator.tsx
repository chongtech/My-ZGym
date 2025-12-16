import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InstructorClientsScreen from "@/screens/instructor/InstructorClientsScreen";
import ClientDetailScreen from "@/screens/instructor/ClientDetailScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type InstructorClientsStackParamList = {
  InstructorClients: undefined;
  ClientDetail: { clientId: string };
};

const Stack = createNativeStackNavigator<InstructorClientsStackParamList>();

export default function InstructorClientsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="InstructorClients"
        component={InstructorClientsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Meus Clientes" />,
        }}
      />
      <Stack.Screen
        name="ClientDetail"
        component={ClientDetailScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Detalhes do Cliente" />,
        }}
      />
    </Stack.Navigator>
  );
}

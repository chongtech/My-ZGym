import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MembersListScreen from "@/screens/manager/MembersListScreen";
import MemberDetailScreen from "@/screens/manager/MemberDetailScreen";
import MemberEditScreen from "@/screens/manager/MemberEditScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type ManagerMembersStackParamList = {
  MembersList: undefined;
  MemberDetail: { memberId: string };
  MemberEdit: { memberId: string };
};

const Stack = createNativeStackNavigator<ManagerMembersStackParamList>();

export default function ManagerMembersStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MembersList"
        component={MembersListScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Membros" />,
        }}
      />
      <Stack.Screen
        name="MemberDetail"
        component={MemberDetailScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Detalhes do Membro" />,
        }}
      />
      <Stack.Screen
        name="MemberEdit"
        component={MemberEditScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Editar Membro" />,
        }}
      />
    </Stack.Navigator>
  );
}

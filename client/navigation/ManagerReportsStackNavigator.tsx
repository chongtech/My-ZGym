import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AnalyticsDashboardScreen from "@/screens/manager/AnalyticsDashboardScreen";
import RevenueReportScreen from "@/screens/manager/RevenueReportScreen";
import AttendanceReportScreen from "@/screens/manager/AttendanceReportScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type ManagerReportsStackParamList = {
  AnalyticsDashboard: undefined;
  RevenueReport: undefined;
  AttendanceReport: undefined;
};

const Stack = createNativeStackNavigator<ManagerReportsStackParamList>();

export default function ManagerReportsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="AnalyticsDashboard"
        component={AnalyticsDashboardScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Análises" />,
        }}
      />
      <Stack.Screen
        name="RevenueReport"
        component={RevenueReportScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Relatório de Receita" />,
        }}
      />
      <Stack.Screen
        name="AttendanceReport"
        component={AttendanceReportScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Relatório de Frequência" />,
        }}
      />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MemberAssessmentsScreen from '@/screens/MemberAssessmentsScreen';

export type AssessmentsStackParamList = {
  MemberAssessments: undefined;
};

const Stack = createNativeStackNavigator<AssessmentsStackParamList>();

export default function AssessmentsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MemberAssessments" component={MemberAssessmentsScreen} />
    </Stack.Navigator>
  );
}

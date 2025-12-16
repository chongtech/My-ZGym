import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InstructorWorkoutsScreen from "@/screens/instructor/InstructorWorkoutsScreen";
import WorkoutBuilderScreen from "@/screens/instructor/WorkoutBuilderScreen";
import ExerciseLibraryScreen from "@/screens/instructor/ExerciseLibraryScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type InstructorWorkoutsStackParamList = {
  InstructorWorkouts: undefined;
  WorkoutBuilder: { routineId?: string };
  ExerciseLibrary: { onSelectExercise: (exerciseId: string) => void };
};

const Stack = createNativeStackNavigator<InstructorWorkoutsStackParamList>();

export default function InstructorWorkoutsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="InstructorWorkouts"
        component={InstructorWorkoutsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Rotinas de Treino" />,
        }}
      />
      <Stack.Screen
        name="WorkoutBuilder"
        component={WorkoutBuilderScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Criar Rotina" />,
        }}
      />
      <Stack.Screen
        name="ExerciseLibrary"
        component={ExerciseLibraryScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Biblioteca de Exercícios" />,
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

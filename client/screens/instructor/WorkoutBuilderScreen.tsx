import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockWorkoutRoutines, mockExercises } from "@/data/mockData";
import type { InstructorWorkoutsStackParamList } from "@/navigation/InstructorWorkoutsStackNavigator";

type WorkoutBuilderRouteProp = RouteProp<InstructorWorkoutsStackParamList, "WorkoutBuilder">;
type NavigationProp = NativeStackNavigationProp<InstructorWorkoutsStackParamList>;

export default function WorkoutBuilderScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const route = useRoute<WorkoutBuilderRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const existingRoutine = route.params?.routineId
    ? mockWorkoutRoutines.find((r) => r.id === route.params.routineId)
    : null;

  const [name, setName] = useState(existingRoutine?.name || "");
  const [description, setDescription] = useState(existingRoutine?.description || "");

  const selectedExercises = existingRoutine
    ? existingRoutine.exercises.map((ex) => {
        const exercise = mockExercises.find((e) => e.id === ex.exerciseId);
        return { ...ex, exerciseName: exercise?.name || "Exercício" };
      })
    : [];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.lg,
        paddingBottom: tabBarHeight + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Informação da Rotina
        </ThemedText>
        <View style={styles.inputGroup}>
          <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
            Nome
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Ex: Treino A - Peito e Tríceps"
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
            Descrição
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Descrição da rotina..."
            placeholderTextColor={theme.textSecondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>
      </Card>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="h4">Exercícios</ThemedText>
          <Pressable
            style={[styles.addButton, { backgroundColor: BrandColors.primary }]}
            onPress={() => {
              // Navigate to exercise library (will implement modal)
            }}
          >
            <Feather name="plus" size={16} color="#fff" />
            <ThemedText type="small" style={{ color: "#fff", fontWeight: "600" }}>
              Adicionar
            </ThemedText>
          </Pressable>
        </View>

        {selectedExercises.length > 0 ? (
          selectedExercises.map((exercise, index) => (
            <Card
              key={`${exercise.exerciseId}-${index}`}
              elevation={1}
              style={{ marginBottom: Spacing.md }}
            >
              <View style={styles.exerciseHeader}>
                <View style={styles.orderBadge}>
                  <ThemedText type="small" style={{ fontWeight: "600" }}>
                    {index + 1}
                  </ThemedText>
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText type="h4">{exercise.exerciseName}</ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {exercise.sets} séries × {exercise.reps} reps
                  </ThemedText>
                </View>
                <Pressable>
                  <Feather name="trash-2" size={20} color="#EF4444" />
                </Pressable>
              </View>
            </Card>
          ))
        ) : (
          <View style={[styles.emptyState, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="inbox" size={48} color={theme.textSecondary} />
            <ThemedText
              type="body"
              style={{ color: theme.textSecondary, marginTop: Spacing.md }}
            >
              Adiciona exercícios à rotina
            </ThemedText>
          </View>
        )}
      </View>

      <Pressable
        style={[styles.saveButton, { backgroundColor: BrandColors.primary }]}
        onPress={() => navigation.goBack()}
      >
        <ThemedText type="body" style={{ color: "#fff", fontWeight: "600" }}>
          {existingRoutine ? "Guardar Alterações" : "Criar Rotina"}
        </ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  input: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  orderBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8FF2B",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    padding: Spacing.xxl,
    borderRadius: BorderRadius["2xl"],
    alignItems: "center",
  },
  saveButton: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    marginTop: Spacing.lg,
  },
});

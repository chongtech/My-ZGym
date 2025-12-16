import React, { useState } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockWorkoutRoutines, type WorkoutRoutine, mockExercises } from "@/data/mockData";

export default function WorkoutsScreen() {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "Todos" },
    { key: "strength", label: "Força" },
    { key: "hypertrophy", label: "Hipertrofia" },
    { key: "cardio", label: "Cardio" },
    { key: "functional", label: "Funcional" },
    { key: "powerlifting", label: "Powerlifting" },
  ];

  const filteredWorkouts = selectedCategory === "all"
    ? mockWorkoutRoutines
    : mockWorkoutRoutines.filter((w) => w.category === selectedCategory);

  const renderWorkoutCard = ({ item }: { item: WorkoutRoutine }) => {
    const exerciseDetails = item.exercises.map((ex) =>
      mockExercises.find((e) => e.id === ex.exerciseId)
    ).filter(Boolean);

    const difficultyColor =
      item.difficulty === "beginner" ? BrandColors.success :
      item.difficulty === "intermediate" ? BrandColors.accent :
      BrandColors.error;

    return (
      <ThemedView style={[styles.workoutCard, { backgroundColor: theme.card }]}>
        <View style={styles.workoutHeader}>
          <View style={{ flex: 1 }}>
            <ThemedText type="subtitle" style={styles.workoutName}>
              {item.name}
            </ThemedText>
            <ThemedText type="caption" style={{ color: theme.textSecondary, marginTop: 4 }}>
              {item.description}
            </ThemedText>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor + "20" }]}>
            <ThemedText type="caption" style={{ color: difficultyColor, fontWeight: "600" }}>
              {item.difficulty === "beginner" ? "Iniciante" :
               item.difficulty === "intermediate" ? "Intermédio" : "Avançado"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.workoutMeta}>
          <View style={styles.metaItem}>
            <Feather name="clock" size={16} color={theme.textSecondary} />
            <ThemedText type="caption" style={{ color: theme.textSecondary, marginLeft: 6 }}>
              {item.durationMinutes} min
            </ThemedText>
          </View>
          <View style={styles.metaItem}>
            <Feather name="activity" size={16} color={theme.textSecondary} />
            <ThemedText type="caption" style={{ color: theme.textSecondary, marginLeft: 6 }}>
              {item.exercises.length} exercícios
            </ThemedText>
          </View>
          <View style={styles.metaItem}>
            <Feather name="tag" size={16} color={theme.textSecondary} />
            <ThemedText type="caption" style={{ color: theme.textSecondary, marginLeft: 6 }}>
              {item.category === "strength" ? "Força" :
               item.category === "hypertrophy" ? "Hipertrofia" :
               item.category === "cardio" ? "Cardio" :
               item.category === "functional" ? "Funcional" :
               item.category === "powerlifting" ? "Powerlifting" : "Misto"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.exercisesList}>
          <ThemedText type="caption" style={{ color: theme.textSecondary, marginBottom: 8 }}>
            Exercícios:
          </ThemedText>
          {item.exercises.slice(0, 3).map((ex, index) => {
            const exercise = mockExercises.find((e) => e.id === ex.exerciseId);
            return (
              <View key={index} style={styles.exerciseItem}>
                <View style={styles.exerciseBullet} />
                <ThemedText type="caption" style={{ flex: 1 }}>
                  {exercise?.name || "Exercício"}
                </ThemedText>
                <ThemedText type="caption" style={{ color: theme.textSecondary }}>
                  {ex.sets}x{ex.reps}
                </ThemedText>
              </View>
            );
          })}
          {item.exercises.length > 3 && (
            <ThemedText type="caption" style={{ color: theme.textSecondary, marginTop: 4 }}>
              +{item.exercises.length - 3} mais
            </ThemedText>
          )}
        </View>

        <Pressable
          style={[styles.startButton, { backgroundColor: BrandColors.primary }]}
        >
          <ThemedText type="button" style={{ color: "#FFF" }}>
            Ver Detalhes
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingTop: headerHeight + Spacing.lg,
          paddingBottom: tabBarHeight + Spacing.xl,
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <ThemedText type="h2" style={styles.title}>
              Treinos do Instrutor
            </ThemedText>
            <ThemedText type="body" style={{ color: theme.textSecondary, marginBottom: Spacing.md }}>
              Explora os treinos criados pelo teu instrutor
            </ThemedText>

            <FlatList
              horizontal
              data={categories}
              keyExtractor={(item) => item.key}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setSelectedCategory(item.key)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: selectedCategory === item.key
                        ? BrandColors.primary
                        : theme.card,
                    },
                  ]}
                >
                  <ThemedText
                    type="caption"
                    style={{
                      color: selectedCategory === item.key
                        ? "#FFF"
                        : theme.text,
                      fontWeight: "600",
                    }}
                  >
                    {item.label}
                  </ThemedText>
                </Pressable>
              )}
            />
          </View>
        }
        renderItem={renderWorkoutCard}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="clipboard" size={48} color={theme.textSecondary} />
            <ThemedText
              type="body"
              style={{ color: theme.textSecondary, marginTop: Spacing.md, textAlign: "center" }}
            >
              Nenhum treino disponível nesta categoria
            </ThemedText>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  categoriesContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  categoryButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  workoutCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  workoutHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  workoutName: {
    fontWeight: "700",
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginLeft: Spacing.sm,
  },
  workoutMeta: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  exercisesList: {
    marginBottom: Spacing.md,
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  exerciseBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: BrandColors.primary,
    marginRight: 8,
  },
  startButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxl * 2,
  },
});
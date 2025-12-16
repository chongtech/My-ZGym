import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Exercise } from "@/data/mockData";

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  showAddButton?: boolean;
}

export function ExerciseCard({ exercise, onPress, showAddButton = false }: ExerciseCardProps) {
  const { theme } = useTheme();

  const difficultyColor =
    exercise.difficulty === "beginner"
      ? "#10B981"
      : exercise.difficulty === "intermediate"
        ? "#F59E0B"
        : "#EF4444";

  const equipmentIcon =
    exercise.equipment === "barbell"
      ? "bar-chart-2"
      : exercise.equipment === "dumbbells"
        ? "grid"
        : exercise.equipment === "machine"
          ? "settings"
          : exercise.equipment === "bodyweight"
            ? "user"
            : exercise.equipment === "kettlebell"
              ? "disc"
              : exercise.equipment === "cable"
                ? "link"
                : "minus";

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.backgroundDefault }]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          <Feather
            name={equipmentIcon as any}
            size={20}
            color={theme.text}
          />
        </View>
        <View style={styles.headerInfo}>
          <ThemedText type="h4" numberOfLines={1}>
            {exercise.name}
          </ThemedText>
          <ThemedText
            type="small"
            numberOfLines={1}
            style={{ color: theme.textSecondary }}
          >
            {exercise.description}
          </ThemedText>
        </View>
        {showAddButton && (
          <View
            style={[
              styles.addButton,
              { backgroundColor: theme.backgroundSecondary },
            ]}
          >
            <Feather name="plus" size={20} color={theme.text} />
          </View>
        )}
      </View>

      <View style={styles.tags}>
        <View
          style={[
            styles.tag,
            { backgroundColor: difficultyColor + "20" },
          ]}
        >
          <ThemedText
            type="small"
            style={[styles.tagText, { color: difficultyColor }]}
          >
            {exercise.difficulty === "beginner"
              ? "Iniciante"
              : exercise.difficulty === "intermediate"
                ? "Intermediário"
                : "Avançado"}
          </ThemedText>
        </View>
        <View
          style={[
            styles.tag,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          <ThemedText
            type="small"
            style={[styles.tagText, { color: theme.textSecondary }]}
          >
            {exercise.equipment === "barbell"
              ? "Barra"
              : exercise.equipment === "dumbbells"
                ? "Halteres"
                : exercise.equipment === "machine"
                  ? "Máquina"
                  : exercise.equipment === "bodyweight"
                    ? "Corpo Livre"
                    : exercise.equipment === "kettlebell"
                      ? "Kettlebell"
                      : exercise.equipment === "cable"
                        ? "Cabo"
                        : exercise.equipment}
          </ThemedText>
        </View>
      </View>

      {exercise.muscleGroups && exercise.muscleGroups.length > 0 && (
        <View style={styles.muscles}>
          <Feather
            name="activity"
            size={14}
            color={theme.textSecondary}
            style={styles.muscleIcon}
          />
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {exercise.muscleGroups.slice(0, 3).join(", ")}
            {exercise.muscleGroups.length > 3 ? ` +${exercise.muscleGroups.length - 3}` : ""}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius["2xl"],
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    marginBottom: Spacing.md,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  tags: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  muscles: {
    flexDirection: "row",
    alignItems: "center",
  },
  muscleIcon: {
    marginRight: Spacing.xs,
  },
});

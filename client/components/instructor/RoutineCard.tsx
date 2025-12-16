import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { WorkoutRoutine } from "@/data/mockData";

interface RoutineCardProps {
  routine: WorkoutRoutine;
  onPress: () => void;
}

export function RoutineCard({ routine, onPress }: RoutineCardProps) {
  const { theme } = useTheme();

  const difficultyColor =
    routine.difficulty === "beginner"
      ? "#10B981"
      : routine.difficulty === "intermediate"
        ? "#F59E0B"
        : "#EF4444";

  const categoryIcon =
    routine.category === "strength"
      ? "trending-up"
      : routine.category === "hypertrophy"
        ? "activity"
        : routine.category === "powerlifting"
          ? "zap"
          : routine.category === "cardio"
            ? "heart"
            : "layers";

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.backgroundDefault }]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: BrandColors.primary + "20" },
          ]}
        >
          <Feather
            name={categoryIcon as any}
            size={24}
            color={BrandColors.primary}
          />
        </View>
        <View style={styles.headerInfo}>
          <ThemedText type="h4" numberOfLines={1}>
            {routine.name}
          </ThemedText>
          <ThemedText
            type="small"
            numberOfLines={1}
            style={{ color: theme.textSecondary }}
          >
            {routine.description}
          </ThemedText>
        </View>
      </View>

      <View style={styles.badges}>
        <View
          style={[
            styles.badge,
            { backgroundColor: difficultyColor + "20" },
          ]}
        >
          <ThemedText
            type="small"
            style={[styles.badgeText, { color: difficultyColor }]}
          >
            {routine.difficulty === "beginner"
              ? "Iniciante"
              : routine.difficulty === "intermediate"
                ? "Intermediário"
                : "Avançado"}
          </ThemedText>
        </View>
        <View
          style={[
            styles.badge,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          <ThemedText
            type="small"
            style={[styles.badgeText, { color: theme.textSecondary }]}
          >
            {routine.category === "strength"
              ? "Força"
              : routine.category === "hypertrophy"
                ? "Hipertrofia"
                : routine.category === "powerlifting"
                  ? "Powerlifting"
                  : routine.category === "cardio"
                    ? "Cardio"
                    : routine.category}
          </ThemedText>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Feather name="clock" size={16} color={theme.textSecondary} />
          <ThemedText type="small" style={styles.statText}>
            {routine.durationMinutes} min
          </ThemedText>
        </View>
        <View style={styles.statItem}>
          <Feather name="list" size={16} color={theme.textSecondary} />
          <ThemedText type="small" style={styles.statText}>
            {routine.exercises.length} exercícios
          </ThemedText>
        </View>
      </View>

      <View style={styles.footer}>
        <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      </View>
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
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  badges: {
    flexDirection: "row",
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  stats: {
    flexDirection: "row",
    gap: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  statText: {
    opacity: 0.7,
  },
  footer: {
    alignItems: "flex-end",
    marginTop: Spacing.md,
  },
});

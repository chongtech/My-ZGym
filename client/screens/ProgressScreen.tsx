import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import {
  mockWorkouts,
  mockAchievements,
  mockWeeklyStats,
  memberStats,
} from "@/data/mockData";

const statCards = [
  { key: "workouts", label: "Treinos", value: memberStats.totalWorkouts, icon: "activity" },
  { key: "classes", label: "Aulas", value: memberStats.totalClasses, icon: "users" },
  { key: "calories", label: "Calorias", value: memberStats.totalCalories.toLocaleString("pt-PT"), icon: "zap" },
  { key: "prs", label: "Recordes", value: memberStats.personalRecords, icon: "award" },
];

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const maxCalories = Math.max(...mockWeeklyStats.map((s) => s.calories));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-PT", { month: "short", day: "numeric" });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.lg,
        paddingBottom: tabBarHeight + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.statsGrid}>
        {statCards.map((stat) => (
          <View
            key={stat.key}
            style={[styles.statCard, { backgroundColor: theme.backgroundDefault }]}
          >
            <View style={[styles.statIcon, { backgroundColor: `${BrandColors.primary}15` }]}>
              <Feather name={stat.icon as any} size={18} color={BrandColors.primary} />
            </View>
            <ThemedText type="h2">{stat.value}</ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {stat.label}
            </ThemedText>
          </View>
        ))}
      </View>

      <Card style={styles.chartCard} elevation={1}>
        <View style={styles.chartHeader}>
          <ThemedText type="h4">Atividade Semanal</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Calorias queimadas
          </ThemedText>
        </View>
        <View style={styles.chartContainer}>
          {mockWeeklyStats.map((stat, index) => (
            <View key={stat.day} style={styles.chartBar}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: stat.calories > 0 ? (stat.calories / maxCalories) * 100 : 4,
                      backgroundColor:
                        stat.calories > 0 ? BrandColors.primary : theme.backgroundSecondary,
                    },
                  ]}
                />
              </View>
              <ThemedText
                type="small"
                style={{
                  color: index === new Date().getDay() - 1 ? BrandColors.primary : theme.textSecondary,
                  fontWeight: index === new Date().getDay() - 1 ? "600" : "400",
                }}
              >
                {stat.day}
              </ThemedText>
            </View>
          ))}
        </View>
      </Card>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="h4">Conquistas</ThemedText>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <ThemedText type="link" style={{ color: BrandColors.primary }}>
              Ver todas
            </ThemedText>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achievementsContainer}
        >
          {mockAchievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                {
                  backgroundColor: theme.backgroundDefault,
                  opacity: achievement.isUnlocked ? 1 : 0.5,
                },
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  {
                    backgroundColor: achievement.isUnlocked
                      ? `${BrandColors.accent}20`
                      : theme.backgroundSecondary,
                  },
                ]}
              >
                <Feather
                  name={achievement.icon as any}
                  size={24}
                  color={achievement.isUnlocked ? BrandColors.accent : theme.textSecondary}
                />
              </View>
              <ThemedText type="small" style={styles.achievementTitle} numberOfLines={1}>
                {achievement.title}
              </ThemedText>
              {achievement.isUnlocked && achievement.unlockedAt ? (
                <ThemedText type="caption" style={{ color: theme.textSecondary }}>
                  {formatDate(achievement.unlockedAt)}
                </ThemedText>
              ) : (
                <Feather name="lock" size={12} color={theme.textSecondary} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="h4">Treinos Recentes</ThemedText>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <ThemedText type="link" style={{ color: BrandColors.primary }}>
              Ver todos
            </ThemedText>
          </Pressable>
        </View>
        <View style={styles.workoutsContainer}>
          {mockWorkouts.slice(0, 4).map((workout) => (
            <Pressable
              key={workout.id}
              style={({ pressed }) => [
                styles.workoutCard,
                { backgroundColor: theme.backgroundDefault, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={styles.workoutInfo}>
                <ThemedText type="body" style={{ fontWeight: "500" }}>
                  {workout.name}
                </ThemedText>
                <View style={styles.workoutMeta}>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {formatDate(workout.date)}
                  </ThemedText>
                  <View style={styles.metaDot} />
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {workout.duration} min
                  </ThemedText>
                  {workout.instructor ? (
                    <>
                      <View style={styles.metaDot} />
                      <ThemedText type="small" style={{ color: theme.textSecondary }}>
                        {workout.instructor}
                      </ThemedText>
                    </>
                  ) : null}
                </View>
              </View>
              <View style={styles.workoutCalories}>
                <Feather name="zap" size={14} color={BrandColors.warning} />
                <ThemedText type="small" style={{ color: theme.text, fontWeight: "500" }}>
                  {workout.caloriesBurned}
                </ThemedText>
              </View>
              <Feather name="chevron-right" size={18} color={theme.textSecondary} />
            </Pressable>
          ))}
        </View>
      </View>

      {mockWorkouts.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="trending-up" size={48} color={theme.textSecondary} />
          <ThemedText type="h4" style={[styles.emptyTitle, { color: theme.textSecondary }]}>
            Começa a tua jornada fitness!
          </ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary, textAlign: "center" }}>
            Completa o teu primeiro treino para veres o teu progresso aqui
          </ThemedText>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    width: "47%",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  chartCard: {
    marginBottom: Spacing.xl,
  },
  chartHeader: {
    marginBottom: Spacing.lg,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
  },
  chartBar: {
    flex: 1,
    alignItems: "center",
  },
  barContainer: {
    height: 100,
    width: 24,
    justifyContent: "flex-end",
    marginBottom: Spacing.sm,
  },
  bar: {
    width: "100%",
    borderRadius: BorderRadius.xs,
    minHeight: 4,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  achievementsContainer: {
    gap: Spacing.md,
  },
  achievementCard: {
    width: 100,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  achievementTitle: {
    fontWeight: "500",
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  workoutsContainer: {
    gap: Spacing.sm,
  },
  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginHorizontal: Spacing.sm,
  },
  workoutCalories: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginRight: Spacing.sm,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["3xl"],
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
});

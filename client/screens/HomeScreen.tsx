import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockClasses, mockWorkouts } from "@/data/mockData";

const quickActions = [
  { id: "book", icon: "calendar", label: "Reservar Aula" },
  { id: "schedule", icon: "clock", label: "Horário" },
  { id: "workout", icon: "activity", label: "Treino" },
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case "gold":
      return "#FFD700";
    case "silver":
      return "#C0C0C0";
    case "bronze":
      return "#CD7F32";
    default:
      return "#C0C0C0";
  }
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { user } = useAuth();

  const todayClasses = mockClasses.slice(0, 3);
  const recentWorkouts = mockWorkouts.slice(0, 3);

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
      <View style={styles.greetingSection}>
        <View style={styles.greetingRow}>
          <View style={styles.greetingText}>
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              Bem-vindo de volta,
            </ThemedText>
            <ThemedText type="h2">
              {user?.fullName || "Membro"}
            </ThemedText>
          </View>
          <View style={[styles.avatar, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="user" size={24} color={theme.textSecondary} />
          </View>
        </View>
      </View>

      <Card style={styles.membershipCard} elevation={1}>
        <View style={styles.membershipHeader}>
          <View>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              ID de Membro
            </ThemedText>
            <ThemedText type="h4">
              ZG-{user?.id?.padStart(6, "0") || "000001"}
            </ThemedText>
          </View>
          <View style={[styles.tierBadge, { backgroundColor: getTierColor(user?.membershipTier || "bronze") }]}>
            <ThemedText type="small" style={styles.tierText}>
              {(user?.membershipTier || "bronze").toUpperCase()}
            </ThemedText>
          </View>
        </View>
        <View style={styles.membershipFooter}>
          <Feather name="calendar" size={14} color={theme.textSecondary} />
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Válido até {user?.membershipExpiry || "N/A"}
          </ThemedText>
        </View>
      </Card>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Ações Rápidas
        </ThemedText>
        <View style={styles.quickActionsRow}>
          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              style={({ pressed }) => [
                styles.quickActionButton,
                { backgroundColor: theme.backgroundDefault, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${BrandColors.primary}15` }]}>
                <Feather name={action.icon as any} size={20} color={BrandColors.primary} />
              </View>
              <ThemedText type="small" style={styles.quickActionLabel}>
                {action.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="h4">Aulas de Hoje</ThemedText>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <ThemedText type="link" style={{ color: BrandColors.primary }}>
              Ver todas
            </ThemedText>
          </Pressable>
        </View>
        <View style={styles.classesContainer}>
          {todayClasses.map((gymClass) => (
            <Pressable
              key={gymClass.id}
              style={({ pressed }) => [
                styles.classCard,
                { backgroundColor: theme.backgroundDefault, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={styles.classTimeColumn}>
                <ThemedText type="h4" style={{ color: BrandColors.primary }}>
                  {gymClass.time}
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {gymClass.duration} min
                </ThemedText>
              </View>
              <View style={styles.classDetails}>
                <ThemedText type="h4" numberOfLines={1}>
                  {gymClass.name}
                </ThemedText>
                <View style={styles.classInstructor}>
                  <Feather name="user" size={12} color={theme.textSecondary} />
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {gymClass.instructor}
                  </ThemedText>
                </View>
              </View>
              {gymClass.isBooked ? (
                <View style={[styles.bookedBadge, { backgroundColor: `${BrandColors.success}15` }]}>
                  <ThemedText type="small" style={{ color: BrandColors.success, fontWeight: "600" }}>
                    Reservado
                  </ThemedText>
                </View>
              ) : (
                <View style={styles.spotsContainer}>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {gymClass.spotsAvailable} lugares
                  </ThemedText>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="h4">Atividade Recente</ThemedText>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <ThemedText type="link" style={{ color: BrandColors.primary }}>
              Ver tudo
            </ThemedText>
          </Pressable>
        </View>
        <View style={styles.activityContainer}>
          {recentWorkouts.map((workout) => (
            <Pressable
              key={workout.id}
              style={({ pressed }) => [
                styles.activityCard,
                { backgroundColor: theme.backgroundDefault, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={[styles.activityIcon, { backgroundColor: `${BrandColors.accent}15` }]}>
                <Feather name="activity" size={18} color={BrandColors.accent} />
              </View>
              <View style={styles.activityDetails}>
                <ThemedText type="body" style={{ fontWeight: "500" }} numberOfLines={1}>
                  {workout.name}
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {formatDate(workout.date)} - {workout.duration} min
                </ThemedText>
              </View>
              <View style={styles.activityCalories}>
                <Feather name="zap" size={14} color={BrandColors.warning} />
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {workout.caloriesBurned}
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingSection: {
    marginBottom: Spacing.xl,
  },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  membershipCard: {
    marginBottom: Spacing.xl,
  },
  membershipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  tierBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  tierText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 11,
  },
  membershipFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  quickActionButton: {
    flex: 1,
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  quickActionLabel: {
    fontWeight: "500",
  },
  classesContainer: {
    gap: Spacing.sm,
  },
  classCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  classTimeColumn: {
    width: 60,
    marginRight: Spacing.md,
  },
  classDetails: {
    flex: 1,
  },
  classInstructor: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: 2,
  },
  bookedBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  spotsContainer: {},
  activityContainer: {
    gap: Spacing.sm,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  activityDetails: {
    flex: 1,
  },
  activityCalories: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
});

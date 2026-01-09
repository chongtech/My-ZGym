import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
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
    case "z-total":
      return "#D4FF00";
    case "z-junior":
      return "#FF6B6B";
    case "z-weekend":
      return "#4ECDC4";
    case "z-senior":
      return "#95E1D3";
    default:
      return "#C0C0C0";
  }
};

const getTierName = (tier: string) => {
  switch (tier) {
    case "z-total":
      return "Z-Total";
    case "z-junior":
      return "Z-Júnior";
    case "z-weekend":
      return "Z-Fim de Semana";
    case "z-senior":
      return "Z-Sénior";
    default:
      return tier;
  }
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { user } = useAuth();

  // Get today's day of week in Portuguese
  const today = new Date();
  const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const todayName = daysOfWeek[today.getDay()];

  // Filter classes for today and sort by time
  const todayClassesAll = mockClasses
    .filter(cls => cls.dayOfWeek === todayName)
    .sort((a, b) => {
      const timeA = parseInt(a.time.replace(':', ''));
      const timeB = parseInt(b.time.replace(':', ''));
      return timeA - timeB;
    });

  // Get upcoming classes (classes that haven't started yet)
  const currentTime = `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;
  const todayClasses = todayClassesAll.filter(cls => cls.time >= currentTime).slice(0, 3);

  const recentWorkouts = mockWorkouts.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-PT", { month: "short", day: "numeric" });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundRoot }}>
      <ScrollView
        style={styles.container}
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
              <ThemedText type="h2" style={{ color: theme.text }}>
                {user?.fullName || "Membro"}
              </ThemedText>
            </View>
            <Pressable style={styles.avatarButton}>
              <View style={[styles.avatar, { backgroundColor: BrandColors.primary }]}>
                <Feather name="user" size={24} color={theme.buttonText} />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={[styles.membershipCard, { backgroundColor: theme.backgroundDefault, borderWidth: 1, borderColor: theme.border }]}>
          <View style={styles.membershipHeader}>
            <View>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                ID de Membro
              </ThemedText>
              <ThemedText type="h4" style={{ color: theme.text, marginTop: 4 }}>
                ZG-{user?.id?.padStart(6, "0") || "000001"}
              </ThemedText>
            </View>
            <View style={[styles.tierBadge, { backgroundColor: getTierColor(user?.membershipTier || "z-total") }]}>
              <ThemedText type="small" style={styles.tierText}>
                {getTierName(user?.membershipTier || "z-total")}
              </ThemedText>
            </View>
          </View>
          <View style={styles.membershipFooter}>
            <Feather name="calendar" size={14} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Válido até {user?.membershipExpiry || "N/A"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="h4" style={[styles.sectionTitle, { color: theme.text }]}>
            Ações Rápidas
          </ThemedText>
          <View style={styles.quickActionsRow}>
            {quickActions.map((action, index) => {
              const colors = [
                BrandColors.primary,
                BrandColors.warning,
                BrandColors.success,
              ];
              return (
                <Pressable
                  key={action.id}
                  style={({ pressed }) => [
                    styles.quickActionButton,
                    { opacity: pressed ? 0.7 : 1, backgroundColor: colors[index % colors.length] },
                  ]}
                >
                  <View style={styles.quickActionGradient}>
                    <View style={styles.quickActionIcon}>
                      <Feather name={action.icon as any} size={24} color={theme.buttonText} />
                    </View>
                    <ThemedText type="small" style={[styles.quickActionLabel, { color: theme.buttonText }]}>
                      {action.label}
                    </ThemedText>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText type="h4" style={{ color: theme.text }}>Próximas Aulas de Hoje</ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: 2 }}>
                {todayName}
              </ThemedText>
            </View>
            <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
              <ThemedText type="link" style={{ color: theme.link, fontWeight: '600' }}>
                Ver todas
              </ThemedText>
            </Pressable>
          </View>
          <View style={styles.classesContainer}>
            {todayClasses.length > 0 ? (
              todayClasses.map((gymClass) => (
                <Pressable
                  key={gymClass.id}
                  style={({ pressed }) => [
                    styles.classCard,
                    { opacity: pressed ? 0.7 : 1, backgroundColor: theme.backgroundDefault },
                  ]}
                >
                  <View style={styles.classTimeColumn}>
                    <ThemedText type="h4" style={{ color: theme.primary, fontWeight: '700' }}>
                      {gymClass.time}
                    </ThemedText>
                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                      {gymClass.duration} min
                    </ThemedText>
                  </View>
                  <View style={styles.classDetails}>
                    <ThemedText type="h4" numberOfLines={1} style={{ color: theme.text, fontWeight: '600' }}>
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
                    <View style={[styles.bookedBadge, { backgroundColor: theme.success + '20' }]}>
                      <ThemedText type="small" style={{ color: theme.success, fontWeight: "700" }}>
                        Reservado
                      </ThemedText>
                    </View>
                  ) : (
                    <View style={styles.spotsContainer}>
                      <ThemedText type="small" style={{ color: theme.textSecondary, fontWeight: '500' }}>
                        {gymClass.spotsAvailable} lugares
                      </ThemedText>
                    </View>
                  )}
                </Pressable>
              ))
            ) : (
              <View style={[styles.emptyStateCard, { backgroundColor: theme.backgroundDefault }]}>
                <Feather name="calendar-x" size={48} color={theme.textSecondary} />
                <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: Spacing.md }}>
                  Sem aulas programadas para hoje
                </ThemedText>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="h4" style={{ color: theme.text }}>Atividade Recente</ThemedText>
            <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
              <ThemedText type="link" style={{ color: theme.link, fontWeight: '600' }}>
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
                  { opacity: pressed ? 0.7 : 1, backgroundColor: theme.backgroundDefault },
                ]}
              >
                <View style={[styles.activityIcon, { backgroundColor: theme.backgroundTertiary }]}>
                  <Feather name="activity" size={20} color={theme.text} />
                </View>
                <View style={styles.activityDetails}>
                  <ThemedText type="body" style={{ fontWeight: "600", color: theme.text }} numberOfLines={1}>
                    {workout.name}
                  </ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {formatDate(workout.date)} - {workout.duration} min
                  </ThemedText>
                </View>
                <View style={[styles.activityCalories, { backgroundColor: theme.warning + '20' }]}>
                  <Feather name="zap" size={16} color={theme.warning} />
                  <ThemedText type="small" style={{ color: theme.text, fontWeight: '600' }}>
                    {workout.caloriesBurned}
                  </ThemedText>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingSection: {
    marginBottom: Spacing.lg,
  },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    flex: 1,
  },
  avatarButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  membershipCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
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
    fontWeight: '700',
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
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionGradient: {
    alignItems: "center",
    padding: Spacing.lg,
  },
  quickActionIcon: {
    marginBottom: Spacing.sm,
  },
  quickActionLabel: {
    fontWeight: "700",
    fontSize: 12,
    textAlign: 'center',
  },
  classesContainer: {
    gap: Spacing.md,
  },
  classCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
    marginTop: 4,
  },
  bookedBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  spotsContainer: {},
  activityContainer: {
    gap: Spacing.md,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  emptyStateCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
});

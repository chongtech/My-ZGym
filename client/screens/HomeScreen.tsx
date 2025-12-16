import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#E8FF2B', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.3 }}
        style={styles.headerGradient}
      />

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
              <ThemedText type="body" style={{ color: '#666' }}>
                Bem-vindo de volta,
              </ThemedText>
              <ThemedText type="h2" style={{ color: '#000' }}>
                {user?.fullName || "Membro"}
              </ThemedText>
            </View>
            <Pressable style={styles.avatarButton}>
              <LinearGradient
                colors={['#E8FF2B', '#D4E828']}
                style={styles.avatar}
              >
                <Feather name="user" size={24} color="#000" />
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <LinearGradient
          colors={['#1a1a1a', '#2d2d2d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.membershipCard}
        >
          <View style={styles.membershipHeader}>
            <View>
              <ThemedText type="small" style={{ color: '#999' }}>
                ID de Membro
              </ThemedText>
              <ThemedText type="h4" style={{ color: '#fff', marginTop: 4 }}>
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
            <Feather name="calendar" size={14} color="#999" />
            <ThemedText type="small" style={{ color: '#999' }}>
              Válido até {user?.membershipExpiry || "N/A"}
            </ThemedText>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <ThemedText type="h4" style={[styles.sectionTitle, { color: '#000' }]}>
            Ações Rápidas
          </ThemedText>
          <View style={styles.quickActionsRow}>
            {quickActions.map((action, index) => {
              const gradients = [
                ['#E8FF2B', '#D4E828'],
                ['#FFE82B', '#FFD700'],
                ['#2BE8E8', '#1BC5C5'],
              ];
              return (
                <Pressable
                  key={action.id}
                  style={({ pressed }) => [
                    styles.quickActionButton,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <LinearGradient
                    colors={gradients[index % gradients.length]}
                    style={styles.quickActionGradient}
                  >
                    <View style={styles.quickActionIcon}>
                      <Feather name={action.icon as any} size={24} color="#000" />
                    </View>
                    <ThemedText type="small" style={styles.quickActionLabel}>
                      {action.label}
                    </ThemedText>
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="h4" style={{ color: '#000' }}>Aulas de Hoje</ThemedText>
            <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
              <ThemedText type="link" style={{ color: BrandColors.primary, fontWeight: '600' }}>
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
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <View style={styles.classTimeColumn}>
                  <ThemedText type="h4" style={{ color: BrandColors.primary, fontWeight: '700' }}>
                    {gymClass.time}
                  </ThemedText>
                  <ThemedText type="small" style={{ color: '#666' }}>
                    {gymClass.duration} min
                  </ThemedText>
                </View>
                <View style={styles.classDetails}>
                  <ThemedText type="h4" numberOfLines={1} style={{ color: '#000', fontWeight: '600' }}>
                    {gymClass.name}
                  </ThemedText>
                  <View style={styles.classInstructor}>
                    <Feather name="user" size={12} color="#666" />
                    <ThemedText type="small" style={{ color: '#666' }}>
                      {gymClass.instructor}
                    </ThemedText>
                  </View>
                </View>
                {gymClass.isBooked ? (
                  <View style={styles.bookedBadge}>
                    <ThemedText type="small" style={{ color: BrandColors.success, fontWeight: "700" }}>
                      Reservado
                    </ThemedText>
                  </View>
                ) : (
                  <View style={styles.spotsContainer}>
                    <ThemedText type="small" style={{ color: '#666', fontWeight: '500' }}>
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
            <ThemedText type="h4" style={{ color: '#000' }}>Atividade Recente</ThemedText>
            <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
              <ThemedText type="link" style={{ color: BrandColors.primary, fontWeight: '600' }}>
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
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <View style={styles.activityIcon}>
                  <Feather name="activity" size={20} color="#000" />
                </View>
                <View style={styles.activityDetails}>
                  <ThemedText type="body" style={{ fontWeight: "600", color: '#000' }} numberOfLines={1}>
                    {workout.name}
                  </ThemedText>
                  <ThemedText type="small" style={{ color: '#666' }}>
                    {formatDate(workout.date)} - {workout.duration} min
                  </ThemedText>
                </View>
                <View style={styles.activityCalories}>
                  <Feather name="zap" size={16} color={BrandColors.warning} />
                  <ThemedText type="small" style={{ color: '#000', fontWeight: '600' }}>
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
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    zIndex: -1,
  },
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
    color: '#000',
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
    backgroundColor: '#fff',
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
    backgroundColor: `${BrandColors.success}20`,
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
    backgroundColor: '#fff',
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
    backgroundColor: '#E8FF2B',
  },
  activityDetails: {
    flex: 1,
  },
  activityCalories: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: '#FFF9E6',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
});

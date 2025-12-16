import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockInstructorClients, mockWorkouts } from "@/data/mockData";
import type { InstructorClientsStackParamList } from "@/navigation/InstructorClientsStackNavigator";

type ClientDetailRouteProp = RouteProp<InstructorClientsStackParamList, "ClientDetail">;

export default function ClientDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const route = useRoute<ClientDetailRouteProp>();

  const client = mockInstructorClients.find((c) => c.id === route.params.clientId);

  if (!client) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Cliente não encontrado</ThemedText>
      </View>
    );
  }

  const tierColor =
    client.membershipTier === "gold"
      ? "#F59E0B"
      : client.membershipTier === "silver"
        ? "#9CA3AF"
        : "#CD7F32";

  const complianceColor =
    client.complianceRate >= 80
      ? "#10B981"
      : client.complianceRate >= 60
        ? "#F59E0B"
        : "#EF4444";

  const recentWorkouts = mockWorkouts.slice(0, 5);

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
      <View style={[styles.header, { backgroundColor: theme.backgroundDefault }]}>
        <View style={[styles.avatar, { backgroundColor: theme.backgroundSecondary }]}>
          <Feather name="user" size={32} color={theme.textSecondary} />
        </View>
        <ThemedText type="h3" style={{ marginTop: Spacing.md }}>
          {client.fullName}
        </ThemedText>
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          {client.email}
        </ThemedText>
        <View style={[styles.tierBadge, { backgroundColor: tierColor + "20", marginTop: Spacing.sm }]}>
          <ThemedText type="small" style={{ color: tierColor, fontWeight: "600" }}>
            {client.membershipTier.toUpperCase()}
          </ThemedText>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText type="h3" style={{ color: complianceColor }}>
            {client.complianceRate}%
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Taxa de Adesão
          </ThemedText>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText type="h3">{Math.floor(Math.random() * 30) + 10}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Treinos/Mês
          </ThemedText>
        </View>
      </View>

      <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="clipboard" size={20} color={BrandColors.primary} />
            <ThemedText type="h4">Programa Atual</ThemedText>
          </View>
          <ThemedText type="body" style={{ marginTop: Spacing.sm }}>
            {client.currentProgram || "Sem programa atribuído"}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: Spacing.xs }}>
            Atribuído em: {new Date(client.assignedAt).toLocaleDateString("pt-PT")}
          </ThemedText>
        </View>
      </Card>

      <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="file-text" size={20} color={BrandColors.primary} />
            <ThemedText type="h4">Notas</ThemedText>
          </View>
          <ThemedText type="body" style={{ marginTop: Spacing.sm, color: theme.textSecondary }}>
            {client.notes || "Sem notas"}
          </ThemedText>
        </View>
      </Card>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="activity" size={20} color={BrandColors.primary} />
          <ThemedText type="h4">Últimos Treinos</ThemedText>
        </View>
        {recentWorkouts.map((workout) => (
          <View
            key={workout.id}
            style={[styles.workoutItem, { backgroundColor: theme.backgroundDefault }]}
          >
            <View style={styles.workoutInfo}>
              <ThemedText type="body">{workout.name}</ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {new Date(workout.date).toLocaleDateString("pt-PT")}
              </ThemedText>
            </View>
            <View style={styles.workoutStats}>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {workout.duration} min
              </ThemedText>
              <ThemedText type="small" style={{ color: BrandColors.primary }}>
                {workout.caloriesBurned} kcal
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.xl,
    borderRadius: BorderRadius["2xl"],
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tierBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius["2xl"],
    alignItems: "center",
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  workoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginTop: Spacing.sm,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutStats: {
    alignItems: "flex-end",
    gap: 2,
  },
});

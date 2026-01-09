import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockClasses } from "@/data/mockData";
import type { ManagerScheduleStackParamList } from "@/navigation/ManagerScheduleStackNavigator";

type ClassDetailRouteProp = RouteProp<ManagerScheduleStackParamList, "ClassDetail">;
type NavigationProp = NativeStackNavigationProp<ManagerScheduleStackParamList>;

export default function ClassDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const route = useRoute<ClassDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  // Buscar todas as aulas com o mesmo nome
  const classSchedules = mockClasses.filter((c) => c.name === route.params.classId);

  if (classSchedules.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Aula não encontrada</ThemedText>
      </View>
    );
  }

  const firstClass = classSchedules[0];

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
        <View style={[styles.typeIcon, { backgroundColor: BrandColors.primary + '20' }]}>
          <Feather name="activity" size={32} color={BrandColors.primary} />
        </View>
        <ThemedText type="h2" style={{ marginTop: Spacing.md }}>
          {firstClass.name}
        </ThemedText>
        <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: 4 }}>
          {firstClass.instructor}
        </ThemedText>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: theme.backgroundSecondary }]}>
            <ThemedText type="small" style={{ fontWeight: '600' }}>
              {firstClass.duration} min
            </ThemedText>
          </View>
          <View style={[styles.badge, { backgroundColor: theme.backgroundSecondary }]}>
            <ThemedText type="small" style={{ fontWeight: '600', textTransform: 'capitalize' }}>
              {firstClass.difficulty}
            </ThemedText>
          </View>
        </View>
      </View>

      {firstClass.description && (
        <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText type="h4" style={{ marginBottom: Spacing.sm }}>
            Descrição
          </ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary, lineHeight: 22 }}>
            {firstClass.description}
          </ThemedText>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Horários Semanais ({classSchedules.length})
        </ThemedText>

        {classSchedules.map((schedule) => (
          <Pressable
            key={schedule.id}
            style={[styles.scheduleCard, { backgroundColor: theme.backgroundRoot }]}
            onPress={() => navigation.navigate("EditClass", { classId: schedule.id })}
          >
            <View style={styles.scheduleHeader}>
              <View style={{ flex: 1 }}>
                <ThemedText type="body" style={{ fontWeight: '600' }}>
                  {schedule.dayOfWeek}
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: 2 }}>
                  {schedule.time} - {schedule.duration} minutos
                </ThemedText>
              </View>
              <Feather name="edit-2" size={18} color={theme.textSecondary} />
            </View>

            <View style={styles.scheduleMeta}>
              <View style={styles.metaItem}>
                <Feather name="users" size={14} color={theme.textSecondary} />
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {schedule.totalSpots - schedule.spotsAvailable}/{schedule.totalSpots} ocupadas
                </ThemedText>
              </View>
              <View style={styles.metaItem}>
                <Feather name="trending-up" size={14} color={theme.textSecondary} />
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {schedule.spotsAvailable} vagas disponíveis
                </ThemedText>
              </View>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: BrandColors.primary,
                    width: `${Math.round(((schedule.totalSpots - schedule.spotsAvailable) / schedule.totalSpots) * 100)}%`,
                  },
                ]}
              />
            </View>
          </Pressable>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Estatísticas
        </ThemedText>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Feather name="calendar" size={24} color={BrandColors.primary} />
            <ThemedText type="h3" style={{ marginTop: Spacing.sm }}>
              {classSchedules.length}
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Horários/Semana
            </ThemedText>
          </View>

          <View style={styles.statItem}>
            <Feather name="users" size={24} color="#10B981" />
            <ThemedText type="h3" style={{ marginTop: Spacing.sm }}>
              {classSchedules.reduce((sum, s) => sum + s.totalSpots, 0)}
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Vagas Totais
            </ThemedText>
          </View>

          <View style={styles.statItem}>
            <Feather name="trending-up" size={24} color="#F59E0B" />
            <ThemedText type="h3" style={{ marginTop: Spacing.sm }}>
              {classSchedules.reduce((sum, s) => sum + (s.totalSpots - s.spotsAvailable), 0)}
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Inscritos
            </ThemedText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: Spacing.xl,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.lg,
  },
  typeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  badges: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  section: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.lg,
  },
  scheduleCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  scheduleMeta: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  statsGrid: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    padding: Spacing.md,
  },
});

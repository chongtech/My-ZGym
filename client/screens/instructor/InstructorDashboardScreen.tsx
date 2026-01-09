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
import { mockInstructorStats, mockTodaySessions } from "@/data/mockData";

export default function InstructorDashboardScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { user } = useAuth();

  const stats = [
    { id: "clients", icon: "users", label: "Total Clientes", value: mockInstructorStats.totalClients, color: "#3B82F6" },
    { id: "routines", icon: "clipboard", label: "Rotinas Ativas", value: mockInstructorStats.activeRoutines, color: "#10B981" },
    { id: "sessions", icon: "calendar", label: "Sessões Semana", value: mockInstructorStats.sessionsThisWeek, color: "#F59E0B" },
    { id: "checkins", icon: "check-circle", label: "Check-ins Hoje", value: mockInstructorStats.clientCheckIns, color: "#8B5CF6" },
  ];

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
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            Olá,
          </ThemedText>
          <ThemedText type="h2" style={{ color: theme.text }}>
            {user?.fullName || "Instrutor"}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: 4 }}>
            Tens {mockTodaySessions.length} sessões agendadas para hoje
          </ThemedText>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <Pressable
              key={stat.id}
              style={[styles.statCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <Feather name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <ThemedText type="h3" style={{ marginTop: Spacing.sm, marginBottom: 2 }}>
                {stat.value}
              </ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {stat.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="h4" style={{ color: theme.text }}>
              Sessões de Hoje
            </ThemedText>
            <Pressable>
              <ThemedText type="link" style={{ color: BrandColors.primary, fontWeight: '600' }}>
                Ver agenda
              </ThemedText>
            </Pressable>
          </View>

          {mockTodaySessions.length > 0 ? (
            mockTodaySessions.map((session) => (
              <Pressable
                key={session.id}
                style={[styles.sessionCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <View style={styles.sessionTime}>
                  <ThemedText type="h4" style={{ color: BrandColors.primary, fontWeight: '700' }}>
                    {session.startTime}
                  </ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {session.endTime}
                  </ThemedText>
                </View>
                <View style={styles.sessionDetails}>
                  <View style={styles.sessionHeader}>
                    <View
                      style={[
                        styles.sessionTypeIcon,
                        { backgroundColor: theme.backgroundSecondary },
                      ]}
                    >
                      <Feather
                        name={session.sessionType === 'personal_training' ? 'user' : 'users'}
                        size={16}
                        color={theme.text}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ThemedText type="h4" numberOfLines={1}>
                        {session.clientName || session.notes || "Sessão"}
                      </ThemedText>
                      <ThemedText type="small" style={{ color: theme.textSecondary }}>
                        {session.sessionType === 'personal_training' ? 'Personal Training' : 'Aula em Grupo'}
                      </ThemedText>
                    </View>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color={theme.textSecondary} />
              </Pressable>
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="calendar" size={48} color={theme.textSecondary} />
              <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: Spacing.md }}>
                Sem sessões agendadas para hoje
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.md }}>
            Ações Rápidas
          </ThemedText>
          <View style={styles.quickActionsRow}>
            <Pressable style={[styles.quickActionButton, { backgroundColor: BrandColors.primary }]}>
              <Feather name="plus-circle" size={24} color={theme.text} />
              <ThemedText type="small" style={[styles.quickActionLabel, { color: theme.text }]}>
                Criar Rotina
              </ThemedText>
            </Pressable>
            <Pressable style={[styles.quickActionButton, { backgroundColor: BrandColors.primary }]}>
              <Feather name="calendar" size={24} color={theme.text} />
              <ThemedText type="small" style={[styles.quickActionLabel, { color: theme.text }]}>
                Ver Agenda
              </ThemedText>
            </Pressable>
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
    marginBottom: Spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.md,
  },
  sessionTime: {
    marginRight: Spacing.lg,
    alignItems: 'center',
  },
  sessionDetails: {
    flex: 1,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  emptyState: {
    padding: Spacing.xxl,
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickActionButton: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quickActionLabel: {
    fontWeight: '600',
  },
});

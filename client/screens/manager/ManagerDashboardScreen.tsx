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
import { mockManagerDashboardStats, mockRecentActivities, mockClasses } from "@/data/mockData";

export default function ManagerDashboardScreen() {
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
  const todayClasses = mockClasses
    .filter(cls => cls.dayOfWeek === todayName)
    .sort((a, b) => {
      const timeA = parseInt(a.time.replace(':', ''));
      const timeB = parseInt(b.time.replace(':', ''));
      return timeA - timeB;
    });

  // Get upcoming classes (classes that haven't started yet)
  const currentTime = `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;
  const upcomingClasses = todayClasses.filter(cls => cls.time >= currentTime).slice(0, 3);

  const stats = [
    {
      id: "members",
      icon: "users",
      label: "Total Membros",
      value: mockManagerDashboardStats.totalMembers,
      subValue: `${mockManagerDashboardStats.activeMembers} ativos`,
      color: "#3B82F6"
    },
    {
      id: "revenue",
      icon: "dollar-sign",
      label: "Receita Hoje",
      value: `$${mockManagerDashboardStats.totalRevenue.toFixed(0)}`,
      subValue: `${mockManagerDashboardStats.revenueChange > 0 ? '+' : ''}${mockManagerDashboardStats.revenueChange}%`,
      color: "#10B981"
    },
    {
      id: "occupancy",
      icon: "activity",
      label: "Taxa Ocupação",
      value: `${mockManagerDashboardStats.occupancyRate}%`,
      subValue: `${mockManagerDashboardStats.checkInsToday} check-ins`,
      color: "#F59E0B"
    },
    {
      id: "classes",
      icon: "calendar",
      label: "Aulas Ativas",
      value: mockManagerDashboardStats.activeClasses,
      subValue: `${mockManagerDashboardStats.classAttendanceRate}% frequência`,
      color: "#8B5CF6"
    },
    {
      id: "staff",
      icon: "briefcase",
      label: "Equipe",
      value: mockManagerDashboardStats.staffCount,
      subValue: "instrutores",
      color: "#EF4444"
    },
    {
      id: "attendance",
      icon: "trending-up",
      label: "Frequência",
      value: `${mockManagerDashboardStats.classAttendanceRate}%`,
      subValue: "média semanal",
      color: "#06B6D4"
    },
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
            Bem-vindo,
          </ThemedText>
          <ThemedText type="h2" style={{ color: theme.text }}>
            {user?.fullName || "Gerente"}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: 4 }}>
            Visão geral das operações da academia
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
              <ThemedText type="small" style={{ color: theme.textSecondary, textAlign: 'center' }}>
                {stat.label}
              </ThemedText>
              {stat.subValue && (
                <ThemedText type="small" style={{ fontSize: 10, color: theme.textSecondary, marginTop: 2, textAlign: 'center' }}>
                  {stat.subValue}
                </ThemedText>
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="h4" style={{ color: theme.text }}>
              Próximas Aulas de Hoje
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {todayName}
            </ThemedText>
          </View>

          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((classItem) => (
              <Pressable
                key={classItem.id}
                style={[styles.classCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <View style={[styles.classTimeBox, { backgroundColor: BrandColors.primary + '20' }]}>
                  <ThemedText type="h4" style={{ color: BrandColors.primary }}>
                    {classItem.time}
                  </ThemedText>
                  <ThemedText type="small" style={{ fontSize: 10, color: theme.textSecondary }}>
                    {classItem.duration}min
                  </ThemedText>
                </View>
                <View style={styles.classDetails}>
                  <ThemedText type="body" style={{ fontWeight: '600' }}>
                    {classItem.name}
                  </ThemedText>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Feather name="user" size={12} color={theme.textSecondary} />
                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                      {classItem.instructor}
                    </ThemedText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Feather name="map-pin" size={12} color={theme.textSecondary} />
                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                      {classItem.room}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.classSpotsInfo}>
                  <ThemedText type="small" style={{ color: theme.textSecondary, textAlign: 'center' }}>
                    Vagas
                  </ThemedText>
                  <ThemedText type="body" style={{ fontWeight: '600', textAlign: 'center' }}>
                    {classItem.spotsAvailable}/{classItem.totalSpots}
                  </ThemedText>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="calendar-x" size={48} color={theme.textSecondary} />
              <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: Spacing.md }}>
                Sem aulas programadas para hoje
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="h4" style={{ color: theme.text }}>
              Atividades Recentes
            </ThemedText>
            <Pressable>
              <ThemedText type="link" style={{ color: BrandColors.primary, fontWeight: '600' }}>
                Ver todos
              </ThemedText>
            </Pressable>
          </View>

          {mockRecentActivities.length > 0 ? (
            mockRecentActivities.slice(0, 5).map((activity) => (
              <Pressable
                key={activity.id}
                style={[styles.activityCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <View style={[styles.activityIcon, { backgroundColor: getActivityColor(activity.activityType) + '20' }]}>
                  <Feather
                    name={getActivityIcon(activity.activityType)}
                    size={20}
                    color={getActivityColor(activity.activityType)}
                  />
                </View>
                <View style={styles.activityDetails}>
                  <ThemedText type="body" numberOfLines={1} style={{ fontWeight: '600' }}>
                    {activity.memberName}
                  </ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {getActivityDescription(activity.activityType)}
                  </ThemedText>
                </View>
                <ThemedText type="small" style={{ fontSize: 10, color: theme.textSecondary }}>
                  {formatTimestamp(activity.timestamp)}
                </ThemedText>
              </Pressable>
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="inbox" size={48} color={theme.textSecondary} />
              <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: Spacing.md }}>
                Sem atividades recentes
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.md }}>
            Ações Rápidas
          </ThemedText>
          <View style={styles.quickActionsGrid}>
            <Pressable style={[styles.quickActionButton, { backgroundColor: BrandColors.primary }]}>
              <Feather name="user-plus" size={24} color="#000000" />
              <ThemedText type="small" style={[styles.quickActionLabel, { color: "#000000", fontWeight: '700' }]}>
                Novo Membro
              </ThemedText>
            </Pressable>
            <Pressable style={[styles.quickActionButton, { backgroundColor: BrandColors.primary }]}>
              <Feather name="calendar" size={24} color="#000000" />
              <ThemedText type="small" style={[styles.quickActionLabel, { color: "#000000", fontWeight: '700' }]}>
                Agendar Aula
              </ThemedText>
            </Pressable>
            <Pressable style={[styles.quickActionButton, { backgroundColor: BrandColors.primary }]}>
              <Feather name="bar-chart-2" size={24} color="#000000" />
              <ThemedText type="small" style={[styles.quickActionLabel, { color: "#000000", fontWeight: '700' }]}>
                Relatórios
              </ThemedText>
            </Pressable>
            <Pressable style={[styles.quickActionButton, { backgroundColor: BrandColors.primary }]}>
              <Feather name="settings" size={24} color="#000000" />
              <ThemedText type="small" style={[styles.quickActionLabel, { color: "#000000", fontWeight: '700' }]}>
                Configurações
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getActivityIcon(type: string): any {
  switch (type) {
    case 'check-in': return 'log-in';
    case 'class-booked': return 'calendar';
    case 'class-attended': return 'check-circle';
    case 'upgrade': return 'trending-up';
    case 'downgrade': return 'trending-down';
    case 'joined': return 'user-plus';
    case 'cancelled': return 'user-x';
    default: return 'activity';
  }
}

function getActivityColor(type: string): string {
  switch (type) {
    case 'check-in': return '#3B82F6';
    case 'class-booked': return '#8B5CF6';
    case 'class-attended': return '#10B981';
    case 'upgrade': return '#10B981';
    case 'downgrade': return '#F59E0B';
    case 'joined': return '#06B6D4';
    case 'cancelled': return '#EF4444';
    default: return '#6B7280';
  }
}

function getActivityDescription(type: string): string {
  switch (type) {
    case 'check-in': return 'Fez check-in';
    case 'class-booked': return 'Agendou aula';
    case 'class-attended': return 'Participou de aula';
    case 'upgrade': return 'Fez upgrade de plano';
    case 'downgrade': return 'Fez downgrade de plano';
    case 'joined': return 'Novo membro';
    case 'cancelled': return 'Cancelou plano';
    default: return 'Atividade';
  }
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Agora';
  if (diffMins < 60) return `${diffMins}m atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
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
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  activityDetails: {
    flex: 1,
  },
  emptyState: {
    padding: Spacing.xl,
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  quickActionButton: {
    flex: 1,
    minWidth: '47%',
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quickActionLabel: {
    fontWeight: '600',
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  classTimeBox: {
    width: 70,
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classDetails: {
    flex: 1,
  },
  classSpotsInfo: {
    alignItems: 'center',
    minWidth: 50,
  },
});

import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockMembers } from "@/data/mockData";
import type { ManagerMembersStackParamList } from "@/navigation/ManagerMembersStackNavigator";

type MemberDetailRouteProp = RouteProp<ManagerMembersStackParamList, "MemberDetail">;
type NavigationProp = NativeStackNavigationProp<ManagerMembersStackParamList>;

export default function MemberDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const route = useRoute<MemberDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const member = mockMembers.find((m) => m.id === route.params.memberId);

  if (!member) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Membro não encontrado</ThemedText>
      </View>
    );
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "z-total": return "#D4FF00";
      case "z-junior": return "#FF6B6B";
      case "z-weekend": return "#4ECDC4";
      case "z-senior": return "#95E1D3";
      default: return theme.textSecondary;
    }
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case "z-total": return "Z-Total";
      case "z-junior": return "Z-Júnior";
      case "z-weekend": return "Z-Fim de Semana";
      case "z-senior": return "Z-Sénior";
      default: return tier;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#10B981";
      case "inactive": return "#6B7280";
      case "suspended": return "#EF4444";
      default: return theme.textSecondary;
    }
  };

  const complianceColor =
    member.complianceRate >= 80
      ? "#10B981"
      : member.complianceRate >= 60
        ? "#F59E0B"
        : "#EF4444";

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
          {member.profileImage ? (
            <Image
              source={{ uri: member.profileImage }}
              style={styles.avatarImage}
            />
          ) : (
            <ThemedText type="h1" style={{ color: BrandColors.primary }}>
              {member.fullName.charAt(0)}
            </ThemedText>
          )}
        </View>
        <ThemedText type="h3" style={{ marginTop: Spacing.md }}>
          {member.fullName}
        </ThemedText>
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          {member.email}
        </ThemedText>
        {member.phone && (
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            {member.phone}
          </ThemedText>
        )}
        <View style={styles.badges}>
          <View style={[styles.tierBadge, { backgroundColor: getTierColor(member.membershipTier) + "20" }]}>
            <ThemedText type="small" style={{ color: getTierColor(member.membershipTier), fontWeight: "600" }}>
              {getTierName(member.membershipTier)}
            </ThemedText>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(member.status) + "20" }]}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(member.status) }]} />
            <ThemedText type="small" style={{ color: getStatusColor(member.status), fontWeight: "600" }}>
              {member.status}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText type="h3" style={{ color: complianceColor }}>
            {member.complianceRate}%
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Taxa de Frequência
          </ThemedText>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText type="h3" style={{ color: BrandColors.primary }}>
            {member.checkInCount}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Check-ins
          </ThemedText>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <View style={styles.sectionHeader}>
          <ThemedText type="h4">Informações da Conta</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <Feather name="calendar" size={20} color={theme.textSecondary} />
          <View style={styles.infoContent}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Membro desde
            </ThemedText>
            <ThemedText type="body" style={{ fontWeight: '600' }}>
              {new Date(member.memberSince).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </ThemedText>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="activity" size={20} color={theme.textSecondary} />
          <View style={styles.infoContent}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Última atividade
            </ThemedText>
            <ThemedText type="body" style={{ fontWeight: '600' }}>
              {new Date(member.lastActivity).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
            </ThemedText>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="award" size={20} color={theme.textSecondary} />
          <View style={styles.infoContent}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Plano
            </ThemedText>
            <ThemedText type="body" style={{ fontWeight: '600' }}>
              {getTierName(member.membershipTier)}
            </ThemedText>
          </View>
        </View>
      </View>

      {member.notes && (
        <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.sectionHeader}>
            <ThemedText type="h4">Notas</ThemedText>
          </View>
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            {member.notes}
          </ThemedText>
        </View>
      )}

      <View style={styles.actionsSection}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: BrandColors.primary }]}
          onPress={() => navigation.navigate("MemberEdit", { memberId: member.id })}
        >
          <Feather name="edit" size={20} color="#000000" />
          <ThemedText type="body" style={{ color: "#000000", fontWeight: '600' }}>
            Editar Membro
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.backgroundDefault }]}
        >
          <Feather name="mail" size={20} color={theme.text} />
          <ThemedText type="body" style={{ fontWeight: '600' }}>
            Enviar E-mail
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.actionButton, { backgroundColor: member.status === "suspended" ? "#10B981" : "#EF4444" }]}
        >
          <Feather name={member.status === "suspended" ? "check" : "x-circle"} size={20} color="#FFFFFF" />
          <ThemedText type="body" style={{ color: "#FFFFFF", fontWeight: '600' }}>
            {member.status === "suspended" ? "Reativar" : "Suspender"}
          </ThemedText>
        </Pressable>
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 80,
    height: 80,
  },
  badges: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  tierBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    alignItems: "center",
  },
  section: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  actionsSection: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
});

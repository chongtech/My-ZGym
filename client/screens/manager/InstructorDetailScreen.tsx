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
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockStaff } from "@/data/mockData";
import type { ManagerStaffStackParamList } from "@/navigation/ManagerStaffStackNavigator";

type InstructorDetailRouteProp = RouteProp<ManagerStaffStackParamList, "InstructorDetail">;
type NavigationProp = NativeStackNavigationProp<ManagerStaffStackParamList>;

export default function InstructorDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const route = useRoute<InstructorDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const instructor = mockStaff.find((s) => s.id === route.params.instructorId);

  if (!instructor) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Instrutor não encontrado</ThemedText>
      </View>
    );
  }

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
          {instructor.profileImage ? (
            <Image
              source={{ uri: instructor.profileImage }}
              style={styles.avatarImage}
            />
          ) : (
            <ThemedText type="h1" style={{ color: BrandColors.primary }}>
              {instructor.fullName.charAt(0)}
            </ThemedText>
          )}
        </View>
        <ThemedText type="h3" style={{ marginTop: Spacing.md }}>
          {instructor.fullName}
        </ThemedText>
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          {instructor.email}
        </ThemedText>
        {instructor.phone && (
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            {instructor.phone}
          </ThemedText>
        )}
        <View style={[styles.statusBadge, { backgroundColor: instructor.status === "active" ? "#10B98120" : "#6B728020", marginTop: Spacing.sm }]}>
          <View style={[styles.statusDot, { backgroundColor: instructor.status === "active" ? "#10B981" : "#6B7280" }]} />
          <ThemedText type="small" style={{ color: instructor.status === "active" ? "#10B981" : "#6B7280", fontWeight: "600" }}>
            {instructor.status}
          </ThemedText>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statBox, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="users" size={24} color={BrandColors.primary} />
          <ThemedText type="h3" style={{ marginTop: Spacing.sm }}>
            {instructor.clientCount}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Clientes
          </ThemedText>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="clipboard" size={24} color="#10B981" />
          <ThemedText type="h3" style={{ marginTop: Spacing.sm }}>
            {instructor.activeRoutines}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Rotinas Ativas
          </ThemedText>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="calendar" size={24} color="#F59E0B" />
          <ThemedText type="h3" style={{ marginTop: Spacing.sm }}>
            {instructor.classesPerWeek}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Aulas/Semana
          </ThemedText>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="star" size={24} color="#F59E0B" />
          <ThemedText type="h3" style={{ marginTop: Spacing.sm }}>
            {instructor.performanceRating.toFixed(1)}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Avaliação
          </ThemedText>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Informações
        </ThemedText>
        <View style={styles.infoRow}>
          <Feather name="calendar" size={20} color={theme.textSecondary} />
          <View style={styles.infoContent}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Contratado em
            </ThemedText>
            <ThemedText type="body" style={{ fontWeight: '600' }}>
              {new Date(instructor.hireDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </ThemedText>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="briefcase" size={20} color={theme.textSecondary} />
          <View style={styles.infoContent}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Função
            </ThemedText>
            <ThemedText type="body" style={{ fontWeight: '600', textTransform: 'capitalize' }}>
              {instructor.role}
            </ThemedText>
          </View>
        </View>
      </View>

      {instructor.specializations && instructor.specializations.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
            Especializações
          </ThemedText>
          <View style={styles.specializations}>
            {instructor.specializations.map((spec: string, index: number) => (
              <View key={index} style={[styles.specBadge, { backgroundColor: BrandColors.primary + '20' }]}>
                <ThemedText type="small" style={{ color: BrandColors.primary, fontWeight: '600' }}>
                  {spec}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      )}

      <Pressable
        style={[styles.editButton, { backgroundColor: BrandColors.primary, marginHorizontal: Spacing.lg, marginBottom: Spacing.lg }]}
        onPress={() => navigation.navigate("EditInstructor", { instructorId: instructor.id })}
      >
        <Feather name="edit" size={20} color="#000000" />
        <ThemedText type="body" style={{ color: "#000000", fontWeight: '700' }}>
          Editar Instrutor
        </ThemedText>
      </Pressable>
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
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    minWidth: "47%",
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    alignItems: "center",
  },
  section: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.lg,
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
  specializations: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  specBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
});

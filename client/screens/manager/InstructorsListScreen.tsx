import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockStaff } from "@/data/mockData";
import type { ManagerStaffStackParamList } from "@/navigation/ManagerStaffStackNavigator";

type NavigationProp = NativeStackNavigationProp<ManagerStaffStackParamList>;

export default function InstructorsListScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = mockStaff.filter((staff) =>
    staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStaffCard = ({ item }: any) => (
    <Pressable
      style={[styles.staffCard, { backgroundColor: theme.backgroundDefault }]}
      onPress={() => navigation.navigate("InstructorDetail", { instructorId: item.id })}
    >
      <View style={styles.staffHeader}>
        <View style={[styles.avatar, { backgroundColor: theme.backgroundSecondary }]}>
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              style={styles.avatarImage}
            />
          ) : (
            <ThemedText type="h3" style={{ color: BrandColors.primary }}>
              {item.fullName.charAt(0)}
            </ThemedText>
          )}
        </View>
        <View style={styles.staffInfo}>
          <ThemedText type="body" style={{ fontWeight: '600' }}>
            {item.fullName}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {item.email}
          </ThemedText>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === "active" ? "#10B98120" : "#6B728020" }]}>
          <View style={[styles.statusDot, { backgroundColor: item.status === "active" ? "#10B981" : "#6B7280" }]} />
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Feather name="users" size={16} color={theme.textSecondary} />
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {item.clientCount} clientes
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <Feather name="clipboard" size={16} color={theme.textSecondary} />
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {item.activeRoutines} rotinas
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <Feather name="calendar" size={16} color={theme.textSecondary} />
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {item.classesPerWeek}/sem
          </ThemedText>
        </View>
      </View>
      <View style={styles.ratingRow}>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Feather
              key={i}
              name={i < Math.floor(item.performanceRating) ? "star" : "star"}
              size={14}
              color={i < Math.floor(item.performanceRating) ? "#F59E0B" : theme.textSecondary}
              style={{ opacity: i < Math.floor(item.performanceRating) ? 1 : 0.3 }}
            />
          ))}
        </View>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {item.performanceRating.toFixed(1)} / 5.0
        </ThemedText>
      </View>
      {item.specializations && item.specializations.length > 0 && (
        <View style={styles.specializations}>
          {item.specializations.slice(0, 3).map((spec: string, index: number) => (
            <View key={index} style={[styles.specBadge, { backgroundColor: theme.backgroundSecondary }]}>
              <ThemedText type="small" style={{ fontSize: 10, color: theme.textSecondary }}>
                {spec}
              </ThemedText>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.backgroundDefault, marginTop: headerHeight + Spacing.md },
        ]}
      >
        <Feather name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Procurar instrutores..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery("")}>
            <Feather name="x" size={20} color={theme.textSecondary} />
          </Pressable>
        )}
      </View>

      <Pressable
        style={[styles.addButton, { backgroundColor: BrandColors.primary, marginHorizontal: Spacing.lg, marginBottom: Spacing.md }]}
        onPress={() => navigation.navigate("AddInstructor")}
      >
        <Feather name="plus" size={20} color="#000000" />
        <ThemedText type="body" style={{ color: "#000000", fontWeight: '700' }}>
          Adicionar Novo Instrutor
        </ThemedText>
      </Pressable>

      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.md,
          paddingBottom: tabBarHeight + Spacing.xl,
        }}
        renderItem={renderStaffCard}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="briefcase" size={48} color={theme.textSecondary} />
            <ThemedText
              type="body"
              style={{ color: theme.textSecondary, marginTop: Spacing.md }}
            >
              {searchQuery ? "Nenhum instrutor encontrado" : "Sem instrutores"}
            </ThemedText>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  staffCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.md,
  },
  staffHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
    overflow: "hidden",
  },
  avatarImage: {
    width: 48,
    height: 48,
  },
  staffInfo: {
    flex: 1,
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  specializations: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  specBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xl * 2,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
});

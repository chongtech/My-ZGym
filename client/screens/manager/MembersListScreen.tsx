import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockMembers } from "@/data/mockData";
import type { ManagerMembersStackParamList } from "@/navigation/ManagerMembersStackNavigator";

type NavigationProp = NativeStackNavigationProp<ManagerMembersStackParamList>;

export default function MembersListScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState<"all" | "z-total" | "z-junior" | "z-weekend" | "z-senior">("all");

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch = member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === "all" || member.membershipTier === filterTier;
    return matchesSearch && matchesTier;
  });

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

  const renderMemberCard = ({ item }: any) => (
    <Pressable
      style={[styles.memberCard, { backgroundColor: theme.backgroundDefault }]}
      onPress={() => navigation.navigate("MemberDetail", { memberId: item.id })}
    >
      <View style={styles.memberHeader}>
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
        <View style={styles.memberInfo}>
          <ThemedText type="body" style={{ fontWeight: '600' }}>
            {item.fullName}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {item.email}
          </ThemedText>
        </View>
      </View>
      <View style={styles.memberMeta}>
        <View style={[styles.tierBadge, { backgroundColor: getTierColor(item.membershipTier) + '20' }]}>
          <ThemedText type="small" style={{ fontSize: 10, color: getTierColor(item.membershipTier), fontWeight: '600' }}>
            {getTierName(item.membershipTier)}
          </ThemedText>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <ThemedText type="small" style={{ fontSize: 10, color: getStatusColor(item.status), fontWeight: '600' }}>
            {item.status}
          </ThemedText>
        </View>
      </View>
      <View style={styles.memberStats}>
        <View style={styles.stat}>
          <ThemedText type="small" style={{ fontSize: 10, color: theme.textSecondary }}>
            Membro desde
          </ThemedText>
          <ThemedText type="small" style={{ fontWeight: '600' }}>
            {new Date(item.memberSince).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="small" style={{ fontSize: 10, color: theme.textSecondary }}>
            Check-ins
          </ThemedText>
          <ThemedText type="small" style={{ fontWeight: '600' }}>
            {item.checkInCount}
          </ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="small" style={{ fontSize: 10, color: theme.textSecondary }}>
            Frequência
          </ThemedText>
          <ThemedText type="small" style={{ fontWeight: '600' }}>
            {item.complianceRate}%
          </ThemedText>
        </View>
      </View>
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
          placeholder="Procurar membros..."
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

      <View style={styles.filterContainer}>
        {(["all", "z-total", "z-junior", "z-weekend", "z-senior"] as const).map((tier) => (
          <Pressable
            key={tier}
            style={[
              styles.filterChip,
              {
                backgroundColor: filterTier === tier ? BrandColors.primary : theme.backgroundDefault,
              },
            ]}
            onPress={() => setFilterTier(tier as any)}
          >
            <ThemedText
              type="small"
              style={{
                color: filterTier === tier ? "#000000" : theme.text,
                fontWeight: '600',
              }}
            >
              {tier === "all" ? "Todos" : getTierName(tier)}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.md,
          paddingBottom: tabBarHeight + Spacing.xl,
        }}
        renderItem={renderMemberCard}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="users" size={48} color={theme.textSecondary} />
            <ThemedText
              type="body"
              style={{ color: theme.textSecondary, marginTop: Spacing.md }}
            >
              {searchQuery ? "Nenhum membro encontrado" : "Sem membros"}
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
  filterContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  memberCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.md,
  },
  memberHeader: {
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
  memberInfo: {
    flex: 1,
  },
  memberMeta: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tierBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  memberStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xl * 2,
  },
});

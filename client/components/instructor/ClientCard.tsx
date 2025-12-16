import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { InstructorClient } from "@/data/mockData";

interface ClientCardProps {
  client: InstructorClient;
  onPress: () => void;
}

export function ClientCard({ client, onPress }: ClientCardProps) {
  const { theme } = useTheme();

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

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.backgroundDefault }]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          <Feather name="user" size={24} color={theme.textSecondary} />
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <ThemedText type="h4" style={styles.name}>
              {client.fullName}
            </ThemedText>
            <View
              style={[styles.tierBadge, { backgroundColor: tierColor + "20" }]}
            >
              <ThemedText
                type="small"
                style={[styles.tierText, { color: tierColor }]}
              >
                {client.membershipTier.toUpperCase()}
              </ThemedText>
            </View>
          </View>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {client.email}
          </ThemedText>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Programa Atual
          </ThemedText>
          <ThemedText type="body" numberOfLines={1}>
            {client.currentProgram || "Sem programa"}
          </ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Última Atividade
          </ThemedText>
          <ThemedText type="body">
            {client.lastWorkout
              ? new Date(client.lastWorkout).toLocaleDateString("pt-PT")
              : "N/A"}
          </ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Taxa de Adesão
          </ThemedText>
          <ThemedText type="body" style={{ color: complianceColor }}>
            {client.complianceRate}%
          </ThemedText>
        </View>
      </View>

      <View style={styles.footer}>
        <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius["2xl"],
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  name: {
    marginRight: Spacing.sm,
  },
  tierBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  tierText: {
    fontSize: 10,
    fontWeight: "600",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  statItem: {
    flex: 1,
  },
  footer: {
    alignItems: "flex-end",
    marginTop: Spacing.md,
  },
});

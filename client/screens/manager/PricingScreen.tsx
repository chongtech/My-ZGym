import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { SUBSCRIPTION_TYPES } from "@/data/mockData";
import { mockMembers } from "@/data/mockData";

export default function PricingScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const handleEditPrice = (tierName: string) => {
    Alert.alert(
      "Editar Preço",
      `Funcionalidade de edição de preço para ${tierName} será implementada em breve.`,
      [{ text: "OK" }]
    );
  };

  const getMemberCountByTier = (tierType: string) => {
    return mockMembers.filter(m => m.membershipTier === tierType && m.status === 'active').length;
  };

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
      <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
        Planos de Adesão
      </ThemedText>

      {SUBSCRIPTION_TYPES.map((tier) => (
        <View
          key={tier.tier}
          style={[
            styles.tierCard,
            { backgroundColor: theme.backgroundDefault, borderColor: tier.color },
          ]}
        >
          <View style={styles.tierHeader}>
            <View style={[styles.tierBadge, { backgroundColor: tier.color + '20' }]}>
              <Feather name="award" size={24} color={tier.color} />
            </View>
            <View style={{ flex: 1, marginLeft: Spacing.md }}>
              <ThemedText type="h3" style={{ color: tier.color }}>
                {tier.name}
              </ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                Plano {tier.name}
              </ThemedText>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={() => handleEditPrice(tier.name)}
            >
              <Feather name="edit-2" size={18} color={theme.text} />
            </Pressable>
          </View>

          <View style={styles.pricingRow}>
            <View style={styles.priceBox}>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                Mensal
              </ThemedText>
              <ThemedText type="h3" style={{ color: tier.color }}>
                €{tier.monthlyPrice.toFixed(2)}
              </ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                /mês
              </ThemedText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.featuresSection}>
            <ThemedText type="body" style={{ fontWeight: '600', marginBottom: Spacing.sm }}>
              Funcionalidades Incluídas:
            </ThemedText>
            {tier.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Feather name="check" size={16} color={tier.color} />
                <ThemedText type="small" style={{ marginLeft: Spacing.sm, flex: 1 }}>
                  {feature}
                </ThemedText>
              </View>
            ))}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText type="h4" style={{ color: tier.color }}>
                {getMemberCountByTier(tier.tier)}
              </ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                Membros ativos
              </ThemedText>
            </View>
          </View>
        </View>
      ))}

      <View style={[styles.infoCard, { backgroundColor: theme.backgroundDefault }]}>
        <Feather name="info" size={24} color={BrandColors.primary} />
        <View style={{ flex: 1, marginLeft: Spacing.md }}>
          <ThemedText type="body" style={{ fontWeight: '600' }}>
            Dica de Gestão
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: 4 }}>
            Os planos especializados por faixa etária e horário permitem melhor gestão da capacidade do ginásio e atraem públicos específicos.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tierCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.lg,
    borderWidth: 2,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  tierBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    padding: Spacing.sm,
  },
  pricingRow: {
    marginBottom: Spacing.md,
  },
  priceBox: {
    padding: Spacing.md,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginVertical: Spacing.md,
  },
  featuresSection: {
    marginBottom: Spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.lg,
  },
});

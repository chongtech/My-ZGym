import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockMembers } from "@/data/mockData";
import type { ManagerMembersStackParamList } from "@/navigation/ManagerMembersStackNavigator";

type MemberEditRouteProp = RouteProp<ManagerMembersStackParamList, "MemberEdit">;

export default function MemberEditScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const route = useRoute<MemberEditRouteProp>();
  const navigation = useNavigation();

  const member = mockMembers.find((m) => m.id === route.params.memberId);

  const [fullName, setFullName] = useState(member?.fullName || "");
  const [email, setEmail] = useState(member?.email || "");
  const [phone, setPhone] = useState(member?.phone || "");
  const [membershipTier, setMembershipTier] = useState<"z-total" | "z-junior" | "z-weekend" | "z-senior">(
    member?.membershipTier || "z-total"
  );
  const [status, setStatus] = useState<"active" | "inactive" | "suspended">(
    member?.status === "pending" ? "active" : (member?.status || "active")
  );
  const [notes, setNotes] = useState(member?.notes || "");

  if (!member) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Membro não encontrado</ThemedText>
      </View>
    );
  }

  const handleSave = () => {
    Alert.alert(
      "Sucesso",
      "As informações do membro foram atualizadas com sucesso!",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

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
      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Informações Pessoais
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Nome Completo
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nome completo"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            E-mail
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Telefone
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Telefone"
            placeholderTextColor={theme.textSecondary}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Plano de Adesão
        </ThemedText>
        <View style={styles.tierGrid}>
          {(["z-total", "z-junior", "z-weekend", "z-senior"] as const).map((tier) => (
            <Pressable
              key={tier}
              style={[
                styles.tierButton,
                {
                  backgroundColor: membershipTier === tier
                    ? getTierColor(tier) + "30"
                    : theme.backgroundRoot,
                  borderWidth: 2,
                  borderColor: membershipTier === tier ? getTierColor(tier) : "transparent",
                },
              ]}
              onPress={() => setMembershipTier(tier)}
            >
              <ThemedText
                type="body"
                style={{
                  color: membershipTier === tier ? getTierColor(tier) : theme.text,
                  fontWeight: membershipTier === tier ? '700' : '500',
                  textAlign: 'center',
                }}
              >
                {getTierName(tier)}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Status da Conta
        </ThemedText>
        <View style={styles.optionsRow}>
          {(["active", "inactive", "suspended"] as const).map((statusOption) => (
            <Pressable
              key={statusOption}
              style={[
                styles.optionButton,
                {
                  backgroundColor: status === statusOption
                    ? getStatusColor(statusOption) + "30"
                    : theme.backgroundRoot,
                  borderWidth: 2,
                  borderColor: status === statusOption ? getStatusColor(statusOption) : "transparent",
                },
              ]}
              onPress={() => setStatus(statusOption)}
            >
              <ThemedText
                type="body"
                style={{
                  color: status === statusOption ? getStatusColor(statusOption) : theme.text,
                  fontWeight: status === statusOption ? '700' : '500',
                  textTransform: 'capitalize',
                }}
              >
                {statusOption}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Notas
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            { backgroundColor: theme.backgroundRoot, color: theme.text },
          ]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Adicionar notas sobre o membro..."
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.actionsSection}>
        <Pressable
          style={[styles.saveButton, { backgroundColor: BrandColors.primary }]}
          onPress={handleSave}
        >
          <Feather name="check" size={20} color="#000000" />
          <ThemedText type="body" style={{ color: "#000000", fontWeight: '600' }}>
            Salvar Alterações
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.cancelButton, { backgroundColor: theme.backgroundDefault }]}
          onPress={() => navigation.goBack()}
        >
          <ThemedText type="body" style={{ fontWeight: '600' }}>
            Cancelar
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
  section: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  input: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    fontSize: 16,
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  textArea: {
    minHeight: 100,
    paddingTop: Spacing.md,
  },
  optionsRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  optionButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  tierGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  tierButton: {
    width: "48%",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  actionsSection: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
});

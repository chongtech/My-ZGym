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
import { mockStaff } from "@/data/mockData";
import type { ManagerStaffStackParamList } from "@/navigation/ManagerStaffStackNavigator";

type EditInstructorRouteProp = RouteProp<ManagerStaffStackParamList, "EditInstructor">;

const availableSpecializations = [
  "HIIT", "Força", "Funcional", "Yoga", "Pilates", "Musculação",
  "CrossFit", "Boxe", "Kickboxing", "Cardio", "Cycling", "Zumba"
];

export default function EditInstructorScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const route = useRoute<EditInstructorRouteProp>();
  const navigation = useNavigation();

  const instructor = mockStaff.find((s) => s.id === route.params.instructorId);

  const [fullName, setFullName] = useState(instructor?.fullName || "");
  const [email, setEmail] = useState(instructor?.email || "");
  const [phone, setPhone] = useState(instructor?.phone || "");
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(
    instructor?.specializations || []
  );
  const [status, setStatus] = useState<"active" | "inactive" | "on-leave">(
    instructor?.status || "active"
  );

  if (!instructor) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Instrutor não encontrado</ThemedText>
      </View>
    );
  }

  const toggleSpecialization = (spec: string) => {
    if (selectedSpecializations.includes(spec)) {
      setSelectedSpecializations(selectedSpecializations.filter(s => s !== spec));
    } else {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
  };

  const handleSave = () => {
    Alert.alert(
      "Sucesso",
      "As informações do instrutor foram atualizadas com sucesso!",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#10B981";
      case "inactive": return "#6B7280";
      case "on-leave": return "#F59E0B";
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
          Status
        </ThemedText>
        <View style={styles.optionsRow}>
          {(["active", "inactive", "on-leave"] as const).map((statusOption) => (
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
                {statusOption === "on-leave" ? "De Férias" : statusOption === "active" ? "Ativo" : "Inativo"}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Especializações
        </ThemedText>

        <View style={styles.specializationsGrid}>
          {availableSpecializations.map((spec) => {
            const isSelected = selectedSpecializations.includes(spec);
            return (
              <Pressable
                key={spec}
                style={[
                  styles.specChip,
                  {
                    backgroundColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                    borderWidth: 2,
                    borderColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                  },
                ]}
                onPress={() => toggleSpecialization(spec)}
              >
                <ThemedText
                  type="small"
                  style={{
                    color: isSelected ? "#000000" : theme.text,
                    fontWeight: isSelected ? '700' : '500',
                  }}
                >
                  {spec}
                </ThemedText>
                {isSelected && (
                  <Feather name="check" size={16} color="#000000" style={{ marginLeft: 4 }} />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Pressable
          style={[styles.saveButton, { backgroundColor: BrandColors.primary }]}
          onPress={handleSave}
        >
          <Feather name="check" size={20} color="#000000" />
          <ThemedText type="body" style={{ color: "#000000", fontWeight: '700' }}>
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
  specializationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  actionsSection: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
});

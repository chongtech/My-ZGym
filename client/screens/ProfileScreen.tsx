import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Switch, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";

interface SettingItemProps {
  icon: string;
  label: string;
  value?: string;
  showChevron?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
  danger?: boolean;
}

function SettingItem({
  icon,
  label,
  value,
  showChevron = true,
  showSwitch = false,
  switchValue,
  onSwitchChange,
  onPress,
  danger = false,
}: SettingItemProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.settingItem,
        { opacity: pressed && !showSwitch ? 0.7 : 1 },
      ]}
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={[styles.settingIcon, { backgroundColor: danger ? `${BrandColors.error}15` : `${BrandColors.primary}15` }]}>
        <Feather
          name={icon as any}
          size={18}
          color={danger ? BrandColors.error : BrandColors.primary}
        />
      </View>
      <View style={styles.settingContent}>
        <ThemedText type="body" style={[danger && { color: BrandColors.error }]}>
          {label}
        </ThemedText>
        {value ? (
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {value}
          </ThemedText>
        ) : null}
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: theme.backgroundSecondary, true: BrandColors.primary }}
          thumbColor="#FFFFFF"
        />
      ) : showChevron ? (
        <Feather name="chevron-right" size={18} color={theme.textSecondary} />
      ) : null}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Terminar Sessão",
      "Tens a certeza que queres terminar sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Terminar",
          style: "destructive",
          onPress: () => logout(),
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar Conta",
      "Tens a certeza que queres eliminar a tua conta? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Confirmar Eliminação",
              "Isto irá eliminar permanentemente todos os teus dados. Tens a certeza absoluta?",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Sim, Eliminar",
                  style: "destructive",
                  onPress: () => logout(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const formatMemberSince = (date: string) => {
    return new Date(date).toLocaleDateString("pt-PT", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.lg,
        paddingBottom: tabBarHeight + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileHeader}>
        <View style={[styles.avatar, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="user" size={40} color={theme.textSecondary} />
        </View>
        <View style={styles.profileInfo}>
          <ThemedText type="h2">{user?.fullName || "Membro"}</ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            Membro desde {user?.memberSince ? formatMemberSince(user.memberSince) : "N/A"}
          </ThemedText>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            { backgroundColor: theme.backgroundDefault, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Feather name="edit-2" size={18} color={BrandColors.primary} />
        </Pressable>
      </View>

      <Card style={styles.section} elevation={1}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Informação Pessoal
        </ThemedText>
        <SettingItem
          icon="mail"
          label="Email"
          value={user?.email || "Não definido"}
          showChevron={false}
        />
        <SettingItem
          icon="phone"
          label="Telefone"
          value={user?.phone || "Não definido"}
        />
        <SettingItem
          icon="alert-circle"
          label="Contacto de Emergência"
          value={user?.emergencyContactName || "Não definido"}
        />
      </Card>

      <Card style={styles.section} elevation={1}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Preferências
        </ThemedText>
        <SettingItem
          icon="bell"
          label="Notificações"
          showSwitch
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />
        <SettingItem icon="moon" label="Tema" value="Sistema" />
        <SettingItem icon="globe" label="Idioma" value="Português" />
      </Card>

      <Card style={styles.section} elevation={1}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Subscrição
        </ThemedText>
        <SettingItem
          icon="credit-card"
          label="Plano Atual"
          value={`Subscrição ${(user?.membershipTier || "bronze").charAt(0).toUpperCase() + (user?.membershipTier || "bronze").slice(1)}`}
        />
        <SettingItem icon="calendar" label="Data de Renovação" value={user?.membershipExpiry || "N/A"} />
        <SettingItem icon="arrow-up-circle" label="Atualizar Plano" />
      </Card>

      <Card style={styles.section} elevation={1}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Conta
        </ThemedText>
        <SettingItem icon="lock" label="Alterar Palavra-passe" />
        <SettingItem icon="shield" label="Definições de Privacidade" />
        <SettingItem icon="help-circle" label="Ajuda e Suporte" />
        <SettingItem
          icon="log-out"
          label="Terminar Sessão"
          showChevron={false}
          onPress={handleLogout}
        />
        <SettingItem
          icon="trash-2"
          label="Eliminar Conta"
          showChevron={false}
          danger
          onPress={handleDeleteAccount}
        />
      </Card>

      <View style={styles.footer}>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          My-ZGym v1.0.0
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
    marginTop: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
});

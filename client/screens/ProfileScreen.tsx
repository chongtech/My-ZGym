import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Switch, Alert, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { ProfileStackParamList } from "@/navigation/ProfileStackNavigator";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockInstructorStats } from "@/data/mockData";

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

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme, themeMode, setThemeMode } = useTheme();
  const { user, logout } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const getThemeLabel = () => {
    switch (themeMode) {
      case "light":
        return "Claro";
      case "dark":
        return "Escuro";
      case "system":
        return "Sistema";
      default:
        return "Sistema";
    }
  };

  const handleThemeChange = async (mode: "light" | "dark" | "system") => {
    await setThemeMode(mode);
    setThemeModalVisible(false);
  };

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

      {user?.role === 'instructor' && (
        <>
          <Card style={styles.section} elevation={1}>
            <ThemedText type="h4" style={styles.sectionTitle}>
              Informação Profissional
            </ThemedText>
            <SettingItem
              icon="briefcase"
              label="Biografia"
              value="Editar"
            />
            <SettingItem
              icon="award"
              label="Certificações"
              value="3 certificados"
            />
            <SettingItem
              icon="target"
              label="Especializações"
              value="Força, Hipertrofia"
            />
          </Card>

          <Card style={styles.section} elevation={1}>
            <ThemedText type="h4" style={styles.sectionTitle}>
              Estatísticas do Instrutor
            </ThemedText>
            <SettingItem
              icon="users"
              label="Total de Clientes"
              value={`${mockInstructorStats.totalClients}`}
              showChevron={false}
            />
            <SettingItem
              icon="clipboard"
              label="Rotinas Ativas"
              value={`${mockInstructorStats.activeRoutines}`}
              showChevron={false}
            />
            <SettingItem
              icon="calendar"
              label="Sessões esta Semana"
              value={`${mockInstructorStats.sessionsThisWeek}`}
              showChevron={false}
            />
            <SettingItem
              icon="activity"
              label="Sessões Completadas"
              value={`${mockInstructorStats.totalSessionsCompleted}`}
              showChevron={false}
            />
            <SettingItem
              icon="star"
              label="Satisfação Média"
              value={`${mockInstructorStats.averageClientSatisfaction}/5.0`}
              showChevron={false}
            />
          </Card>
        </>
      )}

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
        <SettingItem
          icon="moon"
          label="Tema"
          value={getThemeLabel()}
          onPress={() => setThemeModalVisible(true)}
        />
        <SettingItem icon="globe" label="Idioma" value="Português" />
      </Card>

      {user?.role !== 'manager' && user?.role !== 'instructor' && (
        <Card style={styles.section} elevation={1}>
          <ThemedText type="h4" style={styles.sectionTitle}>
            Subscrição
          </ThemedText>
          <SettingItem
            icon="credit-card"
            label="Plano Atual"
            value={`Subscrição ${(user?.membershipTier || "bronze").charAt(0).toUpperCase() + (user?.membershipTier || "bronze").slice(1)}`}
            showChevron={false}
          />
          <SettingItem
            icon="calendar"
            label="Data de Renovação"
            value={user?.membershipExpiry ? new Date(user.membershipExpiry).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' }) : "N/A"}
            showChevron={false}
          />
          <SettingItem
            icon="arrow-up-circle"
            label="Gerir Plano"
            onPress={() => navigation.navigate('MembershipManagement')}
          />
        </Card>
      )}

      <Card style={styles.section} elevation={1}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Conta
        </ThemedText>
        <SettingItem icon="lock" label="Alterar Palavra-passe" />
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

      <Modal
        visible={themeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setThemeModalVisible(false)}
        >
          <Pressable style={[styles.modalContent, { backgroundColor: theme.backgroundDefault }]}>
            <View style={styles.modalHeader}>
              <ThemedText type="h3">Escolher Tema</ThemedText>
              <Pressable
                onPress={() => setThemeModalVisible(false)}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              >
                <Feather name="x" size={24} color={theme.text} />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.themeOption,
                { opacity: pressed ? 0.7 : 1 },
                themeMode === "light" && { backgroundColor: `${BrandColors.primary}15` },
              ]}
              onPress={() => handleThemeChange("light")}
            >
              <View style={styles.themeOptionContent}>
                <View style={[styles.themeIcon, { backgroundColor: `${BrandColors.primary}20` }]}>
                  <Feather name="sun" size={20} color={BrandColors.primary} />
                </View>
                <View style={styles.themeOptionText}>
                  <ThemedText type="h4">Claro</ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    Tema sempre claro
                  </ThemedText>
                </View>
              </View>
              {themeMode === "light" && (
                <Feather name="check" size={20} color={BrandColors.primary} />
              )}
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.themeOption,
                { opacity: pressed ? 0.7 : 1 },
                themeMode === "dark" && { backgroundColor: `${BrandColors.primary}15` },
              ]}
              onPress={() => handleThemeChange("dark")}
            >
              <View style={styles.themeOptionContent}>
                <View style={[styles.themeIcon, { backgroundColor: `${BrandColors.primary}20` }]}>
                  <Feather name="moon" size={20} color={BrandColors.primary} />
                </View>
                <View style={styles.themeOptionText}>
                  <ThemedText type="h4">Escuro</ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    Tema sempre escuro
                  </ThemedText>
                </View>
              </View>
              {themeMode === "dark" && (
                <Feather name="check" size={20} color={BrandColors.primary} />
              )}
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.themeOption,
                { opacity: pressed ? 0.7 : 1 },
                themeMode === "system" && { backgroundColor: `${BrandColors.primary}15` },
              ]}
              onPress={() => handleThemeChange("system")}
            >
              <View style={styles.themeOptionContent}>
                <View style={[styles.themeIcon, { backgroundColor: `${BrandColors.primary}20` }]}>
                  <Feather name="smartphone" size={20} color={BrandColors.primary} />
                </View>
                <View style={styles.themeOptionText}>
                  <ThemedText type="h4">Sistema</ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    Segue as configurações do dispositivo
                  </ThemedText>
                </View>
              </View>
              {themeMode === "system" && (
                <Feather name="check" size={20} color={BrandColors.primary} />
              )}
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    padding: Spacing.xl,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  themeOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  themeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  themeOptionText: {
    flex: 1,
  },
});

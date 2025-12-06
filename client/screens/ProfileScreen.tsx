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
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => logout(),
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Confirm Deletion",
              "This will permanently delete all your data. Are you absolutely sure?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Yes, Delete",
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
    return new Date(date).toLocaleDateString("en-US", {
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
          <ThemedText type="h2">{user?.fullName || "Member"}</ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            Member since {user?.memberSince ? formatMemberSince(user.memberSince) : "N/A"}
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
          Personal Information
        </ThemedText>
        <SettingItem
          icon="mail"
          label="Email"
          value={user?.email || "Not set"}
          showChevron={false}
        />
        <SettingItem
          icon="phone"
          label="Phone"
          value={user?.phone || "Not set"}
        />
        <SettingItem
          icon="alert-circle"
          label="Emergency Contact"
          value={user?.emergencyContactName || "Not set"}
        />
      </Card>

      <Card style={styles.section} elevation={1}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Preferences
        </ThemedText>
        <SettingItem
          icon="bell"
          label="Notifications"
          showSwitch
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />
        <SettingItem icon="moon" label="Theme" value="System" />
        <SettingItem icon="globe" label="Language" value="English" />
      </Card>

      <Card style={styles.section} elevation={1}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Membership
        </ThemedText>
        <SettingItem
          icon="credit-card"
          label="Current Plan"
          value={`${(user?.membershipTier || "bronze").charAt(0).toUpperCase() + (user?.membershipTier || "bronze").slice(1)} Membership`}
        />
        <SettingItem icon="calendar" label="Renewal Date" value={user?.membershipExpiry || "N/A"} />
        <SettingItem icon="arrow-up-circle" label="Upgrade Plan" />
      </Card>

      <Card style={styles.section} elevation={1}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Account
        </ThemedText>
        <SettingItem icon="lock" label="Change Password" />
        <SettingItem icon="shield" label="Privacy Settings" />
        <SettingItem icon="help-circle" label="Help & Support" />
        <SettingItem
          icon="log-out"
          label="Log Out"
          showChevron={false}
          onPress={handleLogout}
        />
        <SettingItem
          icon="trash-2"
          label="Delete Account"
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

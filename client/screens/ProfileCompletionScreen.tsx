import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

const fitnessGoals = [
  "Lose Weight",
  "Build Muscle",
  "Improve Endurance",
  "Flexibility",
  "General Fitness",
  "Stress Relief",
];

export default function ProfileCompletionScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { completeProfile } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const isFormValid = fullName.trim() && phone.trim() && emergencyContactName.trim() && emergencyContactPhone.trim();

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await completeProfile({
        fullName: fullName.trim(),
        phone: phone.trim(),
        emergencyContactName: emergencyContactName.trim(),
        emergencyContactPhone: emergencyContactPhone.trim(),
      });
    } catch (err) {
      setError("Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
        <ThemedText type="h2" style={styles.headerTitle}>
          Complete Your Profile
        </ThemedText>
        <ThemedText type="body" style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          We need a few more details to get you started
        </ThemedText>
      </View>

      <KeyboardAwareScrollViewCompat
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          <View style={[styles.avatarPlaceholder, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="camera" size={32} color={theme.textSecondary} />
          </View>
          <Pressable style={styles.avatarButton}>
            <ThemedText type="link" style={{ color: BrandColors.primary }}>
              Add Photo
            </ThemedText>
          </Pressable>
        </View>

        {error ? (
          <View style={[styles.errorContainer, { backgroundColor: `${BrandColors.error}15` }]}>
            <Feather name="alert-circle" size={18} color={BrandColors.error} />
            <ThemedText type="small" style={[styles.errorText, { color: BrandColors.error }]}>
              {error}
            </ThemedText>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <ThemedText type="small" style={styles.label}>
              Full Name <ThemedText style={{ color: BrandColors.error }}>*</ThemedText>
            </ThemedText>
            <View style={[styles.inputWrapper, { borderColor: theme.border }]}>
              <Feather name="user" size={18} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Enter your full name"
                placeholderTextColor={theme.textSecondary}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText type="small" style={styles.label}>
              Phone Number <ThemedText style={{ color: BrandColors.error }}>*</ThemedText>
            </ThemedText>
            <View style={[styles.inputWrapper, { borderColor: theme.border }]}>
              <Feather name="phone" size={18} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Enter your phone number"
                placeholderTextColor={theme.textSecondary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Feather name="alert-triangle" size={16} color={BrandColors.warning} />
            <ThemedText type="h4" style={styles.sectionTitle}>
              Emergency Contact
            </ThemedText>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText type="small" style={styles.label}>
              Contact Name <ThemedText style={{ color: BrandColors.error }}>*</ThemedText>
            </ThemedText>
            <View style={[styles.inputWrapper, { borderColor: theme.border }]}>
              <Feather name="user" size={18} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Emergency contact name"
                placeholderTextColor={theme.textSecondary}
                value={emergencyContactName}
                onChangeText={setEmergencyContactName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText type="small" style={styles.label}>
              Contact Phone <ThemedText style={{ color: BrandColors.error }}>*</ThemedText>
            </ThemedText>
            <View style={[styles.inputWrapper, { borderColor: theme.border }]}>
              <Feather name="phone" size={18} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Emergency contact phone"
                placeholderTextColor={theme.textSecondary}
                value={emergencyContactPhone}
                onChangeText={setEmergencyContactPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Feather name="target" size={16} color={BrandColors.accent} />
            <ThemedText type="h4" style={styles.sectionTitle}>
              Fitness Goals (Optional)
            </ThemedText>
          </View>

          <View style={styles.goalsContainer}>
            {fitnessGoals.map((goal) => (
              <Pressable
                key={goal}
                style={[
                  styles.goalChip,
                  {
                    backgroundColor: selectedGoals.includes(goal)
                      ? BrandColors.primary
                      : theme.backgroundDefault,
                    borderColor: selectedGoals.includes(goal)
                      ? BrandColors.primary
                      : theme.border,
                  },
                ]}
                onPress={() => toggleGoal(goal)}
              >
                <ThemedText
                  type="small"
                  style={{
                    color: selectedGoals.includes(goal) ? "#FFFFFF" : theme.text,
                    fontWeight: "500",
                  }}
                >
                  {goal}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        <Button
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
          style={[styles.submitButton, { backgroundColor: BrandColors.primary }]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            "Complete Profile"
          )}
        </Button>
      </KeyboardAwareScrollViewCompat>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {},
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  avatarButton: {
    padding: Spacing.xs,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  errorText: {
    flex: 1,
  },
  form: {
    gap: Spacing.lg,
  },
  inputContainer: {
    gap: Spacing.xs,
  },
  label: {
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  sectionTitle: {},
  goalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  goalChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  submitButton: {
    marginTop: Spacing["2xl"],
    borderRadius: BorderRadius.md,
  },
});

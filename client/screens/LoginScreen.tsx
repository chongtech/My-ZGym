import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";

type AuthMode = "login" | "signup";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { login } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setError(`${provider} login is not available in demo mode`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <KeyboardAwareScrollViewCompat
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + Spacing.xl,
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/zgym-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText type="h2" style={styles.appName}>
            My-ZGym
          </ThemedText>
          <ThemedText type="body" style={[styles.subtitle, { color: theme.textSecondary }]}>
            Your fitness journey starts here
          </ThemedText>
        </View>

        <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tab,
              mode === "login" && { backgroundColor: BrandColors.primary },
            ]}
            onPress={() => setMode("login")}
          >
            <ThemedText
              type="button"
              style={[
                styles.tabText,
                { color: mode === "login" ? "#FFFFFF" : theme.textSecondary },
              ]}
            >
              Login
            </ThemedText>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              mode === "signup" && { backgroundColor: BrandColors.primary },
            ]}
            onPress={() => setMode("signup")}
          >
            <ThemedText
              type="button"
              style={[
                styles.tabText,
                { color: mode === "signup" ? "#FFFFFF" : theme.textSecondary },
              ]}
            >
              Sign Up
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
              Email
            </ThemedText>
            <View style={[styles.inputWrapper, { borderColor: theme.border }]}>
              <Feather name="mail" size={18} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Enter your email"
                placeholderTextColor={theme.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText type="small" style={styles.label}>
              Password
            </ThemedText>
            <View style={[styles.inputWrapper, { borderColor: theme.border }]}>
              <Feather name="lock" size={18} color={theme.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={18}
                  color={theme.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          {mode === "signup" ? (
            <View style={styles.inputContainer}>
              <ThemedText type="small" style={styles.label}>
                Confirm Password
              </ThemedText>
              <View style={[styles.inputWrapper, { borderColor: theme.border }]}>
                <Feather name="lock" size={18} color={theme.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Confirm your password"
                  placeholderTextColor={theme.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                />
              </View>
            </View>
          ) : null}

          <Button onPress={handleSubmit} disabled={isLoading} style={styles.submitButton}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              mode === "login" ? "Login" : "Create Account"
            )}
          </Button>

          {mode === "login" ? (
            <Pressable style={styles.forgotPassword}>
              <ThemedText type="link" style={{ color: BrandColors.primary }}>
                Forgot Password?
              </ThemedText>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <ThemedText type="small" style={[styles.dividerText, { color: theme.textSecondary }]}>
            or continue with
          </ThemedText>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
        </View>

        <View style={styles.socialButtons}>
          <Pressable
            style={[styles.socialButton, { backgroundColor: "#000000" }]}
            onPress={() => handleSocialLogin("Apple")}
          >
            <Feather name="smartphone" size={20} color="#FFFFFF" />
            <ThemedText type="button" style={styles.socialButtonText}>
              Apple
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.socialButton, { backgroundColor: theme.backgroundDefault, borderColor: theme.border, borderWidth: 1 }]}
            onPress={() => handleSocialLogin("Google")}
          >
            <Feather name="mail" size={20} color={theme.text} />
            <ThemedText type="button" style={[styles.socialButtonText, { color: theme.text }]}>
              Google
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.demoInfo}>
          <ThemedText type="small" style={[styles.demoTitle, { color: theme.textSecondary }]}>
            Demo Accounts:
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            member@zgym.com / member123
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            new@zgym.com / new123 (incomplete profile)
          </ThemedText>
        </View>

        <View style={styles.footer}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            By continuing, you agree to our{" "}
          </ThemedText>
          <Pressable>
            <ThemedText type="link" style={{ color: BrandColors.primary, fontSize: 13 }}>
              Terms of Service
            </ThemedText>
          </Pressable>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {" "}and{" "}
          </ThemedText>
          <Pressable>
            <ThemedText type="link" style={{ color: BrandColors.primary, fontSize: 13 }}>
              Privacy Policy
            </ThemedText>
          </Pressable>
        </View>
      </KeyboardAwareScrollViewCompat>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  logo: {
    width: 140,
    height: 40,
    marginBottom: Spacing.lg,
  },
  appName: {
    marginBottom: Spacing.xs,
  },
  subtitle: {
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  tabText: {
    fontWeight: "600",
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
  eyeButton: {
    padding: Spacing.xs,
  },
  submitButton: {
    marginTop: Spacing.sm,
    backgroundColor: BrandColors.primary,
    borderRadius: BorderRadius.md,
  },
  forgotPassword: {
    alignSelf: "center",
    paddingVertical: Spacing.sm,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
  },
  socialButtons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  socialButtonText: {
    color: "#FFFFFF",
  },
  demoInfo: {
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: BorderRadius.md,
    alignItems: "center",
    gap: Spacing.xs,
  },
  demoTitle: {
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: Spacing.xl,
  },
});

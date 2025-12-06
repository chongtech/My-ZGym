import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const LIME_GREEN = "#BFFF00";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGoToRegister = () => {
    navigation.navigate("Register");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-50, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    translateY.value = withRepeat(
      withTiming(-40, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: 1.2 },
    ],
  }));

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Por favor preenche todos os campos");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setError(`Login com ${provider} em breve`);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundContainer, animatedBackgroundStyle]}>
        <ImageBackground
          source={require("../../assets/images/login-background.png")}
          style={styles.background}
          resizeMode="cover"
        />
      </Animated.View>
      <View style={styles.overlay} />
      
      <KeyboardAwareScrollViewCompat
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + Spacing.md,
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerContainer}>
          <ThemedText type="h1" style={styles.welcomeText}>
            Bem-vindo
          </ThemedText>
          <ThemedText type="body" style={styles.subtitle}>
            Entra para aceder ao teu plano de treino
          </ThemedText>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <ThemedText type="small" style={styles.errorText}>
              {error}
            </ThemedText>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={[
            styles.inputWrapper,
            emailFocused && { borderColor: LIME_GREEN, borderWidth: 2 }
          ]}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>

          <View style={[
            styles.inputWrapper,
            passwordFocused && { borderColor: LIME_GREEN, borderWidth: 2 }
          ]}>
            <TextInput
              style={styles.input}
              placeholder="Palavra-passe"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={passwordFocused ? LIME_GREEN : "rgba(255,255,255,0.5)"}
              />
            </Pressable>
          </View>

          <Pressable style={styles.forgotPassword}>
            <ThemedText type="small" style={styles.forgotPasswordText}>
              Esqueceste-te da palavra-passe?
            </ThemedText>
          </Pressable>

          <Pressable
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#000000" size="small" />
            ) : (
              <ThemedText type="button" style={styles.loginButtonText}>
                Entrar
              </ThemedText>
            )}
          </Pressable>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <ThemedText type="small" style={styles.dividerText}>
            OU CONTINUA COM
          </ThemedText>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtons}>
          <Pressable
            style={styles.socialButton}
            onPress={() => handleSocialLogin("Google")}
          >
            <ThemedText type="button" style={styles.socialButtonText}>
              G  Google
            </ThemedText>
          </Pressable>
          <Pressable
            style={styles.socialButton}
            onPress={() => handleSocialLogin("Apple")}
          >
            <Feather name="smartphone" size={18} color="#FFFFFF" />
            <ThemedText type="button" style={styles.socialButtonText}>
              Apple
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.registerContainer}>
          <ThemedText type="body" style={styles.registerText}>
            Não tens conta?{" "}
          </ThemedText>
          <Pressable onPress={handleGoToRegister}>
            <ThemedText type="body" style={styles.registerLink}>
              Registar
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.demoInfo}>
          <ThemedText type="small" style={styles.demoText}>
            Demo: member@zgym.com / member123
          </ThemedText>
        </View>
      </KeyboardAwareScrollViewCompat>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backgroundContainer: {
    position: "absolute",
    width: SCREEN_WIDTH + 100,
    height: SCREEN_HEIGHT + 80,
    top: -40,
    left: -50,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  headerContainer: {
    marginBottom: Spacing["2xl"],
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "800",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "rgba(231,76,60,0.2)",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  errorText: {
    color: "#FF6B6B",
    textAlign: "center",
  },
  form: {
    gap: Spacing.lg,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 28,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    height: "100%",
  },
  eyeButton: {
    padding: Spacing.xs,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -Spacing.sm,
  },
  forgotPasswordText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: LIME_GREEN,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "700",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing["2xl"],
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  dividerText: {
    color: "rgba(255,255,255,0.5)",
    marginHorizontal: Spacing.md,
    fontSize: 12,
    letterSpacing: 1,
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
    height: 52,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    gap: Spacing.sm,
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing["2xl"],
  },
  registerText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
  },
  registerLink: {
    color: LIME_GREEN,
    fontSize: 15,
    fontWeight: "600",
  },
  demoInfo: {
    marginTop: Spacing.xl,
    alignItems: "center",
  },
  demoText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
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
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

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

  const handleTakeSelfie = async () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Funcionalidade Nativa",
        "Usa o Expo Go no teu telemóvel para tirar uma selfie"
      );
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão Necessária",
        "Precisamos de acesso à câmara para tirar uma selfie"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelfieUri(result.assets[0].uri);
    }
  };

  const handleChooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão Necessária",
        "Precisamos de acesso à galeria para escolher uma foto"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelfieUri(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    setError("");

    if (!firstName || !lastName || !email || !phone || !password) {
      setError("Por favor preenche todos os campos obrigatórios");
      return;
    }

    if (password !== confirmPassword) {
      setError("As palavras-passe não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A palavra-passe deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        firstName,
        lastName,
        email,
        phone,
      });
      // No need to navigate manually; auth state change in RootStackNavigator will handle it
    } catch (err) {
      setError("Ocorreu um erro ao criar a conta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate("Login");
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
        <Pressable style={styles.backButton} onPress={handleGoToLogin}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerContainer}>
          <ThemedText type="h1" style={styles.welcomeText}>
            Criar Conta
          </ThemedText>
          <ThemedText type="body" style={styles.subtitle}>
            Junta-te à comunidade Z-Gym
          </ThemedText>
        </View>

        <Pressable style={styles.selfieContainer} onPress={handleTakeSelfie}>
          {selfieUri ? (
            <Image source={{ uri: selfieUri }} style={styles.selfieImage} />
          ) : (
            <View style={styles.selfiePlaceholder}>
              <Feather name="camera" size={32} color="rgba(255,255,255,0.5)" />
            </View>
          )}
          <View style={styles.selfieEditBadge}>
            <Feather name="edit-2" size={14} color="#000000" />
          </View>
        </Pressable>
        <View style={styles.selfieButtons}>
          <Pressable style={styles.selfieOptionButton} onPress={handleTakeSelfie}>
            <Feather name="camera" size={16} color={BrandColors.primary} />
            <ThemedText type="small" style={styles.selfieOptionText}>
              Tirar Foto
            </ThemedText>
          </Pressable>
          <Pressable style={styles.selfieOptionButton} onPress={handleChooseFromGallery}>
            <Feather name="image" size={16} color={BrandColors.primary} />
            <ThemedText type="small" style={styles.selfieOptionText}>
              Galeria
            </ThemedText>
          </Pressable>
        </View>
        <ThemedText type="small" style={styles.selfieHint}>
          Foto de perfil (opcional)
        </ThemedText>

        {error ? (
          <View style={styles.errorContainer}>
            <ThemedText type="small" style={styles.errorText}>
              {error}
            </ThemedText>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.nameRow}>
            <View
              style={[
                styles.inputWrapper,
                styles.halfInput,
                firstNameFocused && { borderColor: BrandColors.primary, borderWidth: 2 },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                onFocus={() => setFirstNameFocused(true)}
                onBlur={() => setFirstNameFocused(false)}
              />
            </View>
            <View
              style={[
                styles.inputWrapper,
                styles.halfInput,
                lastNameFocused && { borderColor: BrandColors.primary, borderWidth: 2 },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Apelido"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                onFocus={() => setLastNameFocused(true)}
                onBlur={() => setLastNameFocused(false)}
              />
            </View>
          </View>

          <View
            style={[
              styles.inputWrapper,
              emailFocused && { borderColor: BrandColors.primary, borderWidth: 2 },
            ]}
          >
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

          <View
            style={[
              styles.inputWrapper,
              phoneFocused && { borderColor: BrandColors.primary, borderWidth: 2 },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
            />
          </View>

          <View
            style={[
              styles.inputWrapper,
              passwordFocused && { borderColor: BrandColors.primary, borderWidth: 2 },
            ]}
          >
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
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={passwordFocused ? BrandColors.primary : "rgba(255,255,255,0.5)"}
              />
            </Pressable>
          </View>

          <View
            style={[
              styles.inputWrapper,
              confirmPasswordFocused && { borderColor: BrandColors.primary, borderWidth: 2 },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Confirmar Palavra-passe"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
            />
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
            >
              <Feather
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color={confirmPasswordFocused ? BrandColors.primary : "rgba(255,255,255,0.5)"}
              />
            </Pressable>
          </View>

          <Button
            onPress={handleRegister}
            disabled={isLoading}
            loading={isLoading}
            style={styles.registerButton}
          >
            Criar Conta
          </Button>
        </View>

        <View style={styles.loginContainer}>
          <ThemedText type="body" style={styles.loginText}>
            Já tens conta?
          </ThemedText>
          <Pressable onPress={handleGoToLogin}>
            <ThemedText type="body" style={styles.loginLink}>
              Entrar
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
    backgroundColor: "rgba(0,0,0,0.6)",
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
    marginBottom: Spacing.lg,
  },
  headerContainer: {
    marginBottom: Spacing.xl,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },
  selfieContainer: {
    alignSelf: "center",
    marginBottom: Spacing.sm,
    position: "relative",
  },
  selfiePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    borderStyle: "dashed",
  },
  selfieImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  selfieEditBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BrandColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  selfieButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  selfieOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  selfieOptionText: {
    color: BrandColors.primary,
    fontWeight: "500",
  },
  selfieHint: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginBottom: Spacing.lg,
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
    gap: Spacing.md,
  },
  nameRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  halfInput: {
    flex: 1,
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
  registerButton: {
    backgroundColor: BrandColors.primary,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "700",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  loginText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
  },
  loginLink: {
    color: BrandColors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
});

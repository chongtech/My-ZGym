import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, Alert, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";

const availableSpecializations = [
  "HIIT", "Força", "Funcional", "Yoga", "Pilates", "Musculação",
  "CrossFit", "Boxe", "Kickboxing", "Cardio", "Cycling", "Zumba"
];

export default function AddInstructorScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<{name: string; uri: string}[]>([]);

  const toggleSpecialization = (spec: string) => {
    if (selectedSpecializations.includes(spec)) {
      setSelectedSpecializations(selectedSpecializations.filter(s => s !== spec));
    } else {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão Negada", "É necessário permitir acesso à galeria para adicionar foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const pickCertificate = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success' && result.uri) {
        const newCertificate = {
          name: result.name,
          uri: result.uri,
        };
        setCertificates([...certificates, newCertificate]);
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar o documento.");
    }
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!fullName || !email) {
      Alert.alert("Erro", "Por favor, preencha o nome e o e-mail.");
      return;
    }

    Alert.alert(
      "Sucesso",
      `Instrutor ${fullName} foi adicionado com sucesso!`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
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
            Nome Completo *
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nome completo do instrutor"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            E-mail *
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail profissional"
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
            placeholder="Telefone de contato"
            placeholderTextColor={theme.textSecondary}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Foto do Instrutor
        </ThemedText>

        <View style={styles.photoSection}>
          {profilePhoto ? (
            <View style={styles.photoPreviewContainer}>
              <Image source={{ uri: profilePhoto }} style={styles.photoPreview} />
              <Pressable
                style={[styles.removePhotoButton, { backgroundColor: '#EF4444' }]}
                onPress={() => setProfilePhoto(null)}
              >
                <Feather name="x" size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={[styles.uploadButton, { backgroundColor: theme.backgroundRoot, borderColor: BrandColors.primary }]}
              onPress={pickImage}
            >
              <Feather name="camera" size={32} color={BrandColors.primary} />
              <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: Spacing.sm }}>
                Adicionar Foto
              </ThemedText>
            </Pressable>
          )}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <View style={styles.sectionHeader}>
          <View>
            <ThemedText type="h4">
              Certificados e Documentos
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: 4 }}>
              PDFs, imagens de certificados e diplomas
            </ThemedText>
          </View>
          <Pressable
            style={[styles.addCertButton, { backgroundColor: BrandColors.primary }]}
            onPress={pickCertificate}
          >
            <Feather name="plus" size={20} color="#000000" />
          </Pressable>
        </View>

        {certificates.length > 0 ? (
          <View style={styles.certificatesList}>
            {certificates.map((cert, index) => (
              <View key={index} style={[styles.certificateItem, { backgroundColor: theme.backgroundRoot }]}>
                <Feather name="file-text" size={20} color={BrandColors.primary} />
                <ThemedText type="small" style={{ flex: 1, marginLeft: Spacing.sm }} numberOfLines={1}>
                  {cert.name}
                </ThemedText>
                <Pressable onPress={() => removeCertificate(index)}>
                  <Feather name="trash-2" size={18} color="#EF4444" />
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View style={[styles.emptyState, { backgroundColor: theme.backgroundRoot }]}>
            <Feather name="folder" size={32} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: Spacing.sm }}>
              Nenhum certificado adicionado
            </ThemedText>
          </View>
        )}
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Especializações
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.md }}>
          Selecione as áreas de especialização do instrutor
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
            Adicionar Instrutor
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  photoSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPreviewContainer: {
    position: 'relative',
    width: 150,
    height: 150,
  },
  photoPreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCertButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certificatesList: {
    gap: Spacing.sm,
  },
  certificateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  emptyState: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
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

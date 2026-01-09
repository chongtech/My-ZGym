import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";

const categories = [
  { key: "supplements", label: "Suplementos" },
  { key: "apparel", label: "Vestuário" },
  { key: "equipment", label: "Equipamento" },
  { key: "accessories", label: "Acessórios" },
];

export default function AddProductScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSave = () => {
    if (!productName || !description || !price || !stock || !selectedCategory) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    Alert.alert(
      "Sucesso",
      `O produto "${productName}" foi adicionado com sucesso!`,
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
          Informações do Produto
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Nome do Produto *
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={productName}
            onChangeText={setProductName}
            placeholder="Nome do produto"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Descrição *
          </ThemedText>
          <TextInput
            style={[styles.textArea, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descrição detalhada do produto"
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Categoria *
          </ThemedText>
          <View style={styles.categoryGrid}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.key;
              return (
                <Pressable
                  key={category.key}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                      borderWidth: 2,
                      borderColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category.key)}
                >
                  <ThemedText
                    type="small"
                    style={{
                      color: isSelected ? "#000000" : theme.text,
                      fontWeight: isSelected ? '700' : '500',
                    }}
                  >
                    {category.label}
                  </ThemedText>
                  {isSelected && (
                    <Feather name="check" size={16} color="#000000" style={{ marginLeft: 4 }} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Marca
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={brand}
            onChangeText={setBrand}
            placeholder="Ex: Nike, Optimum Nutrition"
            placeholderTextColor={theme.textSecondary}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Preço e Stock
        </ThemedText>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
              Preço (€) *
            </ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor={theme.textSecondary}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
              Stock *
            </ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
              value={stock}
              onChangeText={setStock}
              placeholder="0"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Imagem
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            URL da Imagem
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="https://exemplo.com/imagem.jpg"
            placeholderTextColor={theme.textSecondary}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Pressable
          style={[styles.saveButton, { backgroundColor: BrandColors.primary }]}
          onPress={handleSave}
        >
          <Feather name="check" size={20} color="#000000" />
          <ThemedText type="body" style={{ color: "#000000", fontWeight: '700' }}>
            Adicionar Produto
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
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  categoryChip: {
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

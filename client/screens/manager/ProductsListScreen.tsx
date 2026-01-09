import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockShopProducts, shopCategories } from "@/data/mockData";
import type { ManagerProductsStackParamList } from "@/navigation/ManagerProductsStackNavigator";
import type { ShopProduct } from "@/types/shop";

type NavigationProp = NativeStackNavigationProp<ManagerProductsStackParamList>;

export default function ProductsListScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = mockShopProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProductItem = ({ item }: { item: ShopProduct }) => (
    <Pressable
      style={[styles.productCard, { backgroundColor: theme.backgroundDefault }]}
      onPress={() => navigation.navigate("EditProduct", { productId: item.id })}
    >
      <View style={styles.productImageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        ) : (
          <View style={[styles.productImagePlaceholder, { backgroundColor: theme.backgroundSecondary }]}>
            <Feather name="package" size={32} color={theme.textSecondary} />
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <ThemedText type="body" style={{ fontWeight: '600' }} numberOfLines={1}>
          {item.name}
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: 2 }} numberOfLines={1}>
          {item.brand}
        </ThemedText>

        <View style={styles.productMeta}>
          <ThemedText type="h4" style={{ color: BrandColors.primary }}>
            €{item.price.toFixed(2)}
          </ThemedText>
          <View style={styles.stockBadge}>
            <View
              style={[
                styles.stockIndicator,
                { backgroundColor: item.inStock ? '#10B981' : '#EF4444' },
              ]}
            />
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {item.stock} un.
            </ThemedText>
          </View>
        </View>
      </View>

      <Feather name="edit-2" size={18} color={theme.textSecondary} />
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View
        style={{
          paddingTop: headerHeight + Spacing.md,
          paddingHorizontal: Spacing.lg,
        }}
      >
        <View style={[styles.searchContainer, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Pesquisar produtos..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categoriesContainer}>
          {shopCategories.map((category) => {
            const isSelected = selectedCategory === category.key;
            return (
              <Pressable
                key={category.key}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: isSelected ? BrandColors.primary : theme.backgroundDefault,
                    borderWidth: 2,
                    borderColor: isSelected ? BrandColors.primary : theme.backgroundDefault,
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
              </Pressable>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: tabBarHeight + Spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="package" size={48} color={theme.textSecondary} />
            <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: Spacing.md }}>
              Nenhum produto encontrado
            </ThemedText>
          </View>
        }
      />

      <Pressable
        style={[styles.fab, { backgroundColor: BrandColors.primary }]}
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Feather name="plus" size={24} color="#000000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
  },
  productImageContainer: {
    marginRight: Spacing.md,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
  },
  productImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  productInfo: {
    flex: 1,
  },
  productMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.sm,
  },
  stockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xl * 2,
  },
  fab: {
    position: "absolute",
    right: Spacing.lg,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

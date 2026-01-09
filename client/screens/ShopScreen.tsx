import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Image, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockShopProducts, shopCategories } from "@/data/mockData";
import { ShopProduct } from "@/types/shop";
import { ShopStackParamList } from "@/navigation/ShopStackNavigator";

type Props = NativeStackScreenProps<ShopStackParamList, "Shop">;

export default function ShopScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? mockShopProducts
      : mockShopProducts.filter((product) => product.category === selectedCategory);

  const handleProductPress = (product: ShopProduct) => {
    navigation.navigate("ProductDetail", { product });
  };

  const handleAddToCart = (product: ShopProduct, event: any) => {
    event.stopPropagation();
    navigation.navigate("Checkout", { product, quantity: 1 });
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Feather key={`star-${i}`} name="star" size={12} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<Feather key="star-half" name="star" size={12} color="#FFD700" />);
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderProductCard = ({ item }: { item: ShopProduct }) => (
    <Pressable
      style={[styles.productCard, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}
      onPress={() => handleProductPress(item)}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} resizeMode="cover" />
      ) : (
        <View style={[styles.productImagePlaceholder, { backgroundColor: theme.backgroundSecondary }]}>
          <Feather name="package" size={40} color={theme.textSecondary} />
        </View>
      )}

      <View style={styles.productInfo}>
        <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
          {item.brand}
        </ThemedText>
        <ThemedText type="body" style={{ color: theme.text, fontWeight: "600", marginBottom: 4 }}>
          {item.name}
        </ThemedText>
        <ThemedText
          type="small"
          style={{ color: theme.textSecondary, marginBottom: 8 }}
          numberOfLines={2}
        >
          {item.description}
        </ThemedText>

        {item.rating && (
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>
              {item.rating.toFixed(1)} ({item.reviewCount})
            </ThemedText>
          </View>
        )}

        <View style={styles.productFooter}>
          <View>
            <ThemedText type="h4" style={{ color: BrandColors.primary }}>
              €{item.price.toFixed(2)}
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {item.inStock ? `${item.stock} em stock` : "Esgotado"}
            </ThemedText>
          </View>
          <Pressable
            style={[
              styles.addButton,
              {
                backgroundColor: item.inStock ? BrandColors.primary : theme.backgroundSecondary,
              },
            ]}
            onPress={(e) => handleAddToCart(item, e)}
            disabled={!item.inStock}
          >
            <Feather
              name="shopping-cart"
              size={20}
              color={item.inStock ? theme.buttonText : theme.textSecondary}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundRoot }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.lg,
          paddingBottom: tabBarHeight + Spacing.xl,
        }}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="h2" style={{ color: theme.text }}>
            Loja
          </ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: 4 }}>
            Produtos e equipamento para o teu treino
          </ThemedText>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg }}
        >
          {shopCategories.map((category) => (
            <Pressable
              key={category.key}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === category.key ? BrandColors.primary : theme.backgroundDefault,
                  borderColor:
                    selectedCategory === category.key ? BrandColors.primary : theme.border,
                },
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Feather
                name={category.icon as any}
                size={16}
                color={selectedCategory === category.key ? theme.buttonText : theme.text}
              />
              <ThemedText
                type="small"
                style={{
                  color: selectedCategory === category.key ? theme.buttonText : theme.text,
                  marginLeft: 6,
                  fontWeight: selectedCategory === category.key ? "600" : "400",
                }}
              >
                {category.label}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.productsHeader}>
          <ThemedText type="h4" style={{ color: theme.text }}>
            {filteredProducts.length} Produtos
          </ThemedText>
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  categoriesContainer: {
    marginBottom: Spacing.lg,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  productsHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  productCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 180,
  },
  productImagePlaceholder: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    padding: Spacing.md,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
});

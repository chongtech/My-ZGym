import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { ShopStackParamList } from "@/navigation/ShopStackNavigator";

type Props = NativeStackScreenProps<ShopStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { product } = route.params;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleBuyNow = () => {
    navigation.navigate("Checkout", { product, quantity });
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Feather key={`star-${i}`} name="star" size={16} color="#FFD700" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Feather key={`star-${i}`} name="star" size={16} color="#FFD700" />);
      } else {
        stars.push(<Feather key={`star-${i}`} name="star" size={16} color={theme.border} />);
      }
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const totalPrice = product.price * quantity;

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundRoot }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: tabBarHeight + Spacing.xl + 80,
        }}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {product.imageUrl ? (
          <Image source={{ uri: product.imageUrl }} style={styles.productImage} resizeMode="cover" />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: theme.backgroundSecondary }]}>
            <Feather name="package" size={80} color={theme.textSecondary} />
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.headerSection}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {product.brand}
            </ThemedText>
            <ThemedText type="h2" style={{ color: theme.text, marginTop: 4 }}>
              {product.name}
            </ThemedText>

            {product.rating && (
              <View style={styles.ratingContainer}>
                {renderStars(product.rating)}
                <ThemedText type="body" style={{ color: theme.text, marginLeft: 8 }}>
                  {product.rating.toFixed(1)}
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>
                  ({product.reviewCount} avaliações)
                </ThemedText>
              </View>
            )}

            <ThemedText type="h1" style={{ color: BrandColors.primary, marginTop: Spacing.md }}>
              €{product.price.toFixed(2)}
            </ThemedText>
          </View>

          <View style={[styles.section, { borderTopColor: theme.border }]}>
            <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.sm }}>
              Descrição
            </ThemedText>
            <ThemedText type="body" style={{ color: theme.textSecondary, lineHeight: 22 }}>
              {product.description}
            </ThemedText>
          </View>

          <View style={[styles.section, { borderTopColor: theme.border }]}>
            <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.sm }}>
              Disponibilidade
            </ThemedText>
            <View style={styles.stockRow}>
              {product.inStock ? (
                <>
                  <Feather name="check-circle" size={20} color={BrandColors.success} />
                  <ThemedText type="body" style={{ color: BrandColors.success, marginLeft: 8 }}>
                    Em Stock ({product.stock} unidades)
                  </ThemedText>
                </>
              ) : (
                <>
                  <Feather name="x-circle" size={20} color={BrandColors.error} />
                  <ThemedText type="body" style={{ color: BrandColors.error, marginLeft: 8 }}>
                    Esgotado
                  </ThemedText>
                </>
              )}
            </View>
          </View>

          <View style={[styles.section, { borderTopColor: theme.border }]}>
            <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.md }}>
              Quantidade
            </ThemedText>
            <View style={styles.quantityContainer}>
              <Pressable
                style={[
                  styles.quantityButton,
                  { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
                ]}
                onPress={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Feather name="minus" size={20} color={quantity <= 1 ? theme.textSecondary : theme.text} />
              </Pressable>
              <View style={[styles.quantityDisplay, { backgroundColor: theme.backgroundDefault }]}>
                <ThemedText type="h3" style={{ color: theme.text }}>
                  {quantity}
                </ThemedText>
              </View>
              <Pressable
                style={[
                  styles.quantityButton,
                  { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
                ]}
                onPress={handleIncreaseQuantity}
                disabled={quantity >= product.stock}
              >
                <Feather
                  name="plus"
                  size={20}
                  color={quantity >= product.stock ? theme.textSecondary : theme.text}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.backgroundDefault,
            borderTopColor: theme.border,
            paddingBottom: tabBarHeight + Spacing.md,
          },
        ]}
      >
        <View>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Total
          </ThemedText>
          <ThemedText type="h2" style={{ color: theme.text }}>
            €{totalPrice.toFixed(2)}
          </ThemedText>
        </View>
        <Pressable
          style={[
            styles.buyButton,
            {
              backgroundColor: product.inStock ? BrandColors.primary : theme.backgroundSecondary,
            },
          ]}
          onPress={handleBuyNow}
          disabled={!product.inStock}
        >
          <Feather
            name="shopping-cart"
            size={20}
            color={product.inStock ? theme.buttonText : theme.textSecondary}
          />
          <ThemedText
            type="body"
            style={{
              color: product.inStock ? theme.buttonText : theme.textSecondary,
              marginLeft: 8,
              fontWeight: "600",
            }}
          >
            Comprar Agora
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: "100%",
    height: 300,
  },
  imagePlaceholder: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: Spacing.lg,
  },
  headerSection: {
    marginBottom: Spacing.lg,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  section: {
    paddingTop: Spacing.lg,
    marginTop: Spacing.lg,
    borderTopWidth: 1,
  },
  stockRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityDisplay: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    minWidth: 80,
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
});

import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Image, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { ShopStackParamList } from "@/navigation/ShopStackNavigator";

type Props = NativeStackScreenProps<ShopStackParamList, "Checkout">;

const PAYMENT_METHODS = [
  { id: "card", label: "Cartão de Crédito/Débito", icon: "credit-card" },
  { id: "mbway", label: "MB WAY", icon: "smartphone" },
  { id: "multibanco", label: "Multibanco", icon: "hash" },
];

const DELIVERY_METHODS = [
  { id: "pickup", label: "Levantamento no Ginásio", description: "Grátis", price: 0 },
  { id: "standard", label: "Entrega Standard", description: "3-5 dias úteis", price: 4.99 },
  { id: "express", label: "Entrega Express", description: "1-2 dias úteis", price: 9.99 },
];

export default function CheckoutScreen({ route, navigation }: Props) {
  const { product, quantity } = route.params;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedDelivery, setSelectedDelivery] = useState("pickup");

  const subtotal = product.price * quantity;
  const deliveryPrice = DELIVERY_METHODS.find((m) => m.id === selectedDelivery)?.price || 0;
  const total = subtotal + deliveryPrice;

  const handleConfirmOrder = () => {
    Alert.alert(
      "Pedido Confirmado",
      `O teu pedido de ${quantity}x ${product.name} foi confirmado!\n\nTotal: €${total.toFixed(2)}`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Shop"),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundRoot }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.lg,
          paddingBottom: tabBarHeight + Spacing.xl + 100,
          paddingHorizontal: Spacing.lg,
        }}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="h3" style={{ color: theme.text, marginBottom: Spacing.lg }}>
          Finalizar Compra
        </ThemedText>

        <View style={[styles.section, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}>
          <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.md }}>
            Resumo do Pedido
          </ThemedText>
          <View style={styles.productRow}>
            {product.imageUrl ? (
              <Image source={{ uri: product.imageUrl }} style={styles.productThumb} resizeMode="cover" />
            ) : (
              <View style={[styles.productThumb, { backgroundColor: theme.backgroundSecondary }]}>
                <Feather name="package" size={24} color={theme.textSecondary} />
              </View>
            )}
            <View style={styles.productInfo}>
              <ThemedText type="body" style={{ color: theme.text, fontWeight: "600" }}>
                {product.name}
              </ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {product.brand}
              </ThemedText>
              <ThemedText type="body" style={{ color: theme.text, marginTop: 4 }}>
                Quantidade: {quantity}
              </ThemedText>
            </View>
            <ThemedText type="h4" style={{ color: BrandColors.primary }}>
              €{subtotal.toFixed(2)}
            </ThemedText>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}>
          <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.md }}>
            Método de Entrega
          </ThemedText>
          {DELIVERY_METHODS.map((method) => (
            <Pressable
              key={method.id}
              style={[
                styles.optionCard,
                {
                  backgroundColor: selectedDelivery === method.id ? theme.backgroundSecondary : "transparent",
                  borderColor: selectedDelivery === method.id ? BrandColors.primary : theme.border,
                },
              ]}
              onPress={() => setSelectedDelivery(method.id)}
            >
              <View style={styles.optionContent}>
                <View>
                  <ThemedText type="body" style={{ color: theme.text, fontWeight: "600" }}>
                    {method.label}
                  </ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {method.description}
                  </ThemedText>
                </View>
                <ThemedText type="body" style={{ color: theme.text, fontWeight: "600" }}>
                  {method.price === 0 ? "Grátis" : `€${method.price.toFixed(2)}`}
                </ThemedText>
              </View>
              {selectedDelivery === method.id && (
                <View style={styles.checkmark}>
                  <Feather name="check-circle" size={20} color={BrandColors.primary} />
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}>
          <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.md }}>
            Método de Pagamento
          </ThemedText>
          {PAYMENT_METHODS.map((method) => (
            <Pressable
              key={method.id}
              style={[
                styles.optionCard,
                {
                  backgroundColor: selectedPayment === method.id ? theme.backgroundSecondary : "transparent",
                  borderColor: selectedPayment === method.id ? BrandColors.primary : theme.border,
                },
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.optionContent}>
                <Feather name={method.icon as any} size={24} color={theme.text} />
                <ThemedText type="body" style={{ color: theme.text, fontWeight: "600", marginLeft: Spacing.md }}>
                  {method.label}
                </ThemedText>
              </View>
              {selectedPayment === method.id && (
                <View style={styles.checkmark}>
                  <Feather name="check-circle" size={20} color={BrandColors.primary} />
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}>
          <ThemedText type="h4" style={{ color: theme.text, marginBottom: Spacing.md }}>
            Resumo de Pagamento
          </ThemedText>
          <View style={styles.summaryRow}>
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              Subtotal
            </ThemedText>
            <ThemedText type="body" style={{ color: theme.text }}>
              €{subtotal.toFixed(2)}
            </ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              Entrega
            </ThemedText>
            <ThemedText type="body" style={{ color: theme.text }}>
              {deliveryPrice === 0 ? "Grátis" : `€${deliveryPrice.toFixed(2)}`}
            </ThemedText>
          </View>
          <View style={[styles.summaryRow, styles.totalRow, { borderTopColor: theme.border }]}>
            <ThemedText type="h3" style={{ color: theme.text }}>
              Total
            </ThemedText>
            <ThemedText type="h3" style={{ color: BrandColors.primary }}>
              €{total.toFixed(2)}
            </ThemedText>
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
        <Pressable style={[styles.confirmButton, { backgroundColor: BrandColors.primary }]} onPress={handleConfirmOrder}>
          <Feather name="check" size={20} color={theme.buttonText} />
          <ThemedText type="body" style={{ color: theme.buttonText, marginLeft: 8, fontWeight: "600" }}>
            Confirmar Pedido
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
  section: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  productThumb: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
  },
  optionCard: {
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    position: "relative",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkmark: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  totalRow: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    marginBottom: 0,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
});

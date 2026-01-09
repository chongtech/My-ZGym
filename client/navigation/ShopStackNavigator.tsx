import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { HeaderButton } from "@react-navigation/elements";

import ShopScreen from "@/screens/ShopScreen";
import ProductDetailScreen from "@/screens/ProductDetailScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";
import { ShopProduct } from "@/types/shop";

export type ShopStackParamList = {
  Shop: undefined;
  ProductDetail: { product: ShopProduct };
  Checkout: { product: ShopProduct; quantity: number };
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

export default function ShopStackNavigator() {
  const screenOptions = useScreenOptions();
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Loja" />,
          headerRight: () => (
            <HeaderButton onPress={() => {}}>
              <Feather name="shopping-cart" size={20} color={theme.text} />
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Detalhes do Produto" />,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Checkout" />,
        }}
      />
    </Stack.Navigator>
  );
}

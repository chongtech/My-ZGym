import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderTitle } from "@/components/HeaderTitle";

import ProductsListScreen from "@/screens/manager/ProductsListScreen";
import AddProductScreen from "@/screens/manager/AddProductScreen";
import EditProductScreen from "@/screens/manager/EditProductScreen";

export type ManagerProductsStackParamList = {
  ProductsList: undefined;
  AddProduct: undefined;
  EditProduct: { productId: string };
};

const Stack = createNativeStackNavigator<ManagerProductsStackParamList>();

export default function ManagerProductsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerBlurEffect: "regular",
      }}
    >
      <Stack.Screen
        name="ProductsList"
        component={ProductsListScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Produtos" />,
        }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Adicionar Produto" />,
        }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Editar Produto" />,
        }}
      />
    </Stack.Navigator>
  );
}

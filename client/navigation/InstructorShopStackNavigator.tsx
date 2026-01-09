import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InstructorShopScreen from '@/screens/instructor/InstructorShopScreen';
import InstructorProductDetailScreen from '@/screens/instructor/InstructorProductDetailScreen';
import { HeaderTitle } from '@/components/HeaderTitle';
import { useScreenOptions } from '@/hooks/useScreenOptions';

export type InstructorShopStackParamList = {
  InstructorShop: undefined;
  InstructorProductDetail: { product: any };
};

const Stack = createNativeStackNavigator<InstructorShopStackParamList>();

export default function InstructorShopStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="InstructorShop"
        component={InstructorShopScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Suplementos" />,
        }}
      />
      <Stack.Screen
        name="InstructorProductDetail"
        component={InstructorProductDetailScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Detalhes do Produto" />,
        }}
      />
    </Stack.Navigator>
  );
}

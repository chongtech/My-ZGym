import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemedStatusBar } from '@/components/ThemedStatusBar';

// Mock data for supplements
const SUPPLEMENTS = [
  {
    id: '1',
    name: 'Whey Protein Premium',
    brand: 'Z-Nutrition',
    category: 'Protein',
    price: 89.90,
    image: 'https://via.placeholder.com/150',
    description: 'High-quality whey protein isolate',
    stock: 50,
  },
  {
    id: '2',
    name: 'Creatine Monohydrate',
    brand: 'Z-Nutrition',
    category: 'Performance',
    price: 49.90,
    image: 'https://via.placeholder.com/150',
    description: 'Pure creatine for muscle gain',
    stock: 30,
  },
  {
    id: '3',
    name: 'BCAA 2:1:1',
    brand: 'Z-Nutrition',
    category: 'Recovery',
    price: 59.90,
    image: 'https://via.placeholder.com/150',
    description: 'Essential amino acids for recovery',
    stock: 40,
  },
  {
    id: '4',
    name: 'Pre-Workout Extreme',
    brand: 'Z-Nutrition',
    category: 'Energy',
    price: 69.90,
    image: 'https://via.placeholder.com/150',
    description: 'Maximum energy and focus',
    stock: 25,
  },
  {
    id: '5',
    name: 'Glutamine Pure',
    brand: 'Z-Nutrition',
    category: 'Recovery',
    price: 54.90,
    image: 'https://via.placeholder.com/150',
    description: 'Supports muscle recovery',
    stock: 35,
  },
  {
    id: '6',
    name: 'Omega-3 Fish Oil',
    brand: 'Z-Nutrition',
    category: 'Health',
    price: 44.90,
    image: 'https://via.placeholder.com/150',
    description: 'Essential fatty acids',
    stock: 60,
  },
];

const CATEGORIES = ['All', 'Protein', 'Performance', 'Recovery', 'Energy', 'Health'];

export default function InstructorShopScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = SUPPLEMENTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductPress = (product: any) => {
    navigation.navigate('InstructorProductDetail', { product });
  };

  const renderProduct = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.backgroundDefault }]}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productBrand, { color: theme.textSecondary }]}>
          {item.brand}
        </Text>
        <Text style={[styles.productName, { color: theme.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.categoryBadge}>
          <Text style={[styles.categoryText, { color: theme.primary }]}>
            {item.category}
          </Text>
        </View>
        <View style={styles.productFooter}>
          <Text style={[styles.productPrice, { color: theme.primary }]}>
            R$ {item.price.toFixed(2)}
          </Text>
          <Text style={[styles.stockText, { color: theme.textSecondary }]}>
            Stock: {item.stock}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <ThemedStatusBar />

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.backgroundDefault }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search supplements..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                  selectedCategory === item ? theme.primary : theme.backgroundDefault,
              },
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryChipText,
                {
                  color: selectedCategory === item ? '#000000' : theme.text,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productsContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="flask-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No products found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  productsContainer: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    maxWidth: '48%',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 12,
  },
  productBrand: {
    fontSize: 12,
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    minHeight: 36,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 94, 77, 0.1)',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockText: {
    fontSize: 11,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});

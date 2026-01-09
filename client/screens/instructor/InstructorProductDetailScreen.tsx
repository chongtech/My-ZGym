import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemedStatusBar } from '@/components/ThemedStatusBar';

// Mock clients data
const MOCK_CLIENTS = [
  { id: '1', name: 'João Silva', email: 'joao@email.com' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@email.com' },
  { id: '4', name: 'Ana Oliveira', email: 'ana@email.com' },
];

export default function InstructorProductDetailScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as any;
  const [recommendModalVisible, setRecommendModalVisible] = useState(false);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [recommendationNote, setRecommendationNote] = useState('');

  const toggleClientSelection = (clientId: string) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleRecommend = () => {
    if (selectedClients.length === 0) {
      alert('Please select at least one client');
      return;
    }
    // Here you would send the recommendation to the backend
    alert(`Product recommended to ${selectedClients.length} client(s)`);
    setRecommendModalVisible(false);
    setSelectedClients([]);
    setRecommendationNote('');
  };

  const renderClientItem = ({ item }: any) => {
    const isSelected = selectedClients.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.clientItem,
          {
            backgroundColor: isSelected ? theme.primary + '20' : theme.backgroundDefault,
            borderColor: isSelected ? theme.primary : 'transparent',
          },
        ]}
        onPress={() => toggleClientSelection(item.id)}
      >
        <View style={styles.clientInfo}>
          <View
            style={[
              styles.clientAvatar,
              { backgroundColor: theme.primary + '30' },
            ]}
          >
            <Text style={[styles.clientInitials, { color: theme.primary }]}>
              {item.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.clientDetails}>
            <Text style={[styles.clientName, { color: theme.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.clientEmail, { color: theme.textSecondary }]}>
              {item.email}
            </Text>
          </View>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={theme.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <ThemedStatusBar />

      <ScrollView>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={[styles.brand, { color: theme.textSecondary }]}>
                {product.brand}
              </Text>
              <Text style={[styles.productName, { color: theme.text }]}>
                {product.name}
              </Text>
              <View style={[styles.categoryBadge, { backgroundColor: theme.primary + '20' }]}>
                <Text style={[styles.categoryText, { color: theme.primary }]}>
                  {product.category}
                </Text>
              </View>
            </View>
            <Text style={[styles.price, { color: theme.primary }]}>
              R$ {product.price.toFixed(2)}
            </Text>
          </View>

          {/* Stock Info */}
          <View style={[styles.stockContainer, { backgroundColor: theme.backgroundDefault }]}>
            <Ionicons name="cube-outline" size={20} color={theme.textSecondary} />
            <Text style={[styles.stockText, { color: theme.textSecondary }]}>
              {product.stock} units available
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Description
            </Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {product.description}
            </Text>
          </View>

          {/* Benefits (placeholder) */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Benefits
            </Text>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
              <Text style={[styles.benefitText, { color: theme.textSecondary }]}>
                Supports muscle growth and recovery
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
              <Text style={[styles.benefitText, { color: theme.textSecondary }]}>
                High-quality ingredients
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
              <Text style={[styles.benefitText, { color: theme.textSecondary }]}>
                Fast absorption
              </Text>
            </View>
          </View>

          {/* Usage Instructions */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              How to Use
            </Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              Take one serving daily, preferably post-workout or as directed by your instructor.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Recommend Button */}
      <View style={[styles.footer, { backgroundColor: theme.backgroundDefault }]}>
        <TouchableOpacity
          style={[styles.recommendButton, { backgroundColor: theme.primary }]}
          onPress={() => setRecommendModalVisible(true)}
        >
          <Ionicons name="share-outline" size={20} color="#000000" />
          <Text style={styles.recommendButtonText}>Recommend to Client</Text>
        </TouchableOpacity>
      </View>

      {/* Recommendation Modal */}
      <Modal
        visible={recommendModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setRecommendModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.backgroundRoot }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Recommend Product
              </Text>
              <TouchableOpacity onPress={() => setRecommendModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
              Select clients to recommend {product.name}
            </Text>

            <FlatList
              data={MOCK_CLIENTS}
              renderItem={renderClientItem}
              keyExtractor={(item) => item.id}
              style={styles.clientsList}
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.cancelButton, { backgroundColor: theme.backgroundDefault }]}
                onPress={() => setRecommendModalVisible(false)}
              >
                <Text style={[styles.cancelButtonText, { color: theme.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    backgroundColor:
                      selectedClients.length > 0 ? theme.primary : theme.backgroundDefault,
                  },
                ]}
                onPress={handleRecommend}
                disabled={selectedClients.length === 0}
              >
                <Text
                  style={[
                    styles.sendButtonText,
                    {
                      color:
                        selectedClients.length > 0 ? '#000000' : theme.textSecondary,
                    },
                  ]}
                >
                  Send Recommendation
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  brand: {
    fontSize: 14,
    marginBottom: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 24,
  },
  stockText: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  recommendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  recommendButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  clientsList: {
    marginBottom: 20,
  },
  clientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientInitials: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
  },
  clientEmail: {
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sendButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

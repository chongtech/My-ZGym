import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { SUBSCRIPTION_TYPES } from "@/data/mockData";
import type { PricingTier } from "@/types/manager";

interface OperatingHours {
  day: string;
  openTime: string;
  closeTime: string;
}

interface Holiday {
  id: string;
  date: string;
  name: string;
}

const availableAmenities = [
  'Wi-Fi Gratuito',
  'Estacionamento',
  'Vestiários',
  'Chuveiros',
  'Sauna',
  'Área de Descanso',
  'Loja de Suplementos',
  'Café',
  'Jacuzzi',
  'Piscina',
  'Spa',
  'Fisioterapia',
  'Nutricionista',
  'Massagem',
  'Solário',
  'Bar de Sucos'
];

export default function FacilitySettingsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [gymName, setGymName] = useState("Z-Gym Academia");
  const [address, setAddress] = useState("Rua Principal, 123");
  const [city, setCity] = useState("Lisboa");
  const [phone, setPhone] = useState("+351 210 123 456");
  const [email, setEmail] = useState("contato@zgym.com");
  const [maxCapacity, setMaxCapacity] = useState("150");

  const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([
    { day: "Segunda - Sexta", openTime: "06:00", closeTime: "22:00" },
    { day: "Sábado", openTime: "08:00", closeTime: "20:00" },
    { day: "Domingo", openTime: "09:00", closeTime: "14:00" },
  ]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Wi-Fi Gratuito',
    'Estacionamento',
    'Vestiários',
    'Chuveiros',
    'Sauna',
    'Área de Descanso',
    'Loja de Suplementos',
    'Café'
  ]);

  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: '1', date: '2025-01-01', name: 'Ano Novo' },
    { id: '2', date: '2025-04-25', name: 'Dia da Liberdade' },
    { id: '3', date: '2025-05-01', name: 'Dia do Trabalhador' },
    { id: '4', date: '2025-12-25', name: 'Natal' },
  ]);

  const [newHolidayDate, setNewHolidayDate] = useState('');
  const [newHolidayName, setNewHolidayName] = useState('');

  const [instagram, setInstagram] = useState('@zgymacademia');
  const [facebook, setFacebook] = useState('ZGymAcademia');
  const [twitter, setTwitter] = useState('@zgymacademia');
  const [website, setWebsite] = useState('https://www.zgym.com');

  const [subscriptions, setSubscriptions] = useState<PricingTier[]>(SUBSCRIPTION_TYPES);

  const updateOperatingHours = (index: number, field: 'openTime' | 'closeTime', value: string) => {
    const updated = [...operatingHours];
    updated[index][field] = value;
    setOperatingHours(updated);
  };

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const addHoliday = () => {
    if (!newHolidayDate || !newHolidayName) {
      Alert.alert("Erro", "Por favor, preencha a data e o nome do feriado.");
      return;
    }
    const newHoliday: Holiday = {
      id: Date.now().toString(),
      date: newHolidayDate,
      name: newHolidayName,
    };
    setHolidays([...holidays, newHoliday]);
    setNewHolidayDate('');
    setNewHolidayName('');
  };

  const removeHoliday = (id: string) => {
    setHolidays(holidays.filter(h => h.id !== id));
  };

  const updateSubscriptionPrice = (tier: string, newPrice: string) => {
    const updated = subscriptions.map(sub =>
      sub.tier === tier ? { ...sub, monthlyPrice: parseFloat(newPrice) || 0 } : sub
    );
    setSubscriptions(updated);
  };

  const handleUpdateSubscription = (tierName: string) => {
    Alert.alert(
      "Sucesso",
      `O preço da subscrição "${tierName}" foi atualizado!`,
      [{ text: "OK" }]
    );
  };

  const handleSave = () => {
    Alert.alert(
      "Sucesso",
      "As configurações da academia foram atualizadas!",
      [{ text: "OK" }]
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
          Informações Básicas
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Nome da Academia
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={gymName}
            onChangeText={setGymName}
            placeholder="Nome da academia"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Endereço
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={address}
            onChangeText={setAddress}
            placeholder="Endereço completo"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Cidade
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={city}
            onChangeText={setCity}
            placeholder="Cidade"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Telefone
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Telefone"
            placeholderTextColor={theme.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            E-mail
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail de contato"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Capacidade
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Capacidade Máxima
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={maxCapacity}
            onChangeText={setMaxCapacity}
            placeholder="Número máximo de pessoas"
            placeholderTextColor={theme.textSecondary}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Horário de Funcionamento
        </ThemedText>

        {operatingHours.map((hours, index) => (
          <View key={index} style={styles.hoursEditRow}>
            <ThemedText type="body" style={{ flex: 1, fontWeight: '600' }}>
              {hours.day}
            </ThemedText>
            <View style={styles.timeInputContainer}>
              <TextInput
                style={[styles.timeInput, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
                value={hours.openTime}
                onChangeText={(value) => updateOperatingHours(index, 'openTime', value)}
                placeholder="09:00"
                placeholderTextColor={theme.textSecondary}
              />
              <ThemedText type="body" style={{ color: theme.textSecondary, marginHorizontal: 4 }}>-</ThemedText>
              <TextInput
                style={[styles.timeInput, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
                value={hours.closeTime}
                onChangeText={(value) => updateOperatingHours(index, 'closeTime', value)}
                placeholder="22:00"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.sm }}>
          Comodidades
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.md }}>
          Selecione as comodidades disponíveis na academia
        </ThemedText>

        <View style={styles.amenitiesGrid}>
          {availableAmenities.map((amenity, index) => {
            const isSelected = selectedAmenities.includes(amenity);
            return (
              <Pressable
                key={index}
                style={[
                  styles.amenityChip,
                  {
                    backgroundColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                    borderWidth: 2,
                    borderColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                  },
                ]}
                onPress={() => toggleAmenity(amenity)}
              >
                <ThemedText
                  type="small"
                  style={{
                    color: isSelected ? "#000000" : theme.text,
                    fontWeight: isSelected ? '700' : '500',
                  }}
                >
                  {amenity}
                </ThemedText>
                {isSelected && (
                  <Feather name="check" size={16} color="#000000" style={{ marginLeft: 4 }} />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Redes Sociais
        </ThemedText>

        <View style={styles.inputGroup}>
          <View style={styles.socialInputHeader}>
            <Feather name="instagram" size={16} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>
              Instagram
            </ThemedText>
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={instagram}
            onChangeText={setInstagram}
            placeholder="@username"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.socialInputHeader}>
            <Feather name="facebook" size={16} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>
              Facebook
            </ThemedText>
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={facebook}
            onChangeText={setFacebook}
            placeholder="Nome da página"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.socialInputHeader}>
            <Feather name="twitter" size={16} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>
              Twitter / X
            </ThemedText>
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={twitter}
            onChangeText={setTwitter}
            placeholder="@username"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.socialInputHeader}>
            <Feather name="globe" size={16} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>
              Website
            </ThemedText>
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={website}
            onChangeText={setWebsite}
            placeholder="https://www.exemplo.com"
            placeholderTextColor={theme.textSecondary}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.sm }}>
          Feriados
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.md }}>
          Adicione feriados para enviar notificações aos membros
        </ThemedText>

        <View style={styles.addHolidayForm}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
              Data
            </ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
              value={newHolidayDate}
              onChangeText={setNewHolidayDate}
              placeholder="AAAA-MM-DD"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 2 }]}>
            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
              Nome do Feriado
            </ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
              value={newHolidayName}
              onChangeText={setNewHolidayName}
              placeholder="Ex: Natal"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <Pressable
            style={[styles.addButton, { backgroundColor: BrandColors.primary }]}
            onPress={addHoliday}
          >
            <Feather name="plus" size={20} color="#000000" />
          </Pressable>
        </View>

        <View style={styles.holidaysList}>
          {holidays.map((holiday) => (
            <View key={holiday.id} style={[styles.holidayItem, { backgroundColor: theme.backgroundRoot }]}>
              <View style={{ flex: 1 }}>
                <ThemedText type="body" style={{ fontWeight: '600' }}>
                  {holiday.name}
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary, marginTop: 2 }}>
                  {new Date(holiday.date).toLocaleDateString('pt-PT', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </ThemedText>
              </View>
              <Pressable
                style={[styles.removeButton, { backgroundColor: '#EF4444' + '20' }]}
                onPress={() => removeHoliday(holiday.id)}
              >
                <Feather name="trash-2" size={16} color="#EF4444" />
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.sm }}>
          Subscrições
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.md }}>
          Gerir preços das subscrições disponíveis
        </ThemedText>

        <View style={styles.subscriptionsContainer}>
          {subscriptions.map((sub) => (
            <View key={sub.tier} style={[styles.subscriptionCard, { backgroundColor: theme.backgroundRoot }]}>
              <View style={{ flex: 1 }}>
                <ThemedText type="body" style={{ fontWeight: '600', marginBottom: 4 }}>
                  {sub.name}
                </ThemedText>
                <View style={styles.priceInputContainer}>
                  <ThemedText type="small" style={{ color: theme.textSecondary, marginRight: 4 }}>
                    €
                  </ThemedText>
                  <TextInput
                    style={[styles.priceInput, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
                    value={sub.monthlyPrice.toFixed(2)}
                    onChangeText={(value) => updateSubscriptionPrice(sub.tier, value)}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor={theme.textSecondary}
                  />
                  <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>
                    /mês
                  </ThemedText>
                </View>
              </View>
              <Pressable
                style={[styles.updateButton, { backgroundColor: BrandColors.primary }]}
                onPress={() => handleUpdateSubscription(sub.name)}
              >
                <Feather name="check" size={16} color="#000000" />
                <ThemedText type="small" style={{ color: "#000000", fontWeight: '600' }}>
                  Atualizar
                </ThemedText>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={[styles.saveButton, { backgroundColor: BrandColors.primary }]}
        onPress={handleSave}
      >
        <Feather name="check" size={20} color="#000000" />
        <ThemedText type="body" style={{ color: "#000000", fontWeight: '700' }}>
          Salvar Configurações
        </ThemedText>
      </Pressable>
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
  hoursEditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    fontSize: 14,
    width: 60,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
  },
  addHolidayForm: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    alignItems: 'flex-end',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  holidaysList: {
    gap: Spacing.sm,
  },
  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  subscriptionsContainer: {
    gap: Spacing.md,
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceInput: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
});

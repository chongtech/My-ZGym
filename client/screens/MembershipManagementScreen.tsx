import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/context/AuthContext';
import { MembershipPlan, MembershipTier } from '@/types/payment';
import { ProfileStackParamList } from '@/navigation/ProfileStackNavigator';

type Props = NativeStackScreenProps<ProfileStackParamList, 'MembershipManagement'>;

// Mock membership plans data
const membershipPlans: MembershipPlan[] = [
  {
    tier: 'z-junior',
    name: 'Z-Junior',
    description: 'Ideal para jovens atletas',
    features: [
      'Acesso ilimitado ao ginásio',
      'Aulas de grupo incluídas',
      'Programa de treino personalizado',
      'Apenas para menores de 18 anos',
    ],
    monthlyPrice: 29.99,
    annualPrice: 299.99,
    currency: 'EUR',
    ageRestriction: { max: 17 },
  },
  {
    tier: 'z-weekend',
    name: 'Z-Weekend',
    description: 'Perfeito para quem treina ao fim de semana',
    features: [
      'Acesso ao ginásio aos fins de semana',
      'Aulas de grupo aos sábados e domingos',
      'Programa de treino básico',
      '2 aulas de grupo por semana',
    ],
    monthlyPrice: 34.99,
    annualPrice: 349.99,
    currency: 'EUR',
    weekendOnly: true,
    maxClassesPerWeek: 2,
  },
  {
    tier: 'z-total',
    name: 'Z-Total',
    description: 'Acesso completo e ilimitado',
    features: [
      'Acesso ilimitado 24/7',
      'Todas as aulas de grupo',
      'Programa de treino personalizado',
      'Avaliações físicas trimestrais',
      'Acesso a todas as zonas',
      'Suporte prioritário',
    ],
    monthlyPrice: 49.99,
    annualPrice: 499.99,
    currency: 'EUR',
    popular: true,
  },
  {
    tier: 'z-senior',
    name: 'Z-Senior',
    description: 'Especial para a melhor idade',
    features: [
      'Acesso ao ginásio (6h-18h)',
      'Aulas específicas para seniors',
      'Programa de treino adaptado',
      'Acompanhamento personalizado',
      'Apenas para maiores de 60 anos',
    ],
    monthlyPrice: 39.99,
    annualPrice: 399.99,
    currency: 'EUR',
    ageRestriction: { min: 60 },
  },
];

export default function MembershipManagementScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const currentPlan = membershipPlans.find((plan) => plan.tier === user?.membershipTier);

  const handleSelectPlan = (plan: MembershipPlan) => {
    if (plan.tier === user?.membershipTier) {
      Alert.alert(
        'Plano Atual',
        'Este já é o seu plano atual.',
        [{ text: 'OK' }]
      );
      return;
    }

    const isUpgrade = getPlanPrice(plan) > getPlanPrice(currentPlan!);
    const changeType = isUpgrade ? 'Upgrade' : 'Downgrade';

    Alert.alert(
      `${changeType} de Plano`,
      `Deseja alterar do plano ${currentPlan?.name} para ${plan.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: () => {
            navigation.navigate('PaymentMethods', {
              planTier: plan.tier,
              amount: billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice,
              billingCycle,
              changeType: isUpgrade ? 'upgrade' : 'downgrade',
            });
          },
        },
      ]
    );
  };

  const getPlanPrice = (plan: MembershipPlan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
  };

  const renderPlanCard = (plan: MembershipPlan) => {
    const isCurrentPlan = plan.tier === user?.membershipTier;
    const price = getPlanPrice(plan);

    return (
      <View
        key={plan.tier}
        style={[
          styles.planCard,
          { backgroundColor: theme.colors.card },
          isCurrentPlan && {
            borderColor: theme.colors.primary,
            borderWidth: 2,
          },
          plan.popular && !isCurrentPlan && {
            borderColor: theme.colors.warning,
            borderWidth: 1,
          },
        ]}
      >
        {plan.popular && !isCurrentPlan && (
          <View style={[styles.popularBadge, { backgroundColor: theme.colors.warning }]}>
            <Text style={styles.popularText}>POPULAR</Text>
          </View>
        )}

        {isCurrentPlan && (
          <View style={[styles.currentBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.currentText}>PLANO ATUAL</Text>
          </View>
        )}

        <Text style={[styles.planName, { color: theme.colors.text }]}>{plan.name}</Text>
        <Text style={[styles.planDescription, { color: theme.colors.textSecondary }]}>
          {plan.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={[styles.priceAmount, { color: theme.colors.text }]}>
            {price.toFixed(2)}€
          </Text>
          <Text style={[styles.pricePeriod, { color: theme.colors.textSecondary }]}>
            /{billingCycle === 'monthly' ? 'mês' : 'ano'}
          </Text>
        </View>

        {billingCycle === 'annual' && (
          <Text style={[styles.savingsText, { color: theme.colors.success }]}>
            Poupa {(plan.monthlyPrice * 12 - plan.annualPrice).toFixed(2)}€ por ano
          </Text>
        )}

        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Feather
                name="check-circle"
                size={16}
                color={isCurrentPlan ? theme.colors.primary : theme.colors.success}
              />
              <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.selectButton,
            {
              backgroundColor: isCurrentPlan
                ? theme.colors.surface
                : theme.colors.primary,
            },
            isCurrentPlan && { opacity: 0.6 },
          ]}
          onPress={() => handleSelectPlan(plan)}
          disabled={isCurrentPlan}
        >
          <Text
            style={[
              styles.selectButtonText,
              {
                color: isCurrentPlan ? theme.colors.textSecondary : '#FFFFFF',
              },
            ]}
          >
            {isCurrentPlan ? 'Plano Atual' : 'Selecionar Plano'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Gerir Membership
        </Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Plan Info */}
        <View style={[styles.currentPlanInfo, { backgroundColor: theme.colors.card }]}>
          <View style={styles.currentPlanHeader}>
            <Feather name="credit-card" size={24} color={theme.colors.primary} />
            <View style={styles.currentPlanDetails}>
              <Text style={[styles.currentPlanLabel, { color: theme.colors.textSecondary }]}>
                Plano Atual
              </Text>
              <Text style={[styles.currentPlanName, { color: theme.colors.text }]}>
                {currentPlan?.name}
              </Text>
            </View>
          </View>
          <View style={styles.expiryInfo}>
            <Feather name="calendar" size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.expiryText, { color: theme.colors.textSecondary }]}>
              Renova em:{' '}
              {new Date(user?.membershipExpiry || '').toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Billing Cycle Toggle */}
        <View style={styles.billingToggleContainer}>
          <Text style={[styles.billingToggleLabel, { color: theme.colors.text }]}>
            Ciclo de Pagamento
          </Text>
          <View style={[styles.billingToggle, { backgroundColor: theme.colors.surface }]}>
            <TouchableOpacity
              style={[
                styles.billingOption,
                billingCycle === 'monthly' && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => setBillingCycle('monthly')}
            >
              <Text
                style={[
                  styles.billingOptionText,
                  {
                    color:
                      billingCycle === 'monthly' ? '#FFFFFF' : theme.colors.textSecondary,
                  },
                ]}
              >
                Mensal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.billingOption,
                billingCycle === 'annual' && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => setBillingCycle('annual')}
            >
              <Text
                style={[
                  styles.billingOptionText,
                  {
                    color:
                      billingCycle === 'annual' ? '#FFFFFF' : theme.colors.textSecondary,
                  },
                ]}
              >
                Anual
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {membershipPlans.map((plan) => renderPlanCard(plan))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  currentPlanInfo: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  currentPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPlanDetails: {
    marginLeft: 12,
    flex: 1,
  },
  currentPlanLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  currentPlanName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expiryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    fontSize: 13,
    marginLeft: 6,
  },
  billingToggleContainer: {
    marginBottom: 24,
  },
  billingToggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  billingToggle: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
  },
  billingOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  billingOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    borderRadius: 12,
    padding: 20,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  currentBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  pricePeriod: {
    fontSize: 16,
    marginLeft: 4,
  },
  savingsText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuresContainer: {
    marginBottom: 20,
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  selectButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

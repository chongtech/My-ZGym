import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTheme } from '@/hooks/useTheme';
import { PaymentMethod, PaymentMethodDetails } from '@/types/payment';
import { ProfileStackParamList } from '@/navigation/ProfileStackNavigator';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PaymentMethods'>;

// Available payment methods
const paymentMethods: PaymentMethodDetails[] = [
  {
    type: 'mbway',
    label: 'MB WAY',
    icon: 'smartphone',
    description: 'Pagamento instantâneo através do seu telemóvel',
    processingTime: 'Imediato',
    enabled: true,
  },
  {
    type: 'bank_transfer',
    label: 'Transferência Bancária',
    icon: 'credit-card',
    description: 'Transferência para a conta bancária do ginásio',
    processingTime: '1-2 dias úteis',
    enabled: true,
  },
  {
    type: 'google_pay',
    label: 'Google Pay',
    icon: 'dollar-sign',
    description: 'Pagamento rápido e seguro com Google Pay',
    processingTime: 'Imediato',
    enabled: true,
  },
];

export default function PaymentMethodsScreen({ route, navigation }: Props) {
  const { theme } = useTheme();
  const { planTier, amount, billingCycle, changeType } = route.params;

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Bank transfer info (mock data - would come from backend)
  const bankTransferInfo = {
    iban: 'PT50 0002 0123 1234 5678 9015 4',
    accountHolder: 'Z-GYM Academia, Lda',
    bankName: 'Caixa Geral de Depósitos',
    reference: `ZGYM${Date.now().toString().slice(-8)}`,
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      Alert.alert('Erro', 'Por favor selecione um método de pagamento.');
      return;
    }

    // Validate MBWay phone number
    if (selectedMethod === 'mbway') {
      if (!phoneNumber || phoneNumber.length !== 9) {
        Alert.alert('Erro', 'Por favor insira um número de telemóvel válido (9 dígitos).');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);

      if (selectedMethod === 'mbway') {
        Alert.alert(
          'Pagamento Enviado',
          `Foi enviado um pedido de pagamento MB WAY para o número ${phoneNumber}. Por favor confirme no seu telemóvel.`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back to profile with success
                navigation.navigate('Profile');
                Alert.alert(
                  'Sucesso',
                  `${changeType === 'upgrade' ? 'Upgrade' : 'Downgrade'} de plano concluído com sucesso!`
                );
              },
            },
          ]
        );
      } else if (selectedMethod === 'bank_transfer') {
        Alert.alert(
          'Transferência Bancária',
          'Por favor efetue a transferência para os dados fornecidos. O seu plano será ativado após confirmação do pagamento (1-2 dias úteis).',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Profile'),
            },
          ]
        );
      } else if (selectedMethod === 'google_pay') {
        // In a real app, this would trigger Google Pay SDK
        Alert.alert(
          'Pagamento Concluído',
          'Pagamento processado com sucesso através do Google Pay!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Profile');
                Alert.alert(
                  'Sucesso',
                  `${changeType === 'upgrade' ? 'Upgrade' : 'Downgrade'} de plano concluído com sucesso!`
                );
              },
            },
          ]
        );
      }
    }, 2000);
  };

  const renderPaymentMethodCard = (method: PaymentMethodDetails) => {
    const isSelected = selectedMethod === method.type;

    return (
      <TouchableOpacity
        key={method.type}
        style={[
          styles.methodCard,
          { backgroundColor: theme.colors.card },
          isSelected && {
            borderColor: theme.colors.primary,
            borderWidth: 2,
          },
        ]}
        onPress={() => setSelectedMethod(method.type)}
        disabled={!method.enabled}
      >
        <View style={styles.methodHeader}>
          <View style={styles.methodIcon}>
            <Feather
              name={method.icon as any}
              size={24}
              color={isSelected ? theme.colors.primary : theme.colors.text}
            />
          </View>
          <View style={styles.methodInfo}>
            <Text style={[styles.methodLabel, { color: theme.colors.text }]}>
              {method.label}
            </Text>
            <Text style={[styles.methodDescription, { color: theme.colors.textSecondary }]}>
              {method.description}
            </Text>
            <View style={styles.processingTime}>
              <Feather name="clock" size={12} color={theme.colors.textSecondary} />
              <Text style={[styles.processingTimeText, { color: theme.colors.textSecondary }]}>
                {method.processingTime}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.radioButton,
              { borderColor: isSelected ? theme.colors.primary : theme.colors.border },
              isSelected && { backgroundColor: theme.colors.primary },
            ]}
          >
            {isSelected && <Feather name="check" size={16} color="#FFFFFF" />}
          </View>
        </View>

        {/* MBWay Phone Input */}
        {isSelected && method.type === 'mbway' && (
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
              Número de Telemóvel
            </Text>
            <View style={[styles.phoneInputWrapper, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.phonePrefix, { color: theme.colors.text }]}>+351</Text>
              <TextInput
                style={[styles.phoneInput, { color: theme.colors.text }]}
                placeholder="9XX XXX XXX"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="phone-pad"
                maxLength={9}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>
        )}

        {/* Bank Transfer Info */}
        {isSelected && method.type === 'bank_transfer' && (
          <View style={styles.bankInfoContainer}>
            <Text style={[styles.bankInfoTitle, { color: theme.colors.text }]}>
              Dados para Transferência
            </Text>
            <View style={styles.bankInfoRow}>
              <Text style={[styles.bankInfoLabel, { color: theme.colors.textSecondary }]}>
                IBAN:
              </Text>
              <Text style={[styles.bankInfoValue, { color: theme.colors.text }]}>
                {bankTransferInfo.iban}
              </Text>
            </View>
            <View style={styles.bankInfoRow}>
              <Text style={[styles.bankInfoLabel, { color: theme.colors.textSecondary }]}>
                Titular:
              </Text>
              <Text style={[styles.bankInfoValue, { color: theme.colors.text }]}>
                {bankTransferInfo.accountHolder}
              </Text>
            </View>
            <View style={styles.bankInfoRow}>
              <Text style={[styles.bankInfoLabel, { color: theme.colors.textSecondary }]}>
                Banco:
              </Text>
              <Text style={[styles.bankInfoValue, { color: theme.colors.text }]}>
                {bankTransferInfo.bankName}
              </Text>
            </View>
            <View style={styles.bankInfoRow}>
              <Text style={[styles.bankInfoLabel, { color: theme.colors.textSecondary }]}>
                Referência:
              </Text>
              <Text style={[styles.bankInfoValue, { color: theme.colors.primary }]}>
                {bankTransferInfo.reference}
              </Text>
            </View>
            <View style={[styles.warningBox, { backgroundColor: theme.colors.warning + '20' }]}>
              <Feather name="alert-circle" size={16} color={theme.colors.warning} />
              <Text style={[styles.warningText, { color: theme.colors.warning }]}>
                Inclua sempre a referência na transferência
              </Text>
            </View>
          </View>
        )}

        {/* Google Pay Info */}
        {isSelected && method.type === 'google_pay' && (
          <View style={styles.googlePayInfo}>
            <Feather name="shield" size={20} color={theme.colors.success} />
            <Text style={[styles.googlePayText, { color: theme.colors.textSecondary }]}>
              Pagamento seguro através do Google Pay. Será redirecionado para completar o pagamento.
            </Text>
          </View>
        )}
      </TouchableOpacity>
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
          Método de Pagamento
        </Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Payment Summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
            Resumo do Pagamento
          </Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Tipo de Alteração
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {changeType === 'upgrade' ? 'Upgrade' : 'Downgrade'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Ciclo de Pagamento
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {billingCycle === 'monthly' ? 'Mensal' : 'Anual'}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryTotal, { color: theme.colors.text }]}>Total</Text>
            <Text style={[styles.summaryAmount, { color: theme.colors.primary }]}>
              {amount.toFixed(2)}€
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Selecione o Método de Pagamento
        </Text>
        <View style={styles.methodsContainer}>
          {paymentMethods.map((method) => renderPaymentMethodCard(method))}
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={[styles.bottomBar, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity
          style={[
            styles.payButton,
            { backgroundColor: theme.colors.primary },
            (!selectedMethod || isProcessing) && { opacity: 0.5 },
          ]}
          onPress={handlePayment}
          disabled={!selectedMethod || isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.payButtonText}>
              Confirmar Pagamento - {amount.toFixed(2)}€
            </Text>
          )}
        </TouchableOpacity>
      </View>
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
  summaryCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 12,
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  methodsContainer: {
    gap: 16,
    marginBottom: 100,
  },
  methodCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(100, 73, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 13,
    marginBottom: 6,
  },
  processingTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  processingTimeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  phonePrefix: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  bankInfoContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  bankInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bankInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bankInfoLabel: {
    fontSize: 13,
  },
  bankInfoValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  warningText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  googlePayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  googlePayText: {
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  payButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

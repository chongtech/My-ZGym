import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/context/AuthContext';
import { PhysicalAssessment, PerformanceTest } from '@/types/assessment';
import { mockPhysicalAssessments } from '@/data/mockData';

const screenWidth = Dimensions.get('window').width;

export default function MemberAssessmentsScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'progress'>('overview');

  // Filter assessments for current user
  const userAssessments = mockPhysicalAssessments
    .filter((assessment) => assessment.memberId === user?.id)
    .sort((a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime());

  const latestAssessment = userAssessments[0];
  const initialAssessment = userAssessments.find((a) => a.assessmentType === 'initial');

  // Calculate progress metrics
  const weightChange = initialAssessment && latestAssessment
    ? latestAssessment.bodyComposition.weight - initialAssessment.bodyComposition.weight
    : 0;

  const bodyFatChange = initialAssessment?.bodyComposition.bodyFatPercentage &&
    latestAssessment?.bodyComposition.bodyFatPercentage
    ? latestAssessment.bodyComposition.bodyFatPercentage - initialAssessment.bodyComposition.bodyFatPercentage
    : 0;

  const renderOverview = () => {
    if (!latestAssessment) {
      return (
        <View style={styles.emptyState}>
          <Feather name="clipboard" size={64} color={theme.colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Sem Avaliações
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            Entre em contato com seu instrutor para agendar sua primeira avaliação física.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Latest Assessment Date */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Última Avaliação
          </Text>
          <Text style={[styles.dateText, { color: theme.colors.primary }]}>
            {new Date(latestAssessment.assessmentDate).toLocaleDateString('pt-PT', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text style={[styles.assessmentType, { color: theme.colors.textSecondary }]}>
            {latestAssessment.assessmentType === 'initial' ? 'Avaliação Inicial' : 'Avaliação de Progresso'}
          </Text>
        </View>

        {/* Body Composition */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Composição Corporal
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {latestAssessment.bodyComposition.weight} kg
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Peso</Text>
              {weightChange !== 0 && (
                <Text style={[styles.changeText, { color: weightChange < 0 ? theme.colors.success : theme.colors.error }]}>
                  {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
                </Text>
              )}
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {latestAssessment.bodyComposition.bmi.toFixed(1)}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>IMC</Text>
            </View>
            {latestAssessment.bodyComposition.bodyFatPercentage && (
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {latestAssessment.bodyComposition.bodyFatPercentage}%
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  Gordura Corporal
                </Text>
                {bodyFatChange !== 0 && (
                  <Text style={[styles.changeText, { color: bodyFatChange < 0 ? theme.colors.success : theme.colors.error }]}>
                    {bodyFatChange > 0 ? '+' : ''}{bodyFatChange.toFixed(1)}%
                  </Text>
                )}
              </View>
            )}
            {latestAssessment.bodyComposition.muscleMassPercentage && (
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {latestAssessment.bodyComposition.muscleMassPercentage}%
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  Massa Muscular
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Body Measurements */}
        {Object.keys(latestAssessment.bodyMeasurements).length > 0 && (
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Medidas Corporais
            </Text>
            <View style={styles.measurementsList}>
              {latestAssessment.bodyMeasurements.chest && (
                <View style={styles.measurementRow}>
                  <Text style={[styles.measurementLabel, { color: theme.colors.textSecondary }]}>
                    Peito
                  </Text>
                  <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                    {latestAssessment.bodyMeasurements.chest} cm
                  </Text>
                </View>
              )}
              {latestAssessment.bodyMeasurements.waist && (
                <View style={styles.measurementRow}>
                  <Text style={[styles.measurementLabel, { color: theme.colors.textSecondary }]}>
                    Cintura
                  </Text>
                  <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                    {latestAssessment.bodyMeasurements.waist} cm
                  </Text>
                </View>
              )}
              {latestAssessment.bodyMeasurements.hips && (
                <View style={styles.measurementRow}>
                  <Text style={[styles.measurementLabel, { color: theme.colors.textSecondary }]}>
                    Quadril
                  </Text>
                  <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                    {latestAssessment.bodyMeasurements.hips} cm
                  </Text>
                </View>
              )}
              {latestAssessment.bodyMeasurements.leftArm && (
                <View style={styles.measurementRow}>
                  <Text style={[styles.measurementLabel, { color: theme.colors.textSecondary }]}>
                    Braço Esquerdo
                  </Text>
                  <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                    {latestAssessment.bodyMeasurements.leftArm} cm
                  </Text>
                </View>
              )}
              {latestAssessment.bodyMeasurements.rightArm && (
                <View style={styles.measurementRow}>
                  <Text style={[styles.measurementLabel, { color: theme.colors.textSecondary }]}>
                    Braço Direito
                  </Text>
                  <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                    {latestAssessment.bodyMeasurements.rightArm} cm
                  </Text>
                </View>
              )}
              {latestAssessment.bodyMeasurements.leftThigh && (
                <View style={styles.measurementRow}>
                  <Text style={[styles.measurementLabel, { color: theme.colors.textSecondary }]}>
                    Coxa Esquerda
                  </Text>
                  <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                    {latestAssessment.bodyMeasurements.leftThigh} cm
                  </Text>
                </View>
              )}
              {latestAssessment.bodyMeasurements.rightThigh && (
                <View style={styles.measurementRow}>
                  <Text style={[styles.measurementLabel, { color: theme.colors.textSecondary }]}>
                    Coxa Direita
                  </Text>
                  <Text style={[styles.measurementValue, { color: theme.colors.text }]}>
                    {latestAssessment.bodyMeasurements.rightThigh} cm
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Performance Tests */}
        {latestAssessment.performanceTests.length > 0 && (
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Testes de Performance
            </Text>
            <View style={styles.performanceList}>
              {latestAssessment.performanceTests.map((test) => (
                <View key={test.id} style={styles.performanceRow}>
                  <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                    {test.testType === 'Custom' ? test.customTestName : test.testType}
                  </Text>
                  <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
                    {test.value} {test.unit}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Instructor Notes */}
        {latestAssessment.instructorNotes && (
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Observações do Instrutor
            </Text>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>
              {latestAssessment.instructorNotes}
            </Text>
          </View>
        )}

        {/* Recommendations */}
        {latestAssessment.recommendations && (
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Recomendações
            </Text>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>
              {latestAssessment.recommendations}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderHistory = () => {
    if (userAssessments.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Feather name="list" size={64} color={theme.colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Sem Histórico
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            Suas avaliações anteriores aparecerão aqui.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {userAssessments.map((assessment) => (
          <TouchableOpacity
            key={assessment.id}
            style={[styles.historyCard, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.historyHeader}>
              <View>
                <Text style={[styles.historyDate, { color: theme.colors.text }]}>
                  {new Date(assessment.assessmentDate).toLocaleDateString('pt-PT', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
                <Text style={[styles.historyType, { color: theme.colors.textSecondary }]}>
                  {assessment.assessmentType === 'initial' ? 'Inicial' : 'Progresso'}
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color={theme.colors.textSecondary} />
            </View>
            <View style={styles.historyStats}>
              <View style={styles.historyStat}>
                <Text style={[styles.historyStatValue, { color: theme.colors.text }]}>
                  {assessment.bodyComposition.weight} kg
                </Text>
                <Text style={[styles.historyStatLabel, { color: theme.colors.textSecondary }]}>
                  Peso
                </Text>
              </View>
              {assessment.bodyComposition.bodyFatPercentage && (
                <View style={styles.historyStat}>
                  <Text style={[styles.historyStatValue, { color: theme.colors.text }]}>
                    {assessment.bodyComposition.bodyFatPercentage}%
                  </Text>
                  <Text style={[styles.historyStatLabel, { color: theme.colors.textSecondary }]}>
                    Gordura
                  </Text>
                </View>
              )}
              <View style={styles.historyStat}>
                <Text style={[styles.historyStatValue, { color: theme.colors.text }]}>
                  {assessment.bodyComposition.bmi.toFixed(1)}
                </Text>
                <Text style={[styles.historyStatLabel, { color: theme.colors.textSecondary }]}>
                  IMC
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderProgress = () => {
    if (userAssessments.length < 2) {
      return (
        <View style={styles.emptyState}>
          <Feather name="trending-up" size={64} color={theme.colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Dados Insuficientes
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            São necessárias pelo menos 2 avaliações para visualizar o progresso.
          </Text>
        </View>
      );
    }

    // Prepare chart data (reverse to show oldest to newest)
    const chartAssessments = [...userAssessments].reverse();
    const weightData = chartAssessments.map((a) => a.bodyComposition.weight);
    const labels = chartAssessments.map((a) =>
      new Date(a.assessmentDate).toLocaleDateString('pt-PT', { month: 'short' })
    );

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Weight Progress Chart */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Evolução de Peso
          </Text>
          <LineChart
            data={{
              labels,
              datasets: [
                {
                  data: weightData,
                },
              ],
            }}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              backgroundColor: theme.colors.card,
              backgroundGradientFrom: theme.colors.card,
              backgroundGradientTo: theme.colors.card,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(100, 73, 255, ${opacity})`,
              labelColor: (opacity = 1) => theme.colors.textSecondary,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: theme.colors.primary,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Summary Stats */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Resumo de Progresso
          </Text>
          <View style={styles.progressSummary}>
            <View style={styles.progressItem}>
              <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                Total de Avaliações
              </Text>
              <Text style={[styles.progressValue, { color: theme.colors.text }]}>
                {userAssessments.length}
              </Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                Mudança de Peso
              </Text>
              <Text
                style={[
                  styles.progressValue,
                  { color: weightChange < 0 ? theme.colors.success : theme.colors.error },
                ]}
              >
                {weightChange > 0 ? '+' : ''}
                {weightChange.toFixed(1)} kg
              </Text>
            </View>
            {bodyFatChange !== 0 && (
              <View style={styles.progressItem}>
                <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                  Mudança de Gordura
                </Text>
                <Text
                  style={[
                    styles.progressValue,
                    { color: bodyFatChange < 0 ? theme.colors.success : theme.colors.error },
                  ]}
                >
                  {bodyFatChange > 0 ? '+' : ''}
                  {bodyFatChange.toFixed(1)}%
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Minhas Avaliações
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={[styles.tabContainer, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'overview' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
          ]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === 'overview' ? theme.colors.primary : theme.colors.textSecondary },
            ]}
          >
            Resumo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'history' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
          ]}
          onPress={() => setSelectedTab('history')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === 'history' ? theme.colors.primary : theme.colors.textSecondary },
            ]}
          >
            Histórico
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'progress' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
          ]}
          onPress={() => setSelectedTab('progress')}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === 'progress' ? theme.colors.primary : theme.colors.textSecondary },
            ]}
          >
            Progresso
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'history' && renderHistory()}
      {selectedTab === 'progress' && renderProgress()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  assessmentType: {
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  measurementsList: {
    gap: 12,
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  measurementLabel: {
    fontSize: 14,
  },
  measurementValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  performanceList: {
    gap: 12,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  performanceLabel: {
    fontSize: 14,
    flex: 1,
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
  },
  historyCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyType: {
    fontSize: 12,
    marginTop: 2,
  },
  historyStats: {
    flexDirection: 'row',
    gap: 16,
  },
  historyStat: {
    flex: 1,
  },
  historyStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyStatLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  progressSummary: {
    gap: 16,
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

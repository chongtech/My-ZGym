import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, BorderRadius, BrandColors } from '@/constants/theme';
import { mockInstructorClients, mockPhysicalAssessments } from '@/data/mockData';
import type { InstructorAssessmentsStackParamList } from '@/navigation/InstructorAssessmentsStackNavigator';

type AssessmentDetailRouteProp = RouteProp<InstructorAssessmentsStackParamList, 'AssessmentDetail'>;
type NavigationProp = NativeStackNavigationProp<InstructorAssessmentsStackParamList>;

export default function AssessmentDetailScreen() {
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();
    const { theme } = useTheme();
    const route = useRoute<AssessmentDetailRouteProp>();
    const navigation = useNavigation<NavigationProp>();

    const { memberId } = route.params;
    const member = mockInstructorClients.find((c) => c.id === memberId);

    const [selectedView, setSelectedView] = useState<'timeline' | 'comparison'>('timeline');

    if (!member) {
        return (
            <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
                <ThemedText>Membro não encontrado</ThemedText>
            </View>
        );
    }

    // Filter and sort assessments
    const memberAssessments = mockPhysicalAssessments
        .filter((a) => a.memberId === memberId)
        .sort((a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime());

    if (memberAssessments.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: theme.backgroundRoot, justifyContent: 'center', alignItems: 'center' }]}>
                <ThemedText>Nenhuma avaliação encontrada para este membro.</ThemedText>
            </View>
        );
    }

    const latestAssessment = memberAssessments[0];
    const firstAssessment = memberAssessments[memberAssessments.length - 1];

    const currentWeight = latestAssessment.bodyComposition.weight;
    const initialWeight = firstAssessment.bodyComposition.weight;
    const weightChange = currentWeight - initialWeight;

    const currentBodyFat = latestAssessment.bodyComposition.bodyFatPercentage || 0;
    const initialBodyFat = firstAssessment.bodyComposition.bodyFatPercentage || 0;
    const bodyFatChange = currentBodyFat - initialBodyFat;

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: headerHeight + Spacing.lg,
                    paddingBottom: insets.bottom + Spacing.xl * 2,
                    paddingHorizontal: Spacing.lg,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Member Header */}
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <View style={styles.memberHeader}>
                        <View style={[styles.avatar, { backgroundColor: BrandColors.primary + '20' }]}>
                            <Feather name="user" size={32} color={BrandColors.primary} />
                        </View>
                        <View style={{ marginLeft: Spacing.md, flex: 1 }}>
                            <ThemedText type="h4">{member.fullName}</ThemedText>
                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                {memberAssessments.length} avaliações realizadas
                            </ThemedText>
                        </View>
                    </View>
                </Card>

                {/* Progress Summary */}
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                        Progresso Total
                    </ThemedText>

                    <View style={styles.progressGrid}>
                        <View style={styles.progressItem}>
                            <View style={styles.progressIconContainer}>
                                <Feather
                                    name={weightChange < 0 ? 'trending-down' : 'trending-up'}
                                    size={20}
                                    color={weightChange < 0 ? BrandColors.success : BrandColors.primary}
                                />
                            </View>
                            <ThemedText type="h3" style={{ marginTop: Spacing.xs }}>
                                {weightChange > 0 ? '+' : ''}
                                {weightChange.toFixed(1)} kg
                            </ThemedText>
                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                Peso
                            </ThemedText>
                        </View>

                        <View style={styles.progressItem}>
                            <View style={styles.progressIconContainer}>
                                <Feather
                                    name={bodyFatChange < 0 ? 'trending-down' : 'trending-up'}
                                    size={20}
                                    color={bodyFatChange < 0 ? BrandColors.success : BrandColors.primary}
                                />
                            </View>
                            <ThemedText type="h3" style={{ marginTop: Spacing.xs }}>
                                {bodyFatChange > 0 ? '+' : ''}
                                {bodyFatChange.toFixed(1)}%
                            </ThemedText>
                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                Gordura
                            </ThemedText>
                        </View>

                        <View style={styles.progressItem}>
                            <View style={styles.progressIconContainer}>
                                <Feather name="calendar" size={20} color={BrandColors.primary} />
                            </View>
                            <ThemedText type="h3" style={{ marginTop: Spacing.xs }}>
                                {Math.round(
                                    (new Date(latestAssessment.assessmentDate).getTime() - new Date(firstAssessment.assessmentDate).getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}{' '}
                                dias
                            </ThemedText>
                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                Período
                            </ThemedText>
                        </View>
                    </View>
                </Card>

                {/* View Toggle */}
                <View style={[styles.toggleContainer, { backgroundColor: theme.backgroundSecondary, marginBottom: Spacing.lg }]}>
                    <Pressable
                        style={[styles.toggleButton, selectedView === 'timeline' && { backgroundColor: BrandColors.primary }]}
                        onPress={() => setSelectedView('timeline')}
                    >
                        <ThemedText
                            type="small"
                            style={{
                                fontWeight: '600',
                                color: selectedView === 'timeline' ? theme.text : theme.textSecondary,
                            }}
                        >
                            Linha do Tempo
                        </ThemedText>
                    </Pressable>
                    <Pressable
                        style={[styles.toggleButton, selectedView === 'comparison' && { backgroundColor: BrandColors.primary }]}
                        onPress={() => setSelectedView('comparison')}
                    >
                        <ThemedText
                            type="small"
                            style={{
                                fontWeight: '600',
                                color: selectedView === 'comparison' ? theme.text : theme.textSecondary,
                            }}
                        >
                            Comparação
                        </ThemedText>
                    </Pressable>
                </View>

                {/* Timeline View */}
                {selectedView === 'timeline' && (
                    <>
                        {memberAssessments.map((assessment, index) => (
                            <Pressable
                                key={assessment.id}
                                onPress={() => navigation.navigate('AssessmentBuilder', { memberId, assessmentId: assessment.id })}
                                style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
                            >
                                <Card elevation={1} style={{ marginBottom: Spacing.md }}>
                                    <View style={styles.assessmentHeader}>
                                        <View style={styles.dateContainer}>
                                            <Feather name="calendar" size={16} color={theme.textSecondary} />
                                            <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: Spacing.xs }}>
                                                {new Date(assessment.assessmentDate).toLocaleDateString('pt-PT', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </ThemedText>
                                            <Feather name="edit-2" size={12} color={theme.textSecondary} style={{ marginLeft: Spacing.sm }} />
                                        </View>
                                        {index === 0 && (
                                            <View style={[styles.badge, { backgroundColor: BrandColors.primary + '20' }]}>
                                                <ThemedText type="small" style={{ color: BrandColors.primary, fontWeight: '600' }}>
                                                    Mais Recente
                                                </ThemedText>
                                            </View>
                                        )}
                                    </View>

                                    <View style={styles.metricsGrid}>
                                        <View style={styles.metric}>
                                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                                Peso
                                            </ThemedText>
                                            <ThemedText type="body" style={{ fontWeight: '600' }}>
                                                {assessment.bodyComposition.weight} kg
                                            </ThemedText>
                                        </View>
                                        <View style={styles.metric}>
                                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                                Gordura
                                            </ThemedText>
                                            <ThemedText type="body" style={{ fontWeight: '600' }}>
                                                {assessment.bodyComposition.bodyFatPercentage ?? '-'}%
                                            </ThemedText>
                                        </View>
                                        <View style={styles.metric}>
                                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                                Músculo
                                            </ThemedText>
                                            <ThemedText type="body" style={{ fontWeight: '600' }}>
                                                {assessment.bodyComposition.muscleMassPercentage ?? '-'}%
                                            </ThemedText>
                                        </View>
                                    </View>

                                    {/* Only show measurements if they exist */}
                                    {(assessment.bodyMeasurements.chest || assessment.bodyMeasurements.waist || assessment.bodyMeasurements.hips) && (
                                        <>
                                            <View style={[styles.divider, { backgroundColor: theme.border }]} />
                                            <View style={styles.measurementsRow}>
                                                <View style={styles.measurement}>
                                                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                                        Peito
                                                    </ThemedText>
                                                    <ThemedText type="small">{assessment.bodyMeasurements.chest ?? '-'} cm</ThemedText>
                                                </View>
                                                <View style={styles.measurement}>
                                                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                                        Cintura
                                                    </ThemedText>
                                                    <ThemedText type="small">{assessment.bodyMeasurements.waist ?? '-'} cm</ThemedText>
                                                </View>
                                                <View style={styles.measurement}>
                                                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                                        Quadril
                                                    </ThemedText>
                                                    <ThemedText type="small">{assessment.bodyMeasurements.hips ?? '-'} cm</ThemedText>
                                                </View>
                                            </View>
                                        </>
                                    )}
                                </Card>
                            </Pressable>
                        ))}
                    </>
                )}

                {/* Comparison View */}
                {selectedView === 'comparison' && (
                    <Card elevation={1}>
                        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                            Comparação: Inicial vs. Atual
                        </ThemedText>

                        <View style={styles.comparisonRow}>
                            <View style={{ flex: 1 }}>
                                <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.xs }}>
                                    Inicial ({new Date(firstAssessment.assessmentDate).toLocaleDateString('pt-PT')})
                                </ThemedText>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.xs }}>
                                    Atual ({new Date(latestAssessment.assessmentDate).toLocaleDateString('pt-PT')})
                                </ThemedText>
                            </View>
                        </View>

                        <View style={[styles.divider, { backgroundColor: theme.border }]} />

                        <View style={styles.comparisonMetric}>
                            <ThemedText type="body" style={{ fontWeight: '600', marginBottom: Spacing.sm }}>
                                Peso
                            </ThemedText>
                            <View style={styles.comparisonRow}>
                                <ThemedText type="h3">{initialWeight} kg</ThemedText>
                                <Feather name="arrow-right" size={20} color={theme.textSecondary} />
                                <ThemedText type="h3">{currentWeight} kg</ThemedText>
                            </View>
                            <ThemedText
                                type="small"
                                style={{
                                    color: weightChange < 0 ? BrandColors.success : BrandColors.primary,
                                    marginTop: Spacing.xs,
                                }}
                            >
                                {weightChange > 0 ? '+' : ''}
                                {weightChange.toFixed(1)} kg
                            </ThemedText>
                        </View>

                        <View style={[styles.divider, { backgroundColor: theme.border }]} />

                        <View style={styles.comparisonMetric}>
                            <ThemedText type="body" style={{ fontWeight: '600', marginBottom: Spacing.sm }}>
                                Gordura Corporal
                            </ThemedText>
                            <View style={styles.comparisonRow}>
                                <ThemedText type="h3">{initialBodyFat}%</ThemedText>
                                <Feather name="arrow-right" size={20} color={theme.textSecondary} />
                                <ThemedText type="h3">{currentBodyFat}%</ThemedText>
                            </View>
                            <ThemedText
                                type="small"
                                style={{
                                    color: bodyFatChange < 0 ? BrandColors.success : BrandColors.primary,
                                    marginTop: Spacing.xs,
                                }}
                            >
                                {bodyFatChange > 0 ? '+' : ''}
                                {bodyFatChange.toFixed(1)}%
                            </ThemedText>
                        </View>
                    </Card>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    memberHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressItem: {
        alignItems: 'center',
        flex: 1,
    },
    progressIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: BrandColors.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: BorderRadius.full,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.full,
        alignItems: 'center',
    },
    assessmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
    },
    metricsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
    },
    metric: {
        alignItems: 'center',
        flex: 1,
    },
    divider: {
        height: 1,
        marginVertical: Spacing.md,
    },
    measurementsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    measurement: {
        alignItems: 'center',
        flex: 1,
    },
    comparisonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    comparisonMetric: {
        marginVertical: Spacing.md,
    },
});

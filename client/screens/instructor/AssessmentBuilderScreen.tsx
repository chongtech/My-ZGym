import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
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
import type { BodyComposition, BodyMeasurements, PerformanceTest } from '@/types/assessment';

type AssessmentBuilderRouteProp = RouteProp<InstructorAssessmentsStackParamList, 'AssessmentBuilder'>;
type NavigationProp = NativeStackNavigationProp<InstructorAssessmentsStackParamList>;

export default function AssessmentBuilderScreen() {
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();
    const { theme } = useTheme();
    const route = useRoute<AssessmentBuilderRouteProp>();
    const navigation = useNavigation<NavigationProp>();

    const { memberId, assessmentId } = route.params;
    const member = mockInstructorClients.find((c) => c.id === memberId);

    // Determine if this is an initial assessment
    const memberAssessments = mockPhysicalAssessments.filter(a => a.memberId === memberId);
    const hasInitialAssessment = memberAssessments.some(a => a.assessmentType === 'initial');

    // If editing, check the actual assessment type. If creating, check if user already has an initial one.
    const isInitialAssessment = assessmentId
        ? memberAssessments.find(a => a.id === assessmentId)?.assessmentType === 'initial'
        : !hasInitialAssessment;

    // State for assessment data
    const [bodyComposition, setBodyComposition] = useState<BodyComposition>({
        weight: 75.0,
        bodyFatPercentage: undefined,
        muscleMassPercentage: undefined,
        bmi: 24.2, // Will be calculated
    });

    const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements>({
        chest: undefined,
        waist: undefined,
        hips: undefined,
        leftArm: undefined,
        rightArm: undefined,
        leftThigh: undefined,
        rightThigh: undefined,
    });

    const [performanceTests, setPerformanceTests] = useState<PerformanceTest[]>([]);
    const [instructorNotes, setInstructorNotes] = useState('');

    const handleSave = () => {
        // Validation
        if (!bodyComposition.weight) {
            Alert.alert('Erro', 'Por favor, insira o peso do membro');
            return;
        }

        // TODO: Save assessment to backend
        console.log('Saving assessment:', {
            memberId,
            bodyComposition,
            bodyMeasurements,
            performanceTests,
            instructorNotes,
            isInitialAssessment
        });

        Alert.alert(
            'Avaliação Criada',
            'A avaliação física foi criada com sucesso!',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
    };

    const addPerformanceTest = () => {
        const newTest: PerformanceTest = {
            id: Date.now().toString(),
            testType: 'Custom',
            value: 0,
            unit: 'kg',
        };
        setPerformanceTests([...performanceTests, newTest]);
    };

    const removePerformanceTest = (id: string) => {
        setPerformanceTests(performanceTests.filter((test) => test.id !== id));
    };

    if (!member) {
        return (
            <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
                <ThemedText>Membro não encontrado</ThemedText>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: headerHeight + Spacing.lg,
                    paddingBottom: insets.bottom + Spacing.xl * 3,
                    paddingHorizontal: Spacing.lg,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Member Info Card */}
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <View style={styles.memberHeader}>
                        <View style={[styles.avatar, { backgroundColor: BrandColors.primary + '20' }]}>
                            <Feather name="user" size={32} color={BrandColors.primary} />
                        </View>
                        <View style={{ marginLeft: Spacing.md }}>
                            <ThemedText type="h4">{member.fullName}</ThemedText>
                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                {isInitialAssessment ? 'Avaliação Inicial' : 'Avaliação de Progresso'}
                            </ThemedText>
                        </View>
                    </View>

                    {/* Onboarding Data Preview (for initial assessment) */}
                    {isInitialAssessment && (
                        <View style={[styles.onboardingData, { backgroundColor: theme.backgroundSecondary, marginTop: Spacing.md }]}>
                            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.xs }}>
                                Dados do Onboarding
                            </ThemedText>
                            <View style={styles.dataRow}>
                                <ThemedText type="small">Altura: 175 cm</ThemedText>
                                <ThemedText type="small">Idade: 28 anos</ThemedText>
                            </View>
                            <View style={styles.dataRow}>
                                <ThemedText type="small">Peso Atual: 75 kg</ThemedText>
                                <ThemedText type="small">Meta: 70 kg</ThemedText>
                            </View>
                            <View style={styles.dataRow}>
                                <ThemedText type="small">Nível: Intermediário</ThemedText>
                                <ThemedText type="small">Frequência: 3x/semana</ThemedText>
                            </View>
                        </View>
                    )}
                </Card>

                {/* Body Composition Section */}
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                        Composição Corporal
                    </ThemedText>

                    <View style={styles.inputGroup}>
                        <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                            Peso (kg) *
                        </ThemedText>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                            placeholder="75.0"
                            placeholderTextColor={theme.textSecondary}
                            value={bodyComposition.weight?.toString()}
                            onChangeText={(text) => setBodyComposition({ ...bodyComposition, weight: parseFloat(text) || 0 })}
                            keyboardType="decimal-pad"
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                            <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                                Gordura Corporal (%)
                            </ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                                placeholder="15.0"
                                placeholderTextColor={theme.textSecondary}
                                value={bodyComposition.bodyFatPercentage?.toString()}
                                onChangeText={(text) => setBodyComposition({ ...bodyComposition, bodyFatPercentage: parseFloat(text) })}
                                keyboardType="decimal-pad"
                            />
                        </View>

                        <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.sm }]}>
                            <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                                Massa Muscular (%)
                            </ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                                placeholder="40.0"
                                placeholderTextColor={theme.textSecondary}
                                value={bodyComposition.muscleMassPercentage?.toString()}
                                onChangeText={(text) => setBodyComposition({ ...bodyComposition, muscleMassPercentage: parseFloat(text) })}
                                keyboardType="decimal-pad"
                            />
                        </View>
                    </View>
                </Card>

                {/* Body Measurements Section */}
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                        Medidas Corporais (cm)
                    </ThemedText>

                    <View style={styles.inputRow}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                            <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                                Peito
                            </ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                                placeholder="100"
                                placeholderTextColor={theme.textSecondary}
                                value={bodyMeasurements.chest?.toString()}
                                onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, chest: parseFloat(text) })}
                                keyboardType="decimal-pad"
                            />
                        </View>

                        <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.sm }]}>
                            <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                                Cintura
                            </ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                                placeholder="85"
                                placeholderTextColor={theme.textSecondary}
                                value={bodyMeasurements.waist?.toString()}
                                onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, waist: parseFloat(text) })}
                                keyboardType="decimal-pad"
                            />
                        </View>
                    </View>

                    <View style={styles.inputRow}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                            <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                                Quadril
                            </ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                                placeholder="95"
                                placeholderTextColor={theme.textSecondary}
                                value={bodyMeasurements.hips?.toString()}
                                onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, hips: parseFloat(text) })}
                                keyboardType="decimal-pad"
                            />
                        </View>

                        <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.sm }]}>
                            <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                                Braço Esq.
                            </ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                                placeholder="35"
                                placeholderTextColor={theme.textSecondary}
                                value={bodyMeasurements.leftArm?.toString()}
                                onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, leftArm: parseFloat(text) })}
                                keyboardType="decimal-pad"
                            />
                        </View>
                    </View>

                    <View style={styles.inputRow}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
                            <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                                Braço Dir.
                            </ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                                placeholder="35"
                                placeholderTextColor={theme.textSecondary}
                                value={bodyMeasurements.rightArm?.toString()}
                                onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, rightArm: parseFloat(text) })}
                                keyboardType="decimal-pad"
                            />
                        </View>

                        <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.sm }]}>
                            <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                                Coxa Esq.
                            </ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                                placeholder="55"
                                placeholderTextColor={theme.textSecondary}
                                value={bodyMeasurements.leftThigh?.toString()}
                                onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, leftThigh: parseFloat(text) })}
                                keyboardType="decimal-pad"
                            />
                        </View>
                    </View>

                    <View style={[styles.inputGroup, { width: '48%' }]}>
                        <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                            Coxa Dir.
                        </ThemedText>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border }]}
                            placeholder="55"
                            placeholderTextColor={theme.textSecondary}
                            value={bodyMeasurements.rightThigh?.toString()}
                            onChangeText={(text) => setBodyMeasurements({ ...bodyMeasurements, rightThigh: parseFloat(text) })}
                            keyboardType="decimal-pad"
                        />
                    </View>
                </Card>

                {/* Performance Tests Section */}
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <View style={styles.sectionHeader}>
                        <ThemedText type="h4">Testes de Performance</ThemedText>
                        <Pressable onPress={addPerformanceTest}>
                            <Feather name="plus-circle" size={24} color={BrandColors.primary} />
                        </Pressable>
                    </View>

                    {performanceTests.length === 0 ? (
                        <ThemedText type="small" style={{ color: theme.textSecondary, textAlign: 'center', paddingVertical: Spacing.lg }}>
                            Nenhum teste adicionado. Toque em + para adicionar.
                        </ThemedText>
                    ) : (
                        performanceTests.map((test) => (
                            <View key={test.id} style={[styles.testRow, { borderBottomColor: theme.border }]}>
                                <View style={{ flex: 1 }}>
                                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                        {test.testType}
                                    </ThemedText>
                                    <ThemedText type="body">
                                        {test.value} {test.unit}
                                    </ThemedText>
                                </View>
                                <Pressable onPress={() => removePerformanceTest(test.id)}>
                                    <Feather name="trash-2" size={18} color={theme.textSecondary} />
                                </Pressable>
                            </View>
                        ))
                    )}
                </Card>

                {/* Photos Section */}
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                        Fotos de Progresso
                    </ThemedText>
                    <View style={styles.photoContainer}>
                        {['Frente', 'Lado', 'Costas'].map((label, index) => (
                            <Pressable key={index} style={[styles.photoPlaceholder, { borderColor: theme.border, backgroundColor: theme.backgroundSecondary }]}>
                                <Feather name="camera" size={24} color={theme.textSecondary} />
                                <ThemedText type="small" style={{ marginTop: Spacing.xs, color: theme.textSecondary }}>
                                    {label}
                                </ThemedText>
                            </Pressable>
                        ))}
                    </View>
                </Card>

                {/* Instructor Notes Section */}
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                        Notas do Instrutor
                    </ThemedText>
                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                            { backgroundColor: theme.backgroundSecondary, color: theme.text, borderColor: theme.border },
                        ]}
                        placeholder="Observações e recomendações..."
                        placeholderTextColor={theme.textSecondary}
                        value={instructorNotes}
                        onChangeText={setInstructorNotes}
                        multiline
                        numberOfLines={4}
                    />
                </Card>

                {/* Save Button */}
                <Pressable onPress={handleSave}>
                    <View style={[styles.saveButton, { backgroundColor: BrandColors.primary }]}>
                        <ThemedText type="body" style={{ color: theme.text, fontWeight: '600' }}>
                            Guardar Avaliação
                        </ThemedText>
                    </View>
                </Pressable>
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
    onboardingData: {
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.xs,
    },
    inputGroup: {
        marginBottom: Spacing.lg,
    },
    inputRow: {
        flexDirection: 'row',
    },
    input: {
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    testRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
    },
    saveButton: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
    },
    photoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.sm,
    },
    photoPlaceholder: {
        width: '30%',
        aspectRatio: 3 / 4,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

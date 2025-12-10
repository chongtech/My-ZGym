import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useAuth } from "@/context/AuthContext";

const frequencies = [
    { id: '1_day', label: '1 dia por semana', recommended: false },
    { id: '2_days', label: '2 dias por semana', recommended: true },
    { id: '3_days', label: '3 dias por semana', recommended: true },
    { id: '4_days', label: '4 dias por semana', recommended: false },
    { id: '5_days', label: '5 dias por semana', recommended: false },
    { id: '6_days', label: '6 dias por semana', recommended: false },
    { id: 'everyday', label: 'Todos os dias', recommended: false },
];

export default function OnboardingFrequencyScreen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingFrequency'>>();

    // Params
    const { sex, height, currentWeight, goalWeight, experienceLevel, age } = route.params;

    const [selectedFrequency, setSelectedFrequency] = useState<string>('2_days');
    const { skipOnboarding } = useAuth();

    const handleNext = () => {
        navigation.navigate("OnboardingStep3", { sex, height, currentWeight, goalWeight, experienceLevel, age, frequency: selectedFrequency });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={theme.text} />
                </TouchableOpacity>
                <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: '90%', backgroundColor: BrandColors.primary }]} />
                </View>
                <TouchableOpacity onPress={skipOnboarding} style={{ padding: 8 }}>
                    <ThemedText style={{ fontSize: 14, fontWeight: '600' }}>Saltar</ThemedText>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={[styles.content, { paddingBottom: 100 }]}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.textContainer}>
                    <ThemedText type="h2" style={styles.title}>
                        Com que frequência você treina?
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Estabelecer uma meta realista ajudará você a se manter motivado e acompanhar seu progresso.
                    </ThemedText>
                </Animated.View>

                <View style={styles.listContainer}>
                    {frequencies.map((item) => {
                        const isSelected = selectedFrequency === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.optionItem,
                                    isSelected && styles.optionItemSelected,
                                    { backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }
                                ]}
                                onPress={() => setSelectedFrequency(item.id)}
                            >
                                <View style={styles.labelContainer}>
                                    {item.recommended && (
                                        <View style={styles.recommendedBadge}>
                                            <ThemedText style={styles.recommendedText}>Recomendado para você</ThemedText>
                                        </View>
                                    )}
                                    <ThemedText style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                                        {item.label}
                                    </ThemedText>
                                </View>

                                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                    {isSelected ? (
                                        <Feather name="check" size={16} color="#000" />
                                    ) : null}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

            </ScrollView>

            <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
                <Button onPress={handleNext} style={{ width: "100%" }}>
                    Próximo
                </Button>
            </View>
        </View>
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
        paddingHorizontal: Spacing.md,
        height: 60,
        marginTop: 10,
    },
    backButton: {
        padding: Spacing.sm,
    },
    progressContainer: {
        height: 4,
        flex: 1,
        marginHorizontal: Spacing.lg,
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: BorderRadius.full,
    },
    content: {
        paddingTop: Spacing.xl,
    },
    textContainer: {
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.xl,
    },
    title: {
        marginBottom: Spacing.sm,
    },
    subtitle: {
        color: '#888',
        fontSize: 14,
        lineHeight: 20,
    },
    listContainer: {
        width: '100%',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#333',
    },
    optionItemSelected: {
        backgroundColor: '#2C2C2E', // Slightly lighter dark background
    },
    labelContainer: {
        justifyContent: 'center',
    },
    recommendedBadge: {
        backgroundColor: BrandColors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    recommendedText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    optionLabel: {
        fontSize: 16,
        color: '#FFF',
    },
    optionLabelSelected: {
        fontWeight: '700',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: BrandColors.primary,
        borderColor: BrandColors.primary,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        backgroundColor: 'transparent', // Or blur
    },
});

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useAuth } from "@/context/AuthContext";

const goals = [
    { id: 'stronger', label: 'Ficar mais forte', icon: 'zap' },
    { id: 'muscle', label: 'Ganhe massa muscular', icon: 'trending-up' },
    { id: 'lean', label: 'Fique magra e definida', icon: 'user' },
    { id: 'weight_loss', label: 'Reduza o peso corporal', icon: 'arrow-down-circle' },
    { id: 'health', label: 'Melhore sua saúde e bem-estar', icon: 'heart' },
    { id: 'performance', label: 'Aumente seu desempenho esportivo', icon: 'award' },
] as const;

export default function OnboardingStep3Screen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingStep3'>>();

    // Receive accumulated data
    const params = route.params || {};

    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

    const { skipOnboarding } = useAuth();

    const handleNext = () => {
        if (selectedGoal) {
            navigation.navigate("OnboardingStep4", { ...params, mainGoal: selectedGoal });
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSkip = () => {
        skipOnboarding();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={theme.text} />
                </TouchableOpacity>

                {/* Progress Bar - 70% */}
                <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: '70%', backgroundColor: BrandColors.primary }]} />
                </View>
                <TouchableOpacity onPress={handleSkip} style={{ padding: 8 }}>
                    <ThemedText style={{ fontSize: 14, fontWeight: '600' }}>Saltar</ThemedText>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: insets.bottom + Spacing.xl + 80 } // Extra padding for fixed footer
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInDown.duration(600).delay(100)}>
                    <ThemedText type="h2" style={styles.title}>
                        Qual é o seu principal objetivo?
                    </ThemedText>
                </Animated.View>

                <View style={styles.goalsContainer}>
                    {goals.map((goal, index) => (
                        <Animated.View
                            key={goal.id}
                            entering={FadeInUp.delay(200 + index * 100).duration(500)}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.goalCard,
                                    {
                                        backgroundColor: theme.backgroundDefault,
                                        borderColor: selectedGoal === goal.id ? BrandColors.primary : 'transparent',
                                    }
                                ]}
                                activeOpacity={0.7}
                                onPress={() => setSelectedGoal(goal.id)}
                            >
                                <View style={[styles.iconContainer]}>
                                    <Feather
                                        name={goal.icon as any}
                                        size={24}
                                        color={theme.text}
                                    />
                                </View>
                                <ThemedText type="h4" style={styles.goalText}>
                                    {goal.label}
                                </ThemedText>

                                {selectedGoal === goal.id && (
                                    <View style={styles.checkIcon}>
                                        <Feather name="check-circle" size={20} color={BrandColors.primary} />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

            </ScrollView>

            <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
                <Button
                    onPress={handleNext}
                    disabled={!selectedGoal}
                    style={{ width: "100%", backgroundColor: BrandColors.primary }}
                >
                    Continuar
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
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
    title: {
        textAlign: 'center',
        marginBottom: Spacing.xl,
        fontSize: 24,
    },
    goalsContainer: {
        gap: Spacing.md,
    },
    goalCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        marginRight: Spacing.md,
    },
    goalText: {
        flex: 1,
        fontSize: 16,
    },
    checkIcon: {
        marginLeft: Spacing.sm,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        backgroundColor: 'transparent', // Or themed background if needed to cover content
    },
});

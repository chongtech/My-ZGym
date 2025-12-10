import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, FlatList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useAuth } from "@/context/AuthContext";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 10;
const MIN_WEIGHT = 30;
const MAX_WEIGHT = 150;
const STEP = 0.1;

export default function OnboardingGoalWeightScreen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingGoalWeight'>>();
    const { skipOnboarding } = useAuth();

    // Params passed from previous screens
    const { sex, height, currentWeight } = route.params;

    // Default goal to current weight initially
    const [goalWeight, setGoalWeight] = useState(currentWeight);
    const [isKg, setIsKg] = useState(true);

    const flatListRef = useRef<FlatList>(null);

    const rulerData = useMemo(() => {
        const count = Math.round((MAX_WEIGHT - MIN_WEIGHT) / STEP) + 1;
        return Array.from({ length: count }, (_, i) => MIN_WEIGHT + i * STEP);
    }, []);

    // Scroll Logic (Same as Weight Screen)
    useEffect(() => {
        // Initial Center
        const initialIndex = Math.round((currentWeight - MIN_WEIGHT) / STEP);
        setTimeout(() => {
            flatListRef.current?.scrollToOffset({
                offset: initialIndex * ITEM_WIDTH,
                animated: false
            });
        }, 100);
    }, []);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        if (index >= 0 && index < rulerData.length) {
            setGoalWeight(rulerData[index]);
        }
    };

    // Calculation Logic
    const calculateTargetBMI = () => {
        const hM = height / 100;
        return goalWeight / (hM * hM);
    };

    const targetBMI = calculateTargetBMI();
    const weightEndDiff = currentWeight - goalWeight; // Positive if losing weight
    const weightEndDiffAbs = Math.abs(weightEndDiff);
    const percentageChange = (weightEndDiffAbs / currentWeight) * 100;

    // Card Logic
    const renderInsightCard = () => {
        // Condition 1: Low BMI Warning
        if (targetBMI < 18.5) {
            return (
                <View style={[styles.card, { backgroundColor: '#FFF5F5' }]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconContainer, { backgroundColor: '#FFF' }]}>
                            <Feather name="alert-triangle" size={18} color="#FF4D4D" />
                        </View>
                        <ThemedText style={[styles.cardTitle, { color: '#FF4D4D' }]}>ATENÇÃO!</ThemedText>
                    </View>
                    <ThemedText style={styles.cardBody}>
                        Parece que sua meta de IMC é muito baixa, o que pode causar alguns problemas de saúde...
                    </ThemedText>
                </View>
            );
        }

        // Condition 2: Significant Weight Loss (> 15%?)
        if (weightEndDiff > 0 && percentageChange > 15) {
            return (
                <View style={[styles.card, { backgroundColor: '#F8F9FA' }]}>
                    <View style={styles.cardHeader}>
                        <ThemedText style={[styles.cardTitle, { color: '#FF6B00' }]}>🔥 OBJETIVO DESAFIADOR!</ThemedText>
                    </View>
                    <ThemedText style={styles.cardBodyBold}>
                        Você perderá {percentageChange.toFixed(1)}% do peso corporal
                    </ThemedText>
                    <ThemedText style={styles.cardBody}>
                        Você pode ver benefícios de saúde mais significativos:
                        {'\n'}- Melhora da saúde cardiovascular
                        {'\n'}- Redução do risco de câncer
                    </ThemedText>
                </View>
            );
        }

        // Default / Safe Zone
        return (
            <View style={[styles.card, { backgroundColor: '#F0FFF4' }]}>
                <View style={styles.cardHeader}>
                    <ThemedText style={[styles.cardTitle, { color: BrandColors.success }]}>META SAUDÁVEL!</ThemedText>
                </View>
                <ThemedText style={styles.cardBody}>
                    Esse é um objetivo realista e sustentável para o seu corpo.
                </ThemedText>
            </View>
        );
    };

    const handleNext = () => {
        navigation.navigate("OnboardingExperience", { sex, height, currentWeight, goalWeight });
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
                <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: '75%', backgroundColor: BrandColors.primary }]} />
                </View>
                <TouchableOpacity onPress={handleSkip} style={{ padding: 8 }}>
                    <ThemedText style={{ fontSize: 14, fontWeight: '600' }}>Saltar</ThemedText>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.duration(600).delay(100)} style={{ alignItems: 'center' }}>
                    <ThemedText type="h2" style={styles.title}>
                        Qual é sua meta de peso?
                    </ThemedText>

                    <View style={[styles.toggleContainer, { backgroundColor: theme.backgroundDefault }]}>
                        <TouchableOpacity
                            style={[styles.toggleButton, isKg && styles.toggleButtonActive]}
                            onPress={() => setIsKg(true)}
                        >
                            <ThemedText style={[styles.toggleText, isKg && styles.toggleTextActive]}>kg</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleButton, !isKg && styles.toggleButtonActive]}
                            onPress={() => setIsKg(false)}
                        >
                            <ThemedText style={[styles.toggleText, !isKg && styles.toggleTextActive]}>lbs</ThemedText>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Main Measurement Content */}
                <View style={styles.measurementArea}>
                    <ThemedText style={styles.weightValue}>
                        {(isKg ? goalWeight : goalWeight * 2.20462).toFixed(0)}
                        <ThemedText style={styles.weightUnit}> {isKg ? 'kg' : 'lbs'}</ThemedText>
                    </ThemedText>

                    {/* Ruler */}
                    <View style={styles.rulerWrapper}>
                        <View style={styles.centerIndicator} pointerEvents="none" />

                        <FlatList
                            ref={flatListRef}
                            data={rulerData}
                            keyExtractor={(item) => item.toFixed(1)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={ITEM_WIDTH}
                            decelerationRate="fast"
                            onScroll={onScroll}
                            scrollEventThrottle={16}
                            contentContainerStyle={{
                                paddingHorizontal: width / 2 - ITEM_WIDTH / 2
                            }}
                            getItemLayout={(data, index) => (
                                { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
                            )}
                            renderItem={({ item }) => {
                                const isInteger = Math.abs(item % 1) < 0.05;
                                return (
                                    <View style={[styles.rulerItem, { width: ITEM_WIDTH }]}>
                                        <View style={[
                                            styles.rulerTick,
                                            {
                                                height: isInteger ? 40 : 20,
                                                backgroundColor: isInteger ? theme.text : theme.border
                                            }
                                        ]} />
                                        {isInteger && (
                                            <ThemedText style={styles.rulerLabel}>
                                                {Math.round(item)}
                                            </ThemedText>
                                        )}
                                    </View>
                                );
                            }}
                        />
                        <LinearGradient
                            colors={[theme.backgroundRoot, 'transparent']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={[styles.sideFade, { left: 0 }]}
                            pointerEvents="none"
                        />
                        <LinearGradient
                            colors={['transparent', theme.backgroundRoot]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={[styles.sideFade, { right: 0 }]}
                            pointerEvents="none"
                        />
                    </View>

                    {/* Dynamic Insight Card */}
                    <View style={styles.cardContainer}>
                        {renderInsightCard()}
                    </View>
                </View>

            </View>

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
        flex: 1,
        paddingTop: Spacing.xl,
    },
    title: {
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    toggleContainer: {
        flexDirection: 'row',
        borderRadius: BorderRadius.full,
        padding: 4,
        marginBottom: Spacing.xl,
    },
    toggleButton: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    toggleButtonActive: {
        backgroundColor: BrandColors.primary,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
    toggleTextActive: {
        color: '#000',
    },
    measurementArea: {
        flex: 1,
        alignItems: 'center',
    },
    weightValue: {
        fontSize: 48,
        fontWeight: '800',
        marginBottom: Spacing.lg,
    },
    weightUnit: {
        fontSize: 20,
        fontWeight: '500',
        color: '#666',
    },
    rulerWrapper: {
        height: 100,
        width: '100%',
        marginBottom: Spacing.xl,
        justifyContent: 'center',
    },
    rulerItem: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
    },
    rulerTick: {
        width: 2,
        borderRadius: 1,
    },
    rulerLabel: {
        marginTop: 10,
        fontSize: 12,
        color: '#888',
        position: 'absolute',
        top: 55,
        width: 40,
        textAlign: 'center',
    },
    centerIndicator: {
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        height: 50,
        width: 3,
        backgroundColor: BrandColors.primary,
        zIndex: 10,
    },
    sideFade: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 80,
        zIndex: 5,
    },
    cardContainer: {
        width: '100%',
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.md,
    },
    card: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        width: '100%',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    iconContainer: {
        padding: 4,
        borderRadius: 50,
        marginRight: 8,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    cardBody: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    cardBodyBold: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    footer: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
});

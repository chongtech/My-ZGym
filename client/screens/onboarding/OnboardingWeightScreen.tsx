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

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 10; // Width of each 0.1kg tick
const MIN_WEIGHT = 30; // kg
const MAX_WEIGHT = 150; // kg
const STEP = 0.1;

export default function OnboardingWeightScreen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingWeight'>>();

    // Fallback params to avoid crash if accessed directly (though typically passed from Height screen)
    const sex = route.params?.sex || 'male';
    const height = route.params?.height || 170; // cm

    const [weight, setWeight] = useState(75.0);
    const [isKg, setIsKg] = useState(true);

    const flatListRef = useRef<FlatList>(null);

    // Generate ruler data: 30.0, 30.1 ... 150.0
    const rulerData = useMemo(() => {
        const count = Math.round((MAX_WEIGHT - MIN_WEIGHT) / STEP) + 1;
        return Array.from({ length: count }, (_, i) => MIN_WEIGHT + i * STEP);
    }, []);

    const calculateBMI = (w: number, h: number) => {
        // w in kg, h in cm
        const hM = h / 100;
        return (w / (hM * hM)).toFixed(1);
    };

    const getBMIStatus = (bmi: number) => {
        if (bmi < 18.5) return "Você está abaixo do peso ideal.";
        if (bmi < 25) return "Você tem um corpo em forma! Mantenha-o!";
        if (bmi < 30) return "Você está com sobrepeso.";
        return "Você está na faixa de obesidade.";
    };

    const bmiValue = calculateBMI(weight, height);
    const bmiMessage = getBMIStatus(parseFloat(bmiValue));

    const handleNext = () => {
        // Pass weight and previous data to the next step (Goal Weight)
        navigation.navigate("OnboardingGoalWeight", { sex, height, currentWeight: weight });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    // Initial scroll positioning
    useEffect(() => {
        // Find index of 75.0
        // (75 - 30) / 0.1 = 450
        const initialIndex = Math.round((75 - MIN_WEIGHT) / STEP);

        setTimeout(() => {
            // Because contentContainer has paddingHorizontal = width/2,
            // scrolling to OFFSET = Index * ITEM_WIDTH puts the item at the Center.
            // (Actually slightly off by half item width, but standard snap usually handles this).
            // Let's assume standard behavior: offset 0 = start of content (which is pushed to center by padding).
            // So if we scroll 'X', content moves Left by 'X'.
            // To center item 'i': scroll = i * ITEM_WIDTH. [If padding centers index 0 at scroll 0]
            flatListRef.current?.scrollToOffset({
                offset: initialIndex * ITEM_WIDTH,
                animated: false
            });
        }, 100);
    }, []);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        // Since padding puts Index 0 at Center, OffsetX is distance from Index 0.
        // Index = CurrentScroll / ItemWidth.
        const index = Math.round(offsetX / ITEM_WIDTH);

        if (index >= 0 && index < rulerData.length) {
            setWeight(rulerData[index]);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={theme.text} />
                </TouchableOpacity>

                <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: '60%', backgroundColor: BrandColors.primary }]} />
                </View>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.duration(600).delay(100)} style={{ alignItems: 'center' }}>
                    <ThemedText type="h2" style={styles.title}>
                        Qual é seu peso atual?
                    </ThemedText>

                    {/* Unit Toggle */}
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

                    {/* Value Display */}
                    <ThemedText style={styles.weightValue}>
                        {(isKg ? weight : weight * 2.20462).toFixed(1)}
                        <ThemedText style={styles.weightUnit}> {isKg ? 'kg' : 'lbs'}</ThemedText>
                    </ThemedText>

                    {/* Horizontal Ruler */}
                    <View style={styles.rulerWrapper}>
                        {/* Blue Indicator Line */}
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
                                paddingHorizontal: width / 2 - ITEM_WIDTH / 2 // Exact center alignment
                            }}
                            getItemLayout={(data, index) => (
                                { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
                            )}
                            renderItem={({ item, index }) => {
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

                        {/* Side Fades */}
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

                    {/* BMI Card */}
                    <View style={[styles.bmiCard, { backgroundColor: theme.backgroundDefault }]}>
                        <View style={styles.bmiHeader}>
                            <ThemedText style={styles.bmiTitle}>IMC ATUAL</ThemedText>
                            <Feather name="info" size={14} color={theme.textSecondary} style={{ marginLeft: 4 }} />
                        </View>
                        <View style={styles.bmiContent}>
                            <ThemedText style={[styles.bmiValue, { color: parseFloat(bmiValue) < 25 && parseFloat(bmiValue) > 18.5 ? BrandColors.success : BrandColors.primary }]}>
                                {bmiValue}
                            </ThemedText>
                            <ThemedText style={styles.bmiMessage}>
                                {bmiMessage}
                            </ThemedText>
                        </View>
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
        marginTop: 10, // Add explicit margin to avoid overlap with status bar
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
        backgroundColor: BrandColors.primary, // Use BrandColors.primary (Green)
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
    toggleTextActive: {
        color: '#000', // Black text on Green background
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
        backgroundColor: BrandColors.primary, // Green
        zIndex: 10,
    },
    sideFade: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 80,
        zIndex: 5,
    },
    bmiCard: {
        width: '90%',
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'flex-start',
    },
    bmiHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    bmiTitle: {
        fontSize: 14,
        fontWeight: '700',
    },
    bmiContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bmiValue: {
        fontSize: 32,
        fontWeight: '800',
        marginRight: Spacing.md,
    },
    bmiMessage: {
        flex: 1,
        fontSize: 14,
        color: '#666',
    },
    footer: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
});

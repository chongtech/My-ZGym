import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, FlatList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { Image } from "expo-image";
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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const ITEM_HEIGHT = 8; // Height of each cm tick
const MIN_HEIGHT_CM = 130; // cm
const MAX_HEIGHT_CM = 220; // cm

export default function OnboardingHeightScreen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingHeight'>>();
    const { skipOnboarding } = useAuth();

    const sex = route.params?.sex || 'male';

    const [heightCm, setHeightCm] = useState(170);
    const [isCm, setIsCm] = useState(true);

    const flatListRef = useRef<FlatList>(null);

    // Generate ruler data: 130, 131, ... 220
    const rulerData = useMemo(() => {
        const count = MAX_HEIGHT_CM - MIN_HEIGHT_CM + 1;
        return Array.from({ length: count }, (_, i) => MIN_HEIGHT_CM + i);
    }, []);

    const handleNext = () => {
        // Navigate to Weight screen
        navigation.navigate("OnboardingWeight", { sex, height: heightCm });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSkip = () => {
        skipOnboarding();
    };

    // Convert cm to feet and inches
    const cmToFeetInches = (cm: number) => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return { feet, inches };
    };

    // Initial scroll positioning
    useEffect(() => {
        const initialIndex = 170 - MIN_HEIGHT_CM;

        setTimeout(() => {
            flatListRef.current?.scrollToOffset({
                offset: initialIndex * ITEM_HEIGHT,
                animated: false
            });
        }, 100);
    }, []);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);

        if (index >= 0 && index < rulerData.length) {
            setHeightCm(rulerData[index]);
        }
    };

    // Select the appropriate image based on sex
    const bodyImageUrl = sex === 'male'
        ? 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=600&fit=crop&crop=faces'
        : 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=600&fit=crop&crop=faces';

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={theme.text} />
                </TouchableOpacity>

                <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: '50%', backgroundColor: BrandColors.primary }]} />
                </View>
                <TouchableOpacity onPress={handleSkip} style={{ padding: 8 }}>
                    <ThemedText style={{ fontSize: 14, fontWeight: '600' }}>Saltar</ThemedText>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.duration(600).delay(100)} style={{ alignItems: 'center' }}>
                    <ThemedText type="h2" style={styles.title}>
                        Sua altura
                    </ThemedText>
                    <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
                        As informações de altura nos ajudam a calcular seu IMC com mais precisão.
                    </ThemedText>

                    {/* Unit Toggle */}
                    <View style={[styles.toggleContainer, { backgroundColor: theme.backgroundDefault }]}>
                        <TouchableOpacity
                            style={[styles.toggleButton, !isCm && styles.toggleButtonActive]}
                            onPress={() => setIsCm(false)}
                        >
                            <ThemedText style={[styles.toggleText, !isCm && styles.toggleTextActive]}>FT</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleButton, isCm && styles.toggleButtonActive]}
                            onPress={() => setIsCm(true)}
                        >
                            <ThemedText style={[styles.toggleText, isCm && styles.toggleTextActive]}>CM</ThemedText>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Main Measurement Content */}
                <View style={styles.measurementArea}>
                    {/* Horizontal Layout: Body Image (Left) + Ruler (Right) */}
                    <View style={styles.horizontalContainer}>
                        {/* Body Image and Height Display */}
                        <View style={styles.imageContainer}>
                            {/* Body Silhouette */}
                            <Image
                                source={bodyImageUrl}
                                style={styles.bodyImage}
                                contentFit="contain"
                            />

                            <View style={styles.heightDisplayContainer}>
                                <ThemedText style={styles.heightValue}>
                                    {isCm ? (
                                        <>
                                            {heightCm}
                                            <ThemedText style={styles.heightUnit}> cm</ThemedText>
                                        </>
                                    ) : (
                                        <>
                                            {cmToFeetInches(heightCm).feet}'{cmToFeetInches(heightCm).inches}"
                                        </>
                                    )}
                                </ThemedText>
                            </View>

                            {/* Height Indicator Line */}
                            <View style={styles.heightLineContainer}>
                                <View style={styles.heightLine} />
                                <ThemedText style={styles.heightLineLabel}>{heightCm}</ThemedText>
                            </View>
                        </View>

                        {/* Vertical Ruler */}
                        <View style={styles.rulerWrapper}>
                            {/* Blue Indicator Line */}
                            <View style={styles.centerIndicator} pointerEvents="none" />

                            <FlatList
                                ref={flatListRef}
                                data={rulerData}
                                keyExtractor={(item) => item.toString()}
                                showsVerticalScrollIndicator={false}
                                snapToInterval={ITEM_HEIGHT}
                                decelerationRate="fast"
                                onScroll={onScroll}
                                scrollEventThrottle={16}
                                contentContainerStyle={{
                                    paddingVertical: SCREEN_HEIGHT / 2 - 150 - ITEM_HEIGHT / 2
                                }}
                                getItemLayout={(_data, index) => (
                                    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                                )}
                                renderItem={({ item }) => {
                                    const isMultipleOfTen = item % 10 === 0;
                                    return (
                                        <View style={[styles.rulerItem, { height: ITEM_HEIGHT }]}>
                                            {isMultipleOfTen && (
                                                <ThemedText style={styles.rulerLabel}>
                                                    {item}
                                                </ThemedText>
                                            )}
                                            <View style={[
                                                styles.rulerTick,
                                                {
                                                    width: isMultipleOfTen ? 40 : 20,
                                                    backgroundColor: isMultipleOfTen ? theme.text : theme.border
                                                }
                                            ]} />
                                        </View>
                                    );
                                }}
                            />

                            {/* Top/Bottom Fades */}
                            <LinearGradient
                                colors={[theme.backgroundRoot, 'transparent']}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                style={[styles.verticalFade, { top: 0 }]}
                                pointerEvents="none"
                            />
                            <LinearGradient
                                colors={['transparent', theme.backgroundRoot]}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                style={[styles.verticalFade, { bottom: 0 }]}
                                pointerEvents="none"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
                <Button onPress={handleNext} style={{ width: "100%" }}>
                    CONTINUAR
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
        marginBottom: Spacing.sm,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: Spacing.lg,
        paddingHorizontal: Spacing.xl,
    },
    toggleContainer: {
        flexDirection: 'row',
        borderRadius: BorderRadius.full,
        padding: 4,
        marginBottom: Spacing.xl,
    },
    toggleButton: {
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
        minWidth: 60,
        alignItems: 'center',
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
    horizontalContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        paddingHorizontal: Spacing.md,
    },
    rulerWrapper: {
        width: 80,
        height: '100%',
        position: 'relative',
    },
    rulerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Align items to the right
        paddingRight: 10,
    },
    rulerTick: {
        height: 2,
        borderRadius: 1,
    },
    rulerLabel: {
        marginRight: 10, // Changed from marginLeft
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
    },
    centerIndicator: {
        position: 'absolute',
        right: 0, // Changed from left: 0
        top: '50%',
        marginTop: -75,
        width: 60,
        height: 3,
        backgroundColor: BrandColors.primary,
        zIndex: 10,
    },
    verticalFade: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 100,
        zIndex: 5,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    heightDisplayContainer: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
    },
    heightValue: {
        fontSize: 64,
        fontWeight: '800',
    },
    heightUnit: {
        fontSize: 24,
        fontWeight: '500',
        color: '#666',
    },
    heightLineContainer: {
        position: 'absolute',
        right: 20,
        top: '50%',
        marginTop: -75,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
    },
    heightLine: {
        width: 60,
        height: 3,
        backgroundColor: BrandColors.primary,
    },
    heightLineLabel: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '700',
        color: '#888',
    },
    bodyImage: {
        width: 200,
        height: 400,
        opacity: 0.9,
    },
    footer: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
});

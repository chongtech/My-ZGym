import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, FlatList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

const { width } = Dimensions.get("window");
const ITEM_HEIGHT = 60; // Height of each ruler item relative to scroll
const VISIBLE_ITEMS = 5; // How many items roughly visible
const RULER_HEIGHT = 400; // Total height of the ruler container

// Generate range of numbers for the ruler
// List order: Top to Bottom.
// If we want 180 at top and 170 below, we list descending: 220, 219... 140.
const minHeight = 140;
const maxHeight = 220;
const range = Array.from({ length: maxHeight - minHeight + 1 }, (_, i) => maxHeight - i);

export default function OnboardingHeightScreen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingHeight'>>();

    // Default to male if not provided
    const sex = route.params?.sex || 'male';

    const [heightCm, setHeightCm] = useState(175);
    const [isCm, setIsCm] = useState(true);

    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        // Pass height and sex to the next step (Weight)
        navigation.navigate("OnboardingWeight", { sex, height: heightCm });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const imageSource = sex === 'male'
        ? require("../../../assets/images/onboarding/man_height.png")
        : require("../../../assets/images/onboarding/woman_height.png");

    // Initial scroll positioning
    useEffect(() => {
        // Find index of 175
        const initialIndex = range.findIndex(val => val === 175);
        if (initialIndex !== -1) {
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({
                    offset: initialIndex * ITEM_HEIGHT,
                    animated: false
                });
            }, 100);
        }
    }, []);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // Snap logic: Index = round(offset / itemHeight)
        const index = Math.round(offsetY / ITEM_HEIGHT);

        // Ensure index is within bounds
        if (index >= 0 && index < range.length) {
            const newValue = range[index];
            if (newValue && newValue !== heightCm) {
                setHeightCm(newValue);
            }
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={theme.text} />
                </TouchableOpacity>

                <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: '55%', backgroundColor: BrandColors.primary }]} />
                </View>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.duration(600).delay(100)} style={{ alignItems: 'center' }}>
                    <ThemedText type="h2" style={styles.title}>
                        Qual é sua altura?
                    </ThemedText>

                    {/* Unit Toggle */}
                    <View style={[styles.toggleContainer, { backgroundColor: theme.backgroundDefault }]}>
                        <TouchableOpacity
                            style={[styles.toggleButton, isCm && styles.toggleButtonActive]}
                            onPress={() => setIsCm(true)}
                        >
                            <ThemedText style={[styles.toggleText, isCm && styles.toggleTextActive]}>cm</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleButton, !isCm && styles.toggleButtonActive]}
                            onPress={() => setIsCm(false)}
                        >
                            <ThemedText style={[styles.toggleText, !isCm && styles.toggleTextActive]}>ft</ThemedText>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Main Measurement Content */}
                <View style={styles.measurementArea}>

                    {/* Human Image */}
                    <View style={styles.personContainer}>
                        <Image
                            source={imageSource}
                            style={styles.personImage}
                            contentFit="contain"
                        />
                    </View>

                    {/* Left side overlay: Value and Line */}
                    <View style={styles.indicatorContainer} pointerEvents="none">
                        <View style={styles.indicatorRow}>
                            <View style={styles.heightTextGroup}>
                                <ThemedText style={styles.indicatorValue}>{heightCm}</ThemedText>
                                <ThemedText style={styles.indicatorUnit}>cm</ThemedText>
                            </View>
                            <View style={styles.indicatorLine} />
                        </View>
                    </View>

                    {/* Right side: Ruler */}
                    <View style={styles.rulerContainer}>
                        {/* Top Fade */}
                        <LinearGradient
                            colors={[theme.backgroundRoot, 'transparent']}
                            style={styles.fadeOverlayTop}
                            pointerEvents="none"
                        />

                        <FlatList
                            ref={flatListRef}
                            data={range}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({ item }) => (
                                <View style={[styles.rulerItem, { height: ITEM_HEIGHT }]}>
                                    <View style={styles.rulerTickGroup}>
                                        {/* Number */}
                                        <ThemedText style={[
                                            styles.rulerText,
                                            {
                                                color: item === heightCm ? theme.text : theme.textSecondary,
                                                fontWeight: item === heightCm ? '700' : '400',
                                                opacity: item === heightCm ? 1 : 0.5
                                            }
                                        ]}>
                                            {item}
                                        </ThemedText>

                                        {/* Tick */}
                                        <View style={[
                                            styles.rulerTick,
                                            {
                                                backgroundColor: item === heightCm ? theme.text : theme.border,
                                                width: item === heightCm ? 30 : 20
                                            }
                                        ]} />
                                    </View>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            snapToInterval={ITEM_HEIGHT}
                            decelerationRate="fast"
                            onScroll={onScroll}
                            scrollEventThrottle={16}
                            contentContainerStyle={{
                                paddingVertical: (RULER_HEIGHT - ITEM_HEIGHT) / 2
                            }}
                            getItemLayout={(data, index) => (
                                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                            )}
                        />

                        {/* Bottom Fade */}
                        <LinearGradient
                            colors={['transparent', theme.backgroundRoot]}
                            style={styles.fadeOverlayBottom}
                            pointerEvents="none"
                        />
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
        marginBottom: Spacing.md,
    },
    toggleButton: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    toggleButtonActive: {
        backgroundColor: '#4C6EF5',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
    toggleTextActive: {
        color: '#FFF',
    },
    measurementArea: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    personContainer: {
        position: 'absolute',
        bottom: 0,
        left: width * 0.05,
        width: width * 0.5,
        height: '80%',
        justifyContent: 'flex-end',
        zIndex: 0,
    },
    personImage: {
        width: '100%',
        height: '100%',
    },
    rulerContainer: {
        position: 'absolute',
        right: 0,
        width: 120, // ample width for text + ticks
        height: RULER_HEIGHT,
        zIndex: 1,
    },
    rulerItem: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
        width: '100%',
    },
    rulerTickGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    rulerText: {
        fontSize: 16,
        marginRight: 10,
        textAlign: 'right',
    },
    rulerTick: {
        height: 2,
        borderRadius: 1,
    },
    fadeOverlayTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        zIndex: 10,
    },
    fadeOverlayBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        zIndex: 10,
    },
    indicatorContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 20,
        paddingRight: 50, // Enough to stop before hitting the ruler labels
    },
    indicatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // We want the line to extend TOWARDS the ruler.
        // The container is fast-forwarded to right side.
        marginRight: -10, // Adjust overlap with ruler
    },
    heightTextGroup: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginRight: 15,
    },
    indicatorValue: {
        fontSize: 42,
        fontWeight: '800',
        color: '#000', // Should be theme text normally, but screenshot is stark black
        // If theme is dark mode, this should probably be white
    },
    indicatorUnit: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginLeft: 4,
    },
    indicatorLine: {
        width: 40,
        height: 2,
        backgroundColor: '#4C6EF5', // Match active
    },
    footer: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
});

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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS; // 300
const MIN_AGE = 14;
const MAX_AGE = 100;

export default function OnboardingAgeScreen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingAge'>>();
    const { skipOnboarding } = useAuth();

    // Params
    const { sex, height, currentWeight, goalWeight, experienceLevel } = route.params;

    const [age, setAge] = useState(30);

    const flatListRef = useRef<FlatList>(null);

    const ages = useMemo(() => {
        return Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, i) => MIN_AGE + i);
    }, []);

    // Scroll Logic
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        if (index >= 0 && index < ages.length) {
            setAge(ages[index]);
        }
    };

    // Initial Position
    useEffect(() => {
        const initialIndex = ages.indexOf(30);
        if (initialIndex !== -1) {
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({
                    offset: initialIndex * ITEM_HEIGHT,
                    animated: false
                });
            }, 100);
        }
    }, []);

    const handleNext = () => {
        navigation.navigate("OnboardingFrequency", { sex, height, currentWeight, goalWeight, experienceLevel, age });
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

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.textContainer}>
                    <ThemedText type="h2" style={styles.title}>
                        Sua idade
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        As informações sobre a idade nos ajudam a avaliar com mais precisão seu nível metabólico.
                    </ThemedText>
                </Animated.View>

                {/* Age Picker */}
                <View style={styles.pickerContainer}>
                    {/* Selection Overlay Background */}
                    <View style={[styles.selectionOverlay, { backgroundColor: theme.backgroundDefault }]} pointerEvents="none" />

                    <FlatList
                        ref={flatListRef}
                        data={ages}
                        keyExtractor={(item) => item.toString()}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        contentContainerStyle={{
                            paddingVertical: (PICKER_HEIGHT - ITEM_HEIGHT) / 2
                        }}
                        getItemLayout={(data, index) => (
                            { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                        )}
                        renderItem={({ item }) => {
                            const isSelected = item === age;
                            return (
                                <View style={[styles.pickerItem, { height: ITEM_HEIGHT }]}>
                                    <ThemedText style={[
                                        styles.itemText,
                                        {
                                            color: isSelected ? theme.text : '#C0C0C0', // Gray for unselected
                                            fontSize: isSelected ? 36 : 28,
                                            fontWeight: isSelected ? '800' : '600'
                                        }
                                    ]}>
                                        {item}
                                        {isSelected && <ThemedText style={styles.unitText}> anos</ThemedText>}
                                    </ThemedText>
                                </View>
                            );
                        }}
                    />

                    {/* Fades */}
                    <LinearGradient
                        colors={[theme.backgroundRoot, 'rgba(255,255,255,0)']}
                        style={styles.fadeTop}
                        pointerEvents="none"
                    />
                    <LinearGradient
                        colors={['rgba(255,255,255,0)', theme.backgroundRoot]}
                        style={styles.fadeBottom}
                        pointerEvents="none"
                    />
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
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing['2xl'],
    },
    title: {
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        fontSize: 14,
        lineHeight: 20,
    },
    pickerContainer: {
        height: PICKER_HEIGHT,
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemText: {
        textAlign: 'center',
    },
    unitText: {
        fontSize: 16,
        fontWeight: '500',
    },
    selectionOverlay: {
        position: 'absolute',
        top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2, // Center it
        height: ITEM_HEIGHT,
        width: '80%', // Not full width, like screenshot
        borderRadius: BorderRadius.lg,
        zIndex: -1,
        // In screenshot, it's a very light gray rounded rect
        backgroundColor: '#F5F5F5',
    },
    fadeTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
    },
    fadeBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },
    footer: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
});

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
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

export default function OnboardingExperienceScreen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingExperience'>>();

    // Previous data
    const { sex, height, currentWeight, goalWeight } = route.params;

    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const levels = [
        {
            id: 'beginner',
            title: 'Iniciante',
            subtitle: 'Menos de 6 meses de experiência',
            bolts: 1
        },
        {
            id: 'intermediate',
            title: 'Intermediário',
            subtitle: 'Mais de 6 meses e menos de 2 anos de experiência',
            bolts: 2
        },
        {
            id: 'advanced',
            title: 'Avançado',
            subtitle: 'Mais de 2 anos de experiência',
            bolts: 3
        }
    ];

    const handleNext = () => {
        if (selectedLevel) {
            navigation.navigate("OnboardingAge", { sex, height, currentWeight, goalWeight, experienceLevel: selectedLevel });
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderBolts = (count: number) => {
        return (
            <View style={styles.boltContainer}>
                {[1, 2, 3].map((i) => (
                    <Feather
                        key={i}
                        name="zap"
                        size={16}
                        color={i <= count ? '#000' : '#E0E0E0'}
                        fill={i <= count ? '#000' : 'transparent'} // Fill if active
                        style={{ marginRight: 2 }}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={theme.text} />
                </TouchableOpacity>
                <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: '85%', backgroundColor: BrandColors.primary }]} />
                </View>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <Animated.View entering={FadeInDown.duration(600).delay(100)}>
                    <ThemedText type="h2" style={styles.title}>
                        Qual é o nível de seu preparo físico?
                    </ThemedText>

                    <View style={styles.cardsContainer}>
                        {levels.map((level) => {
                            const isSelected = selectedLevel === level.id;
                            return (
                                <TouchableOpacity
                                    key={level.id}
                                    style={[
                                        styles.card,
                                        {
                                            backgroundColor: '#FFF', // Always white cards as per design
                                            borderColor: isSelected ? BrandColors.primary : 'transparent',
                                            borderWidth: isSelected ? 2 : 0,
                                            // Add shadow
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 3.84,
                                            elevation: 5,
                                        }
                                    ]}
                                    onPress={() => setSelectedLevel(level.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.cardHeader}>
                                        {renderBolts(level.bolts)}
                                        <ThemedText style={styles.cardTitle}>{level.title}</ThemedText>
                                    </View>
                                    <ThemedText style={styles.cardSubtitle}>
                                        {level.subtitle}
                                    </ThemedText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Animated.View>
            </View>

            <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
                <Button
                    onPress={handleNext}
                    style={{ width: "100%" }}
                    variant={selectedLevel ? 'primary' : 'outline'} // different style if disabled/not selected
                    disabled={!selectedLevel}
                >
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
        paddingHorizontal: Spacing.lg,
    },
    title: {
        textAlign: 'center',
        marginBottom: Spacing.xl,
        fontSize: 24,
    },
    cardsContainer: {
        gap: Spacing.md,
    },
    card: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    boltContainer: {
        flexDirection: 'row',
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginLeft: 0, // Align with left edge or keep indented? 
        // Screenshot implies subtitle is below title/bolts.
        marginTop: 4,
        paddingLeft: 42, // Indent to align with text start (3 bolts * 12px roughly)
    },
    footer: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
});

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useAuth } from "@/context/AuthContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - Spacing.xl * 2 - Spacing.md) / 2;

export default function OnboardingStep2Screen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { skipOnboarding } = useAuth();

    const [selectedSex, setSelectedSex] = useState<'male' | 'female' | null>(null);

    const handleNext = () => {
        if (selectedSex) {
            navigation.navigate("OnboardingHeight", { sex: selectedSex });
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
                    <Feather name="chevron-left" size={24} color={theme.text} />
                </TouchableOpacity>

                {/* Progress Bar */}
                <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: '40%', backgroundColor: BrandColors.primary }]} />
                </View>
                <TouchableOpacity onPress={handleSkip} style={{ padding: 8 }}>
                    <ThemedText style={{ fontSize: 14, fontWeight: '600' }}>Saltar</ThemedText>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInDown.duration(600).delay(100)}>
                    <ThemedText type="h2" style={styles.title}>
                        Qual é o seu sexo?
                    </ThemedText>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.duration(600).delay(200)}
                    style={[styles.infoBox, { backgroundColor: theme.backgroundDefault }]} // Using theme background or a light tint
                >
                    <View style={styles.robotIconContainer}>
                        {/* Simple robot icon representation */}
                        <Feather name="cpu" size={24} color={BrandColors.primary} />
                    </View>
                    <ThemedText type="small" style={[styles.infoText, { color: theme.textSecondary }]}>
                        Saber o seu gênero nos ajudará a adaptar a intensidade para você com base nas diferentes taxas metabólicas.
                    </ThemedText>
                </Animated.View>

                <View style={styles.cardsContainer}>
                    <Animated.View entering={FadeIn.delay(300).duration(600)}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setSelectedSex('male')}
                            style={[
                                styles.card,
                                {
                                    backgroundColor: theme.backgroundDefault,
                                    borderColor: selectedSex === 'male' ? BrandColors.primary : 'transparent',
                                    borderWidth: 2
                                }
                            ]}
                        >
                            <Image
                                source={{ uri: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=600" }}
                                style={styles.cardImage}
                                contentFit="cover"
                            />
                            <ThemedText type="h4" style={styles.cardLabel}>Masculino</ThemedText>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View entering={FadeIn.delay(400).duration(600)}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setSelectedSex('female')}
                            style={[
                                styles.card,
                                {
                                    backgroundColor: theme.backgroundDefault,
                                    borderColor: selectedSex === 'female' ? BrandColors.primary : 'transparent',
                                    borderWidth: 2
                                }
                            ]}
                        >
                            <Image
                                source={{ uri: "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=600" }}
                                style={styles.cardImage}
                                contentFit="cover"
                            />
                            <ThemedText type="h4" style={styles.cardLabel}>Feminino</ThemedText>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ScrollView>

            <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
                <Button
                    onPress={handleNext}
                    disabled={!selectedSex}
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
        marginBottom: Spacing.lg,
    },
    infoBox: {
        flexDirection: 'row',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        marginBottom: Spacing.xl,
        gap: Spacing.md,
    },
    robotIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        flex: 1,
        lineHeight: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.6,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        alignItems: 'center',
        paddingBottom: Spacing.md,
        backgroundColor: '#fff',
    },
    cardImage: {
        width: '100%',
        height: '85%',
        marginBottom: Spacing.sm,
    },
    cardLabel: {
        textAlign: 'center',
    },
    footer: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
});

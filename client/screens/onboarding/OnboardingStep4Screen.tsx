import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import Animated, {
    FadeInDown,
    FadeIn,
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from "react-native-reanimated";
import { Image } from "expo-image";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors, Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

const { width } = Dimensions.get("window");
const BODY_IMAGE_HEIGHT = 380;

// Body part definitions with their overlay images
const bodyParts = [
    { id: 'back', label: 'Costas', hasOverlay: false },
    { id: 'arms', label: 'Braços', hasOverlay: false },
    { id: 'shoulders', label: 'Ombros', hasOverlay: false },
    { id: 'abs', label: 'Abdominais', hasOverlay: false },
    { id: 'chest', label: 'Peito', hasOverlay: true },
    { id: 'legs', label: 'Pernas', hasOverlay: false },
    { id: 'glutes', label: 'Glúteos', hasOverlay: false },
    { id: 'full_body', label: 'Corpo Inteiro', hasOverlay: false },
];

// Map body part IDs to their overlay images
const overlayImages: { [key: string]: any } = {
    chest: require("../../../assets/images/onboarding/body_chest.png"),
    back: require("../../../assets/images/onboarding/body_back.png"),
    arms: require("../../../assets/images/onboarding/body_arms.png"),
    shoulders: require("../../../assets/images/onboarding/body_shoulders.png"),
    abs: require("../../../assets/images/onboarding/body_abs.png"),
    legs: require("../../../assets/images/onboarding/body_legs.png"),
    glutes: require("../../../assets/images/onboarding/body_glutes.png"),
    full_body: require("../../../assets/images/onboarding/body_fullbody.png"),
};

// Animated overlay component
function BodyOverlay({ partId, isActive }: { partId: string; isActive: boolean }) {
    const opacity = useSharedValue(0);

    React.useEffect(() => {
        opacity.value = withTiming(isActive ? 1 : 0, { duration: 300 });
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const overlayImage = overlayImages[partId];
    if (!overlayImage) return null;

    return (
        <Animated.View style={[styles.overlayImage, animatedStyle]}>
            <Image
                source={overlayImage}
                style={styles.bodyImage}
                contentFit="contain"
            />
        </Animated.View>
    );
}

export default function OnboardingStep4Screen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'OnboardingStep4'>>();

    // Receive accumulated data
    const params = route.params || {};

    const { completeProfile } = useAuth(); // Destructure completeProfile

    const [selectedParts, setSelectedParts] = useState<string[]>([]);

    const togglePart = (id: string) => {
        setSelectedParts(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };

    const handleNext = async () => {
        // Prepare final data including body parts
        const finalData = { ...params, bodyFocus: selectedParts };
        console.log("Onboarding Complete Data:", finalData);

        // Save data and mark profile as complete
        await completeProfile(finalData);
        // Navigation to Main happens automatically due to RootStack condition, 
        // but strict navigation helps if transition is slow.
        // However, standard flow is Reactive.
    };

    const handleSkip = async () => {
        // Save what we have so far (params) even if body focus is empty?
        // Or save current selection too.
        const partialData = { ...params, bodyFocus: selectedParts };
        await completeProfile(partialData);
        // User said "finish last step OR skip should redirect to home".
        // Using completeProfile sets isProfileComplete=true.
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={[styles.progressContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                    <View style={[styles.progressBar, { width: '100%', backgroundColor: BrandColors.primary }]} />
                </View>
                <TouchableOpacity onPress={handleSkip} style={{ padding: 8 }}>
                    <ThemedText style={{ fontSize: 14, fontWeight: '600' }}>Saltar</ThemedText>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: insets.bottom + Spacing.xl + 80 }
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInDown.duration(600).delay(100)}>
                    <ThemedText type="h2" style={styles.title}>
                        Escolha suas áreas de foco
                    </ThemedText>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.duration(600).delay(200)}
                    style={styles.chipsContainer}
                >
                    {bodyParts.map((part) => {
                        const isSelected = selectedParts.includes(part.id);
                        return (
                            <TouchableOpacity
                                key={part.id}
                                style={[
                                    styles.chip,
                                    isSelected && styles.chipSelected
                                ]}
                                activeOpacity={0.7}
                                onPress={() => togglePart(part.id)}
                            >
                                <ThemedText
                                    type="body"
                                    style={[
                                        styles.chipText,
                                        isSelected && styles.chipTextSelected
                                    ]}
                                >
                                    {part.label}
                                </ThemedText>
                            </TouchableOpacity>
                        );
                    })}
                </Animated.View>

                <Animated.View
                    entering={FadeIn.delay(400).duration(800)}
                    style={styles.bodyImagesContainer}
                >
                    {/* Body anatomy images container */}
                    <View style={styles.fullBodyImageWrapper}>
                        {/* Base grayscale body image */}
                        <Image
                            source={require("../../../assets/images/onboarding/body_anatomy.png")}
                            style={styles.bodyImage}
                            contentFit="contain"
                        />

                        {/* Overlay images for each selected body part */}
                        {bodyParts.map((part) => (
                            <BodyOverlay
                                key={part.id}
                                partId={part.id}
                                isActive={selectedParts.includes(part.id)}
                            />
                        ))}
                    </View>
                </Animated.View>

            </ScrollView>

            <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
                <Button
                    onPress={handleNext}
                    disabled={selectedParts.length === 0}
                    style={{ width: "100%" }}
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
        backgroundColor: "#0A0A0A",
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
        paddingTop: Spacing.xl,
    },
    title: {
        color: "#FFFFFF",
        textAlign: 'left',
        marginBottom: Spacing.xl,
        fontSize: 28,
        fontWeight: '700',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
        marginBottom: Spacing.xl,
    },
    chip: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: 'transparent',
    },
    chipSelected: {
        backgroundColor: BrandColors.primary,
        borderColor: BrandColors.primary,
    },
    chipText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    chipTextSelected: {
        color: '#000000',
    },
    bodyImagesContainer: {
        alignItems: 'center',
        marginTop: Spacing.md,
    },
    fullBodyImageWrapper: {
        width: '100%',
        height: BODY_IMAGE_HEIGHT,
        position: 'relative',
    },
    bodyImage: {
        width: '100%',
        height: '100%',
    },
    overlayImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        backgroundColor: '#0A0A0A',
    },
});

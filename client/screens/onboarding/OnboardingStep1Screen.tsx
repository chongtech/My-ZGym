import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { BrandColors, Spacing } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/context/AuthContext";
import Animated, {
    FadeInDown,
    FadeInUp,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    withDelay,
    Easing
} from "react-native-reanimated";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");

const exerciseImages = [
    require("../../../assets/images/onboarding/exercise_1.png"),
    require("../../../assets/images/onboarding/exercise_2.png"),
];

const videoSource = "https://videos.pexels.com/video-files/5319759/5319759-uhd_2560_1440_25fps.mp4";

export default function OnboardingStep1Screen() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    const { skipOnboarding } = useAuth(); // Ensures this is available

    // Use shared values (ensure no duplicates)
    const imageOpacity1 = useSharedValue(0);
    const imageScale1 = useSharedValue(1.1);
    const imageOpacity2 = useSharedValue(0);
    const imageScale2 = useSharedValue(1.1);

    const handleSkip = () => {
        skipOnboarding();
        // Force navigation to Main? RootStack should handle update, but replace ensures stack clear
        // navigation.replace("Main") would fail if Main is in a different stack?
        // Actually RootStack conditional rendering will unmount this screen.
    };

    useEffect(() => {
        // Start first image animation (fix sequence start)
        imageOpacity1.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 1000 }),
                withDelay(2000, withTiming(0, { duration: 1000 })),
                withDelay(3000, withTiming(0, { duration: 0 })),
            ),
            -1,
            false
        );

        imageScale1.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 4000, easing: Easing.linear }),
                withTiming(1, { duration: 0 })
            ),
            -1,
            false
        );

        imageOpacity2.value = withDelay(
            4000,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: 1000 }),
                    withDelay(2000, withTiming(0, { duration: 1000 })),
                    withDelay(3000, withTiming(0, { duration: 0 })),
                ),
                -1,
                false
            )
        );

        imageScale2.value = withDelay(
            4000,
            withRepeat(
                withSequence(
                    withTiming(1.05, { duration: 4000, easing: Easing.linear }),
                    withTiming(1, { duration: 0 })
                ),
                -1,
                false
            )
        );
    }, []);

    const animatedStyle1 = useAnimatedStyle(() => ({
        opacity: imageOpacity1.value,
        transform: [{ scale: imageScale1.value }],
    }));

    const animatedStyle2 = useAnimatedStyle(() => ({
        opacity: imageOpacity2.value,
        transform: [{ scale: imageScale2.value }],
    }));

    const handleNext = () => {
        navigation.navigate("OnboardingStep2");
    };

    return (
        <View style={styles.container}>
            <View style={[styles.skipContainer, { top: insets.top + Spacing.sm }]}>
                <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                    <ThemedText style={styles.skipText}>Saltar</ThemedText>
                </TouchableOpacity>
            </View>

            <VideoView
                player={player}
                style={styles.video}
                contentFit="cover"
                nativeControls={false}
            />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.overlay}
            />

            <Animated.View style={[styles.imageLayer, animatedStyle1]}>
                <Image source={exerciseImages[0]} style={styles.exerciseImage} contentFit="cover" />
            </Animated.View>

            <Animated.View style={[styles.imageLayer, animatedStyle2]}>
                <Image source={exerciseImages[1]} style={styles.exerciseImage} contentFit="cover" />
            </Animated.View>

            <View style={[styles.contentContainer, { paddingBottom: insets.bottom + Spacing.xl, paddingTop: insets.top }]}>

                <View style={{ flex: 1 }} />

                <Animated.View entering={FadeInDown.delay(500).duration(1000)} style={styles.textContainer}>
                    <ThemedText style={[styles.subtitle, { color: "#FFFFFF" }]}>
                        Fomos feitos para você!
                    </ThemedText>
                    <ThemedText type="h1" style={[styles.title, { color: "#FFFFFF" }]}>
                        O Gravl usa a IA para criar seu treino perfeito todos os dias.
                    </ThemedText>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(1000).duration(1000)} style={styles.buttonContainer}>
                    <Button
                        onPress={handleNext}
                        style={{ backgroundColor: BrandColors.primary, width: "100%" }}
                    >
                        Continuar
                    </Button>
                </Animated.View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    video: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.4,
    },
    imageLayer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: Spacing.xl,
        justifyContent: "flex-end",
        zIndex: 2,
    },
    textContainer: {
        marginBottom: Spacing.xl,
    },
    subtitle: {
        fontSize: 18,
        opacity: 0.9,
        marginBottom: Spacing.sm,
        fontWeight: "500",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "left",
        lineHeight: 40,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },
    skipContainer: {
        position: 'absolute',
        right: Spacing.xl,
        zIndex: 50,
    },
    skipButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    skipText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

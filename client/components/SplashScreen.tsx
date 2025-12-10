import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { BrandColors } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Logo scale animation - starts small and scales up
    scale.value = withSequence(
      withSpring(1.2, {
        damping: 8,
        stiffness: 100,
      }),
      withSpring(1, {
        damping: 10,
        stiffness: 100,
      })
    );

    // Fade in animation
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    // Subtle rotation animation
    rotation.value = withSequence(
      withTiming(5, { duration: 400 }),
      withTiming(-5, { duration: 400 }),
      withTiming(0, { duration: 400 })
    );

    // Finish splash screen after animation completes
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <LinearGradient
        colors={['#1a1a1a', '#2C3E50', '#1a1a1a']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
          <Image
            source={require('../../assets/images/zgym-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />

          {/* Animated glow effect */}
          <View style={styles.glowContainer}>
            <View style={[styles.glow, { backgroundColor: BrandColors.primary }]} />
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.3,
    maxWidth: 300,
    maxHeight: 300,
  },
  glowContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  glow: {
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.2,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
  },
});

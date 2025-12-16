import React from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { RoutineCard } from "@/components/instructor/RoutineCard";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { mockWorkoutRoutines } from "@/data/mockData";
import type { InstructorWorkoutsStackParamList } from "@/navigation/InstructorWorkoutsStackNavigator";

type NavigationProp = NativeStackNavigationProp<InstructorWorkoutsStackParamList>;

export default function InstructorWorkoutsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={mockWorkoutRoutines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingTop: headerHeight + Spacing.lg,
          paddingBottom: tabBarHeight + Spacing.xl + 80,
        }}
        renderItem={({ item }) => (
          <RoutineCard
            routine={item}
            onPress={() => navigation.navigate("WorkoutBuilder", { routineId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="clipboard" size={48} color={theme.textSecondary} />
            <ThemedText
              type="body"
              style={{ color: theme.textSecondary, marginTop: Spacing.md }}
            >
              Sem rotinas criadas
            </ThemedText>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <View style={[styles.fabContainer, { bottom: tabBarHeight + Spacing.lg }]}>
        <Pressable onPress={() => navigation.navigate("WorkoutBuilder", {})}>
          <LinearGradient
            colors={['#E8FF2B', '#D4E828']}
            style={styles.fab}
          >
            <Feather name="plus" size={28} color="#000" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxl * 2,
  },
  fabContainer: {
    position: "absolute",
    right: Spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

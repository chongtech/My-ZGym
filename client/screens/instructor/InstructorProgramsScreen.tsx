import React from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockTrainingPrograms, mockWorkoutRoutines, TrainingProgram } from "@/data/mockData";
import type { InstructorWorkoutsStackParamList } from "@/navigation/InstructorWorkoutsStackNavigator";

type NavigationProp = NativeStackNavigationProp<InstructorWorkoutsStackParamList>;

export default function InstructorProgramsScreen() {
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();
    const tabBarHeight = useBottomTabBarHeight();
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const renderProgramCard = ({ item }: { item: TrainingProgram }) => {
        const workoutDays = item.weeklySchedule.filter((day) => !day.isRestDay).length;
        const totalWorkouts = workoutDays * item.durationWeeks;

        return (
            <Pressable
                onPress={() => navigation.navigate("ProgramBuilder", { programId: item.id })}
                style={[styles.programCard, { backgroundColor: theme.backgroundDefault }]}
            >
                <View style={styles.programHeader}>
                    <View
                        style={[
                            styles.iconContainer,
                            { backgroundColor: BrandColors.primary + "20" },
                        ]}
                    >
                        <Feather name="calendar" size={24} color={BrandColors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ThemedText type="h4" numberOfLines={1}>
                            {item.name}
                        </ThemedText>
                        <ThemedText
                            type="small"
                            numberOfLines={2}
                            style={{ color: theme.textSecondary, marginTop: 4 }}
                        >
                            {item.description}
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.programStats}>
                    <View style={styles.statItem}>
                        <Feather name="clock" size={16} color={theme.textSecondary} />
                        <ThemedText type="small" style={{ color: theme.textSecondary }}>
                            {item.durationWeeks} semanas
                        </ThemedText>
                    </View>
                    <View style={styles.statItem}>
                        <Feather name="activity" size={16} color={theme.textSecondary} />
                        <ThemedText type="small" style={{ color: theme.textSecondary }}>
                            {workoutDays}x por semana
                        </ThemedText>
                    </View>
                    <View style={styles.statItem}>
                        <Feather name="zap" size={16} color={theme.textSecondary} />
                        <ThemedText type="small" style={{ color: theme.textSecondary }}>
                            {totalWorkouts} treinos
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.programFooter}>
                    <Feather name="chevron-right" size={20} color={theme.textSecondary} />
                </View>
            </Pressable>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <FlatList
                data={mockTrainingPrograms}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingHorizontal: Spacing.lg,
                    paddingTop: headerHeight + Spacing.lg,
                    paddingBottom: tabBarHeight + Spacing.xl + 80,
                }}
                renderItem={renderProgramCard}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Feather name="calendar" size={48} color={theme.textSecondary} />
                        <ThemedText
                            type="body"
                            style={{ color: theme.textSecondary, marginTop: Spacing.md }}
                        >
                            Sem programas criados
                        </ThemedText>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />

            <View style={[styles.fabContainer, { bottom: tabBarHeight + Spacing.lg }]}>
                <Pressable onPress={() => navigation.navigate("ProgramBuilder", {})}>
                    <View style={[styles.fab, { backgroundColor: BrandColors.primary }]}>
                        <Feather name="plus" size={28} color={theme.text} />
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    programCard: {
        padding: Spacing.lg,
        borderRadius: BorderRadius["2xl"],
        marginBottom: Spacing.md,
    },
    programHeader: {
        flexDirection: "row",
        gap: Spacing.md,
        marginBottom: Spacing.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    programStats: {
        flexDirection: "row",
        gap: Spacing.lg,
        paddingBottom: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    programFooter: {
        alignItems: "flex-end",
        marginTop: Spacing.md,
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Spacing.xl * 2,
    },
    fabContainer: {
        position: "absolute",
        right: Spacing.lg,
        shadowColor: BrandColors.secondary,
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

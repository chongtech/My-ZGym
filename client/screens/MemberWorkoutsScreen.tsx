import React, { useState } from "react";
import { View, StyleSheet, FlatList, Pressable, ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import {
    mockWorkoutRoutines,
    mockTrainingPrograms,
    mockProgramAssignments,
    weekDays,
    type WorkoutRoutine,
    type TrainingProgram,
    type ProgramAssignment
} from "@/data/mockData";

export default function MemberWorkoutsScreen() {
    const headerHeight = useHeaderHeight();
    const tabBarHeight = useBottomTabBarHeight();
    const { theme } = useTheme();

    // Mock logged-in user (Simulate "João Silva")
    const currentUserId = "10";

    // Find active assignment
    const activeAssignment = mockProgramAssignments.find(
        (a) => a.clientId === currentUserId && a.status === "active"
    );

    // Find the program details
    const activeProgram = activeAssignment
        ? mockTrainingPrograms.find((p) => p.id === activeAssignment.programId)
        : undefined;

    // Get today's day of week (0-6, where 0 is Monday in our mock data logic)
    // Note: JS getDay() is 0=Sun, 1=Mon. Our mock data seems to use 0=Mon based on weekDays array.
    // Let's adjust standard JS getDay to match our mock data (0=Mon, ..., 6=Sun)
    const today = new Date();
    const jsDay = today.getDay(); // 0=Sun, 1=Mon
    const currentDayIndex = jsDay === 0 ? 6 : jsDay - 1;

    const [selectedDay, setSelectedDay] = useState(currentDayIndex);

    const renderProgramHeader = () => {
        if (!activeProgram || !activeAssignment) {
            return (
                <View style={styles.noPlanContainer}>
                    <Feather name="frown" size={48} color={theme.textSecondary} />
                    <ThemedText type="h3" style={{ marginTop: Spacing.md, textAlign: "center" }}>
                        Sem Plano Ativo
                    </ThemedText>
                    <ThemedText type="body" style={{ color: theme.textSecondary, textAlign: "center", marginTop: Spacing.xs }}>
                        Pede ao teu instrutor para te atribuir um plano de treino personalizado.
                    </ThemedText>
                </View>
            );
        }

        return (
            <View style={[styles.programHeader, { backgroundColor: theme.backgroundDefault }]}>
                <View>
                    <ThemedText type="caption" style={{ color: BrandColors.primary, fontWeight: "700", marginBottom: 4 }}>
                        PLANO ATUAL
                    </ThemedText>
                    <ThemedText type="h2">{activeProgram.name}</ThemedText>
                    <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: 4 }}>
                        {activeProgram.description}
                    </ThemedText>
                </View>

                <View style={styles.programStats}>
                    <View style={styles.statItem}>
                        <ThemedText type="h3">{activeAssignment.currentWeek}</ThemedText>
                        <ThemedText type="caption" style={{ color: theme.textSecondary }}>Semana</ThemedText>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <ThemedText type="h3">{activeAssignment.completedWorkouts}/{activeAssignment.totalWorkouts}</ThemedText>
                        <ThemedText type="caption" style={{ color: theme.textSecondary }}>Treinos</ThemedText>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <ThemedText type="h3">{activeProgram.durationWeeks}</ThemedText>
                        <ThemedText type="caption" style={{ color: theme.textSecondary }}>Duração</ThemedText>
                    </View>
                </View>
            </View>
        );
    };

    // Helper to get dates for the current week (starting Monday)
    const getCurrentWeekDates = () => {
        const d = new Date();
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        const monday = new Date(d.setDate(diff));

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const nextDate = new Date(monday);
            nextDate.setDate(monday.getDate() + i);
            dates.push(nextDate);
        }
        return dates;
    };

    const weekDates = getCurrentWeekDates();

    const renderWeekCalendar = () => {
        if (!activeProgram) return null;

        return (
            <View style={styles.calendarContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md, paddingHorizontal: Spacing.lg }}>
                    <ThemedText type="h4">
                        Agenda da Semana
                    </ThemedText>
                    {activeAssignment && (
                        <ThemedText type="small" style={{ color: theme.textSecondary }}>
                            {weekDates[0].toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })} - {weekDates[6].toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}
                        </ThemedText>
                    )}
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Spacing.lg }}
                >
                    {weekDates.map((date, index) => {
                        const isSelected = selectedDay === index;
                        const isToday = currentDayIndex === index;
                        const daySchedule = activeProgram.weeklySchedule.find(s => s.dayOfWeek === index);
                        const isRestDay = daySchedule?.isRestDay;
                        const dayName = weekDays[index];

                        return (
                            <Pressable
                                key={index}
                                onPress={() => setSelectedDay(index)}
                                style={[
                                    styles.dayCard,
                                    {
                                        backgroundColor: isSelected ? BrandColors.primary : theme.backgroundDefault,
                                        borderColor: isToday && !isSelected ? BrandColors.primary : "transparent",
                                        borderWidth: isToday && !isSelected ? 1 : 0,
                                    }
                                ]}
                            >
                                <ThemedText
                                    type="caption"
                                    style={{
                                        color: isSelected ? theme.backgroundRoot : theme.textSecondary,
                                        fontWeight: isSelected ? "700" : "400",
                                        fontSize: 10,
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {dayName}
                                </ThemedText>
                                <ThemedText
                                    type="h4"
                                    style={{
                                        color: isSelected ? theme.backgroundRoot : theme.text,
                                        fontWeight: isSelected ? "700" : "600",
                                        marginTop: -4
                                    }}
                                >
                                    {date.getDate()}
                                </ThemedText>
                                <View style={styles.dayIndicator}>
                                    {isRestDay ? (
                                        <Feather name="coffee" size={14} color={isSelected ? theme.backgroundRoot : theme.textSecondary} />
                                    ) : (
                                        <Feather name="activity" size={14} color={isSelected ? theme.backgroundRoot : BrandColors.primary} />
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>
        );
    };

    const renderDailyWorkout = () => {
        if (!activeProgram) return null;

        const schedule = activeProgram.weeklySchedule.find(s => s.dayOfWeek === selectedDay);

        if (!schedule || schedule.isRestDay) {
            return (
                <View style={[styles.restDayContainer, { backgroundColor: theme.backgroundDefault }]}>
                    <Feather name="coffee" size={48} color={theme.success} />
                    <ThemedText type="h3" style={{ marginTop: Spacing.md }}>
                        Dia de Descanso
                    </ThemedText>
                    <ThemedText type="body" style={{ color: theme.textSecondary, textAlign: "center", marginTop: Spacing.sm }}>
                        A recuperação é parte importante do progresso. Aproveita para descansar, hidratar-te e fazer alongamentos leves.
                    </ThemedText>
                </View>
            );
        }

        const workout = mockWorkoutRoutines.find(w => w.id === schedule.routineId);

        if (!workout) {
            return (
                <View style={styles.errorContainer}>
                    <ThemedText>Erro ao carregar o treino.</ThemedText>
                </View>
            );
        }

        // Reuse existing card render logic but expanded
        const difficultyColor =
            workout.difficulty === "beginner" ? BrandColors.success :
                workout.difficulty === "intermediate" ? BrandColors.accent :
                    BrandColors.error;

        return (
            <View style={styles.dailyWorkoutContainer}>
                <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                    Treino de Hoje
                </ThemedText>

                <ThemedView style={[styles.workoutCard, { backgroundColor: theme.backgroundDefault }]}>
                    <View style={styles.workoutHeader}>
                        <View style={{ flex: 1 }}>
                            <ThemedText type="h3" style={styles.workoutName}>
                                {workout.name}
                            </ThemedText>
                            <ThemedText type="caption" style={{ color: theme.textSecondary, marginTop: 4 }}>
                                {workout.description}
                            </ThemedText>
                        </View>
                        <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor + "20" }]}>
                            <ThemedText type="caption" style={{ color: difficultyColor, fontWeight: "600" }}>
                                {workout.difficulty === "beginner" ? "Iniciante" :
                                    workout.difficulty === "intermediate" ? "Intermédio" : "Avançado"}
                            </ThemedText>
                        </View>
                    </View>

                    <View style={styles.workoutMeta}>
                        <View style={styles.metaItem}>
                            <Feather name="clock" size={16} color={theme.textSecondary} />
                            <ThemedText type="caption" style={{ color: theme.textSecondary, marginLeft: 6 }}>
                                {workout.durationMinutes} min
                            </ThemedText>
                        </View>
                        <View style={styles.metaItem}>
                            <Feather name="bar-chart-2" size={16} color={theme.textSecondary} />
                            <ThemedText type="caption" style={{ color: theme.textSecondary, marginLeft: 6 }}>
                                {workout.exercises.length} exercícios
                            </ThemedText>
                        </View>
                    </View>

                    <View style={styles.exercisesList}>
                        <ThemedText type="caption" style={{ color: theme.textSecondary, marginBottom: 8 }}>
                            Resumo do Treino:
                        </ThemedText>
                        {workout.exercises.slice(0, 4).map((ex, idx) => (
                            <View key={idx} style={styles.exerciseItem}>
                                <Feather name="check-circle" size={14} color={BrandColors.primary} style={{ marginRight: 8 }} />
                                <ThemedText type="body" numberOfLines={1}>
                                    Exercício {idx + 1}
                                </ThemedText>
                            </View>
                        ))}
                        {workout.exercises.length > 4 && (
                            <ThemedText type="caption" style={{ color: theme.textSecondary, marginTop: 4, marginLeft: 22 }}>
                                +{workout.exercises.length - 4} outros exercícios
                            </ThemedText>
                        )}
                    </View>

                    <Pressable
                        style={[styles.startWorkoutButton, styles.gradientButton, { backgroundColor: BrandColors.primary }]}
                        onPress={() => alert(`Iniciar treino: ${workout.name}`)}
                    >
                        <ThemedText type="button" style={{ color: theme.buttonText }}>
                            INICIAR TREINO
                        </ThemedText>
                        <Feather name="play" size={20} color={theme.buttonText} style={{ marginLeft: 8 }} />
                    </Pressable>
                </ThemedView>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: headerHeight + Spacing.lg,
                    paddingBottom: tabBarHeight + Spacing.xl,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg }}>
                    <ThemedText type="h1">Meu Plano</ThemedText>
                    <ThemedText type="body" style={{ color: theme.textSecondary }}>
                        O teu caminho para o sucesso
                    </ThemedText>
                </View>

                {renderProgramHeader()}

                {activeProgram && (
                    <>
                        {renderWeekCalendar()}
                        <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.xl }}>
                            {renderDailyWorkout()}
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    programHeader: {
        marginHorizontal: Spacing.lg,
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.xl,
    },
    programStats: {
        flexDirection: "row",
        marginTop: Spacing.lg,
        paddingTop: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.05)",
        justifyContent: "space-between",
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statDivider: {
        width: 1,
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.05)",
    },
    calendarContainer: {
        marginBottom: Spacing.md,
    },
    dayCard: {
        width: 60,
        height: 80,
        borderRadius: BorderRadius.lg,
        alignItems: "center",
        justifyContent: "center",
        marginRight: Spacing.md,
        gap: Spacing.sm,
    },
    dayIndicator: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.05)",
        alignItems: "center",
        justifyContent: "center",
    },
    restDayContainer: {
        padding: Spacing.xl,
        borderRadius: BorderRadius.xl,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
    },
    dailyWorkoutContainer: {
        width: "100%",
    },
    workoutCard: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        width: "100%",
    },
    workoutHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: Spacing.md,
    },
    workoutName: {
        fontWeight: "700",
    },
    difficultyBadge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: BorderRadius.sm,
        marginLeft: Spacing.sm,
    },
    workoutMeta: {
        flexDirection: "row",
        gap: Spacing.lg,
        marginBottom: Spacing.lg,
        paddingBottom: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    exercisesList: {
        marginBottom: Spacing.xl,
    },
    exerciseItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    startWorkoutButton: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.md,
    },
    noPlanContainer: {
        padding: Spacing["2xl"],
        alignItems: "center",
        justifyContent: "center",
    },
    errorContainer: {
        padding: Spacing.lg,
        alignItems: "center",
    }
});

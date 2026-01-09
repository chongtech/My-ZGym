import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { ClientSelector } from "@/components/instructor/ClientSelector";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockTrainingPrograms, mockWorkoutRoutines, ProgramDaySchedule } from "@/data/mockData";
import type { InstructorWorkoutsStackParamList } from "@/navigation/InstructorWorkoutsStackNavigator";

type ProgramBuilderRouteProp = RouteProp<InstructorWorkoutsStackParamList, "ProgramBuilder">;
type NavigationProp = NativeStackNavigationProp<InstructorWorkoutsStackParamList>;

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const weekDaysFull = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export default function ProgramBuilderScreen() {
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();
    const tabBarHeight = useBottomTabBarHeight();
    const { theme } = useTheme();
    const route = useRoute<ProgramBuilderRouteProp>();
    const navigation = useNavigation<NavigationProp>();

    const existingProgram = route.params?.programId
        ? mockTrainingPrograms.find((p) => p.id === route.params.programId)
        : null;

    const [name, setName] = useState(existingProgram?.name || "");
    const [description, setDescription] = useState(existingProgram?.description || "");
    const [durationWeeks, setDurationWeeks] = useState(existingProgram?.durationWeeks.toString() || "8");
    const [selectedClients, setSelectedClients] = useState<string[]>([]);
    const [weeklySchedule, setWeeklySchedule] = useState<ProgramDaySchedule[]>(
        existingProgram?.weeklySchedule || [
            { dayOfWeek: 0, routineId: null, isRestDay: true },
            { dayOfWeek: 1, routineId: null, isRestDay: true },
            { dayOfWeek: 2, routineId: null, isRestDay: true },
            { dayOfWeek: 3, routineId: null, isRestDay: true },
            { dayOfWeek: 4, routineId: null, isRestDay: true },
            { dayOfWeek: 5, routineId: null, isRestDay: true },
            { dayOfWeek: 6, routineId: null, isRestDay: true },
        ]
    );
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const handleDayPress = (dayIndex: number) => {
        setSelectedDay(dayIndex);
    };

    const handleRoutineSelect = (routineId: string) => {
        if (selectedDay !== null) {
            const newSchedule = [...weeklySchedule];
            newSchedule[selectedDay] = {
                dayOfWeek: selectedDay,
                routineId,
                isRestDay: false,
            };
            setWeeklySchedule(newSchedule);
            setSelectedDay(null);
        }
    };

    const handleSetRestDay = (dayIndex: number) => {
        const newSchedule = [...weeklySchedule];
        newSchedule[dayIndex] = {
            dayOfWeek: dayIndex,
            routineId: null,
            isRestDay: true,
        };
        setWeeklySchedule(newSchedule);
    };

    const getRoutineName = (routineId: string | null) => {
        if (!routineId) return null;
        const routine = mockWorkoutRoutines.find((r) => r.id === routineId);
        return routine?.name || "Treino";
    };

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert("Erro", "Por favor, insira um nome para o programa");
            return;
        }

        const workoutDays = weeklySchedule.filter((day) => !day.isRestDay).length;
        if (workoutDays === 0) {
            Alert.alert("Erro", "Por favor, adicione pelo menos um dia de treino");
            return;
        }

        // TODO: Save program with API
        console.log("Saving program:", {
            name,
            description,
            durationWeeks: parseInt(durationWeeks),
            weeklySchedule,
            selectedClients,
        });

        Alert.alert(
            "Programa Criado",
            `O programa "${name}" foi criado com sucesso!${selectedClients.length > 0 ? ` Atribuído a ${selectedClients.length} cliente(s).` : ""}`,
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
            contentContainerStyle={{
                paddingTop: headerHeight + Spacing.lg,
                paddingBottom: tabBarHeight + Spacing.xl * 2,
                paddingHorizontal: Spacing.lg,
            }}
            showsVerticalScrollIndicator={false}
        >
            <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                    Informação do Programa
                </ThemedText>
                <View style={styles.inputGroup}>
                    <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                        Nome do Programa
                    </ThemedText>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.backgroundSecondary,
                                color: theme.text,
                                borderColor: theme.border,
                            },
                        ]}
                        placeholder="Ex: Programa Push/Pull/Legs - 8 Semanas"
                        placeholderTextColor={theme.textSecondary}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                        Descrição
                    </ThemedText>
                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                            {
                                backgroundColor: theme.backgroundSecondary,
                                color: theme.text,
                                borderColor: theme.border,
                            },
                        ]}
                        placeholder="Descrição do programa..."
                        placeholderTextColor={theme.textSecondary}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={3}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <ThemedText type="body" style={{ marginBottom: Spacing.xs }}>
                        Duração (semanas)
                    </ThemedText>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.backgroundSecondary,
                                color: theme.text,
                                borderColor: theme.border,
                            },
                        ]}
                        placeholder="8"
                        placeholderTextColor={theme.textSecondary}
                        value={durationWeeks}
                        onChangeText={setDurationWeeks}
                        keyboardType="number-pad"
                    />
                </View>
            </Card>

            <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                <ThemedText type="h4" style={{ marginBottom: Spacing.xs }}>
                    Agenda Semanal
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.md }}>
                    Defina os treinos para cada dia da semana
                </ThemedText>

                {weeklySchedule.map((day, index) => {
                    const routineName = getRoutineName(day.routineId);
                    const isSelected = selectedDay === index;

                    return (
                        <Pressable
                            key={index}
                            onPress={() => handleDayPress(index)}
                            style={[
                                styles.dayCard,
                                {
                                    backgroundColor: isSelected
                                        ? BrandColors.primary + "20"
                                        : theme.backgroundSecondary,
                                    borderColor: isSelected ? BrandColors.primary : "transparent",
                                },
                            ]}
                        >
                            <View style={styles.dayHeader}>
                                <View style={styles.dayInfo}>
                                    <ThemedText type="h4">{weekDaysFull[index]}</ThemedText>
                                    {day.isRestDay ? (
                                        <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                            Dia de descanso
                                        </ThemedText>
                                    ) : (
                                        <ThemedText type="small" style={{ color: BrandColors.primary }}>
                                            {routineName}
                                        </ThemedText>
                                    )}
                                </View>
                                {!day.isRestDay && (
                                    <Pressable
                                        onPress={() => handleSetRestDay(index)}
                                        style={styles.restButton}
                                    >
                                        <Feather name="x" size={16} color={theme.textSecondary} />
                                    </Pressable>
                                )}
                            </View>
                        </Pressable>
                    );
                })}
            </Card>

            {selectedDay !== null && (
                <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                    <View style={styles.sectionHeader}>
                        <ThemedText type="h4">Selecionar Treino para {weekDaysFull[selectedDay]}</ThemedText>
                        <Pressable onPress={() => setSelectedDay(null)}>
                            <Feather name="x" size={20} color={theme.text} />
                        </Pressable>
                    </View>
                    <ScrollView
                        style={{ maxHeight: 300 }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    >
                        {mockWorkoutRoutines.map((routine) => (
                            <Pressable
                                key={routine.id}
                                onPress={() => handleRoutineSelect(routine.id)}
                                style={[
                                    styles.routineOption,
                                    { backgroundColor: theme.backgroundRoot },
                                ]}
                            >
                                <View style={{ flex: 1 }}>
                                    <ThemedText type="body">{routine.name}</ThemedText>
                                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                        {routine.durationMinutes} min • {routine.exercises.length} exercícios
                                    </ThemedText>
                                </View>
                                <Feather name="chevron-right" size={20} color={theme.textSecondary} />
                            </Pressable>
                        ))}
                    </ScrollView>
                </Card>
            )}

            <Card elevation={1} style={{ marginBottom: Spacing.lg }}>
                <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
                    Atribuir a Clientes
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.md }}>
                    Selecione os clientes que irão receber este programa
                </ThemedText>
                <ClientSelector
                    selectedClients={selectedClients}
                    onToggleClient={(clientId) => {
                        setSelectedClients((prev) =>
                            prev.includes(clientId)
                                ? prev.filter((id) => id !== clientId)
                                : [...prev, clientId]
                        );
                    }}
                />
            </Card>

            <Pressable onPress={handleSave}>
                <View style={[styles.saveButton, { backgroundColor: BrandColors.primary }]}>
                    <ThemedText type="body" style={{ color: theme.text, fontWeight: "600" }}>
                        {existingProgram ? "Guardar Alterações" : "Criar Programa"}
                    </ThemedText>
                </View>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: Spacing.lg,
    },
    input: {
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    dayCard: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.sm,
        borderWidth: 2,
    },
    dayHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dayInfo: {
        flex: 1,
    },
    restButton: {
        padding: Spacing.xs,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Spacing.md,
    },
    routineOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
    },
    saveButton: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        alignItems: "center",
    },
});

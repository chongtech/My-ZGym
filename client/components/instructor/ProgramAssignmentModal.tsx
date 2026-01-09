import React, { useState } from "react";
import { View, StyleSheet, Modal, Pressable, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockTrainingPrograms, TrainingProgram } from "@/data/mockData";

interface ProgramAssignmentModalProps {
    visible: boolean;
    clientName: string;
    currentProgramId?: string;
    onClose: () => void;
    onAssign: (programId: string, programName: string) => void;
}

export function ProgramAssignmentModal({
    visible,
    clientName,
    currentProgramId,
    onClose,
    onAssign,
}: ProgramAssignmentModalProps) {
    const { theme } = useTheme();
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

    const handleAssign = () => {
        if (selectedProgram) {
            const program = mockTrainingPrograms.find((p) => p.id === selectedProgram);
            if (program) {
                onAssign(program.id, program.name);
                onClose();
            }
        }
    };

    const renderProgramItem = ({ item }: { item: TrainingProgram }) => {
        const isSelected = selectedProgram === item.id;
        const isCurrent = currentProgramId === item.id;
        const workoutDays = item.weeklySchedule.filter((day) => !day.isRestDay).length;

        return (
            <Pressable
                onPress={() => setSelectedProgram(item.id)}
                style={[
                    styles.routineItem,
                    {
                        backgroundColor: isSelected
                            ? BrandColors.primary + "20"
                            : theme.backgroundDefault,
                        borderColor: isSelected ? BrandColors.primary : "transparent",
                    },
                ]}
            >
                <View style={styles.routineInfo}>
                    <View style={styles.routineHeader}>
                        <ThemedText type="h4" numberOfLines={1}>
                            {item.name}
                        </ThemedText>
                        {isCurrent && (
                            <View
                                style={[
                                    styles.currentBadge,
                                    { backgroundColor: BrandColors.primary },
                                ]}
                            >
                                <ThemedText type="small" style={{ color: theme.buttonText, fontSize: 10 }}>
                                    ATUAL
                                </ThemedText>
                            </View>
                        )}
                    </View>
                    <ThemedText
                        type="small"
                        numberOfLines={2}
                        style={{ color: theme.textSecondary, marginTop: 4 }}
                    >
                        {item.description}
                    </ThemedText>
                    <View style={styles.routineMeta}>
                        <View style={styles.metaItem}>
                            <Feather name="calendar" size={14} color={theme.textSecondary} />
                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                {item.durationWeeks} semanas
                            </ThemedText>
                        </View>
                        <View style={styles.metaItem}>
                            <Feather name="activity" size={14} color={theme.textSecondary} />
                            <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                {workoutDays}x por semana
                            </ThemedText>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        styles.radioButton,
                        {
                            borderColor: isSelected ? BrandColors.primary : theme.border,
                            backgroundColor: isSelected ? BrandColors.primary : "transparent",
                        },
                    ]}
                >
                    {isSelected && <Feather name="check" size={16} color={theme.buttonText} />}
                </View>
            </Pressable>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.modalContent,
                        { backgroundColor: theme.backgroundRoot },
                    ]}
                >
                    <View style={styles.modalHeader}>
                        <View>
                            <ThemedText type="h3">Atribuir Programa</ThemedText>
                            <ThemedText
                                type="small"
                                style={{ color: theme.textSecondary, marginTop: 4 }}
                            >
                                Cliente: {clientName}
                            </ThemedText>
                        </View>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Feather name="x" size={24} color={theme.text} />
                        </Pressable>
                    </View>

                    <FlatList
                        data={mockTrainingPrograms}
                        keyExtractor={(item) => item.id}
                        renderItem={renderProgramItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.modalFooter}>
                        <Pressable
                            onPress={onClose}
                            style={[
                                styles.button,
                                styles.cancelButton,
                                { borderColor: theme.border },
                            ]}
                        >
                            <ThemedText type="body" style={{ color: theme.text }}>
                                Cancelar
                            </ThemedText>
                        </Pressable>
                        <Pressable
                            onPress={handleAssign}
                            disabled={!selectedProgram}
                            style={[
                                styles.button,
                                styles.assignButton,
                                {
                                    backgroundColor: selectedProgram
                                        ? BrandColors.primary
                                        : theme.backgroundSecondary,
                                    opacity: selectedProgram ? 1 : 0.5,
                                },
                            ]}
                        >
                            <ThemedText
                                type="body"
                                style={{ color: theme.buttonText, fontWeight: "600" }}
                            >
                                Atribuir Programa
                            </ThemedText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        height: "85%",
        borderTopLeftRadius: BorderRadius["3xl"],
        borderTopRightRadius: BorderRadius["3xl"],
        paddingTop: Spacing.xl,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    closeButton: {
        padding: Spacing.xs,
    },
    listContent: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
    routineItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.md,
        borderWidth: 2,
    },
    routineInfo: {
        flex: 1,
        marginRight: Spacing.md,
    },
    routineHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.sm,
    },
    currentBadge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    routineMeta: {
        flexDirection: "row",
        gap: Spacing.md,
        marginTop: Spacing.sm,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    radioButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    modalFooter: {
        flexDirection: "row",
        gap: Spacing.md,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.05)",
    },
    button: {
        flex: 1,
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        alignItems: "center",
    },
    cancelButton: {
        borderWidth: 1,
    },
    assignButton: {},
});

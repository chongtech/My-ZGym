import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockInstructorClients, InstructorClient } from "@/data/mockData";

interface ClientSelectorProps {
    selectedClients: string[];
    onToggleClient: (clientId: string) => void;
    maxHeight?: number;
}

export function ClientSelector({
    selectedClients,
    onToggleClient,
    maxHeight = 300,
}: ClientSelectorProps) {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredClients = mockInstructorClients.filter((client) =>
        client.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderClientItem = ({ item }: { item: InstructorClient }) => {
        const isSelected = selectedClients.includes(item.id);

        return (
            <Pressable
                onPress={() => onToggleClient(item.id)}
                style={[
                    styles.clientItem,
                    {
                        backgroundColor: isSelected
                            ? BrandColors.primary + "20"
                            : theme.backgroundSecondary,
                        borderColor: isSelected ? BrandColors.primary : "transparent",
                    },
                ]}
            >
                <View style={styles.clientInfo}>
                    <View
                        style={[styles.avatar, { backgroundColor: theme.backgroundDefault }]}
                    >
                        <Feather name="user" size={20} color={theme.textSecondary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ThemedText type="body" numberOfLines={1}>
                            {item.fullName}
                        </ThemedText>
                        <ThemedText
                            type="small"
                            numberOfLines={1}
                            style={{ color: theme.textSecondary }}
                        >
                            {item.currentProgram || "Sem programa"}
                        </ThemedText>
                    </View>
                </View>
                <View
                    style={[
                        styles.checkbox,
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
        <View style={styles.container}>
            <View
                style={[
                    styles.searchContainer,
                    { backgroundColor: theme.backgroundSecondary },
                ]}
            >
                <Feather name="search" size={18} color={theme.textSecondary} />
                <TextInput
                    style={[styles.searchInput, { color: theme.text }]}
                    placeholder="Procurar clientes..."
                    placeholderTextColor={theme.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <Pressable onPress={() => setSearchQuery("")}>
                        <Feather name="x" size={18} color={theme.textSecondary} />
                    </Pressable>
                )}
            </View>

            {selectedClients.length > 0 && (
                <View style={styles.selectedCount}>
                    <Feather name="users" size={16} color={BrandColors.primary} />
                    <ThemedText type="small" style={{ color: BrandColors.primary }}>
                        {selectedClients.length} cliente{selectedClients.length !== 1 ? "s" : ""}{" "}
                        selecionado{selectedClients.length !== 1 ? "s" : ""}
                    </ThemedText>
                </View>
            )}

            <ScrollView
                style={{ maxHeight }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                {filteredClients.length > 0 ? (
                    filteredClients.map((item) => (
                        <View key={item.id}>{renderClientItem({ item })}</View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Feather name="users" size={32} color={theme.textSecondary} />
                        <ThemedText
                            type="body"
                            style={{ color: theme.textSecondary, marginTop: Spacing.sm }}
                        >
                            {searchQuery
                                ? "Nenhum cliente encontrado"
                                : "Sem clientes disponíveis"}
                        </ThemedText>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.md,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        gap: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        padding: 0,
    },
    selectedCount: {
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.xs,
    },
    clientItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
        borderWidth: 2,
    },
    clientInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.md,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyState: {
        alignItems: "center",
        paddingVertical: Spacing.xl * 2,
    },
});

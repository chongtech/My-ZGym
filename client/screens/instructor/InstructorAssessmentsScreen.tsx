import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, BorderRadius, BrandColors } from '@/constants/theme';
import { mockInstructorClients, mockPhysicalAssessments } from '@/data/mockData';
import type { InstructorAssessmentsStackParamList } from '@/navigation/InstructorAssessmentsStackNavigator';

type NavigationProp = NativeStackNavigationProp<InstructorAssessmentsStackParamList>;

export default function InstructorAssessmentsScreen() {
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();
    const tabBarHeight = useBottomTabBarHeight();
    const { theme } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const [searchQuery, setSearchQuery] = useState('');

    // Filter clients based on search
    const filteredClients = mockInstructorClients.filter((client) =>
        client.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateAssessment = (memberId: string) => {
        navigation.navigate('AssessmentBuilder', { memberId });
    };

    const handleViewHistory = (memberId: string) => {
        navigation.navigate('AssessmentDetail', { memberId });
    };

    const renderMemberCard = ({ item }: { item: typeof mockInstructorClients[0] }) => {
        const clientAssessments = mockPhysicalAssessments.filter(a => a.memberId === item.id);
        const hasAssessment = clientAssessments.length > 0;

        // Sort assessments by date desc
        const sortedAssessments = [...clientAssessments].sort((a, b) =>
            new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime()
        );
        const lastAssessmentDate = sortedAssessments[0]?.assessmentDate;

        return (
            <Pressable
                onPress={() => hasAssessment ? handleViewHistory(item.id) : handleCreateAssessment(item.id)}
            >
                <Card elevation={1} style={styles.memberCard}>
                    <View style={styles.memberCardContent}>
                        {/* Member Avatar */}
                        <View style={[styles.avatar, { backgroundColor: BrandColors.primary + '20' }]}>
                            {item.profilePhoto ? (
                                <ThemedText style={{ fontSize: 20 }}>👤</ThemedText>
                            ) : (
                                <Feather name="user" size={24} color={BrandColors.primary} />
                            )}
                        </View>

                        {/* Member Info */}
                        <View style={styles.memberInfo}>
                            <ThemedText type="body" style={{ fontWeight: '600' }}>
                                {item.fullName}
                            </ThemedText>
                            <View style={styles.memberMeta}>
                                <View
                                    style={[
                                        styles.tierBadge,
                                        {
                                            backgroundColor:
                                                item.membershipTier === 'gold'
                                                    ? BrandColors.warning
                                                    : item.membershipTier === 'silver'
                                                        ? '#C0C0C0'
                                                        : '#CD7F32',
                                        },
                                    ]}
                                >
                                    <ThemedText style={styles.tierText}>
                                        {item.membershipTier.toUpperCase()}
                                    </ThemedText>
                                </View>
                                {hasAssessment && lastAssessmentDate && (
                                    <ThemedText type="small" style={{ color: theme.textSecondary }}>
                                        Última: {new Date(lastAssessmentDate).toLocaleDateString('pt-PT')}
                                    </ThemedText>
                                )}
                            </View>
                        </View>

                        {/* Action Indicator */}
                        <View style={styles.actionContainer}>
                            {hasAssessment ? (
                                <View style={styles.statusBadge}>
                                    <Feather name="check-circle" size={16} color={BrandColors.success} />
                                    <ThemedText type="small" style={{ color: BrandColors.success, marginLeft: 4 }}>
                                        Avaliado
                                    </ThemedText>
                                </View>
                            ) : (
                                <View style={[styles.statusBadge, { backgroundColor: BrandColors.primary + '20' }]}>
                                    <Feather name="plus-circle" size={16} color={BrandColors.primary} />
                                    <ThemedText type="small" style={{ color: BrandColors.primary, marginLeft: 4 }}>
                                        Criar
                                    </ThemedText>
                                </View>
                            )}
                            <Feather name="chevron-right" size={20} color={theme.textSecondary} style={{ marginLeft: 8 }} />
                        </View>
                    </View>
                </Card>
            </Pressable>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
            {/* Search Bar */}
            <View style={[styles.searchContainer, { paddingTop: headerHeight + Spacing.md }]}>
                <View style={[styles.searchBar, { backgroundColor: theme.backgroundSecondary, borderColor: theme.border }]}>
                    <Feather name="search" size={20} color={theme.textSecondary} />
                    <TextInput
                        style={[styles.searchInput, { color: theme.text }]}
                        placeholder="Procurar membro..."
                        placeholderTextColor={theme.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery('')}>
                            <Feather name="x" size={20} color={theme.textSecondary} />
                        </Pressable>
                    )}
                </View>
            </View>

            {/* Members List */}
            <FlatList
                data={filteredClients}
                renderItem={renderMemberCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingHorizontal: Spacing.lg,
                    paddingTop: Spacing.md,
                    paddingBottom: tabBarHeight + Spacing.xl * 2,
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Feather name="users" size={48} color={theme.textSecondary} />
                        <ThemedText type="h4" style={{ marginTop: Spacing.md, color: theme.textSecondary }}>
                            Nenhum membro encontrado
                        </ThemedText>
                    </View>
                }
            />

            {/* Floating Action Button */}
            <Pressable
                style={[styles.fab, { bottom: tabBarHeight + Spacing.xl }]}
                onPress={() => {
                    // Navigate to first client without assessment or show picker
                    const clientWithoutAssessment = mockInstructorClients[0];
                    if (clientWithoutAssessment) {
                        handleCreateAssessment(clientWithoutAssessment.id);
                    }
                }}
            >
                <View style={[styles.fabGradient, { backgroundColor: BrandColors.primary }]}>
                    <Feather name="plus" size={24} color={theme.text} />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.md,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: Spacing.sm,
        fontSize: 16,
    },
    memberCard: {
        marginBottom: Spacing.md,
    },
    memberCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
    memberInfo: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    memberMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.xs,
        gap: Spacing.sm,
    },
    tierBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    tierText: {
        fontSize: 10,
        fontWeight: '700',
        color: BrandColors.secondary,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.xl * 3,
    },
    fab: {
        position: 'absolute',
        right: Spacing.lg,
        width: 56,
        height: 56,
        borderRadius: BorderRadius.full,
        shadowColor: BrandColors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    fabGradient: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

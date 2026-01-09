import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockClasses, type GymClass } from "@/data/mockData";
import type { ManagerScheduleStackParamList } from "@/navigation/ManagerScheduleStackNavigator";

type NavigationProp = NativeStackNavigationProp<ManagerScheduleStackParamList>;

export default function ClassScheduleScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  // Agrupar aulas por nome para mostrar apenas uma vez cada tipo
  const uniqueClasses = mockClasses.reduce((acc, classItem) => {
    const existing = acc.find(c => c.name === classItem.name);
    if (!existing) {
      acc.push(classItem);
    }
    return acc;
  }, [] as GymClass[]);

  // Contar quantos horários cada aula tem
  const getClassScheduleCount = (className: string) => {
    return mockClasses.filter(c => c.name === className).length;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.lg,
        paddingBottom: tabBarHeight + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
        Tipos de Aulas
      </ThemedText>

      {uniqueClasses.map((classItem) => {
        const scheduleCount = getClassScheduleCount(classItem.name);
        return (
        <Pressable
          key={classItem.id}
          style={[styles.classCard, { backgroundColor: theme.backgroundDefault }]}
          onPress={() => navigation.navigate("ClassDetail", { classId: classItem.name })}
        >
          <View style={styles.classHeader}>
            <View style={[styles.typeIcon, { backgroundColor: BrandColors.primary + '20' }]}>
              <Feather name="activity" size={20} color={BrandColors.primary} />
            </View>
            <View style={styles.classInfo}>
              <ThemedText type="body" style={{ fontWeight: '600' }}>
                {classItem.name}
              </ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {scheduleCount} {scheduleCount === 1 ? 'horário' : 'horários'} por semana
              </ThemedText>
            </View>
            <Feather name="chevron-right" size={20} color={theme.textSecondary} />
          </View>
          <View style={styles.classMeta}>
            <View style={styles.metaItem}>
              <Feather name="user" size={14} color={theme.textSecondary} />
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {classItem.instructor}
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <Feather name="clock" size={14} color={theme.textSecondary} />
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {classItem.duration} min
              </ThemedText>
            </View>
          </View>
        </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  classCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.md,
  },
  classHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  classInfo: {
    flex: 1,
  },
  classMeta: {
    flexDirection: "row",
    gap: Spacing.lg,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

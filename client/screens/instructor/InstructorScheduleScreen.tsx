import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockWeeklySchedule, weekDays } from "@/data/mockData";

export default function InstructorScheduleScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const [selectedDay, setSelectedDay] = useState(0);

  const daySessions = mockWeeklySchedule.filter((s) => s.dayOfWeek === selectedDay);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View
        style={[
          styles.weekDaysContainer,
          { backgroundColor: theme.backgroundDefault, marginTop: headerHeight + Spacing.md },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekDaysScroll}
        >
          {weekDays.map((day, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedDay(index)}
              style={[
                styles.dayButton,
                selectedDay === index && {
                  backgroundColor: BrandColors.primary,
                },
              ]}
            >
              <ThemedText
                type="small"
                style={{
                  color: selectedDay === index ? theme.text : theme.textSecondary,
                  fontWeight: selectedDay === index ? "700" : "400",
                }}
              >
                {day}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingTop: Spacing.lg,
          paddingBottom: tabBarHeight + Spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {daySessions.length > 0 ? (
          daySessions
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((session) => (
              <Pressable
                key={session.id}
                style={[styles.sessionCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <View style={styles.sessionTimeColumn}>
                  <ThemedText type="h4" style={{ color: BrandColors.primary, fontWeight: "700" }}>
                    {session.startTime}
                  </ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {session.endTime}
                  </ThemedText>
                </View>

                <View style={styles.sessionDetails}>
                  <View style={styles.sessionHeader}>
                    <View
                      style={[
                        styles.sessionTypeIcon,
                        {
                          backgroundColor:
                            session.sessionType === "personal_training"
                              ? "#3B82F6"
                              : session.sessionType === "class"
                                ? "#10B981"
                                : theme.backgroundSecondary,
                        },
                      ]}
                    >
                      <Feather
                        name={
                          session.sessionType === "personal_training"
                            ? "user"
                            : session.sessionType === "class"
                              ? "users"
                              : "clock"
                        }
                        size={16}
                        color={theme.backgroundDefault}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ThemedText type="h4" numberOfLines={1}>
                        {session.clientName || session.notes || "Sessão"}
                      </ThemedText>
                      <ThemedText type="small" style={{ color: theme.textSecondary }}>
                        {session.sessionType === "personal_training"
                          ? "Personal Training"
                          : session.sessionType === "class"
                            ? "Aula em Grupo"
                            : "Disponível"}
                      </ThemedText>
                    </View>
                  </View>
                </View>

                <Feather name="chevron-right" size={20} color={theme.textSecondary} />
              </Pressable>
            ))
        ) : (
          <View style={[styles.emptyState, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="calendar" size={48} color={theme.textSecondary} />
            <ThemedText
              type="body"
              style={{ color: theme.textSecondary, marginTop: Spacing.md }}
            >
              Sem sessões agendadas para {weekDays[selectedDay]}
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekDaysContainer: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  weekDaysScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  dayButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    minWidth: 60,
    alignItems: "center",
  },
  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius["2xl"],
    marginBottom: Spacing.md,
  },
  sessionTimeColumn: {
    marginRight: Spacing.lg,
    alignItems: "center",
    minWidth: 60,
  },
  sessionDetails: {
    flex: 1,
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  sessionTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    padding: Spacing.xxl,
    borderRadius: BorderRadius["2xl"],
    alignItems: "center",
    marginTop: Spacing.xl,
  },
});

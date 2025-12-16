import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Pressable, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockClasses, classCategories, weekDays, GymClass } from "@/data/mockData";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return BrandColors.success;
    case "intermediate":
      return BrandColors.warning;
    case "advanced":
      return BrandColors.error;
    default:
      return BrandColors.secondary;
  }
};

// Memoized class card component to prevent unnecessary re-renders
const ClassCard = React.memo(({ item, theme, onBook }: { item: GymClass; theme: any; onBook: (gymClass: GymClass) => void }) => (
  <Pressable
    style={({ pressed }) => [
      styles.classCard,
      { backgroundColor: theme.backgroundDefault, opacity: pressed ? 0.7 : 1 },
    ]}
  >
    <View style={styles.classHeader}>
      <View style={styles.classTime}>
        <ThemedText type="h3" style={{ color: BrandColors.primary }}>
          {item.time}
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {item.duration} min
        </ThemedText>
      </View>
      <View
        style={[
          styles.difficultyBadge,
          { backgroundColor: `${getDifficultyColor(item.difficulty)}20` },
        ]}
      >
        <ThemedText
          type="small"
          style={{ color: getDifficultyColor(item.difficulty), fontWeight: "600" }}
        >
          {item.difficulty === "beginner" ? "Iniciante" : item.difficulty === "intermediate" ? "Intermédio" : "Avançado"}
        </ThemedText>
      </View>
    </View>

    <View style={styles.classInfo}>
      <ThemedText type="h4">{item.name}</ThemedText>
      <View style={styles.instructorRow}>
        <View style={[styles.instructorAvatar, { backgroundColor: theme.backgroundSecondary }]}>
          <Feather name="user" size={14} color={theme.textSecondary} />
        </View>
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          {item.instructor}
        </ThemedText>
      </View>
    </View>

    <View style={styles.classFooter}>
      <View style={styles.spotsInfo}>
        <Feather name="users" size={14} color={theme.textSecondary} />
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {item.spotsAvailable}/{item.totalSpots} lugares
        </ThemedText>
      </View>
      {item.isBooked ? (
        <View style={[styles.bookedButton, { backgroundColor: `${BrandColors.success}15` }]}>
          <Feather name="check" size={16} color={BrandColors.success} />
          <ThemedText type="button" style={{ color: BrandColors.success }}>
            Reservado
          </ThemedText>
        </View>
      ) : item.spotsAvailable > 0 ? (
        <Pressable
          style={({ pressed }) => [
            styles.bookButton,
            { backgroundColor: BrandColors.primary, opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => onBook(item)}
        >
          <ThemedText type="button" style={{ color: "#FFFFFF" }}>
            Reservar
          </ThemedText>
        </Pressable>
      ) : (
        <View style={[styles.fullButton, { backgroundColor: theme.backgroundSecondary }]}>
          <ThemedText type="button" style={{ color: theme.textSecondary }}>
            Cheio
          </ThemedText>
        </View>
      )}
    </View>
  </Pressable>
));

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredClasses = mockClasses.filter((gymClass) => {
    if (selectedCategory === "all") return true;
    return gymClass.category === selectedCategory;
  });

  const handleBookClass = useCallback((gymClass: GymClass) => {
    console.log("Booking class:", gymClass.name);
  }, []);

  const renderClassItem = useCallback(({ item }: { item: GymClass }) => (
    <ClassCard item={item} theme={theme} onBook={handleBookClass} />
  ), [theme, handleBookClass]);

  const keyExtractor = useCallback((item: GymClass) => item.id, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View style={[styles.filtersContainer, { paddingTop: headerHeight + Spacing.md }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekSelectorContent}
        >
          {weekDays.map((day, index) => (
            <Pressable
              key={day}
              style={[
                styles.dayButton,
                {
                  backgroundColor:
                    selectedDay === index ? BrandColors.primary : theme.backgroundDefault,
                },
              ]}
              onPress={() => setSelectedDay(index)}
            >
              <ThemedText
                type="small"
                style={{
                  color: selectedDay === index ? "#FFFFFF" : theme.textSecondary,
                  fontWeight: "500",
                }}
              >
                {day}
              </ThemedText>
              <ThemedText
                type="h4"
                style={{
                  color: selectedDay === index ? "#FFFFFF" : theme.text,
                }}
              >
                {6 + index}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categorySelectorContent}
        >
          {classCategories.map((category) => (
            <Pressable
              key={category.key}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === category.key
                      ? BrandColors.primary
                      : theme.backgroundDefault,
                  borderColor:
                    selectedCategory === category.key ? BrandColors.primary : theme.border,
                },
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <ThemedText
                type="small"
                style={{
                  color: selectedCategory === category.key ? "#FFFFFF" : theme.text,
                  fontWeight: "500",
                }}
              >
                {category.label}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {filteredClasses.length > 0 ? (
        <FlatList
          data={filteredClasses}
          renderItem={renderClassItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            paddingHorizontal: Spacing.lg,
            paddingTop: Spacing.md,
            paddingBottom: tabBarHeight + Spacing.xl,
          }}
          scrollIndicatorInsets={{ bottom: insets.bottom }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={10}
        />
      ) : (
        <View style={styles.emptyState}>
          <Feather name="calendar" size={48} color={theme.textSecondary} />
          <ThemedText type="h4" style={[styles.emptyTitle, { color: theme.textSecondary }]}>
            Sem aulas agendadas
          </ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary, textAlign: "center" }}>
            Tenta selecionar um dia ou categoria diferente
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    paddingBottom: Spacing.md,
  },
  weekSelectorContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  dayButton: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    minWidth: 48,
  },
  categorySelectorContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  classCard: {
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
  },
  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  classTime: {},
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  classInfo: {
    marginBottom: Spacing.md,
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  instructorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  classFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  spotsInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  bookButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  bookedButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  fullButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
});

import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, BrandColors } from "@/constants/theme";
import { mockClasses, mockStaff } from "@/data/mockData";
import type { ManagerScheduleStackParamList } from "@/navigation/ManagerScheduleStackNavigator";
import { checkScheduleConflict, isValidTimeFormat } from "@/utils/scheduleValidation";

type EditClassRouteProp = RouteProp<ManagerScheduleStackParamList, "EditClass">;

const daysOfWeek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

// Lista de salas disponíveis no ginásio
const availableRooms = ["Sala 1", "Sala 2", "Sala 3", "Sala Principal", "Estúdio de Yoga", "Área Funcional"];

export default function EditClassScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const route = useRoute<EditClassRouteProp>();
  const navigation = useNavigation();

  const classItem = mockClasses.find((c) => c.id === route.params.classId);

  const [className, setClassName] = useState(classItem?.name || "");
  const [selectedDay, setSelectedDay] = useState<string>(classItem?.dayOfWeek || "");
  const [selectedInstructor, setSelectedInstructor] = useState(classItem?.instructor || "");
  const [time, setTime] = useState(classItem?.time || "");
  const [duration, setDuration] = useState(classItem?.duration.toString() || "");
  const [totalSpots, setTotalSpots] = useState(classItem?.totalSpots.toString() || "");
  const [selectedRoom, setSelectedRoom] = useState<string>(classItem?.room || "");

  if (!classItem) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Aula não encontrada</ThemedText>
      </View>
    );
  }

  const handleSave = () => {
    // Validação de campos obrigatórios
    if (!className || !selectedDay || !selectedInstructor || !time || !duration || !totalSpots || !selectedRoom) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de formato de horário
    if (!isValidTimeFormat(time)) {
      Alert.alert("Erro", "Formato de horário inválido. Use o formato HH:mm (ex: 09:00).");
      return;
    }

    // Validação de duração
    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert("Erro", "A duração deve ser um número positivo.");
      return;
    }

    // Validação de conflito de horário
    const conflictCheck = checkScheduleConflict(
      mockClasses,
      {
        dayOfWeek: selectedDay,
        time: time,
        duration: durationNum,
        room: selectedRoom,
      },
      classItem.id // Excluir a própria aula da verificação
    );

    if (conflictCheck.hasConflict) {
      Alert.alert(
        "Conflito de Horário",
        conflictCheck.message || "A sala já está ocupada neste horário.",
        [{ text: "OK" }]
      );
      return;
    }

    // Se passou em todas as validações, salvar
    Alert.alert(
      "Sucesso",
      `A aula "${className}" foi atualizada com sucesso!\n\nDia: ${selectedDay}\nHorário: ${time}\nSala: ${selectedRoom}`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
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
      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Informações da Aula
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Nome da Aula *
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={className}
            onChangeText={setClassName}
            placeholder="Nome da aula"
            placeholderTextColor={theme.textSecondary}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Dia da Semana *
          </ThemedText>
          <View style={styles.daysGrid}>
            {daysOfWeek.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <Pressable
                  key={day}
                  style={[
                    styles.dayChip,
                    {
                      backgroundColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                      borderWidth: 2,
                      borderColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                    },
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <ThemedText
                    type="small"
                    style={{
                      color: isSelected ? "#000000" : theme.text,
                      fontWeight: isSelected ? '700' : '500',
                    }}
                  >
                    {day}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Instrutor *
          </ThemedText>
          <View style={styles.instructorGrid}>
            {mockStaff.map((instructor) => {
              const isSelected = selectedInstructor === instructor.fullName;
              return (
                <Pressable
                  key={instructor.id}
                  style={[
                    styles.instructorChip,
                    {
                      backgroundColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                      borderWidth: 2,
                      borderColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                    },
                  ]}
                  onPress={() => setSelectedInstructor(instructor.fullName)}
                >
                  <ThemedText
                    type="small"
                    style={{
                      color: isSelected ? "#000000" : theme.text,
                      fontWeight: isSelected ? '700' : '500',
                    }}
                  >
                    {instructor.fullName}
                  </ThemedText>
                  {isSelected && (
                    <Feather name="check" size={16} color="#000000" style={{ marginLeft: 4 }} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Sala *
          </ThemedText>
          <View style={styles.roomGrid}>
            {availableRooms.map((room) => {
              const isSelected = selectedRoom === room;
              return (
                <Pressable
                  key={room}
                  style={[
                    styles.roomChip,
                    {
                      backgroundColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                      borderWidth: 2,
                      borderColor: isSelected ? BrandColors.primary : theme.backgroundRoot,
                    },
                  ]}
                  onPress={() => setSelectedRoom(room)}
                >
                  <Feather
                    name="map-pin"
                    size={14}
                    color={isSelected ? "#000000" : theme.textSecondary}
                    style={{ marginRight: 4 }}
                  />
                  <ThemedText
                    type="small"
                    style={{
                      color: isSelected ? "#000000" : theme.text,
                      fontWeight: isSelected ? '700' : '500',
                    }}
                  >
                    {room}
                  </ThemedText>
                  {isSelected && (
                    <Feather name="check" size={16} color="#000000" style={{ marginLeft: 4 }} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={{ marginBottom: Spacing.md }}>
          Horário e Duração
        </ThemedText>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
              Horário *
            </ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
              value={time}
              onChangeText={setTime}
              placeholder="Ex: 09:00"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
              Duração (min) *
            </ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
              value={duration}
              onChangeText={setDuration}
              placeholder="Ex: 60"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>
            Vagas Totais *
          </ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
            value={totalSpots}
            onChangeText={setTotalSpots}
            placeholder="Número de vagas"
            placeholderTextColor={theme.textSecondary}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Pressable
          style={[styles.saveButton, { backgroundColor: BrandColors.primary }]}
          onPress={handleSave}
        >
          <Feather name="check" size={20} color="#000000" />
          <ThemedText type="body" style={{ color: "#000000", fontWeight: '700' }}>
            Salvar Alterações
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.cancelButton, { backgroundColor: theme.backgroundDefault }]}
          onPress={() => navigation.goBack()}
        >
          <ThemedText type="body" style={{ fontWeight: '600' }}>
            Cancelar
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  input: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  dayChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  instructorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  instructorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  roomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  roomChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  actionsSection: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
});

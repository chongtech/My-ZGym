import { GymClass } from "@/data/mockData";

/**
 * Converte um dia da semana em português para um índice numérico (0-6)
 * @param dayOfWeek - Nome do dia em português (ex: "Segunda-feira")
 * @returns Índice do dia (0 = Domingo, 1 = Segunda-feira, etc.)
 */
export function dayOfWeekToIndex(dayOfWeek: string): number {
  const daysMap: { [key: string]: number } = {
    "Domingo": 0,
    "Segunda-feira": 1,
    "Terça-feira": 2,
    "Quarta-feira": 3,
    "Quinta-feira": 4,
    "Sexta-feira": 5,
    "Sábado": 6,
  };
  return daysMap[dayOfWeek] ?? -1;
}

/**
 * Converte uma string de horário (HH:mm) em minutos desde a meia-noite
 * @param time - Horário no formato "HH:mm" (ex: "10:00")
 * @returns Número de minutos desde a meia-noite
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Verifica se dois intervalos de tempo se sobrepõem
 * @param start1 - Horário de início do primeiro intervalo (em minutos)
 * @param end1 - Horário de fim do primeiro intervalo (em minutos)
 * @param start2 - Horário de início do segundo intervalo (em minutos)
 * @param end2 - Horário de fim do segundo intervalo (em minutos)
 * @returns true se os intervalos se sobrepõem, false caso contrário
 */
export function timeRangesOverlap(start1: number, end1: number, start2: number, end2: number): boolean {
  // Dois intervalos se sobrepõem se:
  // - O início de um está dentro do outro, OU
  // - O fim de um está dentro do outro, OU
  // - Um contém completamente o outro
  return (start1 < end2 && end1 > start2);
}

/**
 * Verifica se há conflito de horário ao agendar/atualizar uma aula
 * @param classes - Lista de todas as aulas existentes
 * @param newClass - Dados da nova aula ou aula sendo atualizada
 * @param excludeClassId - ID da aula a ser excluída da verificação (usado ao atualizar)
 * @returns Objeto com informações sobre o conflito (hasConflict e detalhes)
 */
export function checkScheduleConflict(
  classes: GymClass[],
  newClass: {
    dayOfWeek: string;
    time: string;
    duration: number;
    room?: string;
  },
  excludeClassId?: string
): {
  hasConflict: boolean;
  conflictingClass?: GymClass;
  message?: string;
} {
  // Se não há sala especificada, não podemos validar conflito de sala
  if (!newClass.room) {
    return { hasConflict: false };
  }

  const newDayIndex = dayOfWeekToIndex(newClass.dayOfWeek);
  const newStartTime = timeToMinutes(newClass.time);
  const newEndTime = newStartTime + newClass.duration;

  // Procurar por aulas que conflitam
  for (const existingClass of classes) {
    // Pular a própria aula se estivermos atualizando
    if (existingClass.id === excludeClassId) {
      continue;
    }

    // Verificar se é o mesmo dia da semana
    if (existingClass.dayOfWeek) {
      const existingDayIndex = dayOfWeekToIndex(existingClass.dayOfWeek);
      if (existingDayIndex !== newDayIndex) {
        continue;
      }
    } else {
      continue;
    }

    // Verificar se é a mesma sala
    if (existingClass.room !== newClass.room) {
      continue;
    }

    // Verificar se os horários se sobrepõem
    const existingStartTime = timeToMinutes(existingClass.time);
    const existingEndTime = existingStartTime + existingClass.duration;

    if (timeRangesOverlap(newStartTime, newEndTime, existingStartTime, existingEndTime)) {
      return {
        hasConflict: true,
        conflictingClass: existingClass,
        message: `Conflito detectado: A sala "${newClass.room}" já está ocupada ${newClass.dayOfWeek} das ${existingClass.time} às ${formatMinutesToTime(existingEndTime)} com a aula "${existingClass.name}" (${existingClass.instructor}).`,
      };
    }
  }

  return { hasConflict: false };
}

/**
 * Converte minutos desde a meia-noite de volta para formato HH:mm
 * @param minutes - Número de minutos desde a meia-noite
 * @returns Horário no formato "HH:mm"
 */
export function formatMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

/**
 * Valida o formato de horário (HH:mm)
 * @param time - String do horário
 * @returns true se o formato é válido
 */
export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  instructorPhoto?: string;
  time: string;
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "yoga" | "hiit" | "strength" | "cardio" | "spinning" | "pilates";
  spotsAvailable: number;
  totalSpots: number;
  isBooked: boolean;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  caloriesBurned: number;
  instructor?: string;
  type: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface WeeklyStats {
  day: string;
  workouts: number;
  calories: number;
}

export const mockClasses: GymClass[] = [
  {
    id: "1",
    name: "Yoga Dinâmico",
    instructor: "Sara Costa",
    time: "07:00",
    duration: 60,
    difficulty: "intermediate",
    category: "yoga",
    spotsAvailable: 5,
    totalSpots: 20,
    isBooked: false,
  },
  {
    id: "2",
    name: "HIIT Intensivo",
    instructor: "Miguel Santos",
    time: "08:30",
    duration: 45,
    difficulty: "advanced",
    category: "hiit",
    spotsAvailable: 3,
    totalSpots: 15,
    isBooked: true,
  },
  {
    id: "3",
    name: "Treino de Força",
    instructor: "Carlos Silva",
    time: "10:00",
    duration: 60,
    difficulty: "intermediate",
    category: "strength",
    spotsAvailable: 8,
    totalSpots: 12,
    isBooked: false,
  },
  {
    id: "4",
    name: "Aula de Spinning",
    instructor: "Ana Ferreira",
    time: "12:00",
    duration: 45,
    difficulty: "beginner",
    category: "spinning",
    spotsAvailable: 10,
    totalSpots: 25,
    isBooked: false,
  },
  {
    id: "5",
    name: "Cardio Queima",
    instructor: "João Martins",
    time: "14:00",
    duration: 30,
    difficulty: "beginner",
    category: "cardio",
    spotsAvailable: 15,
    totalSpots: 20,
    isBooked: false,
  },
  {
    id: "6",
    name: "Pilates Core",
    instructor: "Inês Oliveira",
    time: "16:00",
    duration: 50,
    difficulty: "intermediate",
    category: "pilates",
    spotsAvailable: 0,
    totalSpots: 15,
    isBooked: false,
  },
  {
    id: "7",
    name: "Yoga ao Entardecer",
    instructor: "Sara Costa",
    time: "18:00",
    duration: 60,
    difficulty: "beginner",
    category: "yoga",
    spotsAvailable: 12,
    totalSpots: 20,
    isBooked: false,
  },
  {
    id: "8",
    name: "Musculação Avançada",
    instructor: "Carlos Silva",
    time: "19:30",
    duration: 75,
    difficulty: "advanced",
    category: "strength",
    spotsAvailable: 4,
    totalSpots: 10,
    isBooked: false,
  },
];

export const mockWorkouts: Workout[] = [
  {
    id: "1",
    name: "Sessão HIIT Matinal",
    date: "2024-12-06",
    duration: 45,
    caloriesBurned: 450,
    instructor: "Miguel Santos",
    type: "HIIT",
  },
  {
    id: "2",
    name: "Treino de Força",
    date: "2024-12-05",
    duration: 60,
    caloriesBurned: 320,
    instructor: "Carlos Silva",
    type: "Força",
  },
  {
    id: "3",
    name: "Yoga Flow",
    date: "2024-12-04",
    duration: 60,
    caloriesBurned: 180,
    instructor: "Sara Costa",
    type: "Yoga",
  },
  {
    id: "4",
    name: "Sessão de Cardio",
    date: "2024-12-03",
    duration: 30,
    caloriesBurned: 280,
    type: "Cardio",
  },
  {
    id: "5",
    name: "Aula de Spinning",
    date: "2024-12-02",
    duration: 45,
    caloriesBurned: 400,
    instructor: "Ana Ferreira",
    type: "Spinning",
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Primeiros Passos",
    description: "Completa o teu primeiro treino",
    icon: "award",
    unlockedAt: "2024-01-20",
    isUnlocked: true,
  },
  {
    id: "2",
    title: "Guerreiro da Semana",
    description: "Treina 7 dias seguidos",
    icon: "zap",
    unlockedAt: "2024-02-15",
    isUnlocked: true,
  },
  {
    id: "3",
    title: "Destruidor de Calorias",
    description: "Queima 5.000 calorias no total",
    icon: "target",
    unlockedAt: "2024-03-10",
    isUnlocked: true,
  },
  {
    id: "4",
    title: "Madrugador",
    description: "Participa em 10 aulas matinais",
    icon: "sunrise",
    isUnlocked: false,
  },
  {
    id: "5",
    title: "Mestre das Aulas",
    description: "Experimenta todas as categorias de aulas",
    icon: "star",
    isUnlocked: false,
  },
  {
    id: "6",
    title: "Clube dos 100",
    description: "Completa 100 treinos",
    icon: "award",
    isUnlocked: false,
  },
];

export const mockWeeklyStats: WeeklyStats[] = [
  { day: "Seg", workouts: 1, calories: 320 },
  { day: "Ter", workouts: 2, calories: 580 },
  { day: "Qua", workouts: 1, calories: 450 },
  { day: "Qui", workouts: 0, calories: 0 },
  { day: "Sex", workouts: 2, calories: 620 },
  { day: "Sáb", workouts: 1, calories: 380 },
  { day: "Dom", workouts: 0, calories: 0 },
];

export const memberStats = {
  totalWorkouts: 47,
  totalClasses: 32,
  totalCalories: 18450,
  personalRecords: 8,
};

export const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export const classCategories = [
  { key: "all", label: "Todas" },
  { key: "yoga", label: "Yoga" },
  { key: "hiit", label: "HIIT" },
  { key: "strength", label: "Força" },
  { key: "cardio", label: "Cardio" },
  { key: "spinning", label: "Spinning" },
  { key: "pilates", label: "Pilates" },
];

// ============================================
// INSTRUCTOR DATA
// ============================================

export interface Exercise {
  id: string;
  name: string;
  category: "strength" | "cardio" | "flexibility" | "balance" | "plyometric";
  muscleGroups: string[];
  equipment: "barbell" | "dumbbells" | "machine" | "bodyweight" | "kettlebell" | "resistance_band" | "cable" | "none";
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  instructions?: string[];
  thumbnailUrl?: string;
  videoUrl?: string;
}

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
  orderIndex: number;
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  instructorId: string;
  name: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  durationMinutes: number;
  category: "strength" | "hypertrophy" | "powerlifting" | "cardio" | "functional" | "mixed";
  isTemplate: boolean;
  exercises: RoutineExercise[];
  createdAt: string;
}

export interface InstructorClient {
  id: string;
  fullName: string;
  email: string;
  profilePhoto?: string;
  membershipTier: "bronze" | "silver" | "gold";
  assignedAt: string;
  lastWorkout?: string;
  complianceRate: number;
  currentProgram?: string;
  notes?: string;
}

export interface ScheduleSession {
  id: string;
  instructorId: string;
  clientId?: string;
  clientName?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  sessionType: "personal_training" | "class" | "available";
  recurring: boolean;
  notes?: string;
  date?: string;
}

export interface InstructorStats {
  totalClients: number;
  activeRoutines: number;
  sessionsThisWeek: number;
  clientCheckIns: number;
  totalSessionsCompleted: number;
  averageClientSatisfaction: number;
}

// Exercise Library (30+ exercises)
export const mockExercises: Exercise[] = [
  // Peito
  {
    id: "1",
    name: "Supino Reto",
    category: "strength",
    muscleGroups: ["chest", "triceps", "shoulders"],
    equipment: "barbell",
    difficulty: "intermediate",
    description: "Exercício composto fundamental para desenvolvimento do peitoral",
  },
  {
    id: "2",
    name: "Supino Inclinado com Halteres",
    category: "strength",
    muscleGroups: ["chest", "triceps", "shoulders"],
    equipment: "dumbbells",
    difficulty: "intermediate",
    description: "Foca na porção superior do peitoral",
  },
  {
    id: "3",
    name: "Crucifixo com Halteres",
    category: "strength",
    muscleGroups: ["chest"],
    equipment: "dumbbells",
    difficulty: "beginner",
    description: "Isolamento para o peitoral",
  },
  {
    id: "4",
    name: "Flexão de Braço",
    category: "strength",
    muscleGroups: ["chest", "triceps", "shoulders", "core"],
    equipment: "bodyweight",
    difficulty: "beginner",
    description: "Exercício funcional com peso corporal",
  },
  // Costas
  {
    id: "5",
    name: "Levantamento Terra",
    category: "strength",
    muscleGroups: ["back", "glutes", "hamstrings", "core"],
    equipment: "barbell",
    difficulty: "advanced",
    description: "Exercício completo para força e massa muscular",
  },
  {
    id: "6",
    name: "Remada Curvada",
    category: "strength",
    muscleGroups: ["back", "biceps"],
    equipment: "barbell",
    difficulty: "intermediate",
    description: "Desenvolvimento da espessura das costas",
  },
  {
    id: "7",
    name: "Puxada na Barra",
    category: "strength",
    muscleGroups: ["back", "biceps"],
    equipment: "bodyweight",
    difficulty: "advanced",
    description: "Exercício de peso corporal para largura das costas",
  },
  {
    id: "8",
    name: "Remada Cavalinho",
    category: "strength",
    muscleGroups: ["back"],
    equipment: "machine",
    difficulty: "beginner",
    description: "Isolamento seguro para as costas",
  },
  {
    id: "9",
    name: "Remada Unilateral com Halter",
    category: "strength",
    muscleGroups: ["back", "biceps"],
    equipment: "dumbbells",
    difficulty: "intermediate",
    description: "Trabalho unilateral para correção de assimetrias",
  },
  // Pernas
  {
    id: "10",
    name: "Agachamento Livre",
    category: "strength",
    muscleGroups: ["quadriceps", "glutes", "hamstrings", "core"],
    equipment: "barbell",
    difficulty: "intermediate",
    description: "Rei dos exercícios para membros inferiores",
  },
  {
    id: "11",
    name: "Leg Press 45°",
    category: "strength",
    muscleGroups: ["quadriceps", "glutes"],
    equipment: "machine",
    difficulty: "beginner",
    description: "Alternativa segura ao agachamento",
  },
  {
    id: "12",
    name: "Avanço com Halteres",
    category: "strength",
    muscleGroups: ["quadriceps", "glutes"],
    equipment: "dumbbells",
    difficulty: "intermediate",
    description: "Exercício unilateral funcional",
  },
  {
    id: "13",
    name: "Cadeira Extensora",
    category: "strength",
    muscleGroups: ["quadriceps"],
    equipment: "machine",
    difficulty: "beginner",
    description: "Isolamento do quadríceps",
  },
  {
    id: "14",
    name: "Mesa Flexora",
    category: "strength",
    muscleGroups: ["hamstrings"],
    equipment: "machine",
    difficulty: "beginner",
    description: "Isolamento dos isquiotibiais",
  },
  {
    id: "15",
    name: "Elevação de Gêmeos em Pé",
    category: "strength",
    muscleGroups: ["calves"],
    equipment: "machine",
    difficulty: "beginner",
    description: "Desenvolvimento das panturrilhas",
  },
  // Ombros
  {
    id: "16",
    name: "Desenvolvimento com Halteres",
    category: "strength",
    muscleGroups: ["shoulders", "triceps"],
    equipment: "dumbbells",
    difficulty: "intermediate",
    description: "Exercício composto para ombros",
  },
  {
    id: "17",
    name: "Elevação Lateral",
    category: "strength",
    muscleGroups: ["shoulders"],
    equipment: "dumbbells",
    difficulty: "beginner",
    description: "Isolamento do deltoide medial",
  },
  {
    id: "18",
    name: "Elevação Frontal",
    category: "strength",
    muscleGroups: ["shoulders"],
    equipment: "dumbbells",
    difficulty: "beginner",
    description: "Foco no deltoide anterior",
  },
  {
    id: "19",
    name: "Remada Alta",
    category: "strength",
    muscleGroups: ["shoulders", "traps"],
    equipment: "barbell",
    difficulty: "intermediate",
    description: "Desenvolvimento dos deltoides e trapézio",
  },
  // Bíceps
  {
    id: "20",
    name: "Rosca Direta",
    category: "strength",
    muscleGroups: ["biceps"],
    equipment: "barbell",
    difficulty: "beginner",
    description: "Exercício clássico para bíceps",
  },
  {
    id: "21",
    name: "Rosca Alternada",
    category: "strength",
    muscleGroups: ["biceps"],
    equipment: "dumbbells",
    difficulty: "beginner",
    description: "Trabalho alternado dos bíceps",
  },
  {
    id: "22",
    name: "Rosca Martelo",
    category: "strength",
    muscleGroups: ["biceps", "forearms"],
    equipment: "dumbbells",
    difficulty: "beginner",
    description: "Enfatiza braquial e antebraços",
  },
  // Tríceps
  {
    id: "23",
    name: "Tríceps Testa",
    category: "strength",
    muscleGroups: ["triceps"],
    equipment: "barbell",
    difficulty: "intermediate",
    description: "Isolamento efetivo do tríceps",
  },
  {
    id: "24",
    name: "Tríceps Corda",
    category: "strength",
    muscleGroups: ["triceps"],
    equipment: "cable",
    difficulty: "beginner",
    description: "Exercício de cabo para tríceps",
  },
  {
    id: "25",
    name: "Mergulho em Paralelas",
    category: "strength",
    muscleGroups: ["triceps", "chest"],
    equipment: "bodyweight",
    difficulty: "intermediate",
    description: "Exercício composto com peso corporal",
  },
  // Core
  {
    id: "26",
    name: "Prancha",
    category: "strength",
    muscleGroups: ["core"],
    equipment: "bodyweight",
    difficulty: "beginner",
    description: "Isométrico para estabilização do core",
  },
  {
    id: "27",
    name: "Abdominal Crunch",
    category: "strength",
    muscleGroups: ["core"],
    equipment: "bodyweight",
    difficulty: "beginner",
    description: "Exercício básico para abdominais",
  },
  {
    id: "28",
    name: "Elevação de Pernas",
    category: "strength",
    muscleGroups: ["core"],
    equipment: "bodyweight",
    difficulty: "intermediate",
    description: "Foco na porção inferior do abdômen",
  },
  // Cardio
  {
    id: "29",
    name: "Corrida na Esteira",
    category: "cardio",
    muscleGroups: ["legs", "cardio"],
    equipment: "machine",
    difficulty: "beginner",
    description: "Cardio de baixo impacto",
  },
  {
    id: "30",
    name: "Burpees",
    category: "plyometric",
    muscleGroups: ["full_body"],
    equipment: "bodyweight",
    difficulty: "advanced",
    description: "Exercício de corpo inteiro de alta intensidade",
  },
  {
    id: "31",
    name: "Saltos na Caixa",
    category: "plyometric",
    muscleGroups: ["legs"],
    equipment: "bodyweight",
    difficulty: "intermediate",
    description: "Desenvolvimento de potência explosiva",
  },
  {
    id: "32",
    name: "Remada no Ergômetro",
    category: "cardio",
    muscleGroups: ["back", "legs", "cardio"],
    equipment: "machine",
    difficulty: "intermediate",
    description: "Cardio de corpo inteiro",
  },
];

// Workout Routines (8 routines)
export const mockWorkoutRoutines: WorkoutRoutine[] = [
  {
    id: "1",
    instructorId: "2",
    name: "Treino A - Peito e Tríceps",
    description: "Rotina focada em hipertrofia para peitoral e tríceps",
    difficulty: "intermediate",
    durationMinutes: 60,
    category: "hypertrophy",
    isTemplate: true,
    exercises: [
      { exerciseId: "1", sets: 4, reps: "8-12", restSeconds: 90, orderIndex: 0 },
      { exerciseId: "2", sets: 3, reps: "10-12", restSeconds: 60, orderIndex: 1 },
      { exerciseId: "3", sets: 3, reps: "12-15", restSeconds: 60, orderIndex: 2 },
      { exerciseId: "23", sets: 3, reps: "10-12", restSeconds: 60, orderIndex: 3 },
      { exerciseId: "24", sets: 3, reps: "12-15", restSeconds: 45, orderIndex: 4 },
    ],
    createdAt: "2024-11-01",
  },
  {
    id: "2",
    instructorId: "2",
    name: "Treino B - Costas e Bíceps",
    description: "Desenvolvimento da largura e espessura das costas",
    difficulty: "intermediate",
    durationMinutes: 65,
    category: "hypertrophy",
    isTemplate: true,
    exercises: [
      { exerciseId: "5", sets: 4, reps: "5-8", restSeconds: 120, orderIndex: 0 },
      { exerciseId: "6", sets: 4, reps: "8-12", restSeconds: 90, orderIndex: 1 },
      { exerciseId: "7", sets: 3, reps: "8-12", restSeconds: 90, orderIndex: 2 },
      { exerciseId: "20", sets: 3, reps: "10-12", restSeconds: 60, orderIndex: 3 },
      { exerciseId: "22", sets: 3, reps: "12-15", restSeconds: 45, orderIndex: 4 },
    ],
    createdAt: "2024-11-01",
  },
  {
    id: "3",
    instructorId: "2",
    name: "Treino C - Pernas Completo",
    description: "Treino intenso para membros inferiores",
    difficulty: "advanced",
    durationMinutes: 75,
    category: "strength",
    isTemplate: true,
    exercises: [
      { exerciseId: "10", sets: 5, reps: "5-8", restSeconds: 180, orderIndex: 0 },
      { exerciseId: "11", sets: 4, reps: "10-15", restSeconds: 90, orderIndex: 1 },
      { exerciseId: "13", sets: 3, reps: "12-15", restSeconds: 60, orderIndex: 2 },
      { exerciseId: "14", sets: 3, reps: "12-15", restSeconds: 60, orderIndex: 3 },
      { exerciseId: "15", sets: 4, reps: "15-20", restSeconds: 45, orderIndex: 4 },
    ],
    createdAt: "2024-11-01",
  },
  {
    id: "4",
    instructorId: "2",
    name: "Treino D - Ombros e Abdômen",
    description: "Foco em deltoides e core",
    difficulty: "intermediate",
    durationMinutes: 50,
    category: "hypertrophy",
    isTemplate: true,
    exercises: [
      { exerciseId: "16", sets: 4, reps: "8-12", restSeconds: 90, orderIndex: 0 },
      { exerciseId: "17", sets: 3, reps: "12-15", restSeconds: 60, orderIndex: 1 },
      { exerciseId: "18", sets: 3, reps: "12-15", restSeconds: 60, orderIndex: 2 },
      { exerciseId: "26", sets: 3, reps: "60 seg", restSeconds: 60, orderIndex: 3 },
      { exerciseId: "28", sets: 3, reps: "15-20", restSeconds: 45, orderIndex: 4 },
    ],
    createdAt: "2024-11-05",
  },
  {
    id: "5",
    instructorId: "2",
    name: "Powerlifting - Força Máxima",
    description: "Treino focado nos 3 grandes: agachamento, supino e terra",
    difficulty: "advanced",
    durationMinutes: 90,
    category: "powerlifting",
    isTemplate: true,
    exercises: [
      { exerciseId: "10", sets: 5, reps: "3-5", restSeconds: 240, orderIndex: 0 },
      { exerciseId: "1", sets: 5, reps: "3-5", restSeconds: 240, orderIndex: 1 },
      { exerciseId: "5", sets: 5, reps: "3-5", restSeconds: 240, orderIndex: 2 },
    ],
    createdAt: "2024-11-10",
  },
  {
    id: "6",
    instructorId: "2",
    name: "Full Body Iniciante",
    description: "Treino de corpo inteiro para iniciantes",
    difficulty: "beginner",
    durationMinutes: 45,
    category: "functional",
    isTemplate: true,
    exercises: [
      { exerciseId: "4", sets: 3, reps: "10-15", restSeconds: 60, orderIndex: 0 },
      { exerciseId: "11", sets: 3, reps: "12-15", restSeconds: 60, orderIndex: 1 },
      { exerciseId: "8", sets: 3, reps: "10-12", restSeconds: 60, orderIndex: 2 },
      { exerciseId: "16", sets: 3, reps: "10-12", restSeconds: 60, orderIndex: 3 },
      { exerciseId: "26", sets: 3, reps: "30 seg", restSeconds: 45, orderIndex: 4 },
    ],
    createdAt: "2024-11-15",
  },
  {
    id: "7",
    instructorId: "2",
    name: "HIIT Metabólico",
    description: "Treino de alta intensidade para queima de gordura",
    difficulty: "advanced",
    durationMinutes: 30,
    category: "cardio",
    isTemplate: true,
    exercises: [
      { exerciseId: "30", sets: 4, reps: "15", restSeconds: 30, orderIndex: 0 },
      { exerciseId: "31", sets: 4, reps: "12", restSeconds: 30, orderIndex: 1 },
      { exerciseId: "4", sets: 4, reps: "20", restSeconds: 30, orderIndex: 2 },
      { exerciseId: "29", sets: 1, reps: "10 min", restSeconds: 0, orderIndex: 3 },
    ],
    createdAt: "2024-11-20",
  },
  {
    id: "8",
    instructorId: "2",
    name: "Upper Body Push",
    description: "Treino de empurrar para membros superiores",
    difficulty: "intermediate",
    durationMinutes: 55,
    category: "strength",
    isTemplate: true,
    exercises: [
      { exerciseId: "1", sets: 4, reps: "6-10", restSeconds: 120, orderIndex: 0 },
      { exerciseId: "16", sets: 4, reps: "8-12", restSeconds: 90, orderIndex: 1 },
      { exerciseId: "2", sets: 3, reps: "10-12", restSeconds: 60, orderIndex: 2 },
      { exerciseId: "17", sets: 3, reps: "12-15", restSeconds: 60, orderIndex: 3 },
      { exerciseId: "25", sets: 3, reps: "10-15", restSeconds: 60, orderIndex: 4 },
    ],
    createdAt: "2024-11-25",
  },
];

// Instructor Clients (12 clients)
export const mockInstructorClients: InstructorClient[] = [
  {
    id: "10",
    fullName: "João Silva",
    email: "joao.silva@example.com",
    membershipTier: "gold",
    assignedAt: "2024-10-01",
    lastWorkout: "2025-12-14",
    complianceRate: 85,
    currentProgram: "Treino A - Peito e Tríceps",
    notes: "Objetivo: ganhar massa muscular. Evitar overhead press devido a lesão antiga no ombro.",
  },
  {
    id: "11",
    fullName: "Maria Santos",
    email: "maria.santos@example.com",
    membershipTier: "silver",
    assignedAt: "2024-11-15",
    lastWorkout: "2025-12-13",
    complianceRate: 92,
    currentProgram: "Full Body Iniciante",
    notes: "Recuperando de lesão no joelho - evitar agachamento profundo por enquanto.",
  },
  {
    id: "12",
    fullName: "Pedro Costa",
    email: "pedro.costa@example.com",
    membershipTier: "gold",
    assignedAt: "2024-09-20",
    lastWorkout: "2025-12-15",
    complianceRate: 88,
    currentProgram: "Powerlifting - Força Máxima",
    notes: "Atleta de powerlifting. Competição em Março 2026.",
  },
  {
    id: "13",
    fullName: "Ana Rodrigues",
    email: "ana.rodrigues@example.com",
    membershipTier: "bronze",
    assignedAt: "2024-12-01",
    lastWorkout: "2025-12-12",
    complianceRate: 70,
    currentProgram: "Full Body Iniciante",
    notes: "Primeira vez em ginásio. Focar em técnica correta.",
  },
  {
    id: "14",
    fullName: "Carlos Mendes",
    email: "carlos.mendes@example.com",
    membershipTier: "silver",
    assignedAt: "2024-10-15",
    lastWorkout: "2025-12-14",
    complianceRate: 78,
    currentProgram: "HIIT Metabólico",
    notes: "Objetivo: perder peso. Prefere treinos rápidos e intensos.",
  },
  {
    id: "15",
    fullName: "Sofia Almeida",
    email: "sofia.almeida@example.com",
    membershipTier: "gold",
    assignedAt: "2024-08-10",
    lastWorkout: "2025-12-15",
    complianceRate: 95,
    currentProgram: "Treino C - Pernas Completo",
    notes: "Atleta dedicada. Excelente execução técnica.",
  },
  {
    id: "16",
    fullName: "Ricardo Ferreira",
    email: "ricardo.ferreira@example.com",
    membershipTier: "silver",
    assignedAt: "2024-11-01",
    lastWorkout: "2025-12-13",
    complianceRate: 82,
    currentProgram: "Upper Body Push",
    notes: "Trabalha em horários rotativos. Flexibilidade no agendamento necessária.",
  },
  {
    id: "17",
    fullName: "Teresa Oliveira",
    email: "teresa.oliveira@example.com",
    membershipTier: "bronze",
    assignedAt: "2024-11-20",
    lastWorkout: "2025-12-11",
    complianceRate: 65,
    currentProgram: "Full Body Iniciante",
    notes: "Dificuldade em manter consistência. Precisa de acompanhamento próximo.",
  },
  {
    id: "18",
    fullName: "Miguel Pereira",
    email: "miguel.pereira@example.com",
    membershipTier: "gold",
    assignedAt: "2024-09-05",
    lastWorkout: "2025-12-15",
    complianceRate: 90,
    currentProgram: "Treino B - Costas e Bíceps",
    notes: "Objetivo: hipertrofia. Boa genética e recuperação rápida.",
  },
  {
    id: "19",
    fullName: "Beatriz Martins",
    email: "beatriz.martins@example.com",
    membershipTier: "silver",
    assignedAt: "2024-10-25",
    lastWorkout: "2025-12-14",
    complianceRate: 87,
    currentProgram: "Treino D - Ombros e Abdômen",
    notes: "Treina 4x por semana. Interesse em nutrição desportiva.",
  },
  {
    id: "20",
    fullName: "Tiago Sousa",
    email: "tiago.sousa@example.com",
    membershipTier: "bronze",
    assignedAt: "2024-12-05",
    lastWorkout: "2025-12-10",
    complianceRate: 60,
    currentProgram: "Full Body Iniciante",
    notes: "Muito ocupado com trabalho. Treinos curtos preferíveis.",
  },
  {
    id: "21",
    fullName: "Inês Cardoso",
    email: "ines.cardoso@example.com",
    membershipTier: "gold",
    assignedAt: "2024-08-20",
    lastWorkout: "2025-12-15",
    complianceRate: 93,
    currentProgram: "HIIT Metabólico",
    notes: "Excelente condicionamento. Gosta de desafios.",
  },
];

// Weekly Schedule (20 sessions across the week)
export const mockWeeklySchedule: ScheduleSession[] = [
  // Segunda-feira
  {
    id: "s1",
    instructorId: "2",
    clientId: "10",
    clientName: "João Silva",
    dayOfWeek: 0,
    startTime: "09:00",
    endTime: "10:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s2",
    instructorId: "2",
    clientId: "11",
    clientName: "Maria Santos",
    dayOfWeek: 0,
    startTime: "10:30",
    endTime: "11:30",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s3",
    instructorId: "2",
    clientId: "12",
    clientName: "Pedro Costa",
    dayOfWeek: 0,
    startTime: "16:00",
    endTime: "17:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s4",
    instructorId: "2",
    dayOfWeek: 0,
    startTime: "18:00",
    endTime: "19:00",
    sessionType: "class",
    recurring: true,
    notes: "Aula de Musculação em Grupo",
  },
  // Terça-feira
  {
    id: "s5",
    instructorId: "2",
    clientId: "15",
    clientName: "Sofia Almeida",
    dayOfWeek: 1,
    startTime: "08:00",
    endTime: "09:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s6",
    instructorId: "2",
    clientId: "18",
    clientName: "Miguel Pereira",
    dayOfWeek: 1,
    startTime: "09:30",
    endTime: "10:30",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s7",
    instructorId: "2",
    clientId: "14",
    clientName: "Carlos Mendes",
    dayOfWeek: 1,
    startTime: "12:00",
    endTime: "13:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s8",
    instructorId: "2",
    clientId: "21",
    clientName: "Inês Cardoso",
    dayOfWeek: 1,
    startTime: "17:00",
    endTime: "18:00",
    sessionType: "personal_training",
    recurring: true,
  },
  // Quarta-feira
  {
    id: "s9",
    instructorId: "2",
    clientId: "10",
    clientName: "João Silva",
    dayOfWeek: 2,
    startTime: "09:00",
    endTime: "10:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s10",
    instructorId: "2",
    clientId: "13",
    clientName: "Ana Rodrigues",
    dayOfWeek: 2,
    startTime: "10:30",
    endTime: "11:30",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s11",
    instructorId: "2",
    clientId: "16",
    clientName: "Ricardo Ferreira",
    dayOfWeek: 2,
    startTime: "14:00",
    endTime: "15:00",
    sessionType: "personal_training",
    recurring: true,
  },
  // Quinta-feira
  {
    id: "s12",
    instructorId: "2",
    clientId: "12",
    clientName: "Pedro Costa",
    dayOfWeek: 3,
    startTime: "08:00",
    endTime: "09:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s13",
    instructorId: "2",
    clientId: "19",
    clientName: "Beatriz Martins",
    dayOfWeek: 3,
    startTime: "11:00",
    endTime: "12:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s14",
    instructorId: "2",
    dayOfWeek: 3,
    startTime: "18:00",
    endTime: "19:00",
    sessionType: "class",
    recurring: true,
    notes: "Aula de Treino Funcional",
  },
  // Sexta-feira
  {
    id: "s15",
    instructorId: "2",
    clientId: "15",
    clientName: "Sofia Almeida",
    dayOfWeek: 4,
    startTime: "08:00",
    endTime: "09:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s16",
    instructorId: "2",
    clientId: "11",
    clientName: "Maria Santos",
    dayOfWeek: 4,
    startTime: "10:00",
    endTime: "11:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s17",
    instructorId: "2",
    clientId: "17",
    clientName: "Teresa Oliveira",
    dayOfWeek: 4,
    startTime: "16:00",
    endTime: "17:00",
    sessionType: "personal_training",
    recurring: true,
  },
  // Sábado
  {
    id: "s18",
    instructorId: "2",
    clientId: "18",
    clientName: "Miguel Pereira",
    dayOfWeek: 5,
    startTime: "10:00",
    endTime: "11:00",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s19",
    instructorId: "2",
    clientId: "20",
    clientName: "Tiago Sousa",
    dayOfWeek: 5,
    startTime: "11:30",
    endTime: "12:30",
    sessionType: "personal_training",
    recurring: true,
  },
  {
    id: "s20",
    instructorId: "2",
    dayOfWeek: 5,
    startTime: "09:00",
    endTime: "10:00",
    sessionType: "class",
    recurring: true,
    notes: "Aula de HIIT",
  },
];

// Instructor Stats
export const mockInstructorStats: InstructorStats = {
  totalClients: 12,
  activeRoutines: 8,
  sessionsThisWeek: 20,
  clientCheckIns: 9,
  totalSessionsCompleted: 245,
  averageClientSatisfaction: 4.7,
};

// Today's sessions (for dashboard)
export const mockTodaySessions: ScheduleSession[] = [
  {
    id: "today1",
    instructorId: "2",
    clientId: "10",
    clientName: "João Silva",
    dayOfWeek: 0,
    startTime: "09:00",
    endTime: "10:00",
    sessionType: "personal_training",
    recurring: false,
    date: "2025-12-15",
  },
  {
    id: "today2",
    instructorId: "2",
    clientId: "11",
    clientName: "Maria Santos",
    dayOfWeek: 0,
    startTime: "10:30",
    endTime: "11:30",
    sessionType: "personal_training",
    recurring: false,
    date: "2025-12-15",
  },
  {
    id: "today3",
    instructorId: "2",
    clientId: "12",
    clientName: "Pedro Costa",
    dayOfWeek: 0,
    startTime: "16:00",
    endTime: "17:00",
    sessionType: "personal_training",
    recurring: false,
    date: "2025-12-15",
  },
];

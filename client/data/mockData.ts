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
    icon: "trophy",
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

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  instructorPhoto?: string;
  time: string;
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "yoga" | "pilates" | "functional" | "senior" | "cycling" | "crosstraining" | "tenchitessen" | "karate" | "fitboxe" | "boxe" | "kravmaga" | "yogaaereo";
  spotsAvailable: number;
  totalSpots: number;
  isBooked: boolean;
  description?: string;
  dayOfWeek?: string;
  room?: string; // Sala onde a aula acontece
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
  // Yoga - Segunda-feira
  {
    id: "1",
    name: "Yoga",
    instructor: "Sara Costa",
    time: "10:00",
    duration: 60,
    difficulty: "beginner",
    category: "yoga",
    spotsAvailable: 8,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Segunda-feira",
    room: "Estúdio de Yoga",
    description: "Yôga é um conceito que se refere às tradicionais disciplinas físicas e mentais originárias da Índia. A palavra está associada com as práticas meditativas tanto do budismo quanto do hinduísmo. No hinduísmo, o conceito se refere a uma das seis escolas (āstika) ortodoxas da filosofia hindu e à sua meta rumo ao que esta escola determina como suas práticas.",
  },
  // Pilates - Terça-feira
  {
    id: "2",
    name: "Pilates",
    instructor: "Inês Oliveira",
    time: "10:00",
    duration: 45,
    difficulty: "intermediate",
    category: "pilates",
    spotsAvailable: 5,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Terça-feira",
    room: "Sala 1",
    description: "Método de condicionamento físico e mental criado pelo alemão Joseph Pilates (1880-1967), mesmo com exercícios aparentemente suaves, os movimentos realizados no Pilates proporciona o alongamento e a fortificação do corpo de forma integrada e individualizada, além de melhorar da respiração, diminuir o stress, desenvolver consciência e equilíbrio corporal, melhorar a coordenação motora e a mobilidade articular e proporcionar relaxamento.",
  },
  // Pilates - Quinta-feira
  {
    id: "3",
    name: "Pilates",
    instructor: "Inês Oliveira",
    time: "10:00",
    duration: 45,
    difficulty: "intermediate",
    category: "pilates",
    spotsAvailable: 6,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Quinta-feira",
    room: "Sala 1",
    description: "Método de condicionamento físico e mental criado pelo alemão Joseph Pilates (1880-1967), mesmo com exercícios aparentemente suaves, os movimentos realizados no Pilates proporciona o alongamento e a fortificação do corpo de forma integrada e individualizada, além de melhorar da respiração, diminuir o stress, desenvolver consciência e equilíbrio corporal, melhorar a coordenação motora e a mobilidade articular e proporcionar relaxamento.",
  },
  // Pilates - Sábado
  {
    id: "4",
    name: "Pilates",
    instructor: "Inês Oliveira",
    time: "10:40",
    duration: 30,
    difficulty: "intermediate",
    category: "pilates",
    spotsAvailable: 4,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Sábado",
    room: "Sala 1",
    description: "Método de condicionamento físico e mental criado pelo alemão Joseph Pilates (1880-1967), mesmo com exercícios aparentemente suaves, os movimentos realizados no Pilates proporciona o alongamento e a fortificação do corpo de forma integrada e individualizada, além de melhorar da respiração, diminuir o stress, desenvolver consciência e equilíbrio corporal, melhorar a coordenação motora e a mobilidade articular e proporcionar relaxamento.",
  },
  // Pilates - Segunda-feira (tarde)
  {
    id: "5",
    name: "Pilates",
    instructor: "Inês Oliveira",
    time: "18:30",
    duration: 45,
    difficulty: "intermediate",
    category: "pilates",
    spotsAvailable: 7,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Segunda-feira",
    room: "Sala 2",
    description: "Método de condicionamento físico e mental criado pelo alemão Joseph Pilates (1880-1967), mesmo com exercícios aparentemente suaves, os movimentos realizados no Pilates proporciona o alongamento e a fortificação do corpo de forma integrada e individualizada, além de melhorar da respiração, diminuir o stress, desenvolver consciência e equilíbrio corporal, melhorar a coordenação motora e a mobilidade articular e proporcionar relaxamento.",
  },
  // Pilates - Quarta-feira (tarde)
  {
    id: "6",
    name: "Pilates",
    instructor: "Inês Oliveira",
    time: "18:30",
    duration: 45,
    difficulty: "intermediate",
    category: "pilates",
    spotsAvailable: 8,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Quarta-feira",
    room: "Sala 2",
    description: "Método de condicionamento físico e mental criado pelo alemão Joseph Pilates (1880-1967), mesmo com exercícios aparentemente suaves, os movimentos realizados no Pilates proporciona o alongamento e a fortificação do corpo de forma integrada e individualizada, além de melhorar da respiração, diminuir o stress, desenvolver consciência e equilíbrio corporal, melhorar a coordenação motora e a mobilidade articular e proporcionar relaxamento.",
  },
  // Treino Funcional Senior - Segunda-feira (14:00-14:50)
  {
    id: "7",
    name: "Treino Funcional Senior",
    instructor: "Carlos Silva",
    time: "14:00",
    duration: 50,
    difficulty: "beginner",
    category: "senior",
    spotsAvailable: 10,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Segunda-feira",
    description: "Programa da Junta de Freguesia de Agualva e Mira-Sintra que proporciona aos menos jovens com idades acima dos 55 anos, a participarem nas aulas de exercício físico, contribuindo assim para melhorar a sua qualidade de vida, desenvolver a força, resistência, flexibilidade e coordenação motora. Proporcionar bem-estar físico, psicológico e social, desenvolver a autonomia funcional, melhorar a auto-estima, reduzir o stress e a ansiedade e contribuir para a melhoria da saúde.",
  },
  // Treino Funcional Senior - Segunda-feira (14:50-15:40)
  {
    id: "8",
    name: "Treino Funcional Senior",
    instructor: "Carlos Silva",
    time: "14:50",
    duration: 50,
    difficulty: "beginner",
    category: "senior",
    spotsAvailable: 12,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Segunda-feira",
    description: "Programa da Junta de Freguesia de Agualva e Mira-Sintra que proporciona aos menos jovens com idades acima dos 55 anos, a participarem nas aulas de exercício físico, contribuindo assim para melhorar a sua qualidade de vida, desenvolver a força, resistência, flexibilidade e coordenação motora. Proporcionar bem-estar físico, psicológico e social, desenvolver a autonomia funcional, melhorar a auto-estima, reduzir o stress e a ansiedade e contribuir para a melhoria da saúde.",
  },
  // Treino Funcional Senior - Quarta-feira (11:20-12:10)
  {
    id: "9",
    name: "Treino Funcional Senior",
    instructor: "Carlos Silva",
    time: "11:20",
    duration: 50,
    difficulty: "beginner",
    category: "senior",
    spotsAvailable: 9,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Quarta-feira",
    description: "Programa da Junta de Freguesia de Agualva e Mira-Sintra que proporciona aos menos jovens com idades acima dos 55 anos, a participarem nas aulas de exercício físico, contribuindo assim para melhorar a sua qualidade de vida, desenvolver a força, resistência, flexibilidade e coordenação motora. Proporcionar bem-estar físico, psicológico e social, desenvolver a autonomia funcional, melhorar a auto-estima, reduzir o stress e a ansiedade e contribuir para a melhoria da saúde.",
  },
  // Treino Funcional Senior - Quarta-feira (12:10-13:00)
  {
    id: "10",
    name: "Treino Funcional Senior",
    instructor: "Carlos Silva",
    time: "12:10",
    duration: 50,
    difficulty: "beginner",
    category: "senior",
    spotsAvailable: 11,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Quarta-feira",
    description: "Programa da Junta de Freguesia de Agualva e Mira-Sintra que proporciona aos menos jovens com idades acima dos 55 anos, a participarem nas aulas de exercício físico, contribuindo assim para melhorar a sua qualidade de vida, desenvolver a força, resistência, flexibilidade e coordenação motora. Proporcionar bem-estar físico, psicológico e social, desenvolver a autonomia funcional, melhorar a auto-estima, reduzir o stress e a ansiedade e contribuir para a melhoria da saúde.",
  },
  // Localizada - Sábado
  {
    id: "11",
    name: "Localizada",
    instructor: "Ana Ferreira",
    time: "10:00",
    duration: 30,
    difficulty: "intermediate",
    category: "functional",
    spotsAvailable: 14,
    totalSpots: 25,
    isBooked: false,
    dayOfWeek: "Sábado",
    description: "Combinação de exercícios para todo o corpo ao som de músicas fortes, utilizando halteres, caneleiras, elásticos, bolas e barras para fortalecer seus grupos musculares. Tonificação Muscular, Manutenção, Exercício e Saúde.",
  },
  // Cycling - Segunda-feira
  {
    id: "12",
    name: "Cycling",
    instructor: "Miguel Santos",
    time: "19:20",
    duration: 45,
    difficulty: "intermediate",
    category: "cycling",
    spotsAvailable: 8,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Segunda-feira",
    description: "Treino em cima de uma bicicleta ao som de músicas conhecidas e estimulantes, que lhe ajudará a melhorar o seu alinhamento corporal e o stress muscular articular. Resistência, Perda de Peso, Tonificação.",
  },
  // Cycling - Quarta-feira
  {
    id: "13",
    name: "Cycling",
    instructor: "Miguel Santos",
    time: "19:20",
    duration: 45,
    difficulty: "intermediate",
    category: "cycling",
    spotsAvailable: 10,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Quarta-feira",
    description: "Treino em cima de uma bicicleta ao som de músicas conhecidas e estimulantes, que lhe ajudará a melhorar o seu alinhamento corporal e o stress muscular articular. Resistência, Perda de Peso, Tonificação.",
  },
  // Cross Training
  {
    id: "14",
    name: "Cross Training",
    instructor: "João Martins",
    time: "A definir",
    duration: 60,
    difficulty: "advanced",
    category: "crosstraining",
    spotsAvailable: 15,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "A definir",
    description: "Programa de treinamento e condicionamento físico desenvolvido para melhorar as capacidades fisiológicas de qualquer tipo de pessoa, desde atletas de elite, militares, idosos ou jovens. O objetivo é potencializar todas as principais capacidades físicas: resistência respiratória e cardiovascular, resistência muscular, flexibilidade, força, coordenação, potência, agilidade, equilíbrio e velocidade. Benefícios: Aumento da força física, flexibilidade corporal e auto-estima, redução do estresse, aumento de energia, redução do percentual de gordura corporal, prevenção de lesões, definição muscular.",
  },
  // Tenchi Tessen - Terça-feira
  {
    id: "15",
    name: "Tenchi Tessen",
    instructor: "Sara Costa",
    time: "11:00",
    duration: 90,
    difficulty: "beginner",
    category: "tenchitessen",
    spotsAvailable: 12,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Terça-feira",
    description: "Criação do Mestre Georges Stobbaerts. É uma arte do movimento com fortes influências de diversas disciplinas orientais, na qual o praticante através das diversas técnicas procura a harmonia e a união do corpo e do espírito, tentando por meio do leque, que representa a simbólica do sopro da vida, a ligação entre a Terra e o Céu. Harmonia, Auto-Domínio, Disciplina.",
  },
  // Tenchi Tessen - Quinta-feira
  {
    id: "16",
    name: "Tenchi Tessen",
    instructor: "Sara Costa",
    time: "11:00",
    duration: 90,
    difficulty: "beginner",
    category: "tenchitessen",
    spotsAvailable: 13,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Quinta-feira",
    description: "Criação do Mestre Georges Stobbaerts. É uma arte do movimento com fortes influências de diversas disciplinas orientais, na qual o praticante através das diversas técnicas procura a harmonia e a união do corpo e do espírito, tentando por meio do leque, que representa a simbólica do sopro da vida, a ligação entre a Terra e o Céu. Harmonia, Auto-Domínio, Disciplina.",
  },
  // Karate Do - Criança - Terça-feira
  {
    id: "17",
    name: "Karate Do - Criança",
    instructor: "Carlos Silva",
    time: "19:00",
    duration: 60,
    difficulty: "beginner",
    category: "karate",
    spotsAvailable: 6,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Terça-feira",
    description: "A prática do Karaté nestas idades ajuda na formação da criança, quer no respeito pelos outros, auto-estima, concentração e coordenação de movimentos. Disciplina, Auto-Estima, Defesa Pessoal.",
  },
  // Karate Do - Criança - Quinta-feira
  {
    id: "18",
    name: "Karate Do - Criança",
    instructor: "Carlos Silva",
    time: "19:00",
    duration: 60,
    difficulty: "beginner",
    category: "karate",
    spotsAvailable: 8,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Quinta-feira",
    description: "A prática do Karaté nestas idades ajuda na formação da criança, quer no respeito pelos outros, auto-estima, concentração e coordenação de movimentos. Disciplina, Auto-Estima, Defesa Pessoal.",
  },
  // Karate Do - Adultos - Terça-feira
  {
    id: "19",
    name: "Karate Do - Adultos",
    instructor: "Carlos Silva",
    time: "20:30",
    duration: 90,
    difficulty: "intermediate",
    category: "karate",
    spotsAvailable: 10,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Terça-feira",
    description: "O Karate-do é uma arte marcial originária do Japão. A tradução dos seus kanji definem-se como \"o caminho das mãos vazias\". Através de uma prática sistemática e diligente, o praticante acaba por perceber, para além dos benefícios físicos e psíquicos que dela pode retirar, que o seu maior inimigo não reside no outro, mas sim em si próprio. Defesa Pessoal, Coordenação Motora, Disciplina.",
  },
  // Karate Do - Adultos - Quinta-feira
  {
    id: "20",
    name: "Karate Do - Adultos",
    instructor: "Carlos Silva",
    time: "20:30",
    duration: 90,
    difficulty: "intermediate",
    category: "karate",
    spotsAvailable: 12,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Quinta-feira",
    description: "O Karate-do é uma arte marcial originária do Japão. A tradução dos seus kanji definem-se como \"o caminho das mãos vazias\". Através de uma prática sistemática e diligente, o praticante acaba por perceber, para além dos benefícios físicos e psíquicos que dela pode retirar, que o seu maior inimigo não reside no outro, mas sim em si próprio. Defesa Pessoal, Coordenação Motora, Disciplina.",
  },
  // Fit Boxe - Segunda-feira
  {
    id: "21",
    name: "Fit Boxe",
    instructor: "João Martins",
    time: "20:10",
    duration: 45,
    difficulty: "intermediate",
    category: "fitboxe",
    spotsAvailable: 15,
    totalSpots: 25,
    isBooked: false,
    dayOfWeek: "Segunda-feira",
    description: "É um treino aérobico de recuperação e fortalecimento muscular com saco de boxe, com combinações simples, intensas e dinâmicas baseadas em técnicas de Boxe, Muay Thai, Kickboxing, Karate e Taekwondo. Excelente para libertar o STRESS! Perda de Peso, Melhoria Condição Fisica.",
  },
  // Boxe - Quarta-feira
  {
    id: "22",
    name: "Boxe",
    instructor: "Miguel Santos",
    time: "21:00",
    duration: 60,
    difficulty: "intermediate",
    category: "boxe",
    spotsAvailable: 10,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Quarta-feira",
    description: "Boxe é um desporto de combate no qual os lutadores usam apenas os punhos, tanto para a defesa como para o ataque. A pratica desta arte marcial vai ajudar o atleta na melhoria da capacidade física, resistência, força, agilidade e auto-estima.",
  },
  // Boxe - Sexta-feira
  {
    id: "23",
    name: "Boxe",
    instructor: "Miguel Santos",
    time: "20:00",
    duration: 60,
    difficulty: "intermediate",
    category: "boxe",
    spotsAvailable: 12,
    totalSpots: 20,
    isBooked: false,
    dayOfWeek: "Sexta-feira",
    description: "Boxe é um desporto de combate no qual os lutadores usam apenas os punhos, tanto para a defesa como para o ataque. A pratica desta arte marcial vai ajudar o atleta na melhoria da capacidade física, resistência, força, agilidade e auto-estima.",
  },
  // Krav Maga Bukan - Quarta-feira
  {
    id: "24",
    name: "Krav Maga Bukan",
    instructor: "Ana Ferreira",
    time: "20:10",
    duration: 55,
    difficulty: "intermediate",
    category: "kravmaga",
    spotsAvailable: 8,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Quarta-feira",
    description: "O Krav-Maga é para todos, independentemente do género e idade. O aumento da autoconfiança e autoestima que nos proporciona, torna-nos melhores em todas as facetas da nossa vida, pessoal e profissional. Ajuda-nos a enfrentar os medos e a ultrapassar barreiras mentais e físicas que até então pensávamos ser impossível. Defesa-pessoal, Melhoria Condição Fisica.",
  },
  // Krav Maga Bukan - Sexta-feira
  {
    id: "25",
    name: "Krav Maga Bukan",
    instructor: "Ana Ferreira",
    time: "20:00",
    duration: 60,
    difficulty: "intermediate",
    category: "kravmaga",
    spotsAvailable: 10,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Sexta-feira",
    description: "O Krav-Maga é para todos, independentemente do género e idade. O aumento da autoconfiança e autoestima que nos proporciona, torna-nos melhores em todas as facetas da nossa vida, pessoal e profissional. Ajuda-nos a enfrentar os medos e a ultrapassar barreiras mentais e físicas que até então pensávamos ser impossível. Defesa-pessoal, Melhoria Condição Fisica.",
  },
  // Krav Maga Bukan - Sábado
  {
    id: "26",
    name: "Krav Maga Bukan",
    instructor: "Ana Ferreira",
    time: "12:00",
    duration: 55,
    difficulty: "intermediate",
    category: "kravmaga",
    spotsAvailable: 9,
    totalSpots: 15,
    isBooked: false,
    dayOfWeek: "Sábado",
    description: "O Krav-Maga é para todos, independentemente do género e idade. O aumento da autoconfiança e autoestima que nos proporciona, torna-nos melhores em todas as facetas da nossa vida, pessoal e profissional. Ajuda-nos a enfrentar os medos e a ultrapassar barreiras mentais e físicas que até então pensávamos ser impossível. Defesa-pessoal, Melhoria Condição Fisica.",
  },
  // Yoga Aéreo - Quarta-feira
  {
    id: "27",
    name: "Yoga Aéreo",
    instructor: "Sara Costa",
    time: "10:00",
    duration: 60,
    difficulty: "beginner",
    category: "yogaaereo",
    spotsAvailable: 6,
    totalSpots: 10,
    isBooked: false,
    dayOfWeek: "Quarta-feira",
    description: "O Yoga Aéreo é uma prática inovadora que combina os benefícios das posturas tradicionais de yoga com a emoção e o desafio da suspensão no ar. Esta modalidade oferece uma série de vantagens, desde o aumento da flexibilidade e fortalecimento muscular até à melhoria da saúde mental e do bem-estar geral. Flexibilidade, Fortalecimento Muscular, Libertação de Stress.",
  },
  // Yoga Aéreo - Domingo
  {
    id: "28",
    name: "Yoga Aéreo",
    instructor: "Sara Costa",
    time: "09:30",
    duration: 60,
    difficulty: "beginner",
    category: "yogaaereo",
    spotsAvailable: 7,
    totalSpots: 10,
    isBooked: false,
    dayOfWeek: "Domingo",
    description: "O Yoga Aéreo é uma prática inovadora que combina os benefícios das posturas tradicionais de yoga com a emoção e o desafio da suspensão no ar. Esta modalidade oferece uma série de vantagens, desde o aumento da flexibilidade e fortalecimento muscular até à melhoria da saúde mental e do bem-estar geral. Flexibilidade, Fortalecimento Muscular, Libertação de Stress.",
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
  { key: "pilates", label: "Pilates" },
  { key: "senior", label: "Treino Senior" },
  { key: "functional", label: "Localizada" },
  { key: "cycling", label: "Cycling" },
  { key: "crosstraining", label: "Cross Training" },
  { key: "tenchitessen", label: "Tenchi Tessen" },
  { key: "karate", label: "Karate Do" },
  { key: "fitboxe", label: "Fit Boxe" },
  { key: "boxe", label: "Boxe" },
  { key: "kravmaga", label: "Krav Maga" },
  { key: "yogaaereo", label: "Yoga Aéreo" },
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

export interface ProgramDaySchedule {
  dayOfWeek: number; // 0 = Monday, 6 = Sunday
  routineId: string | null; // null = rest day
  isRestDay: boolean;
}

export interface TrainingProgram {
  id: string;
  instructorId: string;
  name: string;
  description: string;
  durationWeeks: number;
  weeklySchedule: ProgramDaySchedule[]; // 7 days
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "strength" | "hypertrophy" | "powerlifting" | "cardio" | "functional" | "mixed";
  isTemplate: boolean;
  createdAt: string;
}

export interface ProgramAssignment {
  id: string;
  programId: string;
  clientId: string;
  instructorId: string;
  startDate: string; // ISO date
  endDate: string; // ISO date (calculated from startDate + durationWeeks)
  status: "active" | "completed" | "cancelled";
  assignedAt: string;
  currentWeek: number; // Which week they're on (1-based)
  completedWorkouts: number;
  totalWorkouts: number;
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

// Training Programs (3 sample programs)
export const mockTrainingPrograms: TrainingProgram[] = [
  {
    id: "prog1",
    instructorId: "2",
    name: "Programa Push/Pull/Legs - 8 Semanas",
    description: "Programa completo de hipertrofia com divisão Push/Pull/Legs, ideal para ganho de massa muscular",
    durationWeeks: 8,
    difficulty: "intermediate",
    category: "hypertrophy",
    isTemplate: true,
    weeklySchedule: [
      { dayOfWeek: 0, routineId: "1", isRestDay: false }, // Segunda - Push (Peito/Tríceps)
      { dayOfWeek: 1, routineId: "2", isRestDay: false }, // Terça - Pull (Costas/Bíceps)
      { dayOfWeek: 2, routineId: "3", isRestDay: false }, // Quarta - Legs
      { dayOfWeek: 3, routineId: null, isRestDay: true }, // Quinta - Descanso
      { dayOfWeek: 4, routineId: "1", isRestDay: false }, // Sexta - Push
      { dayOfWeek: 5, routineId: "2", isRestDay: false }, // Sábado - Pull
      { dayOfWeek: 6, routineId: null, isRestDay: true }, // Domingo - Descanso
    ],
    createdAt: "2024-11-01",
  },
  {
    id: "prog2",
    instructorId: "2",
    name: "Programa Full Body Iniciante - 4 Semanas",
    description: "Programa de corpo inteiro 3x por semana, perfeito para iniciantes",
    durationWeeks: 4,
    difficulty: "beginner",
    category: "functional",
    isTemplate: true,
    weeklySchedule: [
      { dayOfWeek: 0, routineId: "6", isRestDay: false }, // Segunda - Full Body
      { dayOfWeek: 1, routineId: null, isRestDay: true }, // Terça - Descanso
      { dayOfWeek: 2, routineId: "6", isRestDay: false }, // Quarta - Full Body
      { dayOfWeek: 3, routineId: null, isRestDay: true }, // Quinta - Descanso
      { dayOfWeek: 4, routineId: "6", isRestDay: false }, // Sexta - Full Body
      { dayOfWeek: 5, routineId: null, isRestDay: true }, // Sábado - Descanso
      { dayOfWeek: 6, routineId: null, isRestDay: true }, // Domingo - Descanso
    ],
    createdAt: "2024-11-15",
  },
  {
    id: "prog3",
    instructorId: "2",
    name: "Programa HIIT + Força - 6 Semanas",
    description: "Combinação de treino de força e HIIT para perda de gordura e ganho muscular",
    durationWeeks: 6,
    difficulty: "advanced",
    category: "mixed",
    isTemplate: true,
    weeklySchedule: [
      { dayOfWeek: 0, routineId: "8", isRestDay: false }, // Segunda - Upper Body Push
      { dayOfWeek: 1, routineId: "7", isRestDay: false }, // Terça - HIIT
      { dayOfWeek: 2, routineId: "2", isRestDay: false }, // Quarta - Upper Body Pull
      { dayOfWeek: 3, routineId: null, isRestDay: true }, // Quinta - Descanso
      { dayOfWeek: 4, routineId: "3", isRestDay: false }, // Sexta - Legs
      { dayOfWeek: 5, routineId: "7", isRestDay: false }, // Sábado - HIIT
      { dayOfWeek: 6, routineId: null, isRestDay: true }, // Domingo - Descanso
    ],
    createdAt: "2024-11-20",
  },
];

// Program Assignments (5 active assignments)
export const mockProgramAssignments: ProgramAssignment[] = [
  {
    id: "assign1",
    programId: "prog1",
    clientId: "10", // João Silva
    instructorId: "2",
    startDate: "2025-12-01",
    endDate: "2026-01-26", // 8 weeks
    status: "active",
    assignedAt: "2025-11-28",
    currentWeek: 3,
    completedWorkouts: 12,
    totalWorkouts: 48, // 6 workouts/week * 8 weeks
  },
  {
    id: "assign2",
    programId: "prog2",
    clientId: "13", // Ana Rodrigues
    instructorId: "2",
    startDate: "2025-12-09",
    endDate: "2026-01-06", // 4 weeks
    status: "active",
    assignedAt: "2025-12-08",
    currentWeek: 1,
    completedWorkouts: 2,
    totalWorkouts: 12, // 3 workouts/week * 4 weeks
  },
  {
    id: "assign3",
    programId: "prog3",
    clientId: "15", // Sofia Almeida
    instructorId: "2",
    startDate: "2025-11-18",
    endDate: "2025-12-30", // 6 weeks
    status: "active",
    assignedAt: "2025-11-15",
    currentWeek: 4,
    completedWorkouts: 18,
    totalWorkouts: 30, // 5 workouts/week * 6 weeks
  },
  {
    id: "assign4",
    programId: "prog1",
    clientId: "18", // Miguel Pereira
    instructorId: "2",
    startDate: "2025-12-02",
    endDate: "2026-01-27", // 8 weeks
    status: "active",
    assignedAt: "2025-11-30",
    currentWeek: 2,
    completedWorkouts: 10,
    totalWorkouts: 48,
  },
  {
    id: "assign5",
    programId: "prog2",
    clientId: "17", // Teresa Oliveira
    instructorId: "2",
    startDate: "2025-12-10",
    endDate: "2026-01-07", // 4 weeks
    status: "active",
    assignedAt: "2025-12-09",
    currentWeek: 1,
    completedWorkouts: 1,
    totalWorkouts: 12,
  },
];

// Physical Assessments
export const mockPhysicalAssessments = [
  {
    id: "assess1",
    memberId: "10", // João Silva
    instructorId: "2",
    assessmentDate: "2024-09-15",
    assessmentType: "initial",
    onboardingData: {
      sex: "male",
      height: 180,
      currentWeight: 85,
      goalWeight: 80,
      age: 30,
      experienceLevel: "intermediate",
      trainingFrequency: "3_days",
    },
    bodyComposition: {
      weight: 85.0,
      bodyFatPercentage: 22.0,
      muscleMassPercentage: 38.0,
      bmi: 26.2,
    },
    bodyMeasurements: {
      chest: 102,
      waist: 92,
      hips: 100,
      leftArm: 36,
      rightArm: 36,
      leftThigh: 58,
      rightThigh: 58,
    },
    performanceTests: [
      { id: "t1", testType: "Push-ups (60s)", value: 20, unit: "reps" },
      { id: "t2", testType: "Plank Hold", value: 45, unit: "seconds" },
    ],
    photos: [],
    instructorNotes: "Objetivo de perda de gordura e definição.",
    createdAt: "2024-09-15T10:00:00Z",
  },
  {
    id: "assess2",
    memberId: "10", // João Silva
    instructorId: "2",
    assessmentDate: "2024-12-15",
    assessmentType: "progress",
    bodyComposition: {
      weight: 82.0,
      bodyFatPercentage: 19.5,
      muscleMassPercentage: 40.0,
      bmi: 25.3,
    },
    bodyMeasurements: {
      chest: 104,
      waist: 88,
      hips: 98,
      leftArm: 37,
      rightArm: 37,
      leftThigh: 59,
      rightThigh: 59,
    },
    performanceTests: [
      { id: "t3", testType: "Push-ups (60s)", value: 30, unit: "reps" },
      { id: "t4", testType: "Plank Hold", value: 75, unit: "seconds" },
    ],
    photos: [],
    instructorNotes: "Ótima evolução na força e redução de cintura.",
    createdAt: "2024-12-15T10:00:00Z",
  },
  {
    id: "assess3",
    memberId: "11", // Maria Santos
    instructorId: "2",
    assessmentDate: "2024-11-20",
    assessmentType: "initial",
    onboardingData: {
      sex: "female",
      height: 165,
      currentWeight: 68,
      goalWeight: 60,
      age: 28,
      experienceLevel: "beginner",
      trainingFrequency: "2_days",
    },
    bodyComposition: {
      weight: 68.0,
      bodyFatPercentage: 28.0,
      muscleMassPercentage: 32.0,
      bmi: 25.0,
    },
    bodyMeasurements: {
      chest: 90,
      waist: 75,
      hips: 100,
      leftArm: 26,
      rightArm: 26,
      leftThigh: 54,
      rightThigh: 54,
    },
    performanceTests: [
      { id: "t5", testType: "Sit-ups (60s)", value: 15, unit: "reps" },
    ],
    photos: [],
    instructorNotes: "Iniciante, foco em adaptação e técnica.",
    createdAt: "2024-11-20T14:30:00Z",
  },
];

// ============================================
// SHOP DATA
// ============================================

import { ShopProduct, ShopCategory } from "@/types/shop";

export const shopCategories: ShopCategory[] = [
  { key: "all", label: "Todos", icon: "grid" },
  { key: "supplements", label: "Suplementos", icon: "package" },
  { key: "apparel", label: "Vestuário", icon: "shopping-bag" },
  { key: "equipment", label: "Equipamento", icon: "award" },
  { key: "accessories", label: "Acessórios", icon: "box" },
];

export const mockShopProducts: ShopProduct[] = [
  // Suplementos
  {
    id: "prod1",
    name: "Whey Protein Isolado",
    description: "Proteína de alta qualidade com 90% de pureza. Ideal para recuperação muscular pós-treino.",
    price: 45.99,
    category: "supplements",
    stock: 25,
    inStock: true,
    brand: "MyProtein",
    rating: 4.8,
    reviewCount: 156,
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
  },
  {
    id: "prod2",
    name: "Creatina Monohidratada",
    description: "100% pura creatina monohidratada. Aumenta força e performance.",
    price: 24.99,
    category: "supplements",
    stock: 40,
    inStock: true,
    brand: "Optimum Nutrition",
    rating: 4.9,
    reviewCount: 203,
    imageUrl: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400",
  },
  {
    id: "prod3",
    name: "BCAA 2:1:1",
    description: "Aminoácidos essenciais para prevenir catabolismo muscular.",
    price: 29.99,
    category: "supplements",
    stock: 30,
    inStock: true,
    brand: "Scitec Nutrition",
    rating: 4.6,
    reviewCount: 89,
    imageUrl: "https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=400",
  },
  {
    id: "prod4",
    name: "Pré-Treino Energy Boost",
    description: "Fórmula completa com cafeína, beta-alanina e citrulina para máximo desempenho.",
    price: 34.99,
    category: "supplements",
    stock: 15,
    inStock: true,
    brand: "C4",
    rating: 4.7,
    reviewCount: 124,
    imageUrl: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=400",
  },
  {
    id: "prod5",
    name: "Multivitamínico Completo",
    description: "Vitaminas e minerais essenciais para atletas.",
    price: 19.99,
    category: "supplements",
    stock: 50,
    inStock: true,
    brand: "Universal Nutrition",
    rating: 4.5,
    reviewCount: 67,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
  },
  // Vestuário
  {
    id: "prod6",
    name: "T-Shirt Performance",
    description: "Camiseta técnica respirável com tecnologia dry-fit.",
    price: 24.99,
    category: "apparel",
    stock: 35,
    inStock: true,
    brand: "Nike",
    rating: 4.6,
    reviewCount: 92,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  },
  {
    id: "prod7",
    name: "Calções de Treino",
    description: "Calções leves e confortáveis para treino intenso.",
    price: 29.99,
    category: "apparel",
    stock: 28,
    inStock: true,
    brand: "Adidas",
    rating: 4.5,
    reviewCount: 78,
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",
  },
  {
    id: "prod8",
    name: "Leggings Compression",
    description: "Leggings de compressão para melhor circulação e suporte muscular.",
    price: 39.99,
    category: "apparel",
    stock: 20,
    inStock: true,
    brand: "Under Armour",
    rating: 4.8,
    reviewCount: 145,
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400",
  },
  {
    id: "prod9",
    name: "Top Desportivo",
    description: "Top de suporte médio para treino cardiovascular.",
    price: 34.99,
    category: "apparel",
    stock: 18,
    inStock: true,
    brand: "Puma",
    rating: 4.7,
    reviewCount: 103,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
  },
  {
    id: "prod10",
    name: "Hoodie Z-Gym Edition",
    description: "Sweatshirt oficial do ginásio com logo bordado.",
    price: 49.99,
    category: "apparel",
    stock: 12,
    inStock: true,
    brand: "Z-Gym",
    rating: 4.9,
    reviewCount: 87,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
  },
  // Equipamento
  {
    id: "prod11",
    name: "Kettlebell 16kg",
    description: "Kettlebell de ferro fundido com revestimento powder coat.",
    price: 39.99,
    category: "equipment",
    stock: 8,
    inStock: true,
    brand: "Rogue",
    rating: 4.8,
    reviewCount: 54,
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
  },
  {
    id: "prod12",
    name: "Faixas de Resistência (Set)",
    description: "Set de 5 faixas com diferentes níveis de resistência.",
    price: 24.99,
    category: "equipment",
    stock: 22,
    inStock: true,
    brand: "TheraBand",
    rating: 4.6,
    reviewCount: 112,
    imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400",
  },
  {
    id: "prod13",
    name: "Bola de Pilates 65cm",
    description: "Bola suíça anti-rebentamento para treino funcional.",
    price: 19.99,
    category: "equipment",
    stock: 15,
    inStock: true,
    brand: "Gymball",
    rating: 4.5,
    reviewCount: 68,
    imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400",
  },
  {
    id: "prod14",
    name: "Corda de Saltar Speed",
    description: "Corda de saltar profissional com rolamentos de alta velocidade.",
    price: 14.99,
    category: "equipment",
    stock: 30,
    inStock: true,
    brand: "RX Smart Gear",
    rating: 4.7,
    reviewCount: 95,
    imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400",
  },
  {
    id: "prod15",
    name: "Tapete de Yoga Premium",
    description: "Tapete antiderrapante de 6mm com alça de transporte.",
    price: 34.99,
    category: "equipment",
    stock: 18,
    inStock: true,
    brand: "Manduka",
    rating: 4.9,
    reviewCount: 178,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
  },
  // Acessórios
  {
    id: "prod16",
    name: "Luvas de Treino",
    description: "Luvas acolchoadas com suporte de pulso.",
    price: 19.99,
    category: "accessories",
    stock: 25,
    inStock: true,
    brand: "Harbinger",
    rating: 4.4,
    reviewCount: 143,
    imageUrl: "https://images.unsplash.com/photo-1556817411-692e91e04ecc?w=400",
  },
  {
    id: "prod17",
    name: "Garrafa de Água 1L",
    description: "Garrafa térmica que mantém bebidas frias por 24h.",
    price: 24.99,
    category: "accessories",
    stock: 40,
    inStock: true,
    brand: "Hydro Flask",
    rating: 4.8,
    reviewCount: 201,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
  },
  {
    id: "prod18",
    name: "Toalha de Microfibra",
    description: "Toalha de secagem rápida e super absorvente.",
    price: 12.99,
    category: "accessories",
    stock: 35,
    inStock: true,
    brand: "PackTowl",
    rating: 4.6,
    reviewCount: 89,
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400",
  },
  {
    id: "prod19",
    name: "Cinto de Musculação",
    description: "Cinto de suporte lombar para levantamentos pesados.",
    price: 44.99,
    category: "accessories",
    stock: 10,
    inStock: true,
    brand: "Inzer",
    rating: 4.9,
    reviewCount: 76,
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400",
  },
  {
    id: "prod20",
    name: "Mochila Gym Pro",
    description: "Mochila espaçosa com compartimento para sapatos e garrafa.",
    price: 39.99,
    category: "accessories",
    stock: 14,
    inStock: true,
    brand: "Z-Gym",
    rating: 4.7,
    reviewCount: 94,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  },
];

// Manager Mock Data
import type { ManagerDashboardStats, MemberStats, StaffMember, MemberActivity, ClassScheduleItem, PricingTier } from "@/types/manager";

// Subscription Types
export const SUBSCRIPTION_TYPES: PricingTier[] = [
  {
    tier: "z-total",
    name: "Z-Total",
    monthlyPrice: 40.00,
    features: [
      "Acesso ilimitado 7 dias/semana",
      "Todas as aulas de grupo",
      "2 sessões de PT por mês",
      "Acesso a todas as zonas do ginásio",
      "2 convidados por mês"
    ],
    color: "#D4FF00",
    isActive: true
  },
  {
    tier: "z-junior",
    name: "Z-Júnior",
    monthlyPrice: 35.00,
    features: [
      "Acesso para menores de 18 anos",
      "Aulas adaptadas para jovens",
      "Supervisão de instrutores",
      "Horário 14h-20h dias de semana",
      "Acesso ao fim de semana"
    ],
    color: "#FF6B6B",
    isActive: true
  },
  {
    tier: "z-weekend",
    name: "Z-Fim de Semana",
    monthlyPrice: 25.00,
    features: [
      "Acesso sábados e domingos",
      "Aulas de grupo ao fim de semana",
      "Ideal para quem trabalha durante a semana",
      "Horário estendido ao fim de semana"
    ],
    color: "#4ECDC4",
    isActive: true
  },
  {
    tier: "z-senior",
    name: "Z-Sénior",
    monthlyPrice: 30.00,
    features: [
      "Acesso para maiores de 65 anos",
      "Aulas adaptadas para seniores",
      "Programa de exercícios personalizados",
      "Acompanhamento especial",
      "Horário preferencial 9h-16h"
    ],
    color: "#95E1D3",
    isActive: true
  }
];

export const mockManagerDashboardStats: ManagerDashboardStats = {
  totalMembers: 147,
  activeMembers: 132,
  totalRevenue: 1250,
  monthlyRevenue: 45780,
  classAttendanceRate: 78,
  occupancyRate: 65,
  staffCount: 8,
  checkInsToday: 42,
  activeClasses: 28,
  revenueChange: 12.5,
};

export const mockMembers: MemberStats[] = [
  {
    id: "mem1",
    fullName: "João Silva",
    email: "joao.silva@example.com",
    phone: "+351 912 345 678",
    membershipTier: "z-total",
    memberSince: "2023-01-15",
    lastActivity: "2024-12-07",
    checkInCount: 156,
    complianceRate: 85,
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    notes: "Cliente exemplar, sempre pontual e motivado.",
  },
  {
    id: "mem2",
    fullName: "Maria Santos",
    email: "maria.santos@example.com",
    phone: "+351 913 456 789",
    membershipTier: "z-senior",
    memberSince: "2023-06-20",
    lastActivity: "2024-12-06",
    checkInCount: 98,
    complianceRate: 72,
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: "mem3",
    fullName: "Pedro Costa",
    email: "pedro.costa@example.com",
    phone: "+351 914 567 890",
    membershipTier: "z-junior",
    memberSince: "2024-01-10",
    lastActivity: "2024-12-05",
    checkInCount: 45,
    complianceRate: 68,
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: "mem4",
    fullName: "Ana Ferreira",
    email: "ana.ferreira@example.com",
    membershipTier: "z-total",
    memberSince: "2022-11-05",
    lastActivity: "2024-12-07",
    checkInCount: 210,
    complianceRate: 92,
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    notes: "Interessada em treino personalizado avançado.",
  },
  {
    id: "mem5",
    fullName: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    membershipTier: "z-weekend",
    memberSince: "2023-09-12",
    lastActivity: "2024-11-28",
    checkInCount: 67,
    complianceRate: 45,
    status: "inactive",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    notes: "Contactar para reativação.",
  },
  {
    id: "mem6",
    fullName: "Sofia Rodrigues",
    email: "sofia.rodrigues@example.com",
    membershipTier: "z-total",
    memberSince: "2023-03-20",
    lastActivity: "2024-12-07",
    checkInCount: 178,
    complianceRate: 88,
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
  },
  {
    id: "mem7",
    fullName: "Miguel Alves",
    email: "miguel.alves@example.com",
    membershipTier: "z-weekend",
    memberSince: "2024-03-15",
    lastActivity: "2024-12-06",
    checkInCount: 32,
    complianceRate: 61,
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    id: "mem8",
    fullName: "Beatriz Lima",
    email: "beatriz.lima@example.com",
    membershipTier: "z-junior",
    memberSince: "2023-08-10",
    lastActivity: "2024-10-15",
    checkInCount: 89,
    complianceRate: 38,
    status: "suspended",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    notes: "Pagamento em atraso - suspenso temporariamente.",
  },
  {
    id: "mem9",
    fullName: "Ricardo Sousa",
    email: "ricardo.sousa@example.com",
    membershipTier: "z-total",
    memberSince: "2022-07-01",
    lastActivity: "2024-12-07",
    checkInCount: 245,
    complianceRate: 95,
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: "mem10",
    fullName: "Inês Martins",
    email: "ines.martins@example.com",
    membershipTier: "z-senior",
    memberSince: "2024-05-20",
    lastActivity: "2024-12-05",
    checkInCount: 28,
    complianceRate: 65,
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
  },
];

export const mockStaff: StaffMember[] = [
  {
    id: "staff1",
    fullName: "Miguel Santos",
    email: "miguel.santos@zgym.com",
    phone: "+351 920 111 222",
    role: "instructor",
    hireDate: "2022-03-15",
    clientCount: 25,
    activeRoutines: 18,
    classesPerWeek: 12,
    performanceRating: 4.8,
    specializations: ["HIIT", "Força", "Funcional"],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop",
  },
  {
    id: "staff2",
    fullName: "Sara Costa",
    email: "sara.costa@zgym.com",
    phone: "+351 920 222 333",
    role: "instructor",
    hireDate: "2021-09-01",
    clientCount: 30,
    activeRoutines: 22,
    classesPerWeek: 10,
    performanceRating: 4.9,
    specializations: ["Yoga", "Pilates", "Meditação"],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
  },
  {
    id: "staff3",
    fullName: "Carlos Silva",
    email: "carlos.silva@zgym.com",
    phone: "+351 920 333 444",
    role: "instructor",
    hireDate: "2022-11-20",
    clientCount: 20,
    activeRoutines: 15,
    classesPerWeek: 8,
    performanceRating: 4.6,
    specializations: ["Musculação", "Força", "Bodybuilding"],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=400&fit=crop",
  },
  {
    id: "staff4",
    fullName: "Inês Oliveira",
    email: "ines.oliveira@zgym.com",
    phone: "+351 920 444 555",
    role: "instructor",
    hireDate: "2023-01-10",
    clientCount: 22,
    activeRoutines: 16,
    classesPerWeek: 9,
    performanceRating: 4.7,
    specializations: ["Pilates", "Funcional", "Reabilitação"],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    id: "staff5",
    fullName: "Pedro Fernandes",
    email: "pedro.fernandes@zgym.com",
    role: "instructor",
    hireDate: "2023-06-01",
    clientCount: 15,
    activeRoutines: 10,
    classesPerWeek: 6,
    performanceRating: 4.5,
    specializations: ["CrossFit", "HIIT", "Condicionamento"],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop",
  },
  {
    id: "staff6",
    fullName: "Ana Ferreira",
    email: "ana.ferreira@zgym.com",
    role: "instructor",
    hireDate: "2022-05-15",
    clientCount: 18,
    activeRoutines: 14,
    classesPerWeek: 8,
    performanceRating: 4.8,
    specializations: ["Krav Maga", "Defesa Pessoal", "Condicionamento"],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    id: "staff7",
    fullName: "Tiago Ribeiro",
    email: "tiago.ribeiro@zgym.com",
    role: "instructor",
    hireDate: "2021-02-01",
    clientCount: 28,
    activeRoutines: 20,
    classesPerWeek: 11,
    performanceRating: 4.9,
    specializations: ["Boxe", "Kickboxing", "Cardio"],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop",
  },
  {
    id: "staff8",
    fullName: "Rita Gomes",
    email: "rita.gomes@zgym.com",
    role: "instructor",
    hireDate: "2023-09-01",
    clientCount: 12,
    activeRoutines: 8,
    classesPerWeek: 5,
    performanceRating: 4.4,
    specializations: ["Zumba", "Dança", "Aeróbica"],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1549351512-c5e12b11e283?w=400&h=400&fit=crop",
  },
];

export const mockRecentActivities: MemberActivity[] = [
  {
    id: "act1",
    memberId: "mem1",
    memberName: "João Silva",
    activityType: "check-in",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    details: "Check-in na recepção",
  },
  {
    id: "act2",
    memberId: "mem4",
    memberName: "Ana Ferreira",
    activityType: "class-attended",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    details: "Participou da aula de Yoga",
  },
  {
    id: "act3",
    memberId: "mem9",
    memberName: "Ricardo Sousa",
    activityType: "check-in",
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    details: "Check-in na recepção",
  },
  {
    id: "act4",
    memberId: "mem10",
    memberName: "Inês Martins",
    activityType: "class-booked",
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
    details: "Agendou aula de Pilates",
  },
  {
    id: "act5",
    memberId: "mem6",
    memberName: "Sofia Rodrigues",
    activityType: "upgrade",
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    details: "Upgrade para plano Gold",
  },
  {
    id: "act6",
    memberId: "mem3",
    memberName: "Pedro Costa",
    activityType: "check-in",
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    details: "Check-in na recepção",
  },
  {
    id: "act7",
    memberId: "mem2",
    memberName: "Maria Santos",
    activityType: "class-attended",
    timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
    details: "Participou da aula de HIIT",
  },
];


export interface UserDto {
  username: string;
  email: string;
}

export interface SetDto {
  id?: number;
  reps: number;
  weight: number;
}

export interface ExerciseDto {
  id?: number;
  exerciseType: ExerciseType | null;
  customDescription: string | null;
  sets: SetDto[];
}

export interface WorkoutDto {
  id: number;
  name: string;
  description: string;
  duration: number;
  exercises: ExerciseDto[];
  createdAt?: string;
  userDto?: UserDto;
}

export enum ExerciseType {
  // Chest exercises
  BENCH_PRESS = 'BENCH_PRESS',
  INCLINE_BENCH_PRESS = 'INCLINE_BENCH_PRESS',
  DECLINE_BENCH_PRESS = 'DECLINE_BENCH_PRESS',
  PUSH_UP = 'PUSH_UP',
  CHEST_FLY = 'CHEST_FLY',
  CABLE_CROSSOVER = 'CABLE_CROSSOVER',
  PULLOVER = 'PULLOVER',

  // Back exercises
  PULL_UP = 'PULL_UP',
  CHIN_UP = 'CHIN_UP',
  LAT_PULLDOWN = 'LAT_PULLDOWN',
  BENT_OVER_ROW = 'BENT_OVER_ROW',
  T_BAR_ROW = 'T_BAR_ROW',
  SEATED_CABLE_ROW = 'SEATED_CABLE_ROW',
  DEADLIFT = 'DEADLIFT',
  SHRUGS = 'SHRUGS',

  // Shoulder exercises
  OVERHEAD_PRESS = 'OVERHEAD_PRESS',
  DUMBBELL_SHOULDER_PRESS = 'DUMBBELL_SHOULDER_PRESS',
  LATERAL_RAISE = 'LATERAL_RAISE',
  FRONT_RAISE = 'FRONT_RAISE',
  UPRIGHT_ROW = 'UPRIGHT_ROW',
  REAR_DELT_FLY = 'REAR_DELT_FLY',
  ARNOLD_PRESS = 'ARNOLD_PRESS',

  // Biceps exercises
  BICEP_CURL = 'BICEP_CURL',
  HAMMER_CURL = 'HAMMER_CURL',
  CONCENTRATION_CURL = 'CONCENTRATION_CURL',
  PREACHER_CURL = 'PREACHER_CURL',
  CABLE_BICEP_CURL = 'CABLE_BICEP_CURL',
  INCLINE_BICEP_CURL = 'INCLINE_BICEP_CURL',
  ZOTTMAN_CURL = 'ZOTTMAN_CURL',

  // Triceps exercises
  TRICEP_DIP = 'TRICEP_DIP',
  CLOSE_GRIP_BENCH_PRESS = 'CLOSE_GRIP_BENCH_PRESS',
  TRICEP_EXTENSION = 'TRICEP_EXTENSION',
  OVERHEAD_TRICEP_EXTENSION = 'OVERHEAD_TRICEP_EXTENSION',
  ROPE_PUSHDOWN = 'ROPE_PUSHDOWN',
  KICKBACKS = 'KICKBACKS',
  SKULL_CRUSHERS = 'SKULL_CRUSHERS',

  // Legs - Quads
  SQUAT = 'SQUAT',
  FRONT_SQUAT = 'FRONT_SQUAT',
  BULGARIAN_SPLIT_SQUAT = 'BULGARIAN_SPLIT_SQUAT',
  LEG_PRESS = 'LEG_PRESS',
  LUNGES = 'LUNGES',
  STEP_UP = 'STEP_UP',
  LEG_EXTENSION = 'LEG_EXTENSION',

  // Legs - Hamstrings
  ROMANIAN_DEADLIFT = 'ROMANIAN_DEADLIFT',
  LYING_LEG_CURL = 'LYING_LEG_CURL',
  SEATED_LEG_CURL = 'SEATED_LEG_CURL',
  GOOD_MORNING = 'GOOD_MORNING',
  SINGLE_LEG_DEADLIFT = 'SINGLE_LEG_DEADLIFT',
  GLUTE_BRIDGE = 'GLUTE_BRIDGE',

  // Legs - Calves
  CALF_RAISE = 'CALF_RAISE',
  SEATED_CALF_RAISE = 'SEATED_CALF_RAISE',
  DONKEY_CALF_RAISE = 'DONKEY_CALF_RAISE',

  // Core/Abs
  PLANK = 'PLANK',
  CRUNCHES = 'CRUNCHES',
  LEG_RAISE = 'LEG_RAISE',
  BICYCLE_CRUNCH = 'BICYCLE_CRUNCH',
  MOUNTAIN_CLIMBER = 'MOUNTAIN_CLIMBER',
  RUSSIAN_TWIST = 'RUSSIAN_TWIST',
  HANGING_LEG_RAISE = 'HANGING_LEG_RAISE',
  SIDE_PLANK = 'SIDE_PLANK',
  AB_WHEEL_ROLL_OUT = 'AB_WHEEL_ROLL_OUT',

  // Cardio
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  ROWING = 'ROWING',
  SKIPPING = 'SKIPPING',
  BURPEES = 'BURPEES',
  JUMPING_JACKS = 'JUMPING_JACKS',
  HIGH_KNEES = 'HIGH_KNEES',
  BOX_JUMPS = 'BOX_JUMPS',

  // Full Body
  CLEAN_AND_JERK = 'CLEAN_AND_JERK',
  SNATCH = 'SNATCH',
  KETTLEBELL_SWING = 'KETTLEBELL_SWING',
  FARMER_WALK = 'FARMER_WALK',
  BEAR_CRAWL = 'BEAR_CRAWL',

  // Glutes
  HIP_THRUST = 'HIP_THRUST',
  SUMO_DEADLIFT = 'SUMO_DEADLIFT',
  GLUTE_KICKBACK = 'GLUTE_KICKBACK',
  DONKEY_KICKS = 'DONKEY_KICKS',

  // Forearms
  WRIST_CURL = 'WRIST_CURL',
  REVERSE_WRIST_CURL = 'REVERSE_WRIST_CURL',
  FARMERS_WALK = 'FARMERS_WALK',

  // Neck
  NECK_EXTENSION = 'NECK_EXTENSION',
  NECK_FLEXION = 'NECK_FLEXION',
  NECK_BRIDGE = 'NECK_BRIDGE'
}

export const exerciseCategories = {
  CHEST: 'Chest',
  BACK: 'Back',
  SHOULDERS: 'Shoulders',
  BICEPS: 'Biceps',
  TRICEPS: 'Triceps',
  LEGS_QUADS: 'Legs - Quads',
  LEGS_HAMSTRINGS: 'Legs - Hamstrings',
  LEGS_CALVES: 'Legs - Calves',
  CORE: 'Core/Abs',
  CARDIO: 'Cardio',
  FULL_BODY: 'Full Body',
  GLUTES: 'Glutes',
  FOREARMS: 'Forearms',
  NECK: 'Neck'
} as const;

export const exerciseTypesByCategory: Record<string, ExerciseType[]> = {
  [exerciseCategories.CHEST]: [
    ExerciseType.BENCH_PRESS,
    ExerciseType.INCLINE_BENCH_PRESS,
    ExerciseType.DECLINE_BENCH_PRESS,
    ExerciseType.PUSH_UP,
    ExerciseType.CHEST_FLY,
    ExerciseType.CABLE_CROSSOVER,
    ExerciseType.PULLOVER
  ],
  [exerciseCategories.BACK]: [
    ExerciseType.PULL_UP,
    ExerciseType.CHIN_UP,
    ExerciseType.LAT_PULLDOWN,
    ExerciseType.BENT_OVER_ROW,
    ExerciseType.T_BAR_ROW,
    ExerciseType.SEATED_CABLE_ROW,
    ExerciseType.DEADLIFT,
    ExerciseType.SHRUGS
  ],
  [exerciseCategories.SHOULDERS]: [
    ExerciseType.OVERHEAD_PRESS,
    ExerciseType.DUMBBELL_SHOULDER_PRESS,
    ExerciseType.LATERAL_RAISE,
    ExerciseType.FRONT_RAISE,
    ExerciseType.UPRIGHT_ROW,
    ExerciseType.REAR_DELT_FLY,
    ExerciseType.ARNOLD_PRESS
  ],
  [exerciseCategories.BICEPS]: [
    ExerciseType.BICEP_CURL,
    ExerciseType.HAMMER_CURL,
    ExerciseType.CONCENTRATION_CURL,
    ExerciseType.PREACHER_CURL,
    ExerciseType.CABLE_BICEP_CURL,
    ExerciseType.INCLINE_BICEP_CURL,
    ExerciseType.ZOTTMAN_CURL
  ],
  [exerciseCategories.TRICEPS]: [
    ExerciseType.TRICEP_DIP,
    ExerciseType.CLOSE_GRIP_BENCH_PRESS,
    ExerciseType.TRICEP_EXTENSION,
    ExerciseType.OVERHEAD_TRICEP_EXTENSION,
    ExerciseType.ROPE_PUSHDOWN,
    ExerciseType.KICKBACKS,
    ExerciseType.SKULL_CRUSHERS
  ],
  [exerciseCategories.LEGS_QUADS]: [
    ExerciseType.SQUAT,
    ExerciseType.FRONT_SQUAT,
    ExerciseType.BULGARIAN_SPLIT_SQUAT,
    ExerciseType.LEG_PRESS,
    ExerciseType.LUNGES,
    ExerciseType.STEP_UP,
    ExerciseType.LEG_EXTENSION
  ],
  [exerciseCategories.LEGS_HAMSTRINGS]: [
    ExerciseType.ROMANIAN_DEADLIFT,
    ExerciseType.LYING_LEG_CURL,
    ExerciseType.SEATED_LEG_CURL,
    ExerciseType.GOOD_MORNING,
    ExerciseType.SINGLE_LEG_DEADLIFT,
    ExerciseType.GLUTE_BRIDGE
  ],
  [exerciseCategories.LEGS_CALVES]: [
    ExerciseType.CALF_RAISE,
    ExerciseType.SEATED_CALF_RAISE,
    ExerciseType.DONKEY_CALF_RAISE
  ],
  [exerciseCategories.CORE]: [
    ExerciseType.PLANK,
    ExerciseType.CRUNCHES,
    ExerciseType.LEG_RAISE,
    ExerciseType.BICYCLE_CRUNCH,
    ExerciseType.MOUNTAIN_CLIMBER,
    ExerciseType.RUSSIAN_TWIST,
    ExerciseType.HANGING_LEG_RAISE,
    ExerciseType.SIDE_PLANK,
    ExerciseType.AB_WHEEL_ROLL_OUT
  ],
  [exerciseCategories.CARDIO]: [
    ExerciseType.RUNNING,
    ExerciseType.CYCLING,
    ExerciseType.ROWING,
    ExerciseType.SKIPPING,
    ExerciseType.BURPEES,
    ExerciseType.JUMPING_JACKS,
    ExerciseType.HIGH_KNEES,
    ExerciseType.BOX_JUMPS
  ],
  [exerciseCategories.FULL_BODY]: [
    ExerciseType.CLEAN_AND_JERK,
    ExerciseType.SNATCH,
    ExerciseType.KETTLEBELL_SWING,
    ExerciseType.FARMER_WALK,
    ExerciseType.BEAR_CRAWL
  ],
  [exerciseCategories.GLUTES]: [
    ExerciseType.HIP_THRUST,
    ExerciseType.SUMO_DEADLIFT,
    ExerciseType.GLUTE_KICKBACK,
    ExerciseType.DONKEY_KICKS
  ],
  [exerciseCategories.FOREARMS]: [
    ExerciseType.WRIST_CURL,
    ExerciseType.REVERSE_WRIST_CURL,
    ExerciseType.FARMERS_WALK
  ],
  [exerciseCategories.NECK]: [
    ExerciseType.NECK_EXTENSION,
    ExerciseType.NECK_FLEXION,
    ExerciseType.NECK_BRIDGE
  ]
};

export const formatExerciseType = (type: ExerciseType): string => {
  return type.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};
export interface GoalProgressDto {
    totalVolume: number;
    weightGoalProgressPct: number;
    maxWeightLifted: number;
    totalSets: number;
    bestE1RM: number;
    averageWeightPerSet: number;
    deadlinePassed: boolean;
    repsGoalProgressPct: number;
    distinctWorkoutCount: number;
    daysToDeadline: number;
    totalReps: number;
    maxRepsInSingleSet: number;
}

export interface DailyProgressDto {
    totalVolume: number;
    maxWeightLifted: number;
    totalSets: number;
    bestE1RM: number;
    averageWeightPerSet: number;
    distinctWorkoutCount: number;
    totalReps: number;
    maxRepsInSingleSet: number;
}

export interface CommonProgressDto {
    totalVolume: number;
    totalReps: number;
    totalSets: number;
    maxWeightLifted: number;
    bestE1RM: number;
}

export type TimelineProgressDto = Record<string, DailyProgressDto>;
export type CommonProgressMapDto = Record<string, CommonProgressDto>;
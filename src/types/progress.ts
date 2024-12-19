export interface UserGoalDto {
    metric: string;
    baselineValue: number;
    goalValue: number;
    targetDate: string;
}

export interface ProgressStatsDto {
    metric: string;
    averageValue: number;
    minValue: number;
    maxValue: number;
    improvementFromBaseline: number;
    percentageToGoal: number;
    weekOverWeekChange: number;
}
export interface GoalDto {
    id: number;
    name: string;
    exerciseType: string | null;
    customDescription: string | null;
    targetWeight: number;
    targetReps: number;
    deadline: string;
    createdAt: string;
    achieved: boolean;
}

export interface CreateGoalDto {
    name: string;
    exerciseType: string | null;
    customDescription: string | null;
    targetWeight: number;
    targetReps: number;
    deadline: string;
    createdAt: string;
}

export interface UpdateGoalDto {
    name: string;
    exerciseType: string | null;
    customDescription: string | null;
    targetWeight: number;
    targetReps: number;
    deadline: string;
    createdAt: string;
}
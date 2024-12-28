import { ExerciseType } from '../types/workout';

export const isValidExerciseType = (value: string): value is ExerciseType => {
    return Object.values(ExerciseType).includes(value as ExerciseType);
};

export const formatExerciseName = (exercise: string): string => {
    if (isValidExerciseType(exercise)) {
        return exercise.split('_').map(word =>
            word.charAt(0) + word.slice(1).toLowerCase()
        ).join(' ');
    }
    return exercise;
};
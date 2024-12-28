import React, { useState, useEffect } from 'react';
import { useGoalStore } from '../../stores/goalStore';
import { CreateGoalDto, GoalDto, UpdateGoalDto } from '../../types/goal';
import { ExerciseType, exerciseCategories, exerciseTypesByCategory, formatExerciseType } from '../../types/workout';

interface GoalFormProps {
    goal?: GoalDto;
    onSuccess: () => void;
    onCancel: () => void;
}

export function GoalForm({ goal, onSuccess, onCancel }: GoalFormProps) {
    const { createGoal, updateGoal, customDescriptions, fetchCustomDescriptions } = useGoalStore();
    const [isCustomExercise, setIsCustomExercise] = useState(goal ? !goal.exerciseType : false);
    const [customInput, setCustomInput] = useState(goal?.customDescription || '');
    const [exerciseType, setExerciseType] = useState<ExerciseType | ''>(goal?.exerciseType as ExerciseType || '');

    useEffect(() => {
        fetchCustomDescriptions();
    }, [fetchCustomDescriptions]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const formValues = {
            name: formData.get('name') as string,
            targetWeight: parseFloat(formData.get('targetWeight') as string),
            targetReps: parseInt(formData.get('targetReps') as string),
            deadline: new Date(formData.get('deadline') as string).toISOString(),
            createdAt: formData.get('createdAt') ?
                new Date(formData.get('createdAt') as string).toISOString() :
                new Date().toISOString(),
        };

        try {
            if (goal) {
                const updateData: UpdateGoalDto = {
                    ...formValues,
                    exerciseType: isCustomExercise ? null : exerciseType || null,
                    customDescription: isCustomExercise ? customInput : null,
                };
                await updateGoal(goal.id, updateData);
            } else {
                const createData: CreateGoalDto = {
                    ...formValues,
                    exerciseType: isCustomExercise ? null : (exerciseType || null),
                    customDescription: isCustomExercise ? customInput : null,
                };
                await createGoal(createData);
            }
            onSuccess();
        } catch (error) {
            console.error('Failed to save goal:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Goal Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={goal?.name}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <input
                        type="radio"
                        id="predefinedExercise"
                        checked={!isCustomExercise}
                        onChange={() => setIsCustomExercise(false)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="predefinedExercise">Predefined Exercise</label>

                    <input
                        type="radio"
                        id="customExercise"
                        checked={isCustomExercise}
                        onChange={() => setIsCustomExercise(true)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="customExercise">Custom Exercise</label>
                </div>

                {isCustomExercise ? (
                    <select
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        required={isCustomExercise}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select a custom exercise</option>
                        {customDescriptions.map((desc) => (
                            <option key={desc} value={desc}>
                                {desc}
                            </option>
                        ))}
                    </select>
                ) : (
                    <select
                        name="exerciseType"
                        value={exerciseType}
                        onChange={(e) => setExerciseType(e.target.value as ExerciseType)}
                        required={!isCustomExercise}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select an exercise</option>
                        {Object.entries(exerciseCategories).map(([key, category]) => (
                            <optgroup key={key} label={category}>
                                {exerciseTypesByCategory[category].map((type) => (
                                    <option key={type} value={type}>
                                        {formatExerciseType(type)}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700">
                        Target Weight (kg)
                    </label>
                    <input
                        type="number"
                        id="targetWeight"
                        name="targetWeight"
                        defaultValue={goal?.targetWeight}
                        step="0.1"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="targetReps" className="block text-sm font-medium text-gray-700">
                        Target Reps
                    </label>
                    <input
                        type="number"
                        id="targetReps"
                        name="targetReps"
                        defaultValue={goal?.targetReps}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                    Creation Date
                </label>
                <div className="relative mt-1">
                    <input
                        type="date"
                        id="createdAt"
                        name="createdAt"
                        defaultValue={goal?.createdAt ? goal.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]}
                        max={new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                    Target Date
                </label>
                <div className="relative mt-1">
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        defaultValue={goal?.deadline.split('T')[0]}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    {goal ? 'Update Goal' : 'Create Goal'}
                </button>
            </div>
        </form>
    );
}
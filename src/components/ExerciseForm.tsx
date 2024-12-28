import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { ExerciseDto, ExerciseType, exerciseCategories, exerciseTypesByCategory, formatExerciseType } from '../types/workout';

interface ExerciseFormProps {
    exercise?: Omit<ExerciseDto, 'id'>;
    onSave: (exercise: Omit<ExerciseDto, 'id'>) => void;
    onCancel: () => void;
}

export function ExerciseForm({ exercise, onSave, onCancel }: ExerciseFormProps) {
    const [isCustomExercise, setIsCustomExercise] = useState(
        exercise ? !exercise.exerciseType : false
    );
    const [exerciseType, setExerciseType] = useState<ExerciseType | null>(
        exercise?.exerciseType || null
    );
    const [customDescription, setCustomDescription] = useState<string>(
        exercise?.customDescription || ''
    );
    const [sets, setSets] = useState<{ reps: number; weight: number }[]>(
        exercise?.sets || [{ reps: 0, weight: 0 }]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            exerciseType: isCustomExercise ? null : exerciseType,
            customDescription: isCustomExercise ? customDescription : null,
            sets: sets,
        });
    };

    const addSet = () => {
        setSets([...sets, { reps: 0, weight: 0 }]);
    };

    const removeSet = (index: number) => {
        setSets(sets.filter((_, i) => i !== index));
    };

    const updateSet = (index: number, field: 'reps' | 'weight', value: number) => {
        const newSets = [...sets];
        newSets[index] = { ...newSets[index], [field]: value };
        setSets(newSets);
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        // Allow decimal input with up to 2 decimal places
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            updateSet(index, 'weight', parseFloat(value) || 0);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <div className="flex items-center space-x-4 mb-4">
                    <input
                        type="radio"
                        id="predefinedExercise"
                        checked={!isCustomExercise}
                        onChange={() => setIsCustomExercise(false)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="predefinedExercise" className="text-sm font-medium text-gray-700">
                        Select Exercise
                    </label>

                    <input
                        type="radio"
                        id="customExercise"
                        checked={isCustomExercise}
                        onChange={() => setIsCustomExercise(true)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="customExercise" className="text-sm font-medium text-gray-700">
                        Custom Exercise
                    </label>
                </div>

                {isCustomExercise ? (
                    <div>
                        <label htmlFor="customDescription" className="block text-sm font-medium text-gray-700">
                            Exercise Name
                        </label>
                        <input
                            type="text"
                            id="customDescription"
                            value={customDescription}
                            onChange={(e) => setCustomDescription(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                ) : (
                    <div>
                        <label htmlFor="exerciseType" className="block text-sm font-medium text-gray-700">
                            Exercise Type
                        </label>
                        <select
                            id="exerciseType"
                            value={exerciseType || ''}
                            onChange={(e) => setExerciseType(e.target.value as ExerciseType)}
                            required
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
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Sets</h3>
                    <button
                        type="button"
                        onClick={addSet}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Set
                    </button>
                </div>

                {sets.map((set, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Reps
                            </label>
                            <input
                                type="number"
                                value={set.reps}
                                onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value))}
                                min="0"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                inputMode={"decimal"}
                                step="0.1"
                                value={set.weight}
                                onChange={(e) => handleWeightChange(e, index)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        {sets.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSet(index)}
                                className="mt-6 p-2 text-red-600 hover:text-red-900 focus:outline-none"
                            >
                                <Minus className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save Exercise
                </button>
            </div>
        </form>
    );
}
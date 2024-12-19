import React from 'react';
import { toast } from 'react-hot-toast';
import { useProgressStore } from '../../stores/progressStore';
import { UserGoalDto } from '../../types/progress';
import { metrics, metricCategories } from '../../utils/metrics';

interface GoalFormProps {
    onSuccess?: () => void;
}

export function GoalForm({ onSuccess }: GoalFormProps) {
    const setGoal = useProgressStore((state) => state.setGoal);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const goal: UserGoalDto = {
            metric: formData.get('metric') as string,
            baselineValue: parseInt(formData.get('baselineValue') as string),
            goalValue: parseInt(formData.get('goalValue') as string),
            targetDate: new Date(formData.get('targetDate') as string).toISOString(),
        };

        try {
            await setGoal(goal);
            toast.success('Goal set successfully!');
            onSuccess?.();
        } catch (error) {
            if(!(error instanceof Error)) {
                console.error(error);
            }
            toast.error('Failed to set goal');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="metric" className="block text-sm font-medium text-gray-700">
                    Metric
                </label>
                <select
                    id="metric"
                    name="metric"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    {Object.values(metricCategories).map((category) => (
                        <optgroup key={category} label={category}>
                            {metrics
                                .filter((m) => m.category === category)
                                .map((metric) => (
                                    <option key={metric.value} value={metric.value}>
                                        {metric.label} ({metric.unit})
                                    </option>
                                ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="baselineValue" className="block text-sm font-medium text-gray-700">
                    Starting Value
                </label>
                <input
                    type="number"
                    id="baselineValue"
                    name="baselineValue"
                    required
                    step="any"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="goalValue" className="block text-sm font-medium text-gray-700">
                    Target Value
                </label>
                <input
                    type="number"
                    id="goalValue"
                    name="goalValue"
                    required
                    step="any"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700">
                    Target Date
                </label>
                <input
                    type="date"
                    id="targetDate"
                    name="targetDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Set Goal
            </button>
        </form>
    );
}
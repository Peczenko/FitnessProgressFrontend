import { useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useGoalStore } from '../../../stores/goalStore';
import { useProgressStore } from '../../../stores/progressStore';
import { GoalProgressDetails } from './GoalProgressDetails';
import { useState } from 'react';

export function GoalsProgress() {
    const { goals, fetchGoals } = useGoalStore();
    const { fetchGoalProgress, fetchTimelineProgress } = useProgressStore();
    const [expandedGoalId, setExpandedGoalId] = useState<number | null>(null);

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    useEffect(() => {
        if (expandedGoalId) {
            fetchGoalProgress(expandedGoalId);
            fetchTimelineProgress(expandedGoalId);
        }
    }, [expandedGoalId, fetchGoalProgress, fetchTimelineProgress]);

    if (!goals.length) {
        return (
            <div className="text-center text-gray-500">
                No goals found. Create your first goal to start tracking progress!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {goals.map((goal) => (
                <div key={goal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div
                        className="p-4 cursor-pointer flex justify-between items-center"
                        onClick={() => setExpandedGoalId(expandedGoalId === goal.id ? null : goal.id)}
                    >
                        <div>
                            <h3 className="font-medium">{goal.name}</h3>
                            <p className="text-sm text-gray-600">
                                Target: {goal.targetWeight}kg × {goal.targetReps} reps
                            </p>
                        </div>
                        {expandedGoalId === goal.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                    {expandedGoalId === goal.id && <GoalProgressDetails goalId={goal.id} />}
                </div>
            ))}
        </div>
    );
}
import { useEffect } from 'react';
import { Target, Calendar, TrendingUp, Weight } from 'lucide-react';
import { useProgressStore } from '../../stores/progressStore';

interface GoalProgressProps {
    goalId: number;
}

export function GoalProgress({ goalId }: GoalProgressProps) {
    const { goalProgress, loading, fetchGoalProgress } = useProgressStore();

    useEffect(() => {
        if (goalId) {
            fetchGoalProgress(goalId);
        }
    }, [goalId, fetchGoalProgress]);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!goalProgress) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center text-gray-500">
                    No progress data available yet. Keep working out to see your progress!
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <Weight className="w-5 h-5 mr-2 text-indigo-600" />
                        <div>
                            <p className="text-sm text-gray-500">Progress</p>
                            <p className="font-medium">
                                {goalProgress.maxWeightLifted || 0}kg ({(goalProgress.combinedGoalProgressPct || 0).toFixed(1)}%)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                        <div>
                            <p className="text-sm text-gray-500">Total Volume</p>
                            <p className="font-medium">{(goalProgress.totalVolume || 0).toFixed(1)}kg</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center">
                        <Target className="w-5 h-5 mr-2 text-indigo-600" />
                        <div>
                            <p className="text-sm text-gray-500">Total Reps</p>
                            <p className="font-medium">{goalProgress.totalReps || 0}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                        <div>
                            <p className="text-sm text-gray-500">Time to Deadline</p>
                            <p className={`font-medium ${goalProgress.deadlinePassed ? 'text-red-600' : ''}`}>
                                {goalProgress.deadlinePassed
                                    ? 'Deadline passed'
                                    : `${goalProgress.daysToDeadline} days left`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
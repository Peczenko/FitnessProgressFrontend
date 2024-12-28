import { useEffect } from 'react';
import { Activity, Target, TrendingUp } from 'lucide-react';
import { useGoalStore } from '../../../stores/goalStore';
import { useProgressStore } from '../../../stores/progressStore';

export function KeyMetrics() {
    const { goals, fetchGoals } = useGoalStore();
    const { commonProgress, fetchGoalProgress } = useProgressStore();

    useEffect(() => {
        const loadData = async () => {
            await fetchGoals();
            // After fetching goals, check their progress
            if (goals.length > 0) {
                await Promise.all(goals.map(async (goal) => {
                    try {
                        const progress = await fetchGoalProgress(goal.id);
                        goal.achieved = progress.weightGoalProgressPct >= 100;
                    } catch (error) {
                        console.error(`Failed to fetch progress for goal ${goal.id}:`, error);
                    }
                }));
            }
        };

        loadData();
    }, [fetchGoals, fetchGoalProgress, goals.length]);

    // Calculate total volume across all exercises
    const totalVolume = Object.values(commonProgress).reduce(
        (acc, curr) => acc + curr.totalVolume,
        0
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                    <Activity className="w-8 h-8 text-indigo-600 mr-3" />
                    <div>
                        <h3 className="text-lg font-semibold">Active Goals</h3>
                        <p className="text-2xl font-bold text-indigo-600">
                            {goals.length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Volume</h3>
                        <p className="text-2xl font-bold text-green-600">
                            {totalVolume.toFixed(1)}kg
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                    <Target className="w-8 h-8 text-yellow-600 mr-3" />
                    <div>
                        <h3 className="text-lg font-semibold">Achieved Goals</h3>
                        <p className="text-2xl font-bold text-yellow-600">
                            {goals.filter(goal => goal.achieved).length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
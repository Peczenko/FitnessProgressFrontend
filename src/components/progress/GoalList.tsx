
import { Calendar, Target } from 'lucide-react';
import { useProgressStore } from '../../stores/progressStore';
import { getMetricDetails, formatMetricValue } from '../../utils/metrics';

export function GoalList() {
    const goals = useProgressStore((state) => state.goals);

    if (goals.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                No goals set yet. Set your first goal to start tracking progress!
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
                const metricDetails = getMetricDetails(goal.metric);

                return (
                    <div key={goal.metric} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{metricDetails?.label || goal.metric}</h3>
                            <span className="text-sm text-gray-500">{metricDetails?.category}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                                <Target className="w-5 h-5 mr-2" />
                                <span>
                  Goal: {formatMetricValue(goal.goalValue, goal.metric)}
                                    <span className="text-sm text-gray-500 ml-1">
                    (from {formatMetricValue(goal.baselineValue, goal.metric)})
                  </span>
                </span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <Calendar className="w-5 h-5 mr-2" />
                                <span>
                  Target: {new Date(goal.targetDate).toLocaleDateString()}
                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
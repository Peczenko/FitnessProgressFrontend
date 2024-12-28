import { useProgressStore } from '../../../stores/progressStore';
import { ProgressGraph } from '../ProgressGraph';
import { GoalProgress } from '../GoalProgress';

interface GoalProgressDetailsProps {
    goalId: number;
}

export function GoalProgressDetails({ goalId }: GoalProgressDetailsProps) {
    const { timelineProgress, goalProgress } = useProgressStore();

    if (!goalProgress || !timelineProgress) {
        return (
            <div className="p-4 text-center text-gray-500">
                No progress data available yet
            </div>
        );
    }

    return (
        <div className="p-4 border-t border-gray-200 space-y-6">
            <GoalProgress goalId={goalId} />

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Progress Over Time</h3>
                <ProgressGraph
                    data={timelineProgress}
                    metric="maxWeightLifted"
                    graphType="line"
                />
            </div>
        </div>
    );
}
import { useEffect } from 'react';
import { useProgressStore } from '../../stores/progressStore';
import { ProgressMetrics } from './ProgessMetrics.tsx';

interface ProgressTimelineProps {
    goalId: number;
}

export function ProgressTimeline({ goalId }: ProgressTimelineProps) {
    const { timelineProgress, fetchTimelineProgress } = useProgressStore();

    useEffect(() => {
        fetchTimelineProgress(goalId);
    }, [goalId, fetchTimelineProgress]);

    if (Object.keys(timelineProgress).length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No progress data available yet. Keep working out to see your progress!
            </div>
        );
    }

    return <ProgressMetrics data={timelineProgress} />;
}
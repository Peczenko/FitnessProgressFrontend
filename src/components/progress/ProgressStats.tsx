import { useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useProgressStore } from '../../stores/progressStore';
import { getMetricDetails, formatMetricValue } from '../../utils/metrics';

interface ProgressStatsProps {
    metric: string;
}

export function ProgressStats({ metric }: ProgressStatsProps) {
    const { stats, fetchStats } = useProgressStore();
    const metricStats = stats[metric];
    const metricDetails = getMetricDetails(metric);

    useEffect(() => {
        fetchStats(metric);
    }, [metric, fetchStats]);

    if (!metricStats) {
        return <div>Loading stats...</div>;
    }

    const formatChange = (value: number) => {
        if (value > 0) {
            return (
                <span className="text-green-600 flex items-center">
          <ArrowUpRight className="w-4 h-4 mr-1" />
                    {value.toFixed(1)}%
        </span>
            );
        } else if (value < 0) {
            return (
                <span className="text-red-600 flex items-center">
          <ArrowDownRight className="w-4 h-4 mr-1" />
                    {Math.abs(value).toFixed(1)}%
        </span>
            );
        }
        return (
            <span className="text-gray-600 flex items-center">
        <Minus className="w-4 h-4 mr-1" />
        0%
      </span>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{metricDetails?.label || metric}</h3>
                <span className="text-sm text-gray-500">{metricDetails?.unit}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-500">Average Value</p>
                    <p className="text-xl font-semibold">
                        {formatMetricValue(metricStats.averageValue, metric)}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Progress to Goal</p>
                    <p className="text-xl font-semibold">{metricStats.percentageToGoal.toFixed(1)}%</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Week over Week</p>
                    <div className="text-xl font-semibold">
                        {formatChange(metricStats.weekOverWeekChange)}
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Improvement</p>
                    <div className="text-xl font-semibold">
                        {formatChange(metricStats.improvementFromBaseline)}
                    </div>
                </div>
            </div>
        </div>
    );
}
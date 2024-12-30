import { useState } from 'react';
import { BarChart2, LineChart as LineChartIcon } from 'lucide-react';
import { TimelineProgressDto } from '../../types/progress';
import { ProgressGraph } from './ProgressGraph';

interface ProgressMetricsProps {
    data: TimelineProgressDto;
}

type MetricOption = {
    value: 'totalVolume' | 'totalReps' | 'maxWeightLifted' | 'bestE1RM';
    label: string;
};

const metricOptions: MetricOption[] = [
    { value: 'bestE1RM', label: 'Estimated 1RM' },
    { value: 'maxWeightLifted', label: 'Max Weight' },
    { value: 'totalVolume', label: 'Total Volume' },
    { value: 'totalReps', label: 'Total Reps' },
];

export function ProgressMetrics({ data }: ProgressMetricsProps) {
    const [selectedMetric, setSelectedMetric] = useState<MetricOption['value']>('bestE1RM');
    const [graphType, setGraphType] = useState<'line' | 'bar'>('line');

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <select
                        value={selectedMetric}
                        onChange={(e) => setSelectedMetric(e.target.value as MetricOption['value'])}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        {metricOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setGraphType('line')}
                        className={`p-2 rounded-md ${
                            graphType === 'line'
                                ? 'bg-indigo-100 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <LineChartIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setGraphType('bar')}
                        className={`p-2 rounded-md ${
                            graphType === 'bar'
                                ? 'bg-indigo-100 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <BarChart2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <ProgressGraph
                data={data}
                graphType={graphType}
            />
        </div>
    );
}
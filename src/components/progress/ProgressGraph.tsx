import { useMemo, useState } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { TimelineProgressDto } from '../../types/progress';

interface ProgressGraphProps {
    data: TimelineProgressDto;
    graphType: 'line' | 'bar';
}

type MetricType = 'totalVolume' | 'totalReps' | 'maxWeightLifted' | 'bestE1RM';

export function ProgressGraph({ data, graphType }: ProgressGraphProps) {
    const [selectedMetric, setSelectedMetric] = useState<MetricType>('maxWeightLifted');

    const formattedData = useMemo(() => {
        return Object.entries(data)
            .filter(([date]) => {
                try {
                    return isValid(parseISO(date));
                } catch {
                    return false;
                }
            })
            .map(([date, values]) => ({
                date,
                value: values[selectedMetric],
                displayDate: format(parseISO(date), 'MMM d'),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [data, selectedMetric]);

    const metricLabels = {
        totalVolume: 'Total Volume (kg)',
        totalReps: 'Total Reps',
        maxWeightLifted: 'Max Weight (kg)',
        bestE1RM: 'Estimated 1RM (kg)',
    };

    const metricOptions = [
        { value: 'maxWeightLifted', label: 'Max Weight' },
        { value: 'totalReps', label: 'Total Reps' },
        { value: 'totalVolume', label: 'Total Volume' },
        { value: 'bestE1RM', label: 'Estimated 1RM' }
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 shadow-lg rounded-lg border">
                    <p className="font-medium">{label}</p>
                    <p className="text-indigo-600">
                        {metricLabels[selectedMetric]}: {payload[0].value.toFixed(1)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (formattedData.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No data available for the selected metric
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
                {metricOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="metric"
                            value={option.value}
                            checked={selectedMetric === option.value}
                            onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>

            <div className="w-full h-[400px]">
                <ResponsiveContainer>
                    {graphType === 'line' ? (
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="displayDate"
                                tick={{ fontSize: 12 }}
                                padding={{ left: 20, right: 20 }}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                label={{
                                    value: metricLabels[selectedMetric],
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { textAnchor: 'middle' },
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                name={metricLabels[selectedMetric]}
                                stroke="#4f46e5"
                                strokeWidth={2}
                                dot={{ fill: '#4f46e5', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    ) : (
                        <BarChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="displayDate"
                                tick={{ fontSize: 12 }}
                                padding={{ left: 20, right: 20 }}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                label={{
                                    value: metricLabels[selectedMetric],
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { textAnchor: 'middle' },
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="value"
                                name={metricLabels[selectedMetric]}
                                fill="#4f46e5"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
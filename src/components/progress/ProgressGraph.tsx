import { useMemo } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
import { TimelineProgressDto } from '../../types/progress';

interface ProgressGraphProps {
    data: TimelineProgressDto;
    metric: 'totalVolume' | 'totalReps' | 'maxWeightLifted' | 'bestE1RM';
    graphType: 'line' | 'bar';
}

export function ProgressGraph({ data, metric, graphType }: ProgressGraphProps) {
    const formattedData = useMemo(() => {
        // Only process entries where the key is a valid ISO date string
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
                value: values[metric],
                displayDate: format(parseISO(date), 'MMM d'),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [data, metric]);

    const metricLabels = {
        totalVolume: 'Total Volume (kg)',
        totalReps: 'Total Reps',
        maxWeightLifted: 'Max Weight (kg)',
        bestE1RM: 'Estimated 1RM (kg)',
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 shadow-lg rounded-lg border">
                    <p className="font-medium">{label}</p>
                    <p className="text-indigo-600">
                        {metricLabels[metric]}: {payload[0].value.toFixed(1)}
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
                                value: metricLabels[metric],
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
                            name={metricLabels[metric]}
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
                                value: metricLabels[metric],
                                angle: -90,
                                position: 'insideLeft',
                                style: { textAnchor: 'middle' },
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                            dataKey="value"
                            name={metricLabels[metric]}
                            fill="#4f46e5"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
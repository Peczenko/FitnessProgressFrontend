interface MetricOption {
    value: string;
    label: string;
    unit: string;
    category: string;
}

export const metricCategories = {
    BODY: 'Body Metrics',
    PERFORMANCE: 'Performance Metrics',
    VOLUME: 'Volume Metrics',
    LIFESTYLE: 'Lifestyle Metrics',
} as const;

export const metrics: MetricOption[] = [
    // Body Metrics
    {
        value: 'bodyWeight',
        label: 'Body Weight',
        unit: 'kg',
        category: metricCategories.BODY,
    },
    {
        value: 'bodyFat',
        label: 'Body Fat Percentage',
        unit: '%',
        category: metricCategories.BODY,
    },
    {
        value: 'waistCircumference',
        label: 'Waist Circumference',
        unit: 'cm',
        category: metricCategories.BODY,
    },

    // Performance Metrics
    {
        value: 'benchPress',
        label: 'Bench Press',
        unit: 'kg',
        category: metricCategories.PERFORMANCE,
    },
    {
        value: 'squat',
        label: 'Squat',
        unit: 'kg',
        category: metricCategories.PERFORMANCE,
    },
    {
        value: 'deadlift',
        label: 'Deadlift',
        unit: 'kg',
        category: metricCategories.PERFORMANCE,
    },
    {
        value: 'pullUps',
        label: 'Pull-ups',
        unit: 'reps',
        category: metricCategories.PERFORMANCE,
    },

    // Volume Metrics
    {
        value: 'weeklyVolume',
        label: 'Weekly Training Volume',
        unit: 'sets',
        category: metricCategories.VOLUME,
    },
    {
        value: 'weeklyReps',
        label: 'Weekly Total Reps',
        unit: 'reps',
        category: metricCategories.VOLUME,
    },
    {
        value: 'workoutFrequency',
        label: 'Workout Frequency',
        unit: 'sessions/week',
        category: metricCategories.VOLUME,
    },

    // Lifestyle Metrics
    {
        value: 'sleepDuration',
        label: 'Sleep Duration',
        unit: 'hours',
        category: metricCategories.LIFESTYLE,
    },
    {
        value: 'dailySteps',
        label: 'Daily Steps',
        unit: 'steps',
        category: metricCategories.LIFESTYLE,
    },
    {
        value: 'waterIntake',
        label: 'Water Intake',
        unit: 'liters',
        category: metricCategories.LIFESTYLE,
    },
];

export const getMetricDetails = (metricValue: string): MetricOption | undefined => {
    return metrics.find((m) => m.value === metricValue);
};

export const getMetricsByCategory = (category: string): MetricOption[] => {
    return metrics.filter((m) => m.category === category);
};

export const formatMetricValue = (value: number, metricValue: string): string => {
    const metric = getMetricDetails(metricValue);
    if (!metric) return `${value}`;
    return `${value} ${metric.unit}`;
};
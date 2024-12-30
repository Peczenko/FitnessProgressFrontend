import {useProgressStore} from '../../../stores/progressStore';
import {exerciseCategories, ExerciseType} from '../../../types/workout';
import {formatExerciseName} from '../../../utils/exercise';
import {Dumbbell, TrendingUp, Target, BarChart2} from 'lucide-react';

export function ExerciseProgress() {
    const {commonProgress} = useProgressStore();

    const validExercises = Object.entries(commonProgress).filter(([_, stats]) =>
        stats.maxWeightLifted > 0 || stats.totalVolume > 0
    );

    const exercisesByCategory = validExercises.reduce((acc, [exercise, stats]) => {
        const category = Object.entries(exerciseCategories).find(([_, exercises]) =>
            exercises.includes(exercise as ExerciseType)
        )?.[0] || '';

        if (!acc[category]) {
            acc[category] = [];
        }

        acc[category].push({exercise, stats});
        return acc;
    }, {} as Record<string, Array<{ exercise: string; stats: any }>>);

    if (validExercises.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                <p>No exercise progress data available yet.</p>
                <p className="mt-2 text-sm">Complete some workouts to see your progress here!</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {Object.entries(exercisesByCategory).map(([category, exercises]) => (
                <div key={category} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium mb-6">{category}</h3>
                    <div className="grid gap-6">
                        {exercises.map(({exercise, stats}) => (
                            <div key={exercise} className="border-t border-gray-100 pt-6 first:border-0 first:pt-0">
                                <h4 className="font-medium text-gray-900 mb-4">{formatExerciseName(exercise)}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center text-gray-500 mb-2">
                                            <Dumbbell className="w-4 h-4 mr-2"/>
                                            <span className="text-sm">Max Weight</span>
                                        </div>
                                        <div className="text-lg font-semibold">{stats.maxWeightLifted}kg</div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center text-gray-500 mb-2">
                                            <Target className="w-4 h-4 mr-2"/>
                                            <span className="text-sm">Est. 1RM</span>
                                        </div>
                                        <div className="text-lg font-semibold">{stats.bestE1RM.toFixed(1)}kg</div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center text-gray-500 mb-2">
                                            <TrendingUp className="w-4 h-4 mr-2"/>
                                            <span className="text-sm">Total Volume</span>
                                        </div>
                                        <div className="text-lg font-semibold">{stats.totalVolume.toFixed(1)}kg</div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center text-gray-500 mb-2">
                                            <BarChart2 className="w-4 h-4 mr-2"/>
                                            <span className="text-sm">Total Sets × Reps</span>
                                        </div>
                                        <div
                                            className="text-lg font-semibold">{stats.totalSets} × {stats.totalReps}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
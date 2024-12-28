import { useProgressStore } from '../../../stores/progressStore';

export function QuickStats() {
    const { commonProgress } = useProgressStore();

    const totalStats = Object.values(commonProgress).reduce(
        (acc, curr) => ({
            totalReps: acc.totalReps + curr.totalReps,
            totalSets: acc.totalSets + curr.totalSets,
            totalVolume: acc.totalVolume + curr.totalVolume,
        }),
        { totalReps: 0, totalSets: 0, totalVolume: 0 }
    );

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p className="text-sm text-gray-600">Total Sets</p>
                    <p className="text-2xl font-bold">{totalStats.totalSets}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Total Reps</p>
                    <p className="text-2xl font-bold">{totalStats.totalReps}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Total Volume</p>
                    <p className="text-2xl font-bold">{totalStats.totalVolume.toFixed(1)}kg</p>
                </div>
            </div>
        </div>
    );
}
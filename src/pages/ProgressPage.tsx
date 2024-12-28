import { useState, useEffect } from 'react';
import { useProgressStore } from '../stores/progressStore';
import { ProgressDashboard } from '../components/progress/dashboard/ProgressDashboard';
import { GoalsProgress } from '../components/progress/goals/GoalProgress';
import { ExerciseProgress } from '../components/progress/exercise/ExerciseProgress';

type ProgressTab = 'dashboard' | 'goals' | 'exercises';

export function ProgressPage() {
    const [activeTab, setActiveTab] = useState<ProgressTab>('dashboard');
    const { fetchCommonProgress } = useProgressStore();

    useEffect(() => {
        // Fetch common progress data when component mounts
        fetchCommonProgress();
    }, [fetchCommonProgress]);

    const tabs: { id: ProgressTab; label: string }[] = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'goals', label: 'Goals Progress' },
        { id: 'exercises', label: 'Exercise Progress' },
    ];

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
                    <div className="mt-4 border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    py-4 px-1 border-b-2 font-medium text-sm
                    ${
                                        activeTab === tab.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                  `}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="mt-6">
                    {activeTab === 'dashboard' && <ProgressDashboard />}
                    {activeTab === 'goals' && <GoalsProgress />}
                    {activeTab === 'exercises' && <ExerciseProgress />}
                </div>
            </div>
        </div>
    );
}
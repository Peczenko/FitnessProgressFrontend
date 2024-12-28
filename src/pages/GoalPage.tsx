import { useState } from 'react';
import { Plus } from 'lucide-react';
import { GoalList } from '../components/goals/GoalList';
import { GoalForm } from '../components/goals/GoalForm';
import { Modal } from '../components/Modal';

export function GoalsPage() {
    const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);

    const handleGoalFormSuccess = () => {
        setIsGoalFormOpen(false);
    };

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Goals</h2>
                    <button
                        onClick={() => setIsGoalFormOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Set New Goal
                    </button>
                </div>
                <GoalList />
            </div>

            <Modal
                isOpen={isGoalFormOpen}
                onClose={() => setIsGoalFormOpen(false)}
                title="Set New Goal"
            >
                <GoalForm
                    onSuccess={handleGoalFormSuccess}
                    onCancel={() => setIsGoalFormOpen(false)}
                />
            </Modal>
        </div>
    );
}
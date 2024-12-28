import { useState, useEffect } from 'react';
import { Calendar, Edit, Trash2, Target, Dumbbell } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGoalStore } from '../../stores/goalStore';
import { GoalDto } from '../../types/goal';
import { DeleteConfirmationModal } from '../DelteConfirmationModal';
import { Modal } from '../Modal';
import { GoalForm } from './GoalForm';
import { formatExerciseType, ExerciseType } from '../../types/workout';

export function GoalList() {
    const { goals, loading, deleteGoal, fetchGoals } = useGoalStore();
    const [goalToDelete, setGoalToDelete] = useState<GoalDto | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<GoalDto | null>(null);

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    const handleDelete = async (id: number) => {
        try {
            await deleteGoal(id);
            toast.success('Goal deleted successfully');
        } catch (error) {
            toast.error('Failed to delete goal');
            console.error('Delete goal error:', error);
        } finally {
            setGoalToDelete(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatExerciseName = (exerciseType: string | null, customDescription: string | null): string => {
        if (exerciseType && Object.values(ExerciseType).includes(exerciseType as ExerciseType)) {
            return formatExerciseType(exerciseType as ExerciseType);
        }
        return customDescription || 'Unknown Exercise';
    };

    if (loading) {
        return <div className="text-center">Loading goals...</div>;
    }

    if (goals.length === 0) {
        return (
            <div className="text-center text-gray-500">
                No goals found. Create your first goal to start tracking progress!
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {goals.map((goal) => (
                    <div
                        key={goal.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <Target className="w-5 h-5 mr-2" />
                                                <span>
                          {goal.targetWeight}kg × {goal.targetReps} reps
                        </span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-5 h-5 mr-2" />
                                                <span>Created: {formatDate(goal.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-5 h-5 mr-2" />
                                                <span>Target: {formatDate(goal.deadline)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Dumbbell className="w-5 h-5 mr-2" />
                                                <span>
                          Exercise: {formatExerciseName(goal.exerciseType, goal.customDescription)}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedGoal(goal);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 rounded-full hover:bg-blue-50"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setGoalToDelete(goal)}
                                        className="p-2 text-red-600 hover:text-red-800 transition-colors duration-200 rounded-full hover:bg-red-50"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmationModal
                isOpen={!!goalToDelete}
                onClose={() => setGoalToDelete(null)}
                onConfirm={() => goalToDelete && handleDelete(goalToDelete.id)}
                itemName={goalToDelete?.name || ''}
            />

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedGoal(null);
                }}
                title="Edit Goal"
            >
                {selectedGoal && (
                    <GoalForm
                        goal={selectedGoal}
                        onSuccess={() => {
                            setIsEditModalOpen(false);
                            setSelectedGoal(null);
                            fetchGoals();
                        }}
                        onCancel={() => {
                            setIsEditModalOpen(false);
                            setSelectedGoal(null);
                        }}
                    />
                )}
            </Modal>
        </>
    );
}
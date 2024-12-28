import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { WorkoutList } from '../components/workouts/WorkoutList.tsx';
import { WorkoutForm } from '../components/workouts/WorkoutForm.tsx';
import { Modal } from '../components/Modal';
import { useWorkoutStore } from '../stores/workoutStore';
import { WorkoutDto } from '../types/workout';

export function WorkoutsPage() {
    const [isWorkoutFormOpen, setIsWorkoutFormOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDto | undefined>();
    const { fetchWorkouts } = useWorkoutStore();

    useEffect(() => {
        fetchWorkouts();
    }, [fetchWorkouts]);

    const handleEdit = (workout: WorkoutDto) => {
        setSelectedWorkout(workout);
        setIsWorkoutFormOpen(true);
    };

    const handleWorkoutFormSuccess = () => {
        setIsWorkoutFormOpen(false);
        setSelectedWorkout(undefined);
        fetchWorkouts();
    };

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">My Workouts</h2>
                    <button
                        onClick={() => setIsWorkoutFormOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Workout
                    </button>
                </div>

                <WorkoutList onEdit={handleEdit} />
            </div>

            <Modal
                isOpen={isWorkoutFormOpen}
                onClose={() => {
                    setIsWorkoutFormOpen(false);
                    setSelectedWorkout(undefined);
                }}
                title={selectedWorkout ? 'Edit Workout' : 'Create New Workout'}
            >
                <WorkoutForm
                    workout={selectedWorkout}
                    onSuccess={handleWorkoutFormSuccess}
                />
            </Modal>
        </div>
    );
}
import { useState } from 'react';
import { Clock, Edit, Trash2, Calendar, Dumbbell } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useWorkoutStore } from '../../stores/workoutStore.ts';
import { WorkoutDto, formatExerciseType } from '../../types/workout.ts';
import { DeleteConfirmationModal } from '../DelteConfirmationModal.tsx';

interface WorkoutListProps {
    onEdit: (workout: WorkoutDto) => void;
}

export function WorkoutList({ onEdit }: WorkoutListProps) {
    const { workouts, loading, deleteWorkout } = useWorkoutStore();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [workoutToDelete, setWorkoutToDelete] = useState<WorkoutDto | null>(null);

    // Sort workouts by date, most recent last
    const sortedWorkouts = [...workouts].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });

    const handleDelete = async (id: number) => {
        try {
            setDeletingId(id);
            await deleteWorkout(id);
            toast.success('Workout deleted successfully');
        } catch (error) {
            toast.error('Failed to delete workout');
            console.error('Delete workout error:', error);
        } finally {
            setDeletingId(null);
            setWorkoutToDelete(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (loading) {
        return <div className="text-center">Loading workouts...</div>;
    }

    if (workouts.length === 0) {
        return (
            <div className="text-center text-gray-500">
                No workouts found. Create your first workout to get started!
            </div>
        );
    }

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedWorkouts.map((workout) => (
                    <div
                        key={workout.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                        <p className="mt-2 text-gray-600">{workout.description}</p>

                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Exercises:</h4>
                            <div className="space-y-2">
                                {workout.exercises.map((exercise, index) => (
                                    <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                                        <Dumbbell className="w-4 h-4 mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium">
                                                {exercise.exerciseType ?
                                                    formatExerciseType(exercise.exerciseType) :
                                                    exercise.customDescription}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {exercise.sets.map((set, setIndex) => (
                                                    <span key={setIndex}>
                                                        {setIndex > 0 && ' | '}
                                                        Set {setIndex + 1}: {set.reps} × {set.weight}kg
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{workout.duration} minutes</span>
                        </div>

                        {workout.createdAt && (
                            <div className="mt-2 flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{formatDate(workout.createdAt)}</span>
                            </div>
                        )}

                        {workout.userDto && (
                            <div className="mt-2 text-sm text-gray-500">
                                Created by: {workout.userDto.username}
                            </div>
                        )}

                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => onEdit(workout)}
                                className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 rounded-full hover:bg-blue-50"
                                aria-label="Edit workout"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setWorkoutToDelete(workout)}
                                disabled={deletingId === workout.id}
                                className={`p-2 text-red-600 hover:text-red-800 transition-colors duration-200 rounded-full hover:bg-red-50 ${
                                    deletingId === workout.id ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                aria-label="Delete workout"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmationModal
                isOpen={!!workoutToDelete}
                onClose={() => setWorkoutToDelete(null)}
                onConfirm={() => workoutToDelete && handleDelete(workoutToDelete.id)}
                itemName={workoutToDelete?.name || ''}
            />
        </>
    );
}
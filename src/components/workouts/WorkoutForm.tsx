import React, { useState } from 'react';
import {Plus} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useWorkoutStore } from '../../stores/workoutStore.ts';
import { WorkoutDto, ExerciseDto } from '../../types/workout.ts';
import { ExerciseForm } from '../ExerciseForm.tsx';
import { Modal } from '../Modal.tsx';

interface WorkoutFormProps {
  workout?: WorkoutDto;
  onSuccess?: () => void;
}

export function WorkoutForm({ workout, onSuccess }: WorkoutFormProps) {
  const { createWorkout, updateWorkout } = useWorkoutStore();
  const [exercises, setExercises] = useState<Omit<ExerciseDto, 'id'>[]>(
      workout?.exercises || []
  );
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      duration: parseInt(formData.get('duration') as string, 10),
      exercises: exercises
    };

    try {
      if (workout?.id) {
        await updateWorkout(workout.id, data);
        toast.success('Workout updated successfully!');
      } else {
        await createWorkout(data);
        toast.success('Workout created successfully!');
      }
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred');
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  const handleSaveExercise = (exercise: Omit<ExerciseDto, 'id'>) => {
    if (editingExerciseIndex !== null) {
      const newExercises = [...exercises];
      newExercises[editingExerciseIndex] = exercise;
      setExercises(newExercises);
    } else {
      setExercises([...exercises, exercise]);
    }
    setIsExerciseModalOpen(false);
    setEditingExerciseIndex(null);
  };

  const handleEditExercise = (index: number) => {
    setEditingExerciseIndex(index);
    setIsExerciseModalOpen(true);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
      <>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Workout Name
            </label>
            <input
                type="text"
                id="name"
                name="name"
                defaultValue={workout?.name}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
                id="description"
                name="description"
                defaultValue={workout?.description}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
              Creation Date
            </label>
            <div className="relative mt-1">
              <input
                  type="date"
                  id="createdAt"
                  name="createdAt"
                  defaultValue={workout?.createdAt ? workout.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]}
                  max={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
                type="number"
                id="duration"
                name="duration"
                defaultValue={workout?.duration}
                required
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Exercises</h3>
              <button
                  type="button"
                  onClick={() => {
                    setEditingExerciseIndex(null);
                    setIsExerciseModalOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="w-5 h-5 mr-2"/>
                Add Exercise
              </button>
            </div>

            {exercises.map((exercise, index) => (
                <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-md font-medium text-gray-900">
                      {exercise.exerciseType ?
                          exercise.exerciseType.split('_').map(word =>
                              word.charAt(0) + word.slice(1).toLowerCase()
                          ).join(' ') :
                          exercise.customDescription}
                    </h4>
                    <div className="space-x-2">
                      <button
                          type="button"
                          onClick={() => handleEditExercise(index)}
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                          type="button"
                          onClick={() => handleRemoveExercise(index)}
                          className="text-sm text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex} className="text-sm text-gray-600">
                          Set {setIndex + 1}: {set.reps} reps × {set.weight}kg
                        </div>
                    ))}
                  </div>
                </div>
            ))}
          </div>

          <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {workout ? 'Update Workout' : 'Create Workout'}
          </button>
        </form>

        <Modal
            isOpen={isExerciseModalOpen}
            onClose={() => {
              setIsExerciseModalOpen(false);
              setEditingExerciseIndex(null);
            }}
            title={editingExerciseIndex !== null ? 'Edit Exercise' : 'Add Exercise'}
        >
          <ExerciseForm
              exercise={editingExerciseIndex !== null ? exercises[editingExerciseIndex] : undefined}
              onSave={handleSaveExercise}
              onCancel={() => {
                setIsExerciseModalOpen(false);
                setEditingExerciseIndex(null);
              }}
          />
        </Modal>
      </>
  );
}
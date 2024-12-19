import React from 'react';
import { toast } from 'react-hot-toast';
import { useWorkoutStore } from '../stores/workoutStore';
import { WorkoutDto } from '../types/workout';

interface WorkoutFormProps {
  workout?: WorkoutDto;
  onSuccess?: () => void;
}

export function WorkoutForm({ workout, onSuccess }: WorkoutFormProps) {
  const { createWorkout, updateWorkout } = useWorkoutStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      duration: parseInt(formData.get('duration') as string, 10),
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

  return (
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

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {workout ? 'Update Workout' : 'Create Workout'}
      </button>
    </form>
  );
}
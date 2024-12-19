import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { WorkoutList } from '../components/WorkoutList';
import { WorkoutForm } from '../components/WorkoutForm';
import { GoalForm } from '../components/progress/GoalForm';
import { GoalList } from '../components/progress/GoalList';
import { ProgressStats } from '../components/progress/ProgressStats';
import { useWorkoutStore } from '../stores/workoutStore';
import { useProfileStore } from '../stores/profileStore';
import { useProgressStore } from '../stores/progressStore';
import { WorkoutDto } from '../types/workout';
import { Modal } from '../components/Modal';
import { metrics, metricCategories } from '../utils/metrics';

export function DashboardPage() {
  const [isWorkoutFormOpen, setIsWorkoutFormOpen] = useState(false);
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDto | undefined>();
  const { fetchWorkouts } = useWorkoutStore();
  const { fetchProfile } = useProfileStore();
  const { fetchGoals } = useProgressStore();

  useEffect(() => {
    fetchWorkouts();
    fetchProfile();
    fetchGoals();
  }, [fetchWorkouts, fetchProfile, fetchGoals]);

  const handleEdit = (workout: WorkoutDto) => {
    setSelectedWorkout(workout);
    setIsWorkoutFormOpen(true);
  };

  const handleWorkoutFormSuccess = () => {
    setIsWorkoutFormOpen(false);
    setSelectedWorkout(undefined);
    fetchWorkouts();
  };

  const handleGoalFormSuccess = () => {
    setIsGoalFormOpen(false);
    fetchGoals();
  };

  // Group metrics by category for the stats display
  const metricsByCategory = Object.values(metricCategories).map(category => ({
    category,
    metrics: metrics.filter(m => m.category === category)
  }));

  return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Section */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Progress Tracking</h2>
                <button
                    onClick={() => setIsGoalFormOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Set New Goal
                </button>
              </div>

              {metricsByCategory.map(({ category, metrics }) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {metrics.map(metric => (
                          <ProgressStats key={metric.value} metric={metric.value} />
                      ))}
                    </div>
                  </div>
              ))}

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Goals</h3>
              <GoalList />
            </div>

            {/* Workouts Section */}
            <div className="mt-12">
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
          </div>
        </div>

        {/* Modals */}
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

        <Modal
            isOpen={isGoalFormOpen}
            onClose={() => setIsGoalFormOpen(false)}
            title="Set New Goal"
        >
          <GoalForm onSuccess={handleGoalFormSuccess} />
        </Modal>
      </div>
  );
}
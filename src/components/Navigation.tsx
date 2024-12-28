import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, User, Target, Activity, Dumbbell } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useProfileStore } from '../stores/profileStore';
import { UserProfileModal } from './UserProfileModal';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { profile, fetchProfile, initialized } = useProfileStore();

  useEffect(() => {
    if (!initialized) {
      fetchProfile();
    }
  }, [initialized, fetchProfile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isProfileIncomplete = initialized && (!profile || !profile.age || !profile.weight || !profile.height);

  const navItems = [
    { path: '/goals', label: 'Goals', icon: Target },
    { path: '/progress', label: 'Progress', icon: Activity },
    { path: '/workouts', label: 'Workouts', icon: Dumbbell },
  ];

  return (
      <>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-gray-900">
                  Fitness Progress Tracker
                </h1>
                <div className="flex space-x-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                location.pathname === item.path
                                    ? 'text-indigo-600 bg-indigo-50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                          <Icon className="w-5 h-5 mr-1.5" />
                          {item.label}
                        </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                    onClick={() => setIsProfileOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile {isProfileIncomplete && <span className="ml-2 text-red-500">*</span>}
                </button>
                <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </>
  );
}
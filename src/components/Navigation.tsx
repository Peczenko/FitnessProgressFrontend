import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useProfileStore } from '../stores/profileStore';
import { UserProfileModal } from './UserProfileModal';

export function Navigation() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profile = useProfileStore((state) => state.profile);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Fitness Progress Tracker
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                    onClick={() => setIsProfileOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile {!profile && <span className="ml-2 text-red-500">*</span>}
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
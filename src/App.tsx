import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GoalsPage } from './pages/GoalPage';
import { ProgressPage } from './pages/ProgressPage';
import { WorkoutsPage } from './pages/WorkoutPage';
import { Navigation } from './components/Navigation';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            {children}
        </div>
    );
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/goals"
                        element={
                            <PrivateRoute>
                                <AuthenticatedLayout>
                                    <GoalsPage />
                                </AuthenticatedLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/progress"
                        element={
                            <PrivateRoute>
                                <AuthenticatedLayout>
                                    <ProgressPage />
                                </AuthenticatedLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/workouts"
                        element={
                            <PrivateRoute>
                                <AuthenticatedLayout>
                                    <WorkoutsPage />
                                </AuthenticatedLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/goals" />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" />
        </>
    );
}

export default App;
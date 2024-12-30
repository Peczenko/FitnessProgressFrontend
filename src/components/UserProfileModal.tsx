import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Weight, Ruler } from 'lucide-react';
import { Modal } from './Modal';
import { useProfileStore } from '../stores/profileStore';
import { UserProfileDto } from '../types/auth';
import { toast } from 'react-hot-toast';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
    const { profile, loading, updateProfile, fetchProfile } = useProfileStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfileDto>({
        age: profile?.age || 0,
        weight: profile?.weight || 0,
        height: profile?.height || 0,
    });

    useEffect(() => {
        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen, fetchProfile]);

    useEffect(() => {
        if (profile) {
            setFormData({
                age: profile.age,
                weight: profile.weight,
                height: profile.height,
            });
        }
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile(formData);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            if(!(error instanceof Error)) {
                console.error('Update profile error:', error);
            }
            toast.error('Failed to update profile');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: parseInt(value, 10) || 0,
        }));
    };

    if (loading) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title="User Profile">
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="User Profile">
            <div className="space-y-6">
                {profile && (
                    <>
                        <div className="flex items-center space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <User className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Username</p>
                                <p className="font-medium">{profile.username}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <Mail className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{profile.email}</p>
                            </div>
                        </div>
                    </>
                )}

                {!profile && !isEditing ? (
                    <div className="text-center py-4">
                        <p className="text-gray-600 mb-4">Please complete your profile to continue</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Complete Profile
                        </button>
                    </div>
                ) : isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                Age
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                                Weight (kg)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                                Height (cm)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData(profile ? {
                                        age: profile.age,
                                        weight: profile.weight,
                                        height: profile.height
                                    } : { age: 0, weight: 0, height: 0 });
                                }}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="flex items-center space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <Calendar className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="font-medium">{profile?.age} years</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <Weight className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Weight</p>
                                <p className="font-medium">{profile?.weight} kg</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <Ruler className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Height</p>
                                <p className="font-medium">{profile?.height} cm</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Edit Profile
                        </button>
                    </>
                )}
            </div>
        </Modal>
    );
}
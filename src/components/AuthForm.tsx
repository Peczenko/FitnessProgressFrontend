import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { LoginDto, RegisterDto } from '../types/auth';
import { validateRegistration } from '../utils/validation';

interface AuthFormProps {
  type: 'login' | 'register';
}

export function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);


    try {
      if (type === 'login') {
        const data: LoginDto = {
          username: formData.get('username') as string,
          password: formData.get('password') as string,
        };
        await login(data);
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      } else {
        const data: RegisterDto = {
          username: formData.get('username') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          passwordConfirm: formData.get('passwordConfirm') as string,
        };

        // Validate passwords match
        const validationError = validateRegistration(data);
        if (validationError) {
          toast.error(validationError);
          return;
        }

        await register(data);
        toast.success('Successfully registered!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Invalid username or password');
      } else {
        const errorMessage = error.response?.data?.message
            || error.response?.data?.error
            || error.message
            || 'An error occurred';
        toast.error(errorMessage);
      }
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {type === 'register' && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {type === 'register' && (
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
        )}

        <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
  );
}
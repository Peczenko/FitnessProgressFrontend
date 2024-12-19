export interface UserDto {
  username: string;
  email: string;
}

export interface WorkoutDto {
  id: number;
  name: string;
  description: string;
  duration: number;
  createdAt?: string;
  userDto?: UserDto;
}
export interface WorkoutFormData {
  name: string;
  description: string;
  duration: number;
}
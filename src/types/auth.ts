export interface UserDto {
  username: string;
  email: string;
}

export interface UserProfileResponse {
  username: string;
  email: string;
  age: number;
  weight: number;
  height: number;
}

export interface UserProfileDto {
  age: number;
  weight: number;
  height: number;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
}
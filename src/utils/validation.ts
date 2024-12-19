import { RegisterDto } from '../types/auth';

export function validateRegistration(data: RegisterDto): string | null {
    if (data.password !== data.passwordConfirm) {
        return 'Passwords do not match';
    }
    return null;
}
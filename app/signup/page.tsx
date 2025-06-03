'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
    const [message, setMessage] = useState<string>('');

    function validateSignUp(email: string, password: string, confirmPassword: string) {
        const errors: { email?: string; password?: string; confirmPassword?: string } = {};
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email format.';
        }
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }
        return errors;
    }

    function getFriendlyErrorMessage(errorMessage: string): string {
        if (errorMessage.includes('user already exists')) {
            return 'This email is already registered. Please log in.';
        } else if (errorMessage.includes('network error')) {
            return 'Network error. Please check your internet connection.';
        } else {
            return 'An unexpected error occurred. Please try again.';
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateSignUp(email, password, confirmPassword);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setMessage('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            setMessage('Sign-up successful! Check your email for confirmation.');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage(getFriendlyErrorMessage((error as Error).message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        disabled={loading}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        disabled={loading}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        disabled={loading}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
}
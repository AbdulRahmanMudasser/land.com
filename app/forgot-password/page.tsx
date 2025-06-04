'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email.');
      return;
    }
    setMessage('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setMessage('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          opacity: 0.3,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 to-navy-900/90"></div>

      {/* Form Card */}
      <div className="relative w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Reset Password</h1>
          <p className="mt-2 text-gray-600 text-sm">Enter your email to receive a reset link</p>
        </div>
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-navy-900">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-300"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600'
              } transition-all duration-300 flex items-center justify-center shadow-md`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : null}
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Back to{' '}
          <Link href="/login" className="text-gold-600 hover:text-gold-700 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
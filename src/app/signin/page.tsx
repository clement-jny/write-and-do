"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { signIn } from '@/services/auth/signIn';
import Link from 'next/link';

export default function SignIn() {
    const { user } = useUser();
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            router.push('/home');
        }
    }, [user, router]);

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await signIn(email, password);
            router.push('/home');
        } catch (error) {
            console.error('Error signing in:', error);
            setError("Error signing in");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleSignIn} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="w-full bg-[#9E1568] text-white p-2 rounded mt-4 hover:bg-[#8b135d]">Sign In</button>
            </form>
            <p className="mt-4">
                Don&apos;t have an account? <Link href="/signup" className="text-[#9E1568] hover:underline">Sign Up</Link>
            </p>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
            });
            router.push('/dashboard');
        } catch (err: unknown) {
            const firebaseError = err as { code?: string; message?: string };
            if (firebaseError.code === 'auth/email-already-in-use') {
                setError('This email is already registered.');
            } else {
                setError(firebaseError.message || 'Failed to create account.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
                        <UserPlus className="h-6 w-6" />
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Join TeamConnect</h1>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                        Experience the next generation of communication
                    </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                    <form className="space-y-5" onSubmit={handleSignup}>
                        {error && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-blue-500/25"
                        >
                            {isLoading ? 'Creating account...' : (
                                <>
                                    Create Account
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-zinc-500 dark:text-zinc-400">Already have an account?</span>{' '}
                        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
                            Sign in
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}

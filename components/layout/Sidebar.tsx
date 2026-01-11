'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutDashboard, MessageSquare, Phone, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useAuth } from '@/context/AuthContext';

import Image from 'next/image';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/call', label: 'Call', icon: Phone },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);
    const { signOut } = useAuth();

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-zinc-200 bg-white md:block dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-full flex-col">
                <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
                    <span className="text-xl font-bold tracking-tight text-blue-600">TeamConnect</span>
                </div>
                <nav className="flex-1 space-y-1 p-4">
                    <Link
                        href="/"
                        className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            pathname === '/' ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                        )}
                    >
                        <Home className="h-5 w-5" />
                        Home
                    </Link>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                pathname.startsWith(item.href)
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="mb-4 flex items-center gap-3 px-2">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold dark:bg-blue-900 dark:text-blue-300 overflow-hidden relative">
                            {user?.photoURL ? (
                                <Image
                                    src={user.photoURL}
                                    alt={user.displayName || 'User profile'}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                (user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'G').toUpperCase()
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                {user ? (user.displayName || user.email?.split('@')[0]) : 'Guest User'}
                            </p>
                            <p className="truncate text-xs text-zinc-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    {user ? (
                        <button
                            onClick={() => signOut()}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-red-950/30"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:text-blue-400 dark:hover:bg-blue-950/30"
                        >
                            <LogOut className="h-5 w-5 rotate-180" />
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </aside>
    );
}

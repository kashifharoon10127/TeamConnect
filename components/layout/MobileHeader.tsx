'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Phone, Home, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/call', label: 'Call', icon: Phone },
];

export function MobileHeader() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const { signOut } = useAuth();

    return (
        <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
            <div className="font-bold text-lg">Team</div>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                <Menu className="h-6 w-6" />
            </button>

            {isOpen && (
                <div className="absolute left-0 top-16 w-full border-b border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
                    <nav className="flex flex-col space-y-2">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                                pathname === '/' ? "bg-zinc-100 dark:bg-zinc-800" : "text-zinc-500"
                            )}
                        >
                            <Home className="h-5 w-5" />
                            Home
                        </Link>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                                    pathname.startsWith(item.href)
                                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                                        : "text-zinc-500 dark:text-zinc-400"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
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
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-red-950/30"
                            >
                                <LogOut className="h-5 w-5" />
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:text-blue-400 dark:hover:bg-blue-950/30"
                            >
                                <LogOut className="h-5 w-5 rotate-180" />
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

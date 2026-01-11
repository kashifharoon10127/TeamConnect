'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Phone, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/call', label: 'Call', icon: Phone },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-zinc-200 bg-white md:block dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-full flex-col">
                <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
                    <span className="text-xl font-bold tracking-tight">Ag.</span>
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
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                        <div className="overflow-hidden">
                            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">User (Demo)</p>
                            <p className="truncate text-xs text-zinc-500">user@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

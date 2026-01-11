'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Phone, Home, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/call', label: 'Call', icon: Phone },
];

export function MobileHeader() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
            <div className="font-bold text-lg">Ag.</div>
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
                </div>
            )}
        </div>
    );
}

'use client';

import { User } from '@/services/api';
import { X, MapPin, Globe, Phone, Mail, Briefcase } from 'lucide-react';
import { useEffect } from 'react';

import Image from 'next/image';

interface UserDetailsModalProps {
    user: User | null;
    onClose: () => void;
}

export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (user) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [user, onClose]);

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-zinc-900 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="border-b border-zinc-200 p-4 flex items-center justify-between dark:border-zinc-800">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">User Details</h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <X className="h-5 w-5 text-zinc-500" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-3xl mb-3 dark:bg-blue-900 dark:text-blue-300 overflow-hidden relative border-4 border-white shadow-md dark:border-zinc-800">
                            <Image
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128`}
                                alt={user.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{user.name}</h3>
                        <p className="text-sm text-zinc-500">@{user.name.replace(/\s/g, '').toLowerCase()}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-zinc-400" />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-zinc-400" />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-zinc-400" />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">{user.company.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-zinc-400" />
                            <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                {user.website}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-zinc-400" />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">City ID: {user.id} (Mock Loc)</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-200 p-4 bg-zinc-50 rounded-b-2xl flex justify-end dark:border-zinc-800 dark:bg-zinc-900/50">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                        Close
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    );
}

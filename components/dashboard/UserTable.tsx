'use client';

import { useState } from 'react';
import { User } from '@/services/api';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface UserTableProps {
    initialUsers: User[];
}

export function UserTable({ initialUsers }: UserTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredUsers = initialUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full rounded-lg border border-zinc-200 pl-10 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium">Company</th>
                            <th className="px-6 py-4 font-medium">Phone</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs dark:bg-blue-900 dark:text-blue-300">
                                            {user.name.charAt(0)}
                                        </div>
                                        {user.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{user.email}</td>
                                <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{user.company.name}</td>
                                <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{user.phone}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-400/10 dark:text-green-400">
                                        Active
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {currentUsers.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 disabled:opacity-50 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 disabled:opacity-50 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

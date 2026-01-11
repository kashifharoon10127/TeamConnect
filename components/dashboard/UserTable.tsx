'use client';

import { useState } from 'react';
import { User } from '@/services/api';
import { ChevronLeft, ChevronRight, Search, Eye, Phone, MoreHorizontal, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { UserDetailsModal } from './UserDetailsModal';

interface UserTableProps {
    initialUsers: User[];
}

export function UserTable({ initialUsers }: UserTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const itemsPerPage = 10;

    // Mock status for demo purposes, since JSONPlaceholder doesn't have it
    // In a real app, this would come from the API
    const getUsersWithStatus = (users: User[]) => {
        return users.map(u => ({
            ...u,
            status: u.id % 2 === 0 ? 'active' : 'inactive' 
        }));
    };

    const usersWithStatus = getUsersWithStatus(initialUsers);

    const filteredUsers = usersWithStatus.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />

            <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex flex-col gap-4 border-b border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full rounded-lg border border-zinc-200 pl-10 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                        />
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-zinc-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value as 'all' | 'active' | 'inactive'); setCurrentPage(1); }}
                            className="rounded-lg border border-zinc-200 py-2 pl-2 pr-8 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    <table className="w-full text-left text-sm relative">
                        <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400 sticky top-0 z-10 backdrop-blur-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium bg-zinc-50 dark:bg-zinc-900">Name</th>
                                <th className="px-6 py-4 font-medium bg-zinc-50 dark:bg-zinc-900">Email</th>
                                <th className="px-6 py-4 font-medium bg-zinc-50 dark:bg-zinc-900">Company</th>
                                <th className="px-6 py-4 font-medium bg-zinc-50 dark:bg-zinc-900">Status</th>
                                <th className="px-6 py-4 font-medium text-right bg-zinc-50 dark:bg-zinc-900">Actions</th>
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
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                            user.status === 'active'
                                                ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400"
                                                : "bg-zinc-50 text-zinc-700 ring-zinc-600/20 dark:bg-zinc-400/10 dark:text-zinc-400"
                                        )}>
                                            {user.status === 'active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Tooltip Group */}
                                            <div className="group/tooltip relative">
                                                <button
                                                    onClick={() => setSelectedUser(user)}
                                                    className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-blue-600 dark:hover:bg-zinc-800"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100">
                                                    View Details
                                                </span>
                                            </div>

                                            <div className="group/tooltip relative">
                                                <Link href="/call">
                                                    <button className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-green-600 dark:hover:bg-zinc-800">
                                                        <Phone className="h-4 w-4" />
                                                    </button>
                                                </Link>
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100">
                                                    Call User
                                                </span>
                                            </div>

                                            <div className="group/tooltip relative">
                                                <button className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100">
                                                    More
                                                </span>
                                            </div>
                                        </div>
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
        </>
    );
}

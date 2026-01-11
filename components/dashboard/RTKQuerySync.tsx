'use client';

import { useGetUsersQuery } from '@/store/api/dashboardApi';
import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export function RTKQuerySync() {
    const { data, isLoading, isFetching, refetch } = useGetUsersQuery();
    const [lastSync, setLastSync] = useState<string>('Just now');

    useEffect(() => {
        setLastSync(new Date().toLocaleTimeString());
    }, [data]);

    return (
        <div className="flex items-center gap-3 rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
            {isFetching ? (
                <RefreshCw className="h-3 w-3 animate-spin text-blue-500" />
            ) : (
                <div className="h-2 w-2 rounded-full bg-green-500" />
            )}
            <span className="hidden sm:inline"> Synced: {lastSync}</span>
            <button
                onClick={() => refetch()}
                className="ml-1 hover:text-blue-500 transition-colors underline decoration-dotted cursor-pointer"
                title="Force Refresh Cache"
            >
                Refresh
            </button>
        </div>
    );
}

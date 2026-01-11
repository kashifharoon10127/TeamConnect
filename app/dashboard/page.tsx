import { getUsers, getRecentMessages, getCallLogs } from '@/services/api';
import { StatCard } from '@/components/dashboard/StatCard';
import { UserTable } from '@/components/dashboard/UserTable';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Users, Activity, DollarSign, MessageCircle } from 'lucide-react';
import { Suspense } from 'react';
import { RTKQuerySync } from '@/components/dashboard/RTKQuerySync';

function DashboardSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                ))}
            </div>
            <div className="h-64 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-96 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
    );
}

async function DashboardContent() {
    // Fetch all dashboard data 
    const [users, messages, calls] = await Promise.all([
        getUsers(),
        getRecentMessages(),
        getCallLogs()
    ]);

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total Users"
                    value={users.length.toString()}
                    icon={Users}
                    trend="12%"
                    trendUp={true}
                />
                <StatCard
                    label="Active Sessions"
                    value="1,204"
                    icon={Activity}
                    trend="4%"
                    trendUp={true}
                />
                <StatCard
                    label="Revenue"
                    value="$45,231"
                    icon={DollarSign}
                    trend="2%"
                    trendUp={false}
                />
                <StatCard
                    label="New Messages"
                    value="342"
                    icon={MessageCircle}
                    trend="8%"
                    trendUp={true}
                />
            </div>

            <RecentActivity messages={messages} calls={calls} />

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Users</h2>
                <UserTable initialUsers={users} />
            </div>
        </>
    );
}

export default function DashboardPage() {
    return (
        <div className="space-y-6 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Dashboard Overview</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Welcome back! Here is what is happening today.</p>
                </div>
                <div className="hidden sm:block">
                    <RTKQuerySync />
                </div>
            </div>

            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent />
            </Suspense>
        </div>
    );
}

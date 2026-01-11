import { getUsers } from '@/services/api';
import { StatCard } from '@/components/dashboard/StatCard';
import { UserTable } from '@/components/dashboard/UserTable';
import { Users, Activity, DollarSign, MessageCircle } from 'lucide-react';

export default async function DashboardPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6 p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Dashboard Overview</h1>
                <div className="text-sm text-zinc-500">Last updated: Just now</div>
            </div>

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

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Users</h2>
                <UserTable initialUsers={users} />
            </div>
        </div>
    );
}

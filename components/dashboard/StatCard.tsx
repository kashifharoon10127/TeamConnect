import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export function StatCard({ label, value, icon: Icon, trend, trendUp }: StatCardProps) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
                    <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
                </div>
                <div className="rounded-full bg-blue-50 p-3 dark:bg-blue-900/20">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center gap-2">
                    <span className={cn("text-sm font-medium", trendUp ? "text-green-600" : "text-red-600")}>
                        {trendUp ? "+" : ""}{trend}
                    </span>
                    <span className="text-xs text-zinc-500">from last month</span>
                </div>
            )}
        </div>
    );
}

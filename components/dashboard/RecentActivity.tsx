import { MessageSquare, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';
import { RecentMessage, CallLog } from '@/services/api';

interface RecentActivityProps {
    messages: RecentMessage[];
    calls: CallLog[];
}

export function RecentActivity({ messages, calls }: RecentActivityProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Messages */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Recent Messages</h3>
                    <span className="text-xs text-blue-600 hover:underline cursor-pointer font-medium">View All</span>
                </div>
                <div className="h-80 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    {messages.map(msg => (
                        <div key={msg.id} className="flex items-start gap-3 group/item">
                            <div className="mt-1 rounded-full bg-blue-100 p-2 dark:bg-blue-900/20 group-hover/item:scale-110 transition-transform shrink-0">
                                <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{msg.user}</p>
                                <p className="text-xs text-zinc-500 line-clamp-1 dark:text-zinc-400">{msg.text}</p>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-medium shrink-0">{msg.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Calls */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Call Log</h3>
                    <span className="text-xs text-blue-600 hover:underline cursor-pointer font-medium">View All</span>
                </div>
                <div className="h-80 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    {calls.map(call => (
                        <div key={call.id} className="flex items-center gap-3 group/item">
                            <div className="mt-1 rounded-full bg-zinc-100 p-2 dark:bg-zinc-900 group-hover/item:bg-zinc-200 dark:group-hover/item:bg-zinc-800 transition-colors shrink-0">
                                {call.type === 'incoming' && <PhoneIncoming className="h-4 w-4 text-green-600" />}
                                {call.type === 'outgoing' && <PhoneOutgoing className="h-4 w-4 text-blue-600" />}
                                {call.type === 'missed' && <PhoneMissed className="h-4 w-4 text-red-600" />}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{call.user}</p>
                                <p className="text-xs text-zinc-500 capitalize dark:text-zinc-400">{call.type} • <span className="text-zinc-400">{call.duration}</span></p>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-medium shrink-0">{call.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

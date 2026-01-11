'use client';

import { ChatProvider } from '@/context/ChatContext';
import dynamic from 'next/dynamic';

const ChatInterface = dynamic(() => import('@/components/chat/ChatInterface').then(mod => mod.ChatInterface), {
    loading: () => <div className="h-full w-full flex items-center justify-center bg-white dark:bg-zinc-950 animate-pulse">Loading Chat...</div>,
    ssr: false // Chat relies on window/browser APIs for Firebase/WebSockets
});

export default function ChatPage() {
    return (
        <ChatProvider>
            <div className="h-screen bg-zinc-50 dark:bg-zinc-950 md:p-4">
                <ChatInterface />
            </div>
        </ChatProvider>
    );
}

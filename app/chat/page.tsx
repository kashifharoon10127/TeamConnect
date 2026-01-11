import { ChatProvider } from '@/context/ChatContext';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
    return (
        <ChatProvider>
            <div className="h-screen bg-zinc-50 dark:bg-zinc-950 md:p-4">
                <ChatInterface />
            </div>
        </ChatProvider>
    );
}

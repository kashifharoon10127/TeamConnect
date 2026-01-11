'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
}

export interface Contact {
    id: string;
    name: string;
    avatar: string;
    lastMessage?: string;
    unreadCount?: number;
    status: 'online' | 'offline';
}

interface ChatContextType {
    activeContactId: string | null;
    setActiveContactId: (id: string | null) => void;
    contacts: Contact[];
    messages: Record<string, Message[]>;
    sendMessage: (text: string) => void;
    currentUser: { id: string; name: string };
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_CONTACTS: Contact[] = [
    { id: '1', name: 'Alice Johnson', avatar: 'A', status: 'online', lastMessage: 'Hey, how are you?' },
    { id: '2', name: 'Bob Smith', avatar: 'B', status: 'offline', lastMessage: 'Can we schedule a call?' },
    { id: '3', name: 'Charlie Brown', avatar: 'C', status: 'online', lastMessage: 'Project files attached.' },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
    '1': [
        { id: 'm1', senderId: '1', text: 'Hey, how are you?', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
    ],
    '2': [
        { id: 'm2', senderId: '2', text: 'Can we schedule a call?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    ],
    '3': [],
};

export function ChatProvider({ children }: { children: ReactNode }) {
    const [activeContactId, setActiveContactId] = useState<string | null>('1');
    const [contacts, setContacts] = useState(INITIAL_CONTACTS);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);

    const currentUser = { id: 'me', name: 'You' };

    const sendMessage = (text: string) => {
        if (!activeContactId) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            text,
            timestamp: new Date(),
        };

        setMessages(prev => ({
            ...prev,
            [activeContactId]: [...(prev[activeContactId] || []), newMessage]
        }));

        // Simulate reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                senderId: activeContactId,
                text: `This is an automated reply. I'm currently away but I got your message: "${text}"`,
                timestamp: new Date(),
            };
            setMessages(prev => ({
                ...prev,
                [activeContactId]: [...(prev[activeContactId] || []), reply]
            }));
        }, 2000);
    };

    return (
        <ChatContext.Provider value={{ activeContactId, setActiveContactId, contacts, messages, sendMessage, currentUser }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChat must be used within ChatProvider');
    return context;
}

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '@/lib/firebase';
import { ref, push, onValue, serverTimestamp, remove } from 'firebase/database';
import { useAuth } from './AuthContext';

export interface Message {
    id: string;
    senderId: string;
    senderName?: string;
    text: string;
    timestamp: number;
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
    clearMessages: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Contacts will be loaded from Firebase now

export function ChatProvider({ children }: { children: ReactNode }) {
    const [activeContactId, setActiveContactId] = useState<string | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const { user } = useAuth();

    // Load all users as contacts
    useEffect(() => {
        if (!user) return;
        const usersRef = ref(db, 'users');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedContacts: Contact[] = Object.values(data)
                    .filter((u: any) => u.uid !== user.uid)
                    .map((u: any) => ({
                        id: u.uid,
                        name: u.displayName || u.email?.split('@')[0] || 'Unknown User',
                        avatar: (u.displayName?.charAt(0) || u.email?.charAt(0) || 'U').toUpperCase(),
                        status: (Date.now() - u.lastSeen < 300000) ? 'online' : 'offline'
                    }));
                setContacts(loadedContacts);
            }
        });
        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        if (!activeContactId || !user) return;

        // Create a unique chat ID based on participants
        const chatId = [user.uid, activeContactId].sort().join('_');
        const messagesRef = ref(db, `messages/${chatId}`);

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedMessages = Object.entries(data).map(([key, val]: [string, any]) => ({
                    id: key,
                    ...val,
                }));
                setMessages(prev => ({
                    ...prev,
                    [activeContactId]: loadedMessages
                }));
            } else {
                setMessages(prev => ({ ...prev, [activeContactId]: [] })); // Clear if empty
            }
        });

        return () => unsubscribe();
    }, [activeContactId, user]);

    const sendMessage = async (text: string) => {
        if (!activeContactId || !user) return;

        const chatId = [user.uid, activeContactId].sort().join('_');
        const messagesRef = ref(db, `messages/${chatId}`);

        await push(messagesRef, {
            senderId: user.uid,
            senderName: user.displayName || user.email?.split('@')[0] || 'Unknown',
            text,
            timestamp: serverTimestamp(),
        });
    };

    const clearMessages = async () => {
        if (!activeContactId || !user) return;
        const chatId = [user.uid, activeContactId].sort().join('_');
        const messagesRef = ref(db, `messages/${chatId}`);
        await remove(messagesRef);
    };

    return (
        <ChatContext.Provider value={{ activeContactId, setActiveContactId, contacts, messages, sendMessage, clearMessages }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChat must be used within ChatProvider');
    return context;
}

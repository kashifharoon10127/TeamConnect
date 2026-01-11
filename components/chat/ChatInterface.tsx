'use client';

import { useChat } from '@/context/ChatContext';
import { cn } from '@/lib/utils';
import { Search, Send, Phone, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

export function ChatInterface() {
    const { contacts, activeContactId, setActiveContactId, messages, sendMessage, currentUser } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeContact = contacts.find(c => c.id === activeContactId);
    const activeMessages = activeContactId ? (messages[activeContactId] || []) : [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeMessages]);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 m-4">
            {/* Sidebar List */}
            <div className="w-80 border-r border-zinc-200 flex flex-col bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input type="text" placeholder="Search chats" className="w-full rounded-lg bg-white border border-zinc-200 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.map(contact => (
                        <button
                            key={contact.id}
                            onClick={() => setActiveContactId(contact.id)}
                            className={cn(
                                "flex w-full items-center gap-3 p-4 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                activeContactId === contact.id && "bg-blue-50 hover:bg-blue-50 dark:bg-blue-900/20 dark:hover:bg-blue-900/20"
                            )}
                        >
                            <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-zinc-700 dark:text-zinc-300">
                                    {contact.avatar}
                                </div>
                                {contact.status === 'online' && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-zinc-900" />}
                            </div>
                            <div className="flex-1 text-left overflow-hidden">
                                <p className="font-medium truncate text-zinc-900 dark:text-zinc-50">{contact.name}</p>
                                <p className="text-xs text-zinc-500 truncate">{contact.lastMessage}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950">
                {activeContact ? (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-zinc-700 dark:text-zinc-300">
                                    {activeContact.avatar}
                                </div>
                                <div>
                                    <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">{activeContact.name}</h2>
                                    <span className="flex items-center gap-1 text-xs text-green-600">
                                        {activeContact.status === 'online' ? <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> : <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />}
                                        {activeContact.status === 'online' ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href="/call">
                                    <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-blue-600 dark:hover:bg-zinc-800">
                                        <Phone className="h-5 w-5" />
                                    </button>
                                </Link>
                                <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/30 dark:bg-zinc-900/20">
                            {activeMessages.map((msg) => {
                                const isMe = msg.senderId === 'me';
                                return (
                                    <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                                        <div className={cn(
                                            "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm",
                                            isMe
                                                ? "bg-blue-600 text-white rounded-tr-none"
                                                : "bg-white text-zinc-900 rounded-tl-none border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50"
                                        )}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={cn("mt-1 text-[10px]", isMe ? "text-blue-100" : "text-zinc-400")}>
                                                {format(new Date(msg.timestamp), 'h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                                <button className="text-zinc-400 hover:text-zinc-600">
                                    <Paperclip className="h-5 w-5" />
                                </button>
                                <input
                                    className="flex-1 bg-transparent text-sm outline-none dark:text-zinc-50 placeholder:text-zinc-400"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button className="text-zinc-400 hover:text-zinc-600">
                                    <Smile className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center text-zinc-400">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type CallStatus = 'ringing' | 'connected' | 'ended';

export function CallInterface() {
    const router = useRouter();
    const [status, setStatus] = useState<CallStatus>('ringing');
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);

    useEffect(() => {
        // Simulate connection after 3 seconds
        if (status === 'ringing') {
            const timer = setTimeout(() => {
                setStatus('connected');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    useEffect(() => {
        // Timer
        let interval: NodeJS.Timeout;
        if (status === 'connected') {
            interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const handleEndCall = () => {
        setStatus('ended');
        setTimeout(() => {
            router.push('/chat');
        }, 1500);
    };

    const formatDuration = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex h-[calc(100vh-2rem)] flex-col items-center justify-center bg-black rounded-3xl m-4 overflow-hidden relative">
            {/* Video Placeholder / Big User Avatar */}
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                {isVideoOn ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-zinc-900 flex items-center justify-center">
                        <span className="text-white/20 text-9xl select-none font-bold tracking-widest opacity-30">VIDEO</span>
                    </div>
                ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-zinc-800 text-zinc-500">
                        <User className="h-16 w-16" />
                    </div>
                )}
            </div>

            {/* Overlay Info */}
            <div className="absolute top-10 flex flex-col items-center gap-4 z-10 transition-all duration-500" style={{ transform: status === 'ended' ? 'scale(0.8) translateY(20px)' : 'none', opacity: status === 'ended' ? 0.5 : 1 }}>
                <div className="h-24 w-24 rounded-full border-4 border-white/10 bg-zinc-800 overflow-hidden shadow-2xl">
                    {/* Small avatar of other person */}
                    <div className="flex h-full w-full items-center justify-center bg-blue-600 text-white font-bold text-3xl">
                        A
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white shadow-black drop-shadow-md">Alice Johnson</h2>
                    <p className="mt-1 text-lg text-white/80 font-medium tracking-wide">
                        {status === 'ringing' && <span className="animate-pulse">Calling...</span>}
                        {status === 'connected' && formatDuration(duration)}
                        {status === 'ended' && <span className="text-red-400">Call Ended</span>}
                    </p>
                </div>
            </div>

            {/* Controls */}
            {status !== 'ended' && (
                <div className="absolute bottom-10 flex items-center gap-6 z-10 animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={cn("rounded-full p-4 transition-all backdrop-blur-md", isMuted ? "bg-white text-black" : "bg-zinc-800/60 text-white hover:bg-zinc-700/80")}
                    >
                        {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </button>
                    <button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className={cn("rounded-full p-4 transition-all backdrop-blur-md", !isVideoOn ? "bg-white text-black" : "bg-zinc-800/60 text-white hover:bg-zinc-700/80")}
                    >
                        {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                    </button>
                    <button
                        onClick={handleEndCall}
                        className="rounded-full bg-red-600 p-4 text-white hover:bg-red-700 transition-all shadow-lg hover:scale-105 active:scale-95"
                    >
                        <PhoneOff className="h-6 w-6" />
                    </button>
                </div>
            )}
        </div>
    );
}

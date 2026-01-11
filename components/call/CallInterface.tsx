'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import Image from 'next/image';

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
            router.push('/dashboard'); 
        }, 1500);
    };

    const formatDuration = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-black overflow-hidden relative">
            {/* Background Video Mock (Large) */}
            <div className="absolute inset-0 bg-zinc-900">
                {isVideoOn && status === 'connected' ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black">
                        <Image
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
                            alt="Video Call Background"
                            fill
                            className="object-cover opacity-60 grayscale-[20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                    </div>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="h-40 w-40 rounded-full bg-blue-600/20 animate-pulse border-2 border-blue-500/30 flex items-center justify-center">
                            <User className="h-20 w-20 text-blue-500/50" />
                        </div>
                    </div>
                )}
            </div>

            {/* Self Camera Mirror (PIP) */}
            {status === 'connected' && (
                <div className="absolute top-6 right-6 h-48 w-36 rounded-2xl bg-zinc-800 border-2 border-zinc-700/50 overflow-hidden shadow-2xl z-20">
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                        <Image
                            src="https://ui-avatars.com/api/?name=You&background=020617&color=fff&size=512"
                            alt="Self Preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {isMuted && (
                        <div className="absolute bottom-2 right-2 p-1 bg-red-600 rounded-full text-white">
                            <MicOff className="h-3 w-3" />
                        </div>
                    )}
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white/70 bg-black/40 px-1.5 py-0.5 rounded">You</span>
                </div>
            )}

            {/* Overlay Info */}
            <div className="flex flex-col items-center gap-6 z-10 transition-all duration-500 mb-24"
                style={{ transform: status === 'ended' ? 'scale(0.8) translateY(20px)' : 'none', opacity: status === 'ended' ? 0.0 : 1 }}>

                <div className="relative">
                    <div className="h-32 w-32 rounded-full border-4 border-white/20 bg-zinc-800 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <Image
                            src="https://ui-avatars.com/api/?name=Alice+Johnson&background=2563eb&color=fff&size=256"
                            alt="Recipient"
                            fill
                        />
                    </div>
                    {status === 'ringing' && (
                        <div className="absolute -inset-4 rounded-full border-4 border-blue-500 animate-ping opacity-20" />
                    )}
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Alice Johnson</h2>
                    <div className="mt-2 flex items-center justify-center gap-2">
                        {status === 'ringing' ? (
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" />
                                <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Ringing...</span>
                            </div>
                        ) : (
                            <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white font-mono font-bold tracking-tighter">
                                {formatDuration(duration)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Call Ended Message */}
            {status === 'ended' && (
                <div className="z-10 animate-in fade-in zoom-in text-center">
                    <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/50">
                        <PhoneOff className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Call Ended</h2>
                    <p className="text-white/50 text-sm mt-1">Duration: {formatDuration(duration)}</p>
                </div>
            )}

            {/* Controls */}
            {status !== 'ended' && (
                <div className="absolute bottom-12 flex items-center gap-8 z-10 animate-in slide-in-from-bottom-10 fade-in duration-700">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={cn("flex flex-col items-center gap-2 group")}
                    >
                        <div className={cn(
                            "rounded-full p-5 transition-all duration-300 backdrop-blur-xl border border-white/10",
                            isMuted ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "bg-white/10 text-white hover:bg-white/20"
                        )}>
                            {isMuted ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">{isMuted ? 'Unmute' : 'Mute'}</span>
                    </button>

                    <button
                        onClick={handleEndCall}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="rounded-full bg-red-600 p-8 text-white hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-110 active:scale-90 border-4 border-red-500/30">
                            <PhoneOff className="h-9 w-9" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-red-500">End Call</span>
                    </button>

                    <button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={cn(
                            "rounded-full p-5 transition-all duration-300 backdrop-blur-xl border border-white/10",
                            !isVideoOn ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "bg-white/10 text-white hover:bg-white/20"
                        )}>
                            {isVideoOn ? <Video className="h-7 w-7" /> : <VideoOff className="h-7 w-7" />}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">{isVideoOn ? 'Video Off' : 'Video On'}</span>
                    </button>
                </div>
            )}
        </div>
    );
}

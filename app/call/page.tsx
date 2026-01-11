'use client';

import dynamic from 'next/dynamic';

const CallInterface = dynamic(() => import('@/components/call/CallInterface').then(mod => mod.CallInterface), {
    loading: () => <div className="h-screen w-screen flex items-center justify-center bg-zinc-900 text-white animate-pulse">Initializing Call Interface...</div>,
    ssr: false
});

export default function CallPage() {
    return <CallInterface />;
}

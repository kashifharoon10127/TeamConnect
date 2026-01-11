import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 p-6 text-center dark:bg-zinc-950">
            <div className="max-w-md space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Next.js Dashboard Suite
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    A comprehensive demo featuring a Data Dashboard, Real-time Chat Simulation, and Video Call Interface.
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                    href="/dashboard"
                    className="group flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                    href="/chat"
                    className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                >
                    Open Chat
                </Link>
            </div>
        </div>
    );
}

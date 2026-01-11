import Link from "next/link";
import { ArrowRight, Sparkles, LayoutDashboard, MessageSquare, Phone, ShieldCheck, Zap, Globe } from "lucide-react";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* Navigation Header */}
            <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">TeamConnect</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                        Sign In
                    </Link>
                    <Link href="/signup" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 shadow-md">
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 text-center pb-24 max-w-7xl mx-auto w-full">
                <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3.5 py-1 text-[11px] font-semibold text-primary/80 uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 fill-primary/80" />
                    Trusted by Global Enterprise Teams
                </div>

                <div className="max-w-4xl space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:leading-[1.2]">
                        Streamline your workflow with <br />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Integrated Intelligence</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed">
                        A high-performance workspace designed for seamless collaboration. Monitor global operations, engage in real-time discussions, and scale your connectivity—all in one secure platform.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:opacity-90 active:scale-[0.98]"
                    >
                        Enter Workspace
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Features Grid */}
                <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 w-full">
                    {[
                        { icon: LayoutDashboard, title: "Operational Intelligence", desc: "Gain deep insights with real-time data visualization and interactive filtering." },
                        { icon: MessageSquare, title: "Unified Messaging", desc: "Collaborate instantly across distributed teams with persistent, low-latency communication." },
                        { icon: Globe, title: "Global Connectivity", desc: "Built on high-availability infrastructure to support heavy enterprise-level workloads." }
                    ].map((feature, i) => (
                        <div key={i} className="group relative rounded-2xl border border-border bg-card p-8 text-left transition-all hover:border-primary/20 hover:shadow-md dark:bg-zinc-900/40">
                            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                <feature.icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-bold">{feature.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

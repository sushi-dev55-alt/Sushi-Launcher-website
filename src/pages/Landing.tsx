import { Download, Zap, Shield, Layout, Eye, Sparkles, ArrowRight, Github, MessageCircle } from 'lucide-react'
import { Typewriter } from '@/components/ui/typewriter-text'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { Globe } from '@/components/ui/globe'
import { GradientMenu } from '@/components/ui/gradient-button'
import { Link } from 'react-router-dom'

export function Landing() {
    return (
        <>
            {/* Hero Section */}
            <section className="container mx-auto px-4 flex-grow flex flex-col items-center justify-center py-20 text-center relative min-h-[calc(100vh-64px)]">
                <Link to="/releases" className="group rounded-full border border-pink-500/30 bg-pink-500/5 backdrop-blur-sm text-base transition-all ease-in hover:cursor-pointer hover:bg-pink-500/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 text-pink-400 transition ease-out hover:text-pink-300 hover:duration-300" shimmerWidth={150}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        <span>Version 0.3.0 Coming Soon</span>
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                </Link>

                <h1 className="font-display font-black text-5xl md:text-8xl mb-6 tracking-tight bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,77,157,0.3)] min-h-[1.2em] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    <Typewriter
                        text={["Next Gen Launcher", "Pixel Perfect", "Ultra Fast"]}
                        speed={100}
                        loop={true}
                        cursor="|"
                    />
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Experience gaming like never before. With 29k+ games and growing, Sushi Launcher is the ultimate destination for seamless entertainment.
                </p>

                <div className="flex flex-wrap justify-center gap-6 items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <GradientMenu
                        items={[
                            {
                                title: 'Download',
                                icon: <Download className="w-6 h-6" />,
                                href: 'https://github.com/sushi-dev55/Sushi-Launcher/releases/latest',
                                gradientFrom: '#ff4d9d',
                                gradientTo: '#ff8dc7',
                            },
                            {
                                title: 'Source',
                                icon: <Github className="w-6 h-6" />,
                                href: 'https://github.com/sushi-dev55/Sushi-Launcher',
                                gradientFrom: '#8b5cf6',
                                gradientTo: '#a78bfa',
                            },
                            {
                                title: 'Preview',
                                icon: <Eye className="w-6 h-6" />,
                                href: '/preview',
                                gradientFrom: '#06b6d4',
                                gradientTo: '#22d3ee',
                            },
                            {
                                title: 'Discord',
                                icon: <MessageCircle className="w-6 h-6" />,
                                href: 'https://discord.gg/PYgAMs9PU9',
                                gradientFrom: '#5865F2',
                                gradientTo: '#7289da',
                            },
                        ]}
                    />
                </div>
            </section>

            {/* Globe Section */}
            <section id="global" className="container mx-auto px-4 py-24 relative">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Text Content */}
                    <div className="text-center lg:text-left max-w-xl">
                        <h2 className="font-display font-bold text-4xl md:text-6xl mb-4 bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-transparent">
                            Best in the World
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Trusted by gamers across the globe. Join our growing community of players who chose the ultimate launcher experience.
                        </p>
                        <div className="flex items-center justify-center lg:justify-start gap-8">
                            <div className="text-center">
                                <div className="font-display font-black text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-pink-600 mb-2">200+</div>
                                <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">Downloads</div>
                            </div>
                            <div className="text-center">
                                <div className="font-display font-black text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-pink-600 mb-2">10+</div>
                                <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">Countries</div>
                            </div>
                        </div>
                    </div>

                    {/* Globe */}
                    <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square overflow-hidden">
                        <Globe className="relative w-full h-full" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-24 relative">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-4xl mb-4">Why Sushi Launcher?</h2>
                    <p className="text-gray-400">Built for performance, designed for gamers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Zap className="w-8 h-8 text-pink-500" />}
                        title="Lightning Fast"
                        description="Optimized core ensures instant game launches and zero lag performance."
                    />
                    <FeatureCard
                        icon={<Layout className="w-8 h-8 text-pink-500" />}
                        title="Massive Library"
                        description="Access over 29,000 games instantly from a single, unified interface."
                    />
                    <FeatureCard
                        icon={<Shield className="w-8 h-8 text-pink-500" />}
                        title="Secure & Safe"
                        description="Sandboxed environment keeps your system safe while you enjoy your favorite games."
                    />
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="border-t border-pink-500/10 bg-black/40 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatItem number="29k+" label="Games" />
                        <StatItem number="200+" label="Downloads" />
                        <StatItem number="99.9%" label="Uptime" />
                        <StatItem number="4.9/5" label="Rating" />
                    </div>
                </div>
            </section>
        </>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-2xl bg-[#12121a]/80 border border-pink-500/10 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(255,77,157,0.1)] hover:-translate-y-2 transition-all duration-300 group backdrop-blur-sm">
            <div className="mb-6 p-4 rounded-xl bg-pink-500/10 w-fit group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="font-display font-bold text-xl mb-3 group-hover:text-pink-400 transition-colors">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    )
}

function StatItem({ number, label }: { number: string, label: string }) {
    return (
        <div className="text-center">
            <div className="font-display font-black text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">{number}</div>
            <div className="text-pink-500 font-bold uppercase tracking-widest text-xs">{label}</div>
        </div>
    )
}

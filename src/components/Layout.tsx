import { Outlet, Link } from 'react-router-dom'
import { Waves } from '@/components/ui/wave-background'
import { GradientButton } from '@/components/ui/gradient-button'
import { Github, Home, Package, MessageCircle, Heart, Coins, Youtube } from 'lucide-react'

export function Layout() {
    return (
        <div className="relative min-h-screen w-full bg-[#0a0a0f] text-white font-sans selection:bg-pink-500/30 overflow-x-hidden">
            {/* Background Waves - Persistent */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Waves
                    pointerSize={1.5}
                    strokeColor="#ff4d9d"
                    backgroundColor="#0a0a0f"
                    className="w-full h-full opacity-50"
                />
            </div>

            {/* Grid Overlay */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 77, 157, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 77, 157, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow flex flex-col">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-pink-500/20 bg-[#0a0a0f]/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-pink-500/20 group-hover:border-pink-500 transition-colors">
                        <img src="https://raw.githubusercontent.com/sushi-dev55/Sushi-Launcher/main/img%20for%20website.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-wider text-pink-500 group-hover:text-pink-400 transition-colors">SUSHI LAUNCHER</span>
                </Link>

                <div className="hidden md:flex items-center gap-4">
                    <GradientButton
                        title="Home"
                        icon={<Home className="w-5 h-5" />}
                        href="/"
                        gradientFrom="#ff4d9d"
                        gradientTo="#ff8dc7"
                        className="w-[50px] h-[50px] hover:w-[140px]"
                    />
                    <GradientButton
                        title="Releases"
                        icon={<Package className="w-5 h-5" />}
                        href="/releases"
                        gradientFrom="#8b5cf6"
                        gradientTo="#a78bfa"
                        className="w-[50px] h-[50px] hover:w-[150px]"
                    />
                    <GradientButton
                        title="Credits"
                        icon={<Heart className="w-5 h-5" />}
                        href="/credits"
                        gradientFrom="#ef4444"
                        gradientTo="#f87171"
                        className="w-[50px] h-[50px] hover:w-[140px]"
                    />
                    <GradientButton
                        title="Donate"
                        icon={<Coins className="w-5 h-5" />}
                        href="/donate"
                        gradientFrom="#f59e0b"
                        gradientTo="#fbbf24"
                        className="w-[50px] h-[50px] hover:w-[140px]"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <GradientButton
                        title="YouTube"
                        icon={<Youtube className="w-5 h-5" />}
                        href="https://www.youtube.com/watch?v=pjBrwJRbIXs"
                        gradientFrom="#FF0000"
                        gradientTo="#FF4444"
                        className="w-[45px] h-[45px] hover:w-[140px]"
                    />
                    <GradientButton
                        title="Discord"
                        icon={<MessageCircle className="w-5 h-5" />}
                        href="https://discord.gg/PYgAMs9PU9"
                        gradientFrom="#5865F2"
                        gradientTo="#7289da"
                        className="w-[45px] h-[45px] hover:w-[140px]"
                    />
                    <GradientButton
                        title="GitHub"
                        icon={<Github className="w-5 h-5" />}
                        href="https://github.com/sushi-dev55/Sushi-Launcher"
                        gradientFrom="#ff4d9d"
                        gradientTo="#ff8dc7"
                        className="w-[45px] h-[45px] hover:w-[130px]"
                    />
                </div>
            </div>
        </nav>
    )
}

function Footer() {
    return (
        <footer className="border-t border-pink-500/10 bg-[#050508] py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                    <img src="https://raw.githubusercontent.com/sushi-dev55/Sushi-Launcher/main/img%20for%20website.png" className="w-6 h-6 rounded" />
                    <span className="font-display font-bold tracking-wider">Sushi Launcher</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/credits" className="text-gray-400 hover:text-pink-400 transition-colors text-sm font-medium flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Credits
                    </Link>
                    <Link to="/donate" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium flex items-center gap-2">
                        <Coins className="w-4 h-4" />
                        Donate
                    </Link>
                </div>
                <div className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Sushi Dev. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

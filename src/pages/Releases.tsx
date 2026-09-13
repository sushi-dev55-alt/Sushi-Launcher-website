import { Download, ExternalLink, Calendar, CheckCircle2, Star } from 'lucide-react'
import { GradientMenu } from '@/components/ui/gradient-button'

export function Releases() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="font-display font-black text-5xl mb-4 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">Releases</h1>
                <p className="text-gray-400 text-lg">Download the latest version and see what's new.</p>
            </div>

            <div className="space-y-12">
                <ReleaseCard
                    version="V 0.4.0"
                    date="September 13, 2026"
                    isLatest={true}
                    description="This is a big one. Pretty much the whole UI got redone and the launcher is a lot faster. Steam was blocking the launcher for sending too many requests, which is why most games said couldn't load game, so it now uses a different Steam API that doesn't get blocked. Trailers play again too since Steam changed their video format and the old player couldn't handle it."
                    features={[
                        "Whole new design: tall game covers, a featured banner with the actual game logos and one clean top bar instead of 3 stacked ones",
                        "Game pages redone with a big banner, trailers, screenshots, details and system requirements",
                        "Recently viewed games in the sidebar and on home so you can jump back quick",
                        "Library filters (all, installed, not installed) and a play button when you hover a game",
                        "Search the catalogue from any page with Ctrl+K",
                        "Way faster: game info gets saved, catalogue pages load in 1 request instead of 24 and the next page loads before you click it",
                        "Fixed couldn't load game on most games and fixed trailers not playing",
                        "The catalogue shows every game now instead of the first 1000 on repeat",
                        "NSFW games aren't blocked anymore",
                        "Settings cleaned up: SteamTools status, hide Sushi-kun, clear cache"
                    ]}
                    downloadUrl="https://github.com/sushi-dev55/Sushi-Launcher/releases/download/V0.4.0/Sushi.Launcher_0.4.0_x64-setup.exe"
                    githubUrl="https://github.com/sushi-dev55/Sushi-Launcher/releases/tag/V0.4.0"
                />

                <ReleaseCard
                    version="V 0.2.3"
                    date="February 1, 2026"
                    isLatest={false}
                    description="Huge Update! Migrated to Tauri v2 for 20x smaller size and better performance. Fixed loading spinner animations, restored vibrant Update UI, improved badge styling, and cleaned up interface headers. Full backend rewrite in Rust."
                    features={[
                        "Migrated to Tauri v2 (20x smaller size)",
                        "Improved badge styling",
                        "Full backend rewrite in Rust"
                    ]}
                    downloadUrl="https://github.com/sushi-dev55/Sushi-Launcher/releases/tag/V0.2.3"
                />

                <ReleaseCard
                    version="V 0.2.1"
                    date="January 22, 2026"
                    isLatest={false}
                    description="Major feature update! Redesigned Catalogue UI, reworked Library with full .lua games support, in-launcher game downloads and launching, DLC Adder, Credits tab, and Donations tab."
                    features={[
                        "Redesigned Catalogue UI",
                        "Reworked Library with full .lua games support",
                        "In-launcher game downloads and launching",
                        "DLC Adder",
                        "Credits tab",
                        "Donations tab"
                    ]}
                    downloadUrl="https://github.com/sushi-dev55/Sushi-Launcher/releases/tag/V0.2.1"
                />

                <ReleaseCard
                    version="V 0.2.0"
                    date="December 28, 2025"
                    isLatest={false}
                    description="Big update! We've added multi-language support, a brand new Online-Fix tab, auto-update functionality, and the option to restart Steam directly from the launcher. This update makes Sushi Launcher even more powerful!"
                    features={[
                        "Multi-language support",
                        "Online-Fix tab",
                        "Auto-update functionality",
                        "Steam restart option"
                    ]}
                    downloadUrl="https://github.com/sushi-dev55/Sushi-Launcher/releases/tag/V0.2.0"
                />

                <ReleaseCard
                    version="V 0.1.0"
                    date="December 26, 2025"
                    isLatest={false}
                    description="The first official release of Sushi Launcher! We're excited to bring you a fast, sleek, and feature-packed game launcher."
                    features={[
                        "Lightning-fast game launching",
                        "Beautiful, modern UI",
                        "Access to 29k+ games",
                        "Zero telemetry"
                    ]}
                    downloadUrl="https://github.com/sushi-dev55/Sushi-Launcher/releases/tag/Release"
                />
            </div>
        </div>
    )
}

interface ReleaseCardProps {
    version: string
    date: string
    isLatest: boolean
    description: string
    features: string[]
    downloadUrl: string
    githubUrl?: string
}

function ReleaseCard({ version, date, isLatest, description, features, downloadUrl, githubUrl }: ReleaseCardProps) {
    return (
        <div className={`relative p-8 rounded-2xl bg-[#12121a]/80 border ${isLatest ? 'border-pink-500/50 shadow-[0_0_30px_rgba(255,77,157,0.1)]' : 'border-pink-500/10'} hover:border-pink-500/50 transition-all duration-300 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8`}>
            {isLatest && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl" />
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="font-display font-bold text-3xl text-white">{version}</h2>
                    {isLatest ? (
                        <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Latest
                        </span>
                    ) : (
                        <span className="px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/30 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            Previous
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {date}
                </div>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed text-lg">{description}</p>

            <div className="bg-pink-500/5 rounded-xl p-6 mb-8 border border-pink-500/10">
                <h3 className="font-display font-bold text-pink-400 mb-4 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> What's New
                </h3>
                <ul className="grid gap-3">
                    {features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                            <Star className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <GradientMenu
                items={[
                    {
                        title: 'Download',
                        icon: <Download className="w-5 h-5" />,
                        href: downloadUrl,
                        gradientFrom: isLatest ? '#ff4d9d' : '#6b7280',
                        gradientTo: isLatest ? '#ff8dc7' : '#9ca3af',
                    },
                    {
                        title: 'GitHub',
                        icon: <ExternalLink className="w-5 h-5" />,
                        href: githubUrl ?? downloadUrl,
                        gradientFrom: '#8b5cf6',
                        gradientTo: '#a78bfa',
                    },
                ]}
            />
        </div>
    )
}

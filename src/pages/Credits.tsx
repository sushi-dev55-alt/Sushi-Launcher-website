import { AnimatedProfileCard, ProfileCardContent } from '@/components/ui/animated-profile-card';

export function Credits() {
    const sushiData = {
        avatarSrc: 'https://raw.githubusercontent.com/sushi-dev55/Sushi-Launcher/main/9e37f905d09779a7ca55cfb58bb696dd.webp',
        avatarFallback: 'SU',
        name: 'Sushi',
        role: 'Lead Developer',
        bio: 'Frontend, Backend, Full Logic & Code, Website Design. The creator and main developer behind Sushi Launcher.',
    };

    const butData = {
        avatarSrc: 'https://raw.githubusercontent.com/sushi-dev55/Sushi-Launcher/main/252b115bccfa3e1a491c68b6397af93a.webp',
        avatarFallback: 'BU',
        name: 'buthienlenvanoi0406',
        role: 'Contributor',
        bio: 'Frontend contributions, SteamDB integration, MongoDB setup, Steam API key implementation.',
    };

    return (
        <div className="container mx-auto px-4 py-20 max-w-5xl">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="font-display font-black text-5xl mb-4 bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">Credits</h1>
                <p className="text-gray-400 text-lg">The awesome people behind Sushi Launcher</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {/* Sushi - Pink Theme */}
                <AnimatedProfileCard
                    accentColor="#ff4d9d"
                    onAccentForegroundColor="#ffffff"
                    onAccentMutedForegroundColor="rgba(255, 255, 255, 0.9)"
                    baseCard={
                        <ProfileCardContent
                            {...sushiData}
                            variant="default"
                            showAvatar={false}
                        />
                    }
                    overlayCard={
                        <ProfileCardContent
                            {...sushiData}
                            variant="on-accent"
                            showAvatar={true}
                            cardStyle={{ backgroundColor: '#ff4d9d' }}
                        />
                    }
                />

                {/* buthienlenvanoi0406 - Blue Theme */}
                <AnimatedProfileCard
                    accentColor="#5865F2"
                    onAccentForegroundColor="#ffffff"
                    onAccentMutedForegroundColor="rgba(255, 255, 255, 0.9)"
                    baseCard={
                        <ProfileCardContent
                            {...butData}
                            variant="default"
                            showAvatar={false}
                        />
                    }
                    overlayCard={
                        <ProfileCardContent
                            {...butData}
                            variant="on-accent"
                            showAvatar={true}
                            cardStyle={{ backgroundColor: '#5865F2' }}
                        />
                    }
                />
            </div>
        </div>
    );
}

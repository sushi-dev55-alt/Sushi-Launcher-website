import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { CircularCarousel } from '@/components/ui/circular-carousel'

export function Preview() {
    return (
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <div className="flex flex-col items-center justify-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/5 backdrop-blur-sm text-pink-400 text-xs font-bold tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                                New Version 2.0 Released
                            </div>
                            <h1 className="text-5xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-pink-500 drop-shadow-[0_0_30px_rgba(255,77,157,0.3)] mb-4">
                                Sushi Launcher <br />
                                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-white">
                                    Ultimate Gaming
                                </span>
                            </h1>
                        </div>
                    </>
                }
            >
                <CircularCarousel
                    images={[
                        "https://raw.githubusercontent.com/sushi-dev55/Sushi-Launcher/main/image_2025-12-26_153129534.png",
                        "https://raw.githubusercontent.com/sushi-dev55/Sushi-Launcher/main/image_2025-12-26_155338006.png",
                        "https://raw.githubusercontent.com/sushi-dev55/Sushi-Launcher/main/image_2025-12-26_155651394.png"
                    ]}
                />
            </ContainerScroll>
        </div>
    )
}

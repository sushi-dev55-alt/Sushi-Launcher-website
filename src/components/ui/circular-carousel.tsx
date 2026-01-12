import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CircularCarouselProps {
    images: string[];
    className?: string;
}

export const CircularCarousel = ({ images, className }: CircularCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className={cn("relative w-full h-full flex items-center justify-center bg-black/50 group", className)}>
            <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-contain pointer-events-none"
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 translate-y-1/2 bottom-1/2"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 translate-y-1/2 bottom-1/2"
                aria-label="Next Slide"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all border border-white/50",
                            index === currentIndex ? "bg-white scale-110" : "bg-transparent hover:bg-white/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

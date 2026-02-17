import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageViewerProps {
    images: string[];
    initialIndex?: number;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ images, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="h-full w-full bg-black/95 flex items-center justify-center relative">
            <img 
                src={images[currentIndex]} 
                alt={`Imagen ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
            />
            
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-transparent border-2 border-cyan-400/80 hover:bg-cyan-400/20 text-cyan-300 p-2 sm:p-3 rounded-full transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    
                    <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-transparent border-2 border-cyan-400/80 hover:bg-cyan-400/20 text-cyan-300 p-2 sm:p-3 rounded-full transition-all"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>

                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 bg-black/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-white/80 text-xs sm:text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
};

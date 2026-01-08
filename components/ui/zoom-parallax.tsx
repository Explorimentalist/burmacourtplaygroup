'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
    src: string;
    alt?: string;
    className?: string;
    gridArea?: string; // e.g., "1 / 1 / 3 / 3" for row start/col start/row end/col end
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface ZoomParallaxProps {
    images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    // Single scale transform for the entire grid
    const gridScale = useTransform(scrollYProgress, [0, 1], [1, 4]);

    // Let images fill their grid cells completely
    const getSizeClasses = () => {
        return 'h-full w-full'; // Fill the entire grid cell
    };

    return (
        <div ref={container} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* CSS Grid Container with unified scale */}
                <motion.div 
                    style={{ scale: gridScale }}
                    className="grid grid-cols-12 grid-rows-10 gap-4 h-full w-full max-w-[1440px] mx-auto p-6"
                >
                    {images.map(({ src, alt, gridArea, size = 'md', className }, index) => {
                        return (
                            <div
                                key={index}
                                style={{ 
                                    zIndex: images.length - index,
                                    gridArea: gridArea || 'auto' // Use gridArea prop or auto-placement
                                }}
                                className={`relative ${className || ''}`}
                            >
                                <div className={`relative bg-transparent ${getSizeClasses()}`}>
                                    <img
                                        src={src || '/placeholder.svg'}
                                        alt={alt || `Parallax image ${index + 1}`}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
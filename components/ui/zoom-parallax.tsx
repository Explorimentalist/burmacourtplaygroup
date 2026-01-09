'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
    const [isMobile, setIsMobile] = useState(false);
    
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    // Single scale transform for the entire grid
    const gridScale = useTransform(scrollYProgress, [0, 1], [1, 4]);

    // Let images fill their grid cells completely
    const getSizeClasses = () => {
        return 'w-full'; // Fill the entire grid cell width
    };

    // Mobile-only grid area calculation - preserves original desktop gridArea
    const getMobileGridArea = (gridArea: string | undefined, isUpsideDownPlay: boolean, isKidsInGarden: boolean, isKidWithPaint: boolean, isActivityAtTable: boolean, isLastPicture: boolean) => {
        // Desktop: Always use original gridArea (preserves existing 12-column positioning)
        if (!isMobile) {
            return gridArea || 'auto';
        }
        
        // Mobile: 4-column grid positioning
        if (isUpsideDownPlay) {
            return 'auto / 2 / auto / 5'; // Column 2, spanning 3 columns
        }
        if (isKidsInGarden) {
            return '3 / 1 / auto / 3'; // Row 3, Column 1, spanning 2 columns
        }
        if (isKidWithPaint) {
            return '6 / 3 / auto / 5'; // Row 6, Column 3, spanning 2 columns
        }
        if (isActivityAtTable) {
            return '7 / 1 / auto / 4'; // Row 7, centered, spanning 3 columns
        }
        if (isLastPicture) {
            return '9 / 1 / auto / 4'; // Row 9, Column 1, spanning 3 columns
        }
        
        return 'auto'; // Default mobile positioning
    };

    return (
        <div ref={container} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* CSS Grid Container with unified scale */}
                <motion.div 
                    style={{ 
                        scale: gridScale,
                        transformOrigin: "37.75% 15.5%"
                    }}
                    className="grid grid-cols-4 md:grid-cols-12 grid-rows-10 gap-4 h-full w-full max-w-[1440px] mx-auto p-6"
                >
                    {images.map(({ src, alt, gridArea, size = 'md', className }, index) => {
                        // Special positioning for "Kids in garden" - align to bottom of grid area
                        const isKidsInGarden = src.includes('IMG_3063');
                        const isUpsideDownPlay = src.includes('IMG_3608');
                        const isActivityAtTable = src.includes('IMG_2455');
                        const isKidWithPaint = src.includes('paint') || src.includes('Paint'); // Add specific filename once known
                        const isLastPicture = !isKidsInGarden && !isUpsideDownPlay && !isActivityAtTable && !isKidWithPaint;
                        const containerClass = (isKidsInGarden || isUpsideDownPlay || isActivityAtTable || isKidWithPaint) ? 'flex items-end' : '';
                        
                        return (
                            <div
                                key={index}
                                style={{ 
                                    zIndex: images.length - index,
                                    gridArea: getMobileGridArea(gridArea, isUpsideDownPlay, isKidsInGarden, isKidWithPaint, isActivityAtTable, isLastPicture)
                                }}
                                className={`relative ${containerClass} ${className || ''}`}
                            >
                                <div className={`relative bg-transparent ${isKidsInGarden ? 'w-full' : getSizeClasses()}`}>
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
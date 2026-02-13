'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

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
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        // Animate images sliding up with stagger
        // Start when Court word begins (0.8s), with 0.15s stagger between images
        // Initial state is handled by CSS class to prevent FOUC
        gsap.to(imageRefs.current.filter(Boolean), {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.8
        });
    }, []);

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
            return '1 / 2 / auto / 5'; // Row 1, Column 2, spanning 3 columns
        }
        if (isKidsInGarden) {
            return '3 / 1 / auto / 3'; // Row 3, Column 1, spanning 2 columns
        }
        if (isKidWithPaint) {
            return '4 / 3 / 6 / 5'; // Row 4-5, Column 3, spanning 2 columns, bottom-aligned to row 5
        }
        if (isActivityAtTable) {
            return '6 / 2 / 9 / 5'; // Row 6-8, Column 2-5 (3 cols wide), bottom aligned to row 8
        }
        if (isLastPicture) {
            return '9 / 1 / auto / 4'; // Row 9, Column 1, spanning 3 columns
        }
        
        return 'auto'; // Default mobile positioning
    };

    return (
        <div ref={container} className="relative w-full">
            <div className="grid grid-cols-4 md:grid-cols-12 grid-rows-10 gap-4 w-full max-w-[1440px] mx-auto p-6">
                    {images.map(({ src, alt, gridArea, size = 'md', className }, index) => {
                        // Special positioning for images
                        const isKidsInGarden = src.includes('IMG_3063');
                        const isUpsideDownPlay = src.includes('IMG_3608');
                        const isActivityAtTable = src.includes('IMG_2455');
                        const isKidWithPaint = src.includes('paint') || src.includes('Paint'); // Add specific filename once known
                        const isLastPicture = !isKidsInGarden && !isUpsideDownPlay && !isActivityAtTable && !isKidWithPaint;
                        
                        // Container alignment: Kids in garden and upside down play align to top, others to bottom
                        let containerClass = '';
                        if (isKidsInGarden || isUpsideDownPlay) {
                            containerClass = 'flex items-start'; // Align to top for these specific images
                        } else if (isActivityAtTable || isKidWithPaint) {
                            containerClass = 'flex items-end'; // Keep bottom alignment for these
                        }
                        
                        // Z-index: On mobile, activity at table goes on top; otherwise use default stacking
                        const zIndex = isMobile && isActivityAtTable
                            ? images.length + 1
                            : images.length - index;

                        // Hide kid with paint on mobile
                        const mobileHiddenClass = isKidWithPaint ? 'hidden md:block' : '';

                        return (
                            <div
                                key={index}
                                ref={(el) => {
                                    imageRefs.current[index] = el;
                                }}
                                style={{
                                    zIndex,
                                    gridArea: getMobileGridArea(gridArea, isUpsideDownPlay, isKidsInGarden, isKidWithPaint, isActivityAtTable, isLastPicture)
                                }}
                                className={`relative ${containerClass} ${mobileHiddenClass} animate-slide-up-initial-lg ${className || ''}`}
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
                </div>
        </div>
    );
}
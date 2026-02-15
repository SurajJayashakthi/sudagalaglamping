'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Waves, Footprints, Flame, Coffee, Gamepad2, Bird, ShieldCheck } from 'lucide-react';

const amenities = [
    { icon: Waves, name: '2 Spring Pools' },
    { icon: Wifi, name: 'Starlink WiFi' },
    { icon: Flame, name: 'BBQ Setup' },
    { icon: Footprints, name: 'Nature Trails' },
    { icon: Coffee, name: 'Coffee Setup' },
    { icon: Gamepad2, name: 'Indoor Games' },
    { icon: Bird, name: 'Bird Watching' },
    { icon: ShieldCheck, name: 'CCTV Parking' },
];

export function AmenitiesSlider() {
    // Triple duplication for seamless loop
    const displayAmenities = [...amenities, ...amenities, ...amenities];

    const [mounted, setMounted] = useState(false);
    const [duration, setDuration] = useState(45);

    useEffect(() => {
        setMounted(true);
        // Set slower duration for mobile (30s instead of 20s for calmer scrolling)
        if (window.innerWidth < 768) {
            setDuration(30);
        }
    }, []);

    if (!mounted) {
        return <div className="h-[200px] w-full bg-white" />; // Placeholder to prevent layout shift
    }

    return (
        <div
            className="relative w-full max-w-full overflow-hidden bg-white py-10 select-none"
            suppressHydrationWarning
        >
            {/* Gradient masks for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-12 items-center"
                style={{
                    willChange: 'transform',
                }}
                animate={{
                    x: [0, -(amenities.length * 132)], // 120px width + 12px gap = 132px per item
                }}
                transition={{
                    x: {
                        duration: duration,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatType: 'loop',
                    },
                }}
            >
                {displayAmenities.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center min-w-[120px] gap-3"
                        style={{
                            transform: 'translate3d(0, 0, 0)', // Hardware acceleration
                        }}
                    >
                        <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-emerald-900 shadow-sm border border-stone-100">
                            <item.icon className="w-8 h-8" strokeWidth={1.5} />
                        </div>

                        {/* Name always visible */}
                        <span className="bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full whitespace-nowrap shadow-xl">
                            {item.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

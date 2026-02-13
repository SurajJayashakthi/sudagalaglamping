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
    // Duplicate for seamless loop
    const displayAmenities = [...amenities, ...amenities];

    const [isPaused, setIsPaused] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [duration, setDuration] = useState(45);

    useEffect(() => {
        setMounted(true);
        // Set faster duration for mobile
        if (window.innerWidth < 768) {
            setDuration(15);
        }
    }, []);

    if (!mounted) {
        return <div className="h-[200px] w-full bg-white" />; // Placeholder to prevent layout shift
    }

    return (
        <div
            className="relative w-full overflow-hidden bg-white py-10 select-none"
            suppressHydrationWarning
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Gradient masks for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
                className="flex gap-12 items-center"
                animate={isPaused ? {} : {
                    x: ['0%', '-50%'],
                }}
                transition={{
                    duration: duration,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            >
                {displayAmenities.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center min-w-[120px] group relative"
                    >
                        <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-emerald-900 shadow-sm border border-stone-100 transition-all group-hover:bg-emerald-50 group-hover:scale-110 group-hover:shadow-md">
                            <item.icon className="w-8 h-8" strokeWidth={1.5} />
                        </div>

                        {/* Name on Hover/Tap */}
                        <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-4">
                            <span className="bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full whitespace-nowrap shadow-xl">
                                {item.name}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

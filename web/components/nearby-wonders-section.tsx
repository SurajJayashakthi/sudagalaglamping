'use client';

import { useState } from 'react';
import { SupabaseImage } from '@/components/ui/supabase-image';
import { motion, AnimatePresence } from 'framer-motion';

const places = [
    {
        name: "Adam's Peak",
        desc: "Erathna Trail Access",
        image: "/images/nearby_places/adams_peak.jpg",
    },
    {
        name: "Bopath Ella",
        desc: "Leaf-shaped Falls",
        image: "/images/nearby_places/bopath_ella.jpg",
    },
    {
        name: "Batatotalena",
        desc: "Historic Buddhist Cave",
        image: "/images/nearby_places/batatotalena.jpg",
    },
    {
        name: "Delgamuwa Vihara",
        desc: "Ancient Sacred Site",
        image: "/images/nearby_places/delgamuwa_vihara.jpg",
    },
    {
        name: "Saman Dewalaya",
        desc: "Cultural Heritage",
        image: "/images/nearby_places/saman_dewalaya.jpg",
    },
    {
        name: "Batadomba Lena",
        desc: "Archological Site",
        image: "/images/nearby_places/batadomba_lena.jpg",
    }
];

export function NearbyWondersSection() {
    const [activePlace, setActivePlace] = useState<number>(0);

    return (
        <section className="py-20 lg:py-40 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                    {/* Left Side - Place Cards */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.4em] mb-6">Regional Wonders</h2>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-emerald-950 mb-8 lg:mb-10 leading-tight">
                            Beyond the <br />Sanctuary
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                            {places.map((place, i) => (
                                <div
                                    key={i}
                                    className={`p-5 lg:p-6 rounded-2xl border transition-all cursor-pointer ${activePlace === i
                                        ? 'bg-emerald-50 border-emerald-300 shadow-lg'
                                        : 'bg-stone-50 border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/30'
                                        }`}
                                    onMouseEnter={() => setActivePlace(i)}
                                    onClick={() => setActivePlace(i)}
                                >
                                    {/* Mobile Image (shown only when active on small screens) */}
                                    <div className={`lg:hidden mb-4 overflow-hidden rounded-xl h-40 relative transition-all duration-300 ${activePlace === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0 hidden'}`}>
                                        <SupabaseImage
                                            src={place.image}
                                            alt={place.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <span className={`block font-serif font-bold text-base lg:text-lg mb-1 transition-colors ${activePlace === i ? 'text-emerald-700' : 'text-emerald-900'
                                        }`}>
                                        {place.name}
                                    </span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activePlace === i ? 'text-emerald-600' : 'text-stone-400'
                                        }`}>
                                        {place.desc}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Image Display */}
                    <div className="hidden lg:block w-full lg:w-1/2 relative h-[550px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePlace}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <SupabaseImage
                                    src={places[activePlace].image}
                                    alt={places[activePlace].name}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Gradient Overlay with Place Info */}
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                    >
                                        <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest mb-2">
                                            {places[activePlace].desc}
                                        </p>
                                        <h4 className="text-4xl font-bold font-serif text-white">
                                            {places[activePlace].name}
                                        </h4>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

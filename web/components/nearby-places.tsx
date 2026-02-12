'use client';

import { useState } from 'react';
import { SupabaseImage } from '@/components/ui/supabase-image';
import { motion, AnimatePresence } from 'framer-motion';

const places = [
    {
        name: "Adam's Peak",
        desc: "Erathna Trail Access",
        image: "/images/facilities/hiking/WhatsApp Image 2025-11-05 at 9.43.33 PM.jpeg",
        color: "from-amber-500 to-orange-600"
    },
    {
        name: "Bopath Ella",
        desc: "Leaf-shaped Falls",
        image: "/images/facilities/hiking/WhatsApp Image 2025-11-05 at 9.43.37 PM.jpeg",
        color: "from-blue-500 to-cyan-600"
    },
    {
        name: "Batatotalena",
        desc: "Historic Buddhist Cave",
        image: "/images/accommodations/cave room/FB_IMG_1758163900988.jpg",
        color: "from-stone-500 to-stone-700"
    },
    {
        name: "Delgamuwa Vihara",
        desc: "Ancient Sacred Site",
        image: "/images/about/645721004.jpg",
        color: "from-emerald-500 to-green-700"
    },
    {
        name: "Saman Dewalaya",
        desc: "Cultural Heritage",
        image: "/images/accommodations/Cabanas/FB_IMG_1758901622842-2.jpg",
        color: "from-purple-500 to-indigo-600"
    },
    {
        name: "Batadomba Lena",
        desc: "Archological Site",
        image: "/images/accommodations/tree house/FB_IMG_1758901778716.jpg",
        color: "from-rose-500 to-pink-600"
    }
];

export function NearbyPlaces() {
    const [activePlace, setActivePlace] = useState<number | null>(null);

    return (
        <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {places.map((place, i) => (
                    <div
                        key={i}
                        className="p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group cursor-pointer relative overflow-hidden"
                        onMouseEnter={() => setActivePlace(i)}
                        onMouseLeave={() => setActivePlace(null)}
                        onClick={() => setActivePlace(activePlace === i ? null : i)}
                    >
                        {/* Gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${place.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                        <div className="relative z-10">
                            <span className="block font-serif font-bold text-emerald-900 text-lg mb-1 group-hover:text-emerald-700 transition-colors">
                                {place.name}
                            </span>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest group-hover:text-emerald-700 transition-colors">
                                {place.desc}
                            </span>
                        </div>

                        {/* Hover indicator */}
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Image Preview Modal */}
            <AnimatePresence>
                {activePlace !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setActivePlace(null)}
                    >
                        <motion.div
                            className="relative w-full max-w-4xl h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <SupabaseImage
                                src={places[activePlace].image}
                                alt={places[activePlace].name}
                                fill
                                className="object-cover"
                            />

                            {/* Info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                                <div className="max-w-2xl">
                                    <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${places[activePlace].color} text-white text-xs font-bold uppercase tracking-widest mb-4`}>
                                        {places[activePlace].desc}
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold font-serif text-white mb-2">
                                        {places[activePlace].name}
                                    </h3>
                                    <p className="text-stone-200 text-sm">Click anywhere to close</p>
                                </div>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={() => setActivePlace(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors group"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

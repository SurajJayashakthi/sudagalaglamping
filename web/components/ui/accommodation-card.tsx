'use client';

import Link from 'next/link';
import { Stay } from '@/types';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SupabaseImage } from './supabase-image';

export function AccommodationCard({ stay }: { stay: Stay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-stone-100 transition-all hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
        >
            <div className="aspect-[16/11] relative overflow-hidden">
                <SupabaseImage
                    src={stay.image_url}
                    alt={stay.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-emerald-900 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                    {stay.category}
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold font-serif text-emerald-950 group-hover:text-emerald-800 transition-colors line-clamp-1 tracking-tight">
                        {stay.title}
                    </h3>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed mb-10 line-clamp-2 font-medium">
                    {stay.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-stone-50">
                    <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">
                            {stay.category === 'Day Outing' ? 'Inclusive rate' : 'Starting From'}
                        </span>
                        <span className="text-xl font-bold text-emerald-950">LKR {(stay.price_fb || stay.base_price_lkr || 0).toLocaleString()}</span>
                    </div>
                    <Link href={`/packages/${stay.slug}`}>
                        <Button className="bg-emerald-900 hover:bg-emerald-950 text-white rounded-2xl px-8 h-12 font-bold transition-all hover:scale-105">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

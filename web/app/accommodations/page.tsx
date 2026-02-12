'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { Stay } from '@/types';
import { AccommodationCard } from '@/components/ui/accommodation-card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function AccommodationsPage() {
    const [stays, setStays] = useState<Stay[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStays() {
            const { data, error } = await supabase
                .from('stays')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: true });

            if (data) setStays(data);
            setLoading(false);
        }
        fetchStays();
    }, []);

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
            <Header />
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-bold font-serif text-stone-900 dark:text-white mb-6 uppercase tracking-tight">Rainforest Sanctuaries</h1>
                        <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                            A curated selection of eco-luxury dwellings designed to immerse you in the raw beauty of Kuruwita.
                        </p>
                    </div>

                    {loading ? (
                        <div className="py-32 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700 mb-6"></div>
                            <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Curating your escape...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {stays.map((stay, index) => (
                                <AccommodationCard key={stay.id} stay={stay} />
                            ))}
                        </div>
                    )}

                    {!loading && stays.length === 0 && (
                        <div className="text-center py-32 bg-white dark:bg-stone-900 rounded-[3rem] border border-stone-100 dark:border-stone-800">
                            <p className="text-stone-400 font-serif italic text-xl">No sanctuaries found in the mist.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

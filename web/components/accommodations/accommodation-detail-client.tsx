'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { Stay } from '@/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BookingForm } from '@/components/booking-form';
import { SupabaseImage } from '@/components/ui/supabase-image';
import { ArrowLeft, CheckCircle2, Coffee, Mountain, Users } from 'lucide-react';
import Link from 'next/link';

interface AccommodationDetailClientProps {
    slug: string;
}

export function AccommodationDetailClient({ slug }: AccommodationDetailClientProps) {
    const [stay, setStay] = useState<Stay | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStay() {
            if (!slug) return;
            const { data, error } = await supabase
                .from('stays')
                .select('*')
                .eq('slug', slug)
                .single();

            if (data) setStay(data);
            setLoading(false);
        }
        fetchStay();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
                <p className="text-stone-500 font-serif italic">Loading sanctuary details...</p>
            </div>
        </div>
    );

    if (!stay) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900">
            <div className="text-center px-4">
                <h2 className="text-3xl font-serif mb-4 text-emerald-950">Sanctuary not found</h2>
                <p className="text-stone-500 mb-8">The path you followed seems to lead nowhere.</p>
                <Link href="/packages" className="text-emerald-900 font-bold hover:underline">Return to all sanctuaries</Link>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow pt-40 pb-32">
                <div className="container mx-auto px-4">
                    <Link href="/packages" className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-900 font-bold uppercase tracking-widest text-xs mb-12 transition-colors group bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-stone-100 shadow-sm w-fit">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to all packages
                    </Link>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
                        {/* Left Column */}
                        <div className="space-y-12">
                            {/* Main Image only - Gallery removed to keep site clean */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl"
                            >
                                <SupabaseImage
                                    src={stay.image_url}
                                    alt={stay.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Right Column: Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-12"
                        >
                            <div>
                                <span className="text-sm tracking-[0.3em] uppercase mb-6 text-emerald-900 font-bold block">{stay.category}</span>
                                <h1 className="text-5xl md:text-7xl font-bold font-serif mb-10 text-emerald-950 leading-tight tracking-tighter uppercase">
                                    {stay.title}
                                </h1>

                                <div className="flex flex-wrap gap-6 mb-12">
                                    <div className="flex items-center gap-2 text-stone-600">
                                        <Users className="w-5 h-5 text-emerald-900" />
                                        <span className="font-medium">Up to {stay.max_guests} Guests</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-stone-600">
                                        <Mountain className="w-5 h-5 text-emerald-900" />
                                        <span className="font-medium">Jungle Views</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-stone-600">
                                        <Coffee className="w-5 h-5 text-emerald-900" />
                                        <span className="font-medium">Premium Amenities</span>
                                    </div>
                                </div>

                                <p className="text-xl text-stone-600 font-medium leading-relaxed">
                                    {stay.description}
                                </p>
                            </div>

                            <div className="bg-stone-900/40 backdrop-blur-md rounded-[3rem] p-12 border border-white/5 shadow-xl text-white">
                                <h2 className="text-2xl font-bold font-serif mb-10 text-emerald-50 uppercase tracking-tight border-b border-white/5 pb-6">Features & Amenities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {stay.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-4 text-stone-200 group">
                                            <div className="p-2 bg-emerald-900/50 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform border border-white/10 shadow-sm">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <span className="text-base font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 lg:hidden">
                                <BookingForm stay={stay} />
                            </div>
                        </motion.div>
                    </div>

                    <div className="hidden lg:block mt-32 max-w-2xl mx-auto">
                        <BookingForm stay={stay} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

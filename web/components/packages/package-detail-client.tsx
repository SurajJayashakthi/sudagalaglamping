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
import { Button } from '@/components/ui/button';
import { Gallery } from '@/components/ui/gallery';
import { galleryImages } from '@/lib/gallery-data';

interface PackageDetailClientProps {
    slug: string;
}

export function PackageDetailClient({ slug }: PackageDetailClientProps) {
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
        <div className="min-h-screen flex items-center justify-center bg-stone-100">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-900"></div>
                <p className="text-emerald-900 font-serif italic text-lg tracking-tight">Loading sanctuary details...</p>
            </div>
        </div>
    );

    if (!stay) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100">
            <div className="text-center max-w-md px-4">
                <h2 className="text-4xl font-serif mb-6 text-emerald-950 font-bold tracking-tight">Sanctuary not found</h2>
                <p className="text-stone-500 mb-10 font-medium leading-relaxed">The path you followed seems to lead nowhere. Perhaps the jungle has reclaimed this route.</p>
                <Link href="/packages">
                    <Button className="bg-emerald-900 hover:bg-emerald-950 text-white rounded-full px-8 py-6 font-bold">Return to Packages</Button>
                </Link>
            </div>
        </div>
    );

    // Get gallery images
    const categoryKey = Object.keys(galleryImages).find(
        key => key.toLowerCase() === stay.category.toLowerCase()
    );
    const images = categoryKey ? galleryImages[categoryKey as keyof typeof galleryImages] : null;

    return (
        <div className="flex flex-col min-h-screen bg-stone-50">
            <main className="flex-grow pt-40 pb-32">
                <div className="container mx-auto px-4">
                    <Link href="/packages" className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-900 font-bold uppercase tracking-widest text-xs mb-12 transition-colors group bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-stone-100 shadow-sm w-fit">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to all packages
                    </Link>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
                        {/* Left Column */}
                        <div className="space-y-12">
                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl border border-stone-200"
                            >
                                <SupabaseImage
                                    src={stay.image_url}
                                    alt={stay.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>

                            {/* Gallery */}
                            <div>
                                {images && images.length > 0 ? (
                                    <Gallery
                                        images={images}
                                        title={`Views of ${stay.title}`}
                                    />
                                ) : (
                                    <div className="aspect-video bg-stone-100 rounded-3xl flex items-center justify-center text-stone-400 italic">
                                        Gallery coming soon
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Details & Features */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-12"
                        >
                            <div>
                                {stay.tagline && (
                                    <p className="text-emerald-800 font-serif italic text-xl mb-6">
                                        {stay.tagline}
                                    </p>
                                )}
                                <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 text-emerald-950 leading-tight tracking-tight">
                                    {stay.title}
                                </h1>

                                <div className="flex flex-wrap gap-4 mb-10">
                                    <div className="flex items-center gap-3 bg-stone-100/50 backdrop-blur px-5 py-2 rounded-full border border-stone-200">
                                        <Users className="w-4 h-4 text-emerald-800" suppressHydrationWarning />
                                        <span className="font-bold text-[10px] uppercase tracking-widest text-emerald-900">{stay.max_guests > 0 ? `${stay.max_guests} Guests` : 'Package'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-stone-100/50 backdrop-blur px-5 py-2 rounded-full border border-stone-200">
                                        <Mountain className="w-4 h-4 text-emerald-800" suppressHydrationWarning />
                                        <span className="font-bold text-[10px] uppercase tracking-widest text-emerald-900">Jungle View</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-stone-100/50 backdrop-blur px-5 py-2 rounded-full border border-stone-200">
                                        <Coffee className="w-4 h-4 text-emerald-800" suppressHydrationWarning />
                                        <span className="font-bold text-[10px] uppercase tracking-widest text-emerald-900">Premium Amenities</span>
                                    </div>
                                </div>

                                <p className="text-lg text-stone-500 font-medium leading-relaxed">
                                    {stay.description}
                                </p>
                            </div>

                            {/* Highlights Card */}
                            {stay.highlights && Object.keys(stay.highlights).length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {stay.highlights.difficulty && (
                                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold block mb-2">Difficulty</span>
                                            <p className="text-emerald-900 font-bold">{stay.highlights.difficulty}</p>
                                        </div>
                                    )}
                                    {stay.highlights.duration && (
                                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold block mb-2">Duration</span>
                                            <p className="text-emerald-900 font-bold">{stay.highlights.duration}</p>
                                        </div>
                                    )}
                                    {stay.highlights.essentials && (
                                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold block mb-2">Essentials</span>
                                            <p className="text-emerald-900 font-bold text-xs">{stay.highlights.essentials}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Itinerary Section */}
                            {stay.itinerary && stay.itinerary.length > 0 && (
                                <div className="space-y-8">
                                    <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.3em]">Expedition Itinerary</h3>
                                    <div className="space-y-6">
                                        {stay.itinerary.map((item, idx) => (
                                            <div key={idx} className="relative pl-8 border-l-2 border-emerald-100 py-2">
                                                <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-emerald-700 border-4 border-white shadow-sm" />
                                                <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                                                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2 block">{item.day}</span>
                                                    <h4 className="text-2xl font-serif font-bold text-emerald-950 mb-6">{item.title}</h4>
                                                    <ul className="space-y-4">
                                                        {item.activities.map((activity, aIdx) => (
                                                            <li key={aIdx} className="flex gap-4 text-stone-500 text-sm font-medium leading-relaxed">
                                                                <span className="text-emerald-700 mt-1">•</span>
                                                                {activity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Features Card */}
                            <div className="bg-stone-900/40 backdrop-blur-md rounded-[3rem] p-12 border border-white/5 shadow-xl text-white">
                                <h2 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] text-center border-b border-white/5 pb-6 mb-8">What is included</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {stay.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-4 text-stone-200 group">
                                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-emerald-900/50 rounded-full text-emerald-400 group-hover:scale-110 transition-transform border border-white/10">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:hidden mt-8">
                                <BookingForm stay={stay} />
                            </div>

                            {/* Policy Section */}
                            <div className="pt-12 border-t border-stone-100">
                                <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.3em] mb-12">Sanctuary Policies</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                                        <h4 className="font-bold text-emerald-950 mb-3 uppercase tracking-widest text-[10px]">Child Policy</h4>
                                        <ul className="space-y-2 text-sm text-stone-500 font-medium">
                                            <li>Under 6 Years: Free of Charge</li>
                                            <li>7 - 12 Years: 50% of Adult Rate</li>
                                            <li>13+ Years: Full Rate</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                                            <h4 className="font-bold text-emerald-950 mb-3 uppercase tracking-widest text-[10px]">Check-in / Out</h4>
                                            <ul className="space-y-2 text-sm text-stone-500 font-medium">
                                                <li>Check-in: 02:00 PM</li>
                                                <li>Check-out: 12:00 PM</li>
                                            </ul>
                                        </div>
                                        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                                            <h4 className="font-bold text-emerald-950 mb-3 uppercase tracking-widest text-[10px]">House Rules</h4>
                                            <ul className="space-y-2 text-sm text-stone-500 font-medium">
                                                <li>No outside food allowed</li>
                                                <li>Quiet hours after 11:00 PM</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="hidden lg:block mt-32 max-w-2xl mx-auto">
                        <BookingForm stay={stay} />
                    </div>
                </div>
            </main>
        </div>
    );
}

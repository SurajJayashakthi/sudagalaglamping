'use client';

import { Star } from 'lucide-react';
import { SupabaseImage } from '@/components/ui/supabase-image';

const testimonials = [
    {
        id: 1,
        name: 'Daniel',
        country: 'Germany',
        rating: 5,
        quote: "The most peaceful night we’ve ever had in Sri Lanka. Waking up to the sounds of the jungle was magical.",
        image: '/images/testimonials/daniel.jpg', // Placeholder - will need actual asset or fallback
    },
    {
        id: 2,
        name: 'Sarah & Tom',
        country: 'UK',
        rating: 5,
        quote: "Luxury camping at its finest. The private waterfall trek was the highlight of our trip!",
        image: '/images/testimonials/sarah.jpg',
    },
    {
        id: 3,
        name: 'Kasun',
        country: 'Sri Lanka',
        rating: 5,
        quote: "A perfect escape from Colombo. The food was authentic and delicious. Highly recommend the Cabana.",
        image: '/images/testimonials/kasun.jpg',
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-stone-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.3em] mb-4">Guest Stories</h2>
                    <h3 className="text-4xl md:text-5xl font-bold font-serif text-emerald-950">Memories Made in the Wild</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-stone-50 shadow-sm relative">
                                {/* Fallback to initials if image load fails or is missing */}
                                <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400 font-bold text-xl">
                                    {t.name[0]}
                                </div>
                                {/* 
                 <SupabaseImage 
                    src={t.image} 
                    alt={t.name}
                    fill
                    className="object-cover"
                 />
                 */}
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            <p className="text-stone-600 font-medium italic mb-6 leading-relaxed">
                                "{t.quote}"
                            </p>

                            <div>
                                <h4 className="font-bold text-emerald-900">{t.name}</h4>
                                <p className="text-xs text-stone-400 uppercase tracking-wider font-bold">{t.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

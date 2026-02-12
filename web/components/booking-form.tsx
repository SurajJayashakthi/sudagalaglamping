'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { Stay } from '@/types';
import { Calendar, User, Phone, CheckCircle2, MessageCircle, Users, Coffee } from 'lucide-react';

const bookingSchema = z.object({
    customer_name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    check_in: z.string().min(1, 'Check-in date is required'),
    check_out: z.string().min(1, 'Check-out date is required'),
    guests: z.number().min(1, 'At least 1 guest required'),
    tier: z.enum(['FB', 'HB', 'BB']),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm({ stay }: { stay: Stay }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            check_in: new Date().toISOString().split('T')[0],
            check_out: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            guests: stay.min_guests || 2,
            tier: 'FB'
        }
    });

    const checkIn = watch('check_in');
    const checkOut = watch('check_out');
    const guestCount = watch('guests');
    const tier = watch('tier');

    const pricing = useMemo(() => {
        if (!checkIn || !checkOut || !guestCount) return { total: 0, nights: 0, perPerson: 0 };

        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

        let perPersonRate = 0;

        if (stay.category === 'Day Outing') {
            const baseRate = stay.base_price_lkr || 10000;
            const total = stay.pricing_type === 'per_person' ? baseRate * guestCount : baseRate;
            return { total, nights: 1, perPerson: baseRate };
        }

        // Tier selection
        const getBaseRate = (s: Stay, t: string) => {
            if (t === 'HB') return s.price_hb;
            if (t === 'BB') return s.price_bb;
            return s.price_fb;
        };

        const baseRate = getBaseRate(stay, tier);

        if (stay.pricing_type === 'per_person') {
            // Treehouse logic
            if (stay.category === 'Treehouse') {
                if (guestCount >= 10) {
                    perPersonRate = baseRate; // 4900, 4200, 3700
                } else if (guestCount >= 6) {
                    // 6-9 pax rates
                    if (tier === 'FB') perPersonRate = 5400;
                    else if (tier === 'HB') perPersonRate = 4700;
                    else perPersonRate = 4200;
                } else {
                    perPersonRate = baseRate * 1.2; // Fallback for small groups
                }
            } else {
                perPersonRate = baseRate;
            }
        } else {
            // Fixed pricing (Cabana/Cave)
            if (guestCount >= 10) {
                // Team rates (10+)
                if (stay.category === 'Cabana') {
                    if (tier === 'FB') perPersonRate = 4900;
                    else if (tier === 'HB') perPersonRate = 4200;
                    else perPersonRate = 3700;
                } else if (stay.category === 'Cave Room') {
                    if (tier === 'FB') perPersonRate = 5900;
                    else if (tier === 'HB') perPersonRate = 5200;
                    else perPersonRate = 4700;
                }
            } else {
                // Couple/Small group rates
                return { total: baseRate * nights, nights, perPerson: baseRate / guestCount };
            }
        }

        return { total: perPersonRate * guestCount * nights, nights, perPerson: perPersonRate };
    }, [checkIn, checkOut, guestCount, tier, stay]);

    const onSubmit = async (data: BookingFormValues) => {
        setIsSubmitting(true);
        try {
            console.log('Submitting booking payload:', {
                customer_name: data.customer_name,
                phone: data.phone,
                check_in: data.check_in,
                check_out: data.check_out,
                total_price: pricing.total,
                accommodation_id: stay.id,
                status: 'pending'
            });

            const { error } = await supabase
                .from('bookings')
                .insert([{
                    customer_name: data.customer_name,
                    phone: data.phone,
                    check_in: data.check_in,
                    check_out: data.check_out,
                    total_price: pricing.total,
                    accommodation_id: stay.id,
                    status: 'pending'
                }]);

            if (error) throw error;

            setIsSuccess(true);
            reset(); // Reset form on success

            // WhatsApp Redirect
            const message = encodeURIComponent(`Hi Sudagala, I'm interested in the "${stay.title}" for ${data.check_in} to ${data.check_out} for ${data.guests} guests (${data.tier} tier). Please confirm availability.`);
            const whatsappUrl = `https://wa.me/94770306326?text=${message}`;

            // Small delay to allow state update? Not strictly needed but kept as is
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 100);
        } catch (error: any) {
            console.error('Booking transaction failed. Full Error:', JSON.stringify(error, null, 2));
            alert(`Failed to place booking: ${error.message || 'Unknown error'}. Please check console for details.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 text-center shadow-2xl">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-emerald-800" suppressHydrationWarning />
                </div>
                <h3 className="text-3xl font-bold text-emerald-950 mb-4 font-serif tracking-tight">Booking Requested!</h3>
                <p className="text-stone-500 mb-10 font-medium leading-relaxed">We&apos;ve received your request for <span className="text-emerald-900 font-bold">{stay.title}</span>. One final step - please confirm on WhatsApp.</p>
                <div className="space-y-4">
                    <a
                        href={`https://wa.me/94770306326?text=${encodeURIComponent(`Hi Sudagala, I'm interested in the "${stay.title}" for ${checkIn} to ${checkOut} for ${guestCount} guests (${tier} tier). Please confirm availability.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                    >
                        <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-8 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-green-900/10 transition-transform hover:scale-[1.02]">
                            <MessageCircle className="w-6 h-6" />
                            Complete on WhatsApp
                        </Button>
                    </a>
                    <Button onClick={() => setIsSuccess(false)} variant="ghost" className="w-full text-stone-400 font-bold hover:text-emerald-900 transition-colors uppercase tracking-widest text-[10px]">Back to Form</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-stone-100 shadow-2xl sticky top-32">
            <h3 className="text-3xl font-bold text-emerald-950 mb-10 font-serif tracking-tight">Reserve Sanctuary</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <label className="flex items-center gap-3 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                        <User className="w-4 h-4 text-emerald-800" suppressHydrationWarning /> Full Name
                    </label>
                    <input
                        {...register('customer_name')}
                        className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 outline-none focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 transition-all font-medium"
                        placeholder="Your full name"
                    />
                    {errors.customer_name && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-wide">{errors.customer_name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center gap-3 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                            <Phone className="w-4 h-4 text-emerald-800" suppressHydrationWarning /> Phone
                        </label>
                        <input
                            {...register('phone')}
                            className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 outline-none focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 transition-all font-medium"
                            placeholder="07X XXX XXXX"
                        />
                        {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-wide">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="flex items-center gap-3 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                            <Users className="w-4 h-4 text-emerald-800" suppressHydrationWarning /> Guests
                        </label>
                        <input
                            type="number"
                            {...register('guests', { valueAsNumber: true })}
                            className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 outline-none focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center gap-3 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                            <Calendar className="w-4 h-4 text-emerald-800" suppressHydrationWarning /> Arrival
                        </label>
                        <input
                            type="date"
                            {...register('check_in')}
                            className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 outline-none focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 transition-all font-medium text-sm"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-3 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                            <Calendar className="w-4 h-4 text-emerald-800" suppressHydrationWarning /> Departure
                        </label>
                        <input
                            type="date"
                            {...register('check_out')}
                            className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 outline-none focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                {stay.category !== 'Day Outing' && (
                    <div>
                        <label className="flex items-center gap-3 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                            <Coffee className="w-4 h-4 text-emerald-800" suppressHydrationWarning /> Meal Tier
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { id: 'FB', label: 'All Meals Included', desc: 'Tea/Coffee + Breakfast + Lunch + Dinner' },
                                { id: 'HB', label: 'Breakfast & Dinner Only', desc: 'Includes tea/coffee' },
                                { id: 'BB', label: 'Breakfast Only', desc: 'Start your day right' }
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setValue('tier', t.id as any)}
                                    className={`p-5 rounded-2xl border text-left transition-all ${tier === t.id
                                        ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                                        : 'bg-white border-stone-100 hover:border-emerald-200'
                                        }`}
                                >
                                    <div className="font-bold text-emerald-900 text-sm mb-1">{t.label}</div>
                                    <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">{t.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-8 border-t border-stone-50">
                    <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100 mb-8">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Estimated Total</span>
                            <span className="text-2xl font-black text-emerald-950">LKR {pricing.total.toLocaleString()}</span>
                        </div>
                        <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest text-right italic">*Final price confirmed via WhatsApp</p>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-900 hover:bg-emerald-950 text-white rounded-2xl py-8 h-auto text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-98"
                    >
                        {isSubmitting ? 'Requesting...' : 'Secure Your Sanctuary'}
                    </Button>
                    <p className="text-[9px] text-center text-stone-400 mt-6 uppercase tracking-[0.2em] font-bold italic">"Pricing depends on guest count & meal tier"</p>
                </div>
            </form>
        </div>
    );
}

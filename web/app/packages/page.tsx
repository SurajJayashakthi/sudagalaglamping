'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Stay } from '@/types'
import { motion } from 'framer-motion'
import { SupabaseImage } from '@/components/ui/supabase-image'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Calendar, MessageCircle, ArrowRight, Loader2, Info } from 'lucide-react'

export default function PackagesPage() {
    const [packages, setPackages] = useState<Stay[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPackages() {
            const { data, error } = await supabase
                .from('stays')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })

            if (data) setPackages(data)
            setLoading(false)
        }
        fetchPackages()
    }, [])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-900" />
                <p className="text-emerald-900 font-serif italic text-lg tracking-tight">Discovering jungle adventures...</p>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow pt-48 pb-40">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center mb-32"
                    >
                        <span className="text-[11px] tracking-[0.5em] uppercase mb-8 text-emerald-900 font-bold block">Sanctuary Rates</span>
                        <h1 className="text-6xl md:text-[7rem] font-bold font-serif mb-10 text-emerald-950 leading-[0.8] tracking-tighter">
                            Package <span className="italic font-normal text-emerald-800">Tiers</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-500 font-medium leading-relaxed max-w-2xl mx-auto">
                            Transparent pricing for couples and teams. Explore our jungle sanctuaries.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="group bg-white rounded-[3rem] overflow-hidden border border-stone-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col"
                            >
                                <div className="aspect-[16/11] relative overflow-hidden">
                                    <SupabaseImage
                                        src={pkg.image_url}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-stone-100">
                                        <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-widest">{pkg.category}</p>
                                    </div>
                                    <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-lg px-8 py-4 rounded-[2.5rem] shadow-2xl border border-stone-100">
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                                            {pkg.pricing_type === 'per_person' ? 'Per Person' : 'Per Couple'}
                                        </p>
                                        <p className="text-2xl font-bold text-emerald-950 uppercase tracking-tighter">
                                            LKR {(pkg.price_fb || pkg.base_price_lkr || 0).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="text-3xl font-bold font-serif text-emerald-950 mb-6 group-hover:text-emerald-800 transition-colors tracking-tighter uppercase">{pkg.title}</h3>
                                    <p className="text-stone-500 leading-relaxed mb-10 line-clamp-3 font-medium text-base">
                                        {pkg.description}
                                    </p>

                                    <div className="space-y-4 mb-10">
                                        <div className="flex justify-between items-center text-sm font-bold border-b border-stone-50 pb-3">
                                            <span className="text-stone-400 uppercase tracking-widest">Full Board</span>
                                            <span className="text-emerald-900 leading-none">LKR {(pkg.price_fb || pkg.base_price_lkr || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-bold border-b border-stone-50 pb-3">
                                            <span className="text-stone-400 uppercase tracking-widest">Half Board</span>
                                            <span className="text-emerald-900 leading-none">LKR {(pkg.price_hb || pkg.base_price_lkr || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-bold">
                                            <span className="text-stone-400 uppercase tracking-widest">B & B</span>
                                            <span className="text-emerald-900 leading-none">LKR {(pkg.price_bb || pkg.base_price_lkr || 0).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex flex-col gap-4">
                                        <Link href={`/packages/${pkg.slug}`} className="w-full">
                                            <Button size="lg" className="w-full bg-emerald-900 hover:bg-emerald-950 text-white rounded-[2rem] h-14 font-bold shadow-xl transition-all hover:scale-[1.02]">
                                                View Tiers & Info
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-32 p-12 bg-stone-50 rounded-[4rem] border border-stone-100 max-w-4xl mx-auto">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-stone-100">
                                <Info className="text-emerald-900 w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-950 uppercase tracking-widest text-sm mb-4">Child & Group Policy</h4>
                                <p className="text-stone-500 text-sm leading-relaxed mb-6 font-medium">
                                    Children under 6 years stay for free. Ages 7-12 are charged at half rate. Ages 13+ are charged at full adult rate. For large groups (over 10 pax), please contact us directly for customized team packages.
                                </p>
                                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                                    Extended Stay: 10% discount on the 2nd night (Conditions apply)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

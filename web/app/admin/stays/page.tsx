'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Stay } from '@/types'
import { StayForm } from '@/components/admin/stay-form'
import { Plus, Edit2, Trash2, ArrowLeft, Calendar, Users, Activity, Eye, Package } from 'lucide-react'
import Link from 'next/link'

export default function AdminStays() {
    const [session, setSession] = useState<any>(null)
    const [stays, setStays] = useState<Stay[]>([])
    const [loading, setLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingStay, setEditingStay] = useState<Stay | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) fetchStays()
            setLoading(false)
        })
    }, [])

    async function fetchStays() {
        const { data, error } = await supabase
            .from('stays')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setStays(data)
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this stay?')) return

        const { error } = await supabase
            .from('stays')
            .delete()
            .eq('id', id)

        if (!error) {
            setStays(prev => prev.filter(s => s.id !== id))
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900">Loading...</div>

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 p-4">
                <div className="text-center bg-white dark:bg-stone-800 p-12 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-700">
                    <h1 className="text-3xl font-bold font-serif mb-4 text-stone-900 dark:text-white">Unauthorized Access</h1>
                    <p className="text-stone-500 mb-8">Please authenticate via the main admin portal.</p>
                    <Link href="/admin">
                        <Button className="bg-green-700 hover:bg-green-800 text-white px-8 h-12 rounded-xl">Verify Session</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <div>
                        <Link href="/admin" className="text-green-700 dark:text-green-500 flex items-center gap-2 mb-4 hover:underline text-sm font-bold uppercase tracking-widest">
                            <ArrowLeft className="w-4 h-4" /> Core Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-stone-900 dark:text-white mb-2">Sanctuary Management</h1>
                        <p className="text-stone-500 dark:text-stone-400">Manage all unified accommodations and curated experience packages.</p>
                    </div>
                    {!isFormOpen && (
                        <Button onClick={() => setIsFormOpen(true)} className="bg-green-700 hover:bg-green-800 text-white rounded-2xl px-8 h-14 shadow-xl shadow-green-900/10 transition-all hover:scale-105 active:scale-95">
                            <Plus className="w-5 h-5 mr-3" /> Add Sanctuary
                        </Button>
                    )}
                </div>

                {isFormOpen ? (
                    <div className="bg-white dark:bg-stone-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-bold font-serif text-stone-900 dark:text-white">{editingStay ? 'Refine Sanctuary' : 'Define New Sanctuary'}</h2>
                            <Button variant="ghost" onClick={() => { setIsFormOpen(false); setEditingStay(null); }} className="text-stone-400">
                                <Plus className="w-6 h-6 rotate-45" />
                            </Button>
                        </div>
                        <StayForm
                            stay={editingStay}
                            onSuccess={() => {
                                setIsFormOpen(false)
                                setEditingStay(null)
                                fetchStays()
                            }}
                            onCancel={() => {
                                setIsFormOpen(false)
                                setEditingStay(null)
                            }}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {stays.map((stay) => (
                            <div key={stay.id} className="bg-white dark:bg-stone-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-stone-200 dark:border-stone-800 group transition-all hover:shadow-2xl hover:shadow-green-900/5">
                                <div className="aspect-[16/10] relative overflow-hidden">
                                    <img src={stay.image_url} alt={stay.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute top-6 left-6 flex gap-2">
                                        <span className="bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                                            {stay.category}
                                        </span>
                                        {!stay.is_active && (
                                            <span className="bg-red-500/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-6 right-6 bg-white/95 dark:bg-stone-800/95 backdrop-blur-md px-5 py-2.5 rounded-2xl text-sm font-black text-green-800 dark:text-green-400 shadow-xl border border-green-100 dark:border-white/5">
                                        LKR {(stay.base_price_lkr || 0).toLocaleString()}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-white mb-3">{stay.title}</h3>
                                    <p className="text-stone-500 dark:text-stone-400 line-clamp-2 text-sm leading-relaxed mb-6 h-10">{stay.description}</p>

                                    <div className="flex items-center gap-6 mb-8 text-stone-400">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                                            <Users className="w-4 h-4 text-green-600" /> {stay.max_guests} Guests
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                                            <Activity className="w-4 h-4 text-green-600" /> {stay.features.length} Features
                                        </div>
                                    </div>

                                    <div className="flex gap-4 border-t border-stone-50 dark:border-stone-800 pt-8">
                                        <Button
                                            variant="outline"
                                            className="flex-1 rounded-2xl h-12 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 font-bold"
                                            onClick={() => {
                                                setEditingStay(stay)
                                                setIsFormOpen(true)
                                            }}
                                        >
                                            <Edit2 className="w-4 h-4 mr-2" /> Refine
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="rounded-2xl h-12 w-12 border-red-50 text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(stay.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {stays.length === 0 && (
                            <div className="col-span-full py-32 text-center bg-white dark:bg-stone-900/50 rounded-[3rem] border-2 border-dashed border-stone-200 dark:border-stone-800">
                                <div className="inline-block p-8 bg-stone-100 dark:bg-stone-800 rounded-full mb-8">
                                    <Package className="w-16 h-16 text-stone-300" />
                                </div>
                                <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-white mb-2">Void in Sanctuary</h3>
                                <p className="text-stone-500 max-w-sm mx-auto mb-10">All sanctuary items have been cleared. Ready to reimagine the jungle experience?</p>
                                <Button onClick={() => setIsFormOpen(true)} className="bg-green-700 hover:bg-green-800 text-white rounded-2xl px-12 h-14 font-bold shadow-xl shadow-green-900/10 transition-all hover:scale-105">
                                    Define First Sanctuary
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

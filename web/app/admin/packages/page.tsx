'use client'



import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabaseClient'

import { Button } from '@/components/ui/button'

import { Package } from '@/types'

import { PackageForm } from '@/components/admin/package-form'

import { Plus, Edit2, Trash2, Package as PackageIcon, ArrowLeft, Calendar } from 'lucide-react'

import Link from 'next/link'
import { SupabaseImage } from '@/components/ui/supabase-image'



export default function AdminPackages() {
    const [session, setSession] = useState<Session | null>(null)

    const [packages, setPackages] = useState<Package[]>([])

    const [loading, setLoading] = useState(true)

    const [isFormOpen, setIsFormOpen] = useState(false)

    const [editingPackage, setEditingPackage] = useState<Package | null>(null)



    async function fetchPackages() {

        const { data } = await supabase

            .from('packages')

            .select('*')

            .order('created_at', { ascending: false })



        if (data) setPackages(data)

    }



    useEffect(() => {

        supabase.auth.getSession().then(({ data: { session } }) => {

            setSession(session)

            if (session) fetchPackages()

            setLoading(false)

        })

    }, [])



    async function handleDelete(id: string) {

        if (!confirm('Are you sure you want to delete this package?')) return



        const { error } = await supabase

            .from('packages')

            .delete()

            .eq('id', id)



        if (!error) {

            setPackages(prev => prev.filter(p => p.id !== id))

        }

    }



    if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900">Loading...</div>



    if (!session) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 p-4">

                <div className="text-center bg-white dark:bg-stone-800 p-12 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-700">

                    <h1 className="text-3xl font-bold font-serif mb-4">Unauthorized</h1>

                    <p className="text-stone-500 mb-8">Please log in to the main admin dashboard first.</p>

                    <Link href="/admin">

                        <Button className="bg-green-700 hover:bg-green-800 text-white px-8">Return to Login</Button>

                    </Link>

                </div>

            </div>

        )

    }



    return (

        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-6 md:p-12">

            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">

                    <div>

                        <Link href="/admin" className="text-green-700 dark:text-green-500 flex items-center gap-2 mb-4 hover:underline text-sm font-bold">

                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard

                        </Link>

                        <h1 className="text-4xl font-bold font-serif text-stone-900 dark:text-white mb-2">Package Management</h1>

                        <p className="text-stone-500 dark:text-stone-400">Curate and manage your exclusive jungle experiences.</p>

                    </div>

                    {!isFormOpen && (

                        <Button onClick={() => setIsFormOpen(true)} className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-6 py-6 shadow-lg shadow-green-900/10 transition-transform hover:scale-105">

                            <Plus className="w-5 h-5 mr-2" /> New Package

                        </Button>

                    )}

                </div>



                {isFormOpen ? (

                    <div className="bg-white dark:bg-stone-900 p-8 md:p-12 rounded-3xl shadow-xl border border-stone-200 dark:border-stone-800 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        <h2 className="text-2xl font-bold font-serif mb-8">{editingPackage ? 'Edit Package' : 'Create New Package'}</h2>

                        <PackageForm

                            pkg={editingPackage}

                            onSuccess={() => {

                                setIsFormOpen(false)

                                setEditingPackage(null)

                                fetchPackages()

                            }}

                            onCancel={() => {

                                setIsFormOpen(false)

                                setEditingPackage(null)

                            }}

                        />

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {packages.map((pkg) => (

                            <div key={pkg.id} className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-sm border border-stone-200 dark:border-stone-800 group transition-all hover:shadow-xl hover:-translate-y-1">

                                <div className="aspect-[16/10] relative overflow-hidden">
                                    <SupabaseImage
                                        src={pkg.image_url}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">

                                        LKR {(Number(pkg.price) || 0).toLocaleString()}

                                    </div>

                                </div>

                                <div className="p-6">

                                    <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white mb-2">{pkg.title}</h3>

                                    <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-6 h-10">{pkg.description}</p>



                                    <div className="flex items-center gap-4 mb-6">

                                        <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">

                                            <Calendar className="w-4 h-4 text-green-600" /> {pkg.duration}

                                        </div>

                                    </div>



                                    <div className="flex gap-3 border-t border-stone-100 dark:border-stone-800 pt-6">

                                        <Button

                                            variant="outline"

                                            className="flex-1 rounded-xl h-11 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"

                                            onClick={() => {

                                                setEditingPackage(pkg)

                                                setIsFormOpen(true)

                                            }}

                                        >

                                            <Edit2 className="w-4 h-4 mr-2" /> Edit

                                        </Button>

                                        <Button

                                            variant="outline"

                                            className="rounded-xl h-11 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200"

                                            onClick={() => handleDelete(pkg.id)}

                                        >

                                            <Trash2 className="w-4 h-4" />

                                        </Button>

                                    </div>

                                </div>

                            </div>

                        ))}



                        {packages.length === 0 && (

                            <div className="col-span-full py-20 text-center">

                                <div className="inline-block p-6 bg-stone-100 dark:bg-stone-900 rounded-full mb-6">

                                    <PackageIcon className="w-12 h-12 text-stone-300" />

                                </div>

                                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">No Packages Yet</h3>

                                <p className="text-stone-500 max-w-xs mx-auto mb-8">Ready to create some jungle magic? Start by adding your first luxury package.</p>

                                <Button onClick={() => setIsFormOpen(true)} className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-8">Create Your First Package</Button>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    )

}
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Stay } from '@/types'
import { SupabaseImage } from '@/components/ui/supabase-image'
import { X, Upload, Loader2, DollarSign, Type, Users } from 'lucide-react'

interface StayFormProps {
    stay?: Stay | null
    onSuccess: () => void
    onCancel: () => void
}

const CATEGORIES = ['Cabana', 'Treehouse', 'Cave Room', 'Day Outing'] as const

export function StayForm({ stay, onSuccess, onCancel }: StayFormProps) {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: stay?.title || '',
        slug: stay?.slug || '',
        category: stay?.category || 'Cabana',
        description: stay?.description || '',
        base_price_lkr: stay?.base_price_lkr || '',
        max_guests: stay?.max_guests || 2,
        features: stay?.features || [],
        image_url: stay?.image_url || '',
        is_active: stay?.is_active ?? true
    })
    const [featureInput, setFeatureInput] = useState('')

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        try {
            if (!e.target.files || e.target.files.length === 0) return
            setUploading(true)

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('package-images') // Reusing this bucket as it was already public
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('package-images')
                .getPublicUrl(filePath)

            setFormData(prev => ({ ...prev, image_url: publicUrl }))
        } catch (error) {
            alert('Error uploading image: ' + (error as Error).message)
        } finally {
            setUploading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                title: formData.title,
                slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
                category: formData.category,
                description: formData.description,
                base_price_lkr: Number(formData.base_price_lkr),
                max_guests: Number(formData.max_guests),
                features: formData.features,
                image_url: formData.image_url,
                is_active: formData.is_active
            }

            if (stay) {
                const { error } = await supabase
                    .from('stays')
                    .update(payload)
                    .eq('id', stay.id)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('stays')
                    .insert([payload])
                if (error) throw error
            }

            onSuccess()
        } catch (error) {
            alert('Error saving stay: ' + (error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    const addFeature = () => {
        if (featureInput.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, featureInput.trim()]
            }))
            setFeatureInput('')
        }
    }

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                            <Type className="w-4 h-4" /> Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            placeholder="Luxury River Tent"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as typeof CATEGORIES[number] }))}
                                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all capitalize"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                                <DollarSign className="w-4 h-4" /> Base Price (LKR)
                            </label>
                            <input
                                type="number"
                                value={formData.base_price_lkr}
                                onChange={e => setFormData(prev => ({ ...prev, base_price_lkr: e.target.value }))}
                                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                placeholder="12000"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                                <Users className="w-4 h-4" /> Max Guests
                            </label>
                            <input
                                type="number"
                                value={formData.max_guests}
                                onChange={e => setFormData(prev => ({ ...prev, max_guests: parseInt(e.target.value) }))}
                                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                placeholder="2"
                            />
                        </div>
                        <div className="flex items-end pb-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={e => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-6 bg-stone-200 rounded-full peer peer-checked:bg-green-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </div>
                                <span className="text-sm font-medium text-stone-600 group-hover:text-stone-900 transition-colors">Active for Booking</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full p-3 h-24 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                            placeholder="Describe the unique stay experience..."
                            required
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                            Features & Amenities
                        </label>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={featureInput}
                                onChange={e => setFeatureInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                className="flex-1 p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                placeholder="Add feature (e.g. River View)"
                            />
                            <Button type="button" onClick={addFeature} className="bg-green-700 text-white rounded-xl">Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.features.map((feature, i) => (
                                <span key={i} className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                                    {feature}
                                    <button type="button" onClick={() => removeFeature(i)} className="hover:text-green-900"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                            Gallery Image
                        </label>
                        <div className="relative aspect-video rounded-2xl border-2 border-dashed border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 flex flex-col items-center justify-center overflow-hidden group">
                            {formData.image_url ? (
                                <>
                                    <SupabaseImage
                                        src={formData.image_url}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="cursor-pointer bg-white text-stone-900 px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                                            Change Image
                                            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center gap-3 p-8 text-center group">
                                    <div className="p-4 bg-white dark:bg-stone-800 rounded-full group-hover:scale-110 transition-transform shadow-sm">
                                        {uploading ? <Loader2 className="w-6 h-6 animate-spin text-green-600" /> : <Upload className="w-6 h-6 text-stone-400" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-stone-900 dark:text-white">Click to upload</p>
                                        <p className="text-xs text-stone-500 mt-1 uppercase tracking-tighter">High-res JPG, PNG</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-8 border-t border-stone-100 dark:border-stone-800">
                <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="px-8 rounded-xl">
                    Cancel
                </Button>
                <Button type="submit" disabled={loading || uploading} className="bg-green-700 hover:bg-green-800 text-white px-8 rounded-xl shadow-lg shadow-green-900/10">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : stay ? 'Update Stay' : 'Create Stay'}
                </Button>
            </div>
        </form>
    )
}

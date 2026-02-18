'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { SupabaseImage } from '@/components/ui/supabase-image'
import { Package } from '@/types'
import { Upload, Loader2, DollarSign, Clock, Type } from 'lucide-react'

interface PackageFormProps {
    pkg?: Package | null
    onSuccess: () => void
    onCancel: () => void
}

export function PackageForm({ pkg, onSuccess, onCancel }: PackageFormProps) {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: pkg?.title || '',
        description: pkg?.description || '',
        price: pkg?.price || '',
        duration: pkg?.duration || '',
        image_url: pkg?.image_url || ''
    })

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        try {
            if (!e.target.files || e.target.files.length === 0) return
            setUploading(true)

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('package-images')
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
                description: formData.description,
                price: Number(formData.price),
                duration: formData.duration,
                image_url: formData.image_url
            }

            if (pkg) {
                const { error } = await supabase
                    .from('packages')
                    .update(payload)
                    .eq('id', pkg.id)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('packages')
                    .insert([payload])
                if (error) throw error
            }

            onSuccess()
        } catch (error) {
            alert('Error saving package: ' + (error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                            <Type className="w-4 h-4" /> Package Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all font-serif"
                            placeholder="Jungle Safari Adventure"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                                <DollarSign className="w-4 h-4" /> Price (LKR)
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono"
                                placeholder="15000"
                                required
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                                <Clock className="w-4 h-4" /> Duration
                            </label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                placeholder="2 Days, 1 Night"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full p-3 h-32 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                            placeholder="Describe the adventure..."
                            required
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2">
                        Package Imagery
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
                                    <p className="text-xs text-stone-500 mt-1 uppercase tracking-tighter">High-res PNG, JPG up to 10MB</p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                            </label>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-stone-100 dark:border-stone-800">
                <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading || uploading} className="bg-green-700 hover:bg-green-800 text-white min-w-[120px]">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : pkg ? 'Update Package' : 'Create Package'}
                </Button>
            </div>
        </form>
    )
}

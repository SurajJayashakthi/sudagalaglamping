'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { SupabaseImage } from './supabase-image'

interface GalleryProps {
    images: string[]
    title?: string
}

export function Gallery({ images, title }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    if (!images || images.length === 0) return null

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedImage === null) return
        setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedImage === null) return
        setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }

    return (
        <div className="py-12">


            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedImage(index)}
                    >
                        <SupabaseImage
                            src={img}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="text-white w-8 h-8 drop-shadow-lg" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors hidden md:block"
                            onClick={handlePrevious}
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={images[selectedImage]}
                                alt="Gallery View"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors hidden md:block"
                            onClick={handleNext}
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm">
                            {selectedImage + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

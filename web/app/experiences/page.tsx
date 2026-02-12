'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Waves, Mountain, Utensils, Compass } from 'lucide-react';
import supabaseImageLoader from '@/lib/imageLoader';

const experiences = [
    {
        title: 'River Bathing',
        description: 'Immerse yourself in the crystal-clear natural pools of the Kuru Ganga.',
        icon: <Waves className="w-8 h-8" />,
        image: 'https://rzydveefwizvckakorrc.supabase.co/storage/v1/object/public/accommodations/river-tent.jpg'
    },
    {
        title: 'Jungle Trekking',
        description: 'Guided tours through the hidden trails of the Kuruwita wilderness.',
        icon: <Mountain className="w-8 h-8" />,
        image: 'https://rzydveefwizvckakorrc.supabase.co/storage/v1/object/public/accommodations/treehouse.jpg'
    },
    {
        title: 'Traditional Dining',
        description: 'Authentic Sri Lankan cuisine prepared with locally sourced ingredients.',
        icon: <Utensils className="w-8 h-8" />,
        image: 'https://rzydveefwizvckakorrc.supabase.co/storage/v1/object/public/accommodations/cave-room.jpg'
    }
];

export default function ExperiencesPage() {
    return (
        <div className="bg-stone-50 dark:bg-stone-950 min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-stone-900 dark:text-white">Jungle Experiences</h1>
                    <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                        Beyond the stay, discover the soul of Sudagala through curated adventures.
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
                        >
                            <div className="w-full md:w-1/2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    loader={supabaseImageLoader}
                                    src={exp.image}
                                    alt={exp.title}
                                    fill
                                    className="object-cover"
                                    suppressHydrationWarning
                                />
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="text-green-700 dark:text-green-400" suppressHydrationWarning>{exp.icon}</div>
                                <h2 className="text-3xl md:text-4xl font-bold font-serif text-stone-900 dark:text-white">{exp.title}</h2>
                                <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                                    {exp.description} Explore the secrets of the rainforest and find peace in the rhythm of the jungle.
                                </p>
                                <Button variant="outline" className="rounded-full px-8">Inquire Now</Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

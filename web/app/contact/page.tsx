'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
    const phoneNumber = '94770306326';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <div className="bg-stone-50 dark:bg-stone-950 min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-stone-900 dark:text-white">Get in Touch</h1>
                        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                            Ready to embark on your jungle adventure? Reach out to us for bookings, inquiries, or just to say hello.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Call Us</h3>
                                    <p className="text-stone-600 dark:text-stone-400">+94 77 030 6326</p>
                                    <p className="text-stone-500 text-sm mt-1">Mon - Sun, 8am - 8pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Email Us</h3>
                                    <p className="text-stone-600 dark:text-stone-400">bookings@sudagala.com</p>
                                    <p className="text-stone-500 text-sm mt-1">We'll respond within 24 hours.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Visit Us</h3>
                                    <p className="text-stone-600 dark:text-stone-400">Sudagala, Kuruwita, Ratnapura, Sri Lanka</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl"
                        >
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 font-serif">Direct WhatsApp</h3>
                            <p className="text-stone-600 dark:text-stone-400 mb-8">
                                The fastest way to reach us is via WhatsApp. Click below to start a conversation with our concierge team.
                            </p>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold transition-transform hover:scale-[1.02]">
                                    <MessageCircle className="w-6 h-6" />
                                    Chat on WhatsApp
                                </Button>
                            </a>
                            <p className="text-[10px] text-center text-stone-400 mt-6 uppercase tracking-widest">Available for instant responses during business hours.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

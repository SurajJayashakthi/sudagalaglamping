'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Footer() {
    const [year, setYear] = useState(2026);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-stone-50 text-stone-600 py-24 border-t border-stone-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-emerald-900 font-bold mb-8 font-serif tracking-tight text-3xl">SUDAGALA</h3>
                        <p className="text-sm leading-relaxed text-stone-500 max-w-xs mb-6">
                            Sustainable luxury glamping in the heart of Kuruwita, Sri Lanka.
                        </p>
                        <div className="space-y-2 text-xs text-stone-400 font-medium">
                            <p className="flex items-center gap-2">
                                <span className="text-emerald-700">☀️</span> Solar-powered facilities
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-emerald-700">💧</span> Rainwater harvesting
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-emerald-900 font-bold mb-8 text-[11px] uppercase tracking-[0.2em]">Explore</h4>
                        <ul className="space-y-4 text-[13px] font-bold text-stone-400 uppercase tracking-widest">
                            <li><Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link></li>
                            <li><Link href="/packages" className="hover:text-emerald-700 transition-colors">Packages</Link></li>
                            <li><Link href="/contact" className="hover:text-emerald-700 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-emerald-900 font-bold mb-8 text-xs uppercase tracking-[0.2em]">Contact</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li>Sudagala Village, Kuruwita, Ratnapura</li>
                            <li><a href="https://wa.me/94770306326" className="hover:text-emerald-700 transition-colors">077 030 6326</a></li>
                            <li><a href="mailto:sudgalainfo@gmail.com" className="hover:text-emerald-700 transition-colors">sudgalainfo@gmail.com</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-emerald-900 font-bold mb-8 text-xs uppercase tracking-[0.2em]">Legal</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/terms" className="hover:text-emerald-700 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-emerald-700 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/admin" className="hover:text-emerald-700 transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-stone-200 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                    <p>&copy; {year} Sudagala Jungle Glamping. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">
                        Design & Development by Udara Sampath
                    </p>
                </div>
            </div>
        </footer>
    );
}

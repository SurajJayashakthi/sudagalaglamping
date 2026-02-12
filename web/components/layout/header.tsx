'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Packages', href: '/packages' },
        { name: 'About', href: '/about' },
    ];

    // For now, I will assume routes exist or will be created. 
    // Wait, the prompt asked for "Home, Packages, Gallery, About".
    // I should check if those routes exist, but for Visuals I will add them.
    // If Gallery/About pages don't exist, Links will 404. 
    // The user might just want the header updated visually found.

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg transition-all duration-300"
        >
            <div className="container mx-auto px-4 h-full flex items-center">
                {/* Logo */}
                <Link href="/" className="relative h-12 w-auto flex-shrink-0">
                    <Image
                        src="/images/hero/logo.png"
                        alt="Sudagala Jungle Glamping"
                        width={144}
                        height={48}
                        className="h-full w-auto object-contain object-left"
                        priority
                        suppressHydrationWarning
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-emerald-400' : 'text-white hover:text-emerald-400'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4 ml-auto">
                    <Link href="/packages" className="hidden md:block">
                        <Button
                            variant="primary"
                            className="bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-800 rounded-full px-6 py-2 text-sm font-bold shadow-md transition-all"
                        >
                            Book Now
                        </Button>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        suppressHydrationWarning
                    >
                        {isMobileMenuOpen ? <X suppressHydrationWarning /> : <Menu suppressHydrationWarning />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-stone-950 border-b border-white/10 p-4 md:hidden flex flex-col gap-4 shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white hover:text-emerald-400 text-lg font-bold py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-white/10 my-2" />
                        <Link href="/packages" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-bold">
                                Book Now
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

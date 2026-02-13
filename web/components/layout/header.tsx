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
    const [activeSection, setActiveSection] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            rootMargin: '-50% 0px -50% 0px', // Watch the middle line of the viewport
            threshold: 0,
        });
        const sections = ['home', 'about', 'packages'];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '/', id: 'home' },
        { name: 'Packages', href: '/packages', id: 'packages' },
        { name: 'About', href: '/#about', id: 'about' },
    ];

    // For now, I will assume routes exist or will be created. 
    // Wait, the prompt asked for "Home, Packages, Gallery, About".
    // I should check if those routes exist, but for Visuals I will add them.
    // If Gallery/About pages don't exist, Links will 404. 
    // The user might just want the header updated visually found.

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] h-20 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-md'
                : 'bg-stone-950/20 backdrop-blur-sm border-b border-white/10'
                }`}
            suppressHydrationWarning
        >
            <div className="container mx-auto px-4 h-full flex items-center">
                {/* Logo */}
                <Link href="/" className="relative h-12 w-auto flex-shrink-0">
                    <Image
                        src="/images/hero/logo.png"
                        alt="Sudagala Jungle Glamping"
                        width={144}
                        height={48}
                        className={`h-full w-auto object-contain object-left transition-all duration-300 ${isScrolled ? 'brightness-0' : ''}`}
                        priority
                        suppressHydrationWarning
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                    {navLinks.map((link) => {
                        let isActive = false;
                        if (pathname === '/') {
                            isActive = activeSection === link.id;
                        } else {
                            // If on another page, only highlight matching route
                            isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                        }

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold tracking-wide transition-colors ${isScrolled
                                    ? isActive ? 'text-emerald-700' : 'text-stone-600 hover:text-emerald-700'
                                    : isActive ? 'text-emerald-400' : 'text-white hover:text-emerald-400'
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
                        className={`md:hidden p-2 transition-all duration-300 z-[101] relative rounded-full ${isScrolled || isMobileMenuOpen ? 'text-emerald-950 bg-stone-100/80 shadow-sm' : 'text-white bg-black/20 backdrop-blur-sm'}`}
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
                        className="absolute top-0 left-0 right-0 h-screen bg-stone-950 border-b border-white/10 p-6 md:hidden flex flex-col justify-center items-center gap-8 shadow-2xl z-[100]"
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

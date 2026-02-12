'use client'

import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
    const phoneNumber = '94770306326';
    const message = 'Hi, I would like to inquire about a booking at Sudagala Jungle Glamping.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center backdrop-blur-md border border-white/20"
            aria-label="Contact us on WhatsApp"
            suppressHydrationWarning
        >
            <MessageCircle className="w-7 h-7" suppressHydrationWarning />
        </a>
    );
}

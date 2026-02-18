'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Is there electricity and internet?",
        answer: "Yes, we are fully solar-powered with backup generators. We offer complimentary Wi-Fi in common areas and most cabanas, though we encourage you to disconnect and enjoy nature."
    },
    {
        question: "Is it safe for families and children?",
        answer: "Absolutely. Our retreat is fenced and guarded 24/7. The jungle is safe to explore with our guides, and we have specific family-friendly cabanas."
    },
    {
        question: "What kind of food do you serve?",
        answer: "We specialize in authentic Sri Lankan cuisine prepared with locally sourced ingredients. We also offer Western breakfast options and can cater to dietary requirements upon request."
    },
    {
        question: "How do I get there?",
        answer: "We are located near Kuruwita, about 2.5 hours from Colombo. We can arrange private transport for you, or provide detailed driving directions upon booking."
    },
    {
        question: "What is the cancellation policy?",
        answer: "We offer a full refund for cancellations made 7 days prior to check-in. Please contact us for more details regarding peak season bookings."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.3em] mb-4">Common Questions</h2>
                    <h3 className="text-4xl md:text-5xl font-bold font-serif text-emerald-950">Good to Know</h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-stone-200 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-stone-50 shadow-md' : 'bg-white hover:bg-stone-50'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-emerald-950 text-lg md:text-xl font-serif">{faq.question}</span>
                                <span className="p-2 bg-emerald-100 rounded-full text-emerald-800">
                                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48' : 'max-h-0'}`}
                            >
                                <div className="p-6 pt-0 text-stone-600 leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

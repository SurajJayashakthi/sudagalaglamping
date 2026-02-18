'use client';

export function GoogleMapsEmbed() {
    return (
        <section className="py-0 relative h-[500px] w-full bg-stone-200">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15848.816662767073!2d80.3541673!3d6.7441673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3be9a2d3c1411%3A0x629555c42247f158!2sSudagala%20Resort!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
            ></iframe>

            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl max-w-sm border border-white/50 hidden md:block">
                <h3 className="font-bold text-emerald-950 font-serif text-xl mb-2">Find Us in the Jungle</h3>
                <p className="text-stone-600 text-sm mb-4">Just 20 minutes from Kuruwita town, hidden in the pristine rainforest buffer zone.</p>
                <a
                    href="https://goo.gl/maps/YourMapLinkHere"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-800 uppercase tracking-widest hover:underline"
                >
                    Get Directions &rarr;
                </a>
            </div>
        </section>
    );
}

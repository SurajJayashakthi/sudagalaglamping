'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SupabaseImage } from '@/components/ui/supabase-image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WaveDivider } from '@/components/ui/wave-divider';
import { AccommodationCard } from '@/components/ui/accommodation-card';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Stay } from '@/types';
import { NearbyWondersSection } from '@/components/nearby-wonders-section';
import { AmenitiesSlider } from '@/components/ui/amenities-slider';
import { TestimonialsSection } from '@/components/testimonials-section';
import { GoogleMapsEmbed } from '@/components/google-maps-embed';
import { FAQSection } from '@/components/faq-section';
import { Star } from 'lucide-react';

export default function Home() {
  const [stays, setStays] = useState<Stay[]>([]);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    async function fetchStays() {
      const { data, error } = await supabase
        .from('stays')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (data) setStays(data);
    }
    fetchStays();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* 1. HERO SECTION (High Authority) */}
      <section id="home" className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 z-0 select-none overflow-hidden"
          suppressHydrationWarning
        >
          <div className="absolute inset-0" style={{ borderBottomRightRadius: '0px' }}> {/* Removed radius for clearer wide view, or keep if preferred. Keeping flat for V2 authority look? User said "Descriptive to Powerful". Let's keep the image but maybe refine the overlay. */}
            <div className="absolute inset-0 bg-stone-900/40 z-10"></div>
            <SupabaseImage
              src="/images/hero/new_hero.jpg"
              alt="Sudagala Jungle Glamping"
              fill
              className="object-cover"
              priority
              suppressHydrationWarning
            />
            {/* Subtler gradient from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-stone-900/20 z-10"></div>
          </div>
        </motion.div>

        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6 opacity-90">
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-50">Sri Lanka&apos;s Hidden Gem</span>
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            </div>

            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-serif mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
              Escape Into Sri Lanka’s <br />
              <span className="italic text-emerald-300">Hidden Jungle.</span>
            </h1>

            <p className="text-lg md:text-2xl text-stone-100 mb-10 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-90">
              A private luxury glamping retreat near Kuruwita, where rainforest silence meets curated comfort, guided adventures, and unforgettable nights under the stars.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="#packages" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-10 py-8 text-lg font-bold shadow-[0_20px_50px_-12px_rgba(5,150,105,0.5)] transition-all hover:scale-105 border border-emerald-400/20">
                Check Availability
              </Button>
            </Link>
            <Link href="#experience" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm rounded-full px-10 py-8 text-lg font-bold transition-all hover:scale-105">
                Explore The Experience
              </Button>
            </Link>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-100/80"
          >
            <span className="flex items-center gap-2"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.9/5 Guest Rating</span>
            <span className="hidden md:inline">•</span>
            <span>Eco-Certified</span>
            <span className="hidden md:inline">•</span>
            <span>Solar Powered</span>
            <span className="hidden md:inline">•</span>
            <span>Locally Operated</span>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <WaveDivider fill="#fbfbfb" />
      </section>

      {/* 2. TRUST BAR (Stats) */}
      <section className="py-12 bg-stone-50 border-b border-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-stone-200/50">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-emerald-900 font-serif mb-2">200+</p>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Happy Guests</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-emerald-900 font-serif mb-2">4.9★</p>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-emerald-900 font-serif mb-2">3km</p>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">To Waterfalls</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-emerald-900 font-serif mb-2">100%</p>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Off-Grid Power</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE EXPERIENCE (Emotional Storytelling) */}
      <section id="experience" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-emerald-100/50 rounded-[3rem] rotate-3 z-0"></div>
              <div className="relative h-[500px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
                <SupabaseImage
                  src="/images/about/645721004.jpg"
                  alt="Sudagala Jungle Experience"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <p className="text-white font-serif italic text-2xl">&quot;Nature is not a place to visit. It is home.&quot;</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.4em] mb-6">The Experience</h2>
              <h3 className="text-4xl md:text-6xl font-bold font-serif text-emerald-950 mb-8 leading-tight">
                Reconnect with <br /> <span className="text-emerald-700 italic">Wild Silence.</span>
              </h3>
              <p className="text-stone-600 mb-10 text-lg leading-relaxed font-medium">
                Sudagala is more than a stay; it&apos;s a reset button. Located near the Sri Pada Forest Reserve, we offer an immersive nature experience where the only alarm clock is the morning birdsong.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "🌿", title: "Guided Jungle Treks", desc: "Expert naturalists lead you through pristine trails." },
                  { icon: "🐦", title: "Bird Watching", desc: "Observe rare species in their natural habitat." },
                  { icon: "✨", title: "Dark Sky Stargazing", desc: "Witness the cosmos away from city lights." },
                  { icon: "🔥", title: "Campfire Nights", desc: "Stories shared under the glow of the fire." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-stone-50 transition-colors">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-950 text-lg">{item.title}</h4>
                      <p className="text-stone-500 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACCOMMODATION (Clear Packages) */}
      <section id="packages" className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.3em] mb-4">Our Sanctuaries</h2>
            <h3 className="text-4xl md:text-6xl font-bold font-serif text-emerald-950 mb-6">Choose Your Haven</h3>
            <p className="text-stone-500 font-medium text-lg">
              Intimate cabanas and treehouses, each crafted to blend comfortable luxury with the raw beauty of the rainforest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {stays.length > 0 ? (
              stays.map((stay) => (
                <AccommodationCard key={stay.id} stay={stay} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-stone-400">Loading sanctuaries...</p>
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <p className="text-stone-500 text-sm font-bold uppercase tracking-widest mb-4">Limited Availability for Upcoming Season</p>
          </div>
        </div>
      </section>

      {/* Amenities Slider (Retained but polished) */}
      <section className="py-20 bg-white border-y border-stone-100">
        <AmenitiesSlider />
      </section>

      {/* 5. ACTIVITIES (Visual Grid) */}
      {/* Jungle Trek Highlight */}
      <section className="py-24 bg-emerald-950 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div> {/* Abstract pattern placeholder */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
              <SupabaseImage
                src="/images/facilities/hiking/WhatsApp Image 2025-11-05 at 9.43.33 PM.jpeg"
                alt="Waterfall Trek"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-10 left-10">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/30">Most Popular</span>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <h2 className="text-sm font-black text-emerald-400 uppercase tracking-[0.4em] mb-6">Signature Experience</h2>
              <h3 className="text-4xl md:text-6xl font-bold font-serif text-white mb-8 leading-tight">
                Hidden Waterfall <br />
                <span className="italic text-emerald-400">Expedition</span>
              </h3>
              <p className="text-emerald-100/80 text-lg mb-10 leading-relaxed max-w-lg">
                Embark on a guided trek through the dense diverse rainforest to reach a secluded waterfall. Swim in pristine natural pools and discover nature&apos;s secrets.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="font-bold text-white mb-1">2 Hours</h4>
                  <p className="text-xs text-emerald-400 uppercase tracking-wider">Duration</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="font-bold text-white mb-1">Beginner</h4>
                  <p className="text-xs text-emerald-400 uppercase tracking-wider">Difficulty</p>
                </div>
              </div>

              <Link href="/packages/jungle-trek">
                <Button className="!bg-white !text-emerald-950 hover:!bg-emerald-50 rounded-full px-10 py-7 text-lg font-bold shadow-lg shadow-black/20 transition-transform active:scale-95">
                  Book This Trek
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF (Testimonials) */}
      <TestimonialsSection />

      {/* Nearby Wonders (Retained) */}
      <NearbyWondersSection />

      {/* 7. LOCATION & MAP */}
      <GoogleMapsEmbed />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. FINAL CTA (Money Section) */}
      <section className="relative py-32 bg-stone-900 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <SupabaseImage
            src="/images/hero/new_hero.jpg" // Reusing hero for now, ideally a different dark jungle shot
            alt="Jungle Background"
            fill
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-stone-900/80"></div>
        </div>

        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold font-serif text-white mb-8 tracking-tight">
            Your Jungle Escape <br /><span className="italic text-emerald-400">Awaits.</span>
          </h2>
          <p className="text-xl text-stone-300 mb-12 font-medium max-w-2xl mx-auto">
            Limited stays available for the upcoming season. Secure your private sanctuary today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#packages">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105 border border-emerald-400/30">
                Reserve Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-stone-500 text-stone-300 hover:text-white hover:border-white rounded-full px-12 py-8 text-xl font-bold">
                Contact Us
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-xs text-stone-500 uppercase tracking-widest font-bold">
            No Credit Card Required for Inquiry
          </p>
        </div>
      </section>
    </div>
  );
}

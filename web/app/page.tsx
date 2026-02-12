'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SupabaseImage } from '@/components/ui/supabase-image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AccommodationCard } from '@/components/ui/accommodation-card';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Stay } from '@/types';
import { Wifi, Waves, Footprints, Flame } from 'lucide-react';
import { NearbyWondersSection } from '@/components/nearby-wonders-section';

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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 select-none" suppressHydrationWarning>
          <SupabaseImage
            src="/images/hero/new_hero.jpg"
            alt="Sudagala Jungle Glamping"
            fill
            className="object-cover"
            priority
            suppressHydrationWarning
          />
          <div className="absolute inset-0 bg-stone-900/20"></div>
        </motion.div>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-bold text-white/90 drop-shadow-md">Glamping, Because Therapy is Expensive</h2>
            <h3 className="text-xs md:text-sm tracking-[0.5em] uppercase mb-8 font-bold text-emerald-300 drop-shadow-md">Sudagala Village • Kuruwita</h3>
            <h1 className="text-7xl md:text-[10rem] font-bold font-serif mb-12 leading-[0.8] tracking-tighter drop-shadow-2xl">
              Sanctuary <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white italic">of Wilds</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-stone-50 mb-14 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            Welcome to Sudagala Jungle Glamping, where the magic of Sri Lanka's wilderness meets thoughtful luxury. Our intimate forest retreat offers you a chance to reconnect with nature without sacrificing comfort.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="#packages">
              <Button size="lg" className="bg-emerald-900 hover:bg-emerald-950 text-white rounded-full px-16 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105 w-full sm:w-auto">
                View Packages
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl order-2 lg:order-1">
              <SupabaseImage
                src="/images/about/645721004.jpg"
                alt="Sudagala Jungle Experience"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.4em] mb-6">About the retreat</h2>
              <h3 className="text-5xl md:text-6xl font-bold font-serif text-emerald-950 mb-10 leading-tight">With Us You Can Be Closer to Nature</h3>
              <p className="text-stone-600 mb-8 text-lg leading-relaxed font-medium">
                Sudagala Jungle Glamping is a peaceful retreat near the Sri Pada Forest Reserve, offering an immersive nature experience where modern comfort meets the untamed beauty of the jungle.
              </p>
              <div className="space-y-5 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl">🌿</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1">Guided Jungle Treks</h4>
                    <p className="text-stone-500 text-sm">Expert naturalists lead you through pristine forest trails</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl">🐦</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1">Canopy Walkways for Bird Watching</h4>
                    <p className="text-stone-500 text-sm">Observe rare species in their natural habitat</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl">🧘</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1">Sunset Meditation in Forest Clearings</h4>
                    <p className="text-stone-500 text-sm">Find inner peace surrounded by nature's symphony</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1">Stargazing Experiences</h4>
                    <p className="text-stone-500 text-sm">Witness the cosmos away from city lights</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl">🥘</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 mb-1">Sustainable Foraging & Outdoor Cooking</h4>
                    <p className="text-stone-500 text-sm">Learn traditional methods from local experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-emerald-900 mb-4 font-serif">4+</div>
              <p className="text-stone-500 font-medium uppercase tracking-widest text-xs">Great Tents</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-emerald-900 mb-4 font-serif">1+</div>
              <p className="text-stone-500 font-medium uppercase tracking-widest text-xs">Camp Site</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-emerald-900 mb-4 font-serif">1st</div>
              <p className="text-stone-500 font-medium uppercase tracking-widest text-xs">Luxury Experience</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-emerald-900 mb-4 font-serif">350+</div>
              <p className="text-stone-500 font-medium uppercase tracking-widest text-xs">Guests Arrived</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-40 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-32">
            <h2 className="text-[11px] font-bold text-emerald-800 uppercase tracking-[0.5em] mb-4">On-Site Amenities</h2>
            <h3 className="text-5xl md:text-6xl font-bold font-serif text-emerald-950">Curated For Comfort</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-24">
            {[
              { icon: 'Waves', label: '2 Spring Pools', desc: 'Natural mountain water' },
              { icon: 'Wifi', label: 'Starlink WiFi', desc: 'High-speed connectivity' },
              { icon: 'Flame', label: 'BBQ Setup', desc: 'Grill fee Rs.1500' },
              { icon: 'Footprints', label: 'Nature Trails', desc: 'Guided jungle paths' },
              { icon: 'Coffee', label: 'Coffee Setup', desc: 'Inclusive in all units' },
              { icon: 'Gamepad2', label: 'Indoor Games', desc: 'Carrom, Chess, Cards' },
              { icon: 'Bird', label: 'Bird Watching', desc: 'Rich local biodiversity' },
              { icon: 'ShieldCheck', label: 'CCTV Parking', desc: 'Secure lighting & site' }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:shadow-xl group-hover:scale-105 transition-all duration-500">
                  <div className="text-emerald-900 w-10 h-10 flex items-center justify-center">
                    {/* Simplified icon rendering logic for the example */}
                    {item.label === '2 Spring Pools' ? <Waves className="w-full h-full" suppressHydrationWarning /> :
                      item.label === 'Starlink WiFi' ? <Wifi className="w-full h-full" suppressHydrationWarning /> :
                        item.label === 'BBQ Setup' ? <Flame className="w-full h-full" suppressHydrationWarning /> :
                          item.label === 'Nature Trails' ? <Footprints className="w-full h-full" suppressHydrationWarning /> :
                            item.label === 'Coffee Setup' ? <div className="text-2xl">☕</div> :
                              item.label === 'Indoor Games' ? <div className="text-2xl">🎲</div> :
                                item.label === 'Bird Watching' ? <div className="text-2xl">🦜</div> :
                                  <div className="text-2xl">🛡️</div>}
                  </div>
                </div>
                <h4 className="font-bold text-emerald-950 mb-3 uppercase tracking-widest text-xs">{item.label}</h4>
                <p className="text-stone-400 text-[11px] font-medium tracking-wide uppercase">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Packages Section */}
      <section id="packages" className="py-40 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.3em] mb-6">Our Accommodations</h2>
              <h3 className="text-6xl md:text-7xl font-bold font-serif text-emerald-950 leading-tight">Wild <br />Sanctuaries</h3>
            </div>
            <div className="max-w-xs">
              <p className="text-stone-500 font-medium leading-relaxed mb-6">
                Four intimate cabanas, each a private haven in the jungle canopy. Every detail has been crafted to blend seamless comfort with the raw beauty of nature.
              </p>
              <Link href="/packages" className="text-xs font-bold text-emerald-900 border-b-2 border-emerald-900 uppercase tracking-widest pb-1 hover:text-emerald-700 transition-colors">
                View Full Pricing Tiers
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {stays.map((stay) => (
              <AccommodationCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>
      </section>

      {/* Jungle Hiking Section */}
      <section className="py-40 bg-gradient-to-br from-emerald-50 via-white to-stone-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl order-2 lg:order-1 group">
              <SupabaseImage
                src="/images/facilities/hiking/WhatsApp Image 2025-11-05 at 9.43.33 PM.jpeg"
                alt="Waterfall Trek"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">Group Rate</p>
                      <p className="text-3xl font-bold text-emerald-950 font-serif">Rs. 6,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Duration</p>
                      <p className="text-lg font-bold text-emerald-900">2 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.4em] mb-6">Adventure Awaits</h2>
              <h3 className="text-5xl md:text-6xl font-bold font-serif text-emerald-950 mb-10 leading-tight">
                Guided Jungle <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-900 italic">Waterfall Hike</span>
              </h3>
              <p className="text-stone-600 text-lg mb-10 leading-relaxed font-medium">
                Embark on a 2-hour guided trek through lush wilderness to a hidden scenic waterfall. A true immersion into the Ratnapura rainforest, where nature reveals its most spectacular secrets.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <div className="w-12 h-12 bg-emerald-900 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🥾</span>
                  </div>
                  <h4 className="font-bold text-emerald-950 text-sm mb-2">Expert Guides</h4>
                  <p className="text-xs text-stone-500 font-medium">Local naturalists lead the way</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <div className="w-12 h-12 bg-emerald-900 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">💧</span>
                  </div>
                  <h4 className="font-bold text-emerald-950 text-sm mb-2">Hidden Falls</h4>
                  <p className="text-xs text-stone-500 font-medium">Pristine natural pools</p>
                </div>
              </div>

              {/* CTA */}
              <Link href="/packages/jungle-trek" className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-900 text-white rounded-2xl hover:bg-emerald-800 transition-all hover:shadow-xl group">
                <span className="font-bold uppercase tracking-widest text-xs">Book This Trek</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Explore Section */}
      <NearbyWondersSection />

      {/* Policy Quick Info */}
      <section className="py-32 bg-stone-50 border-t border-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-[0.3em] mb-8">Stay Policy</h4>
              <ul className="space-y-4 text-sm text-stone-500 font-medium">
                <li className="flex justify-between border-b border-stone-200 pb-3">
                  <span>Check-in</span>
                  <span className="text-emerald-800">2:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-stone-200 pb-3">
                  <span>Check-out</span>
                  <span className="text-emerald-800">12:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Quiet Hours</span>
                  <span className="text-emerald-800">After 11 PM</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-[0.3em] mb-8">Meal Info</h4>
              <ul className="space-y-4 text-sm text-stone-500 font-medium">
                <li className="flex gap-4">
                  <span className="text-emerald-800">🍳</span>
                  <span>SL Rice & Curry / Bread Breakfast</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-emerald-800">🍲</span>
                  <span>Traditional Rice & Curry Lunch</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-emerald-800">🍝</span>
                  <span>Fried Rice / Kottu / Noodles Dinner</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-[0.3em] mb-8">Child Policy</h4>
              <ul className="space-y-4 text-sm text-stone-500 font-medium">
                <li className="flex justify-between border-b border-stone-200 pb-3">
                  <span>Under 6 Years</span>
                  <span className="text-emerald-800">Free</span>
                </li>
                <li className="flex justify-between border-b border-stone-200 pb-3">
                  <span>Ages 7 - 12</span>
                  <span className="text-emerald-800">Half Rate</span>
                </li>
                <li className="flex justify-between">
                  <span>Ages 13+</span>
                  <span className="text-emerald-800">Adult Rate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-[6rem] font-bold font-serif mb-12 text-emerald-950 leading-tight tracking-tighter">Ready for your <br /><span className="italic font-normal">wilderness retreat?</span></h2>
          <p className="text-stone-500 text-xl mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
            Reserve your stay today and experience the serenity of Sudagala Jungle Glamping.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-emerald-900 hover:bg-emerald-950 text-white rounded-full px-16 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105">
                Contact via WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

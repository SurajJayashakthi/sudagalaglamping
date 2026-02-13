import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/floating-whatsapp';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Sudagala Jungle Glamping | Luxury Eco-Resort Kuruwita',
  description: 'Experience jungle luxury at Sudagala Jungle Glamping. Elevated river tents, rock haven treehouses, and cave rooms in Kuruwita, Sri Lanka.',
  keywords: ['Glamping in Sri Lanka', 'Kuruwita Nature Resorts', 'Eco-stays Ratnapura', 'Luxury Camping', 'Sudagala'],
  openGraph: {
    title: 'Sudagala Jungle Glamping | Luxury Eco-Resort',
    description: 'Experience jungle luxury at Sudagala Jungle Glamping.',
    url: 'https://sudagala.com',
    siteName: 'Sudagala Jungle Glamping',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Sudagala Jungle Glamping',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-stone-900`} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

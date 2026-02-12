// Image mapping for local accommodations
export const accommodationImages = {
    'Tiny Cabana': '/images/accommodations/Cabanas/FB_IMG_1758901694155.jpg',
    'Cave Room': '/images/accommodations/cave room/FB_IMG_1758163888000.jpg',
    'Latina Cave Room': '/images/accommodations/latina cave room/WhatsApp Image 2026-01-18 at 12.12.50 PM (1).jpeg',
    'RockHaven Tree House': '/images/accommodations/tree house/FB_IMG_1758901797790.jpg',
    'Treehouse': '/images/accommodations/tree house/FB_IMG_1758901797790.jpg',
    'Day Outing': '/images/accommodations/nature pool/FB_IMG_1758163912563.jpg',
    'Couple Dayout': '/images/accommodations/nature pool/FB_IMG_1758163912563.jpg',
};

// Facility images
export const facilityImages = {
    pool: '/images/accommodations/nature pool/FB_IMG_1758163912563.jpg',
    hiking: '/images/facilities/hiking/WhatsApp Image 2025-11-05 at 9.43.33 PM.jpeg',
    restaurant: '/images/facilities/resturant/FB_IMG_1758901708463.jpg',
    activities: '/images/facilities/activities/1759140858978.jpg',
};

// Hero images
export const heroImages = {
    main: '/images/hero/new_hero.jpg',
    about: '/images/about/645721004.jpg',
};

// Gallery images by category
export const galleryImages = {
    cabanas: [
        '/images/accommodations/Cabanas/FB_IMG_1758901694155.jpg',
        '/images/accommodations/Cabanas/FB_IMG_1758901699707.jpg',
        '/images/accommodations/Cabanas/FB_IMG_1758901838848.jpg',
        '/images/accommodations/Cabanas/PXL_20251025_090529040.jpg',
    ],
    caveRoom: [
        '/images/accommodations/cave room/FB_IMG_1758163888000.jpg',
        '/images/accommodations/cave room/FB_IMG_1758163897637.jpg',
        '/images/accommodations/cave room/FB_IMG_1758163903931.jpg',
    ],
    latinaCave: [
        '/images/accommodations/latina cave room/WhatsApp Image 2026-01-18 at 12.12.50 PM (1).jpeg',
        '/images/accommodations/latina cave room/WhatsApp Image 2026-01-18 at 12.12.51 PM (1).jpeg',
    ],
    treeHouse: [
        '/images/accommodations/tree house/FB_IMG_1758901797790.jpg',
        '/images/accommodations/tree house/FB_IMG_1758901783967.jpg',
        '/images/accommodations/tree house/FB_IMG_1758901800242.jpg',
    ],
    naturePool: [
        '/images/accommodations/nature pool/FB_IMG_1758163912563.jpg',
        '/images/accommodations/nature pool/FB_IMG_1758901640515.jpg',
        '/images/accommodations/nature pool/FB_IMG_1758901811732.jpg',
    ],
};

// Helper function to get accommodation image
export function getAccommodationImage(title: string): string {
    return accommodationImages[title as keyof typeof accommodationImages] || accommodationImages['Tiny Cabana'];
}

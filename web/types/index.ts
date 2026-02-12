export interface Stay {
    id: string
    title: string
    slug: string
    category: 'Cabana' | 'Cave Room' | 'Treehouse' | 'Day Outing'
    description: string
    base_price_lkr: number
    price_fb: number
    price_hb: number
    price_bb: number
    pricing_type: 'fixed' | 'per_person'
    max_guests: number
    min_guests: number
    features: string[]
    image_url: string
    itinerary: Array<{
        day: string;
        title: string;
        activities: string[];
    }>
    highlights: {
        difficulty?: string;
        duration?: string;
        essentials?: string;
    }
    tagline?: string
    is_active: boolean
    created_at: string
}

export interface Booking {
    id: string
    customer_name: string
    phone: string
    check_in: string
    check_out: string
    total_price: number
    accommodation_id: string
    status: string
    created_at: string
}

export interface Package {
    id: string
    title: string
    description: string
    price: number
    duration: string
    image_url: string
    created_at: string
}

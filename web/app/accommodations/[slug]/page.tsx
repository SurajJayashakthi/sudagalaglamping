import { AccommodationDetailClient } from '@/components/accommodations/accommodation-detail-client';

export async function generateStaticParams() {
    return [
        { slug: 'jungle-trek' },
        { slug: 'cave-room' },
        { slug: 'rockhaven-tree-house' },
        { slug: 'couple-dayout' },
        { slug: 'tiny-cabana' },
    ];
}

export default async function AccommodationDetail({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    return <AccommodationDetailClient slug={slug} />;
}

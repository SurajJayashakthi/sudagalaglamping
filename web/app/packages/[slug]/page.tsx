import { PackageDetailClient } from '@/components/packages/package-detail-client';

export async function generateStaticParams() {
    return [
        { slug: 'jungle-trek' },
        { slug: 'cave-room' },
        { slug: 'rockhaven-tree-house' },
        { slug: 'couple-dayout' },
        { slug: 'tiny-cabana' },
    ];
}

export default async function PackageDetail({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    return <PackageDetailClient slug={slug} />;
}

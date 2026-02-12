'use client'

import Image, { ImageProps } from 'next/image'

interface SupabaseImageProps extends Omit<ImageProps, 'src'> {
    src: string
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
    quality?: number
}

/**
 * SupabaseImage component that automatically appends transformation parameters
 * for optimized delivery from Supabase Storage.
 */
export function SupabaseImage({
    src,
    width = 800,
    quality = 75,
    alt,
    className,
    ...props
}: SupabaseImageProps) {
    // Basic detection for Supabase URLs
    const isSupabase = src.includes('supabase.co') && src.includes('/public/')

    const optimizedSrc = isSupabase
        ? `${src}?width=${width}&quality=${quality}&format=webp`
        : src

    return (
        <Image
            src={optimizedSrc}
            alt={alt || 'Sudagala Jungle glamping'}
            className={className}
            {...props}
            {...(!props.fill ? {
                width: Number(width),
                height: props.height ? Number(props.height) : Math.round(Number(width) * 0.6)
            } : {})}
            suppressHydrationWarning
        />
    )
}

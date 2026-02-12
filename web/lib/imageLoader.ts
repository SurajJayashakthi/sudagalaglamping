'use client'

export default function supabaseImageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (supabaseUrl && src.startsWith(supabaseUrl)) {
        // Transform /object/public/ -> /render/image/public/
        return src.replace('/object/public/', '/render/image/public/') + `?width=${width}&quality=${quality || 75}&format=webp`
    }
    return src
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { data, error } = await supabase.from('bookings').select('count', { count: 'exact', head: true });

        if (error) throw error;

        return NextResponse.json({ status: 'alive', timestamp: new Date().toISOString(), data });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: (error as Error).message }, { status: 500 });
    }
}

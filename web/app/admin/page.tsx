'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Booking } from '@/types'
import { X, Calendar, Phone, User, DollarSign, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
    const [session, setSession] = useState<Session | null>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    // const router = useRouter() // Not strictly needed if conditional rendering is used

    async function fetchBookings() {
        const { data } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setBookings(data)
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
            if (session) fetchBookings()
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session) fetchBookings()
        })

        return () => subscription.unsubscribe()
    }, [])

    async function handleStatusUpdate(id: string, newStatus: string) {
        if (!confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) return

        const { error } = await supabase
            .from('bookings')
            .update({ status: newStatus })
            .eq('id', id)

        if (error) {
            console.error('Error updating booking:', error)
            alert('Failed to update booking status: ' + error.message)
        } else {
            fetchBookings()
            setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null)
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) alert(error.message)
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        setSession(null)
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 text-stone-500">Loading admin panel...</div>

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900">
                <form onSubmit={handleLogin} className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-200 dark:border-stone-700">
                    <h1 className="text-3xl font-bold mb-8 text-center font-serif text-stone-900 dark:text-white">Admin Access</h1>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-stone-600 dark:text-stone-300">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                required
                                placeholder="admin@sudagala.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-stone-600 dark:text-stone-300">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <Button type="submit" className="w-full py-3 text-lg font-semibold bg-green-700 hover:bg-green-800 text-white rounded-lg shadow-lg">
                            Secure Login
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-6 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-serif text-stone-900 dark:text-white mb-2">Dashboard</h1>
                    <p className="text-stone-500 dark:text-stone-400">Welcome back, Admin. Here is what&apos;s happening today.</p>
                </div>
                <Button onClick={handleLogout} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30">Sign Out</Button>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
                <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex flex-wrap justify-between items-center bg-stone-50/50 dark:bg-stone-900/50 gap-4">
                    <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200">Recent Bookings</h2>
                    <div className="flex gap-4">
                        <Link href="/admin/stays">
                            <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">Manage Sanctuary Stays</Button>
                        </Link>
                        <Button size="sm" variant="outline">Export CSV</Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {/* Desktop Table View */}
                    <table className="hidden md:table w-full text-left text-sm text-stone-600 dark:text-stone-300">
                        <thead className="bg-stone-100 dark:bg-stone-950/50 uppercase text-xs tracking-wider text-stone-500">
                            <tr>
                                <th className="p-5 font-semibold">Customer</th>
                                <th className="p-5 font-semibold">Dates</th>
                                <th className="p-5 font-semibold">Total</th>
                                <th className="p-5 font-semibold">Status</th>
                                <th className="p-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors">
                                    <td className="p-5">
                                        <div className="font-bold text-stone-900 dark:text-white text-base">{booking.customer_name}</div>
                                        <div className="text-xs text-stone-400 mt-1 font-mono">{booking.phone}</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="font-medium text-stone-900 dark:text-stone-200">{new Date(booking.check_in).toLocaleDateString()}</div>
                                        <div className="text-xs text-stone-500 mt-1">to {new Date(booking.check_out).toLocaleDateString()}</div>
                                    </td>
                                    <td className="p-5 font-mono text-stone-900 dark:text-stone-200 font-medium">LKR {(booking.total_price || 0).toLocaleString()}</td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="hover:bg-stone-200 dark:hover:bg-stone-700"
                                            onClick={() => setSelectedBooking(booking)}
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile Card View */}
                    <div className="md:hidden flex flex-col divide-y divide-stone-100 dark:divide-stone-800">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="p-6 space-y-4 hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-stone-900 dark:text-white text-lg">{booking.customer_name}</div>
                                        <div className="text-sm text-stone-400 font-mono">{booking.phone}</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-stone-50 dark:bg-stone-950 p-3 rounded-xl border border-stone-100 dark:border-stone-800">
                                        <p className="text-stone-400 text-xs mb-1 uppercase tracking-wider">Check In</p>
                                        <p className="font-medium text-stone-900 dark:text-stone-200">{new Date(booking.check_in).toLocaleDateString()}</p>
                                    </div>
                                    <div className="bg-stone-50 dark:bg-stone-950 p-3 rounded-xl border border-stone-100 dark:border-stone-800">
                                        <p className="text-stone-400 text-xs mb-1 uppercase tracking-wider">Total</p>
                                        <p className="font-bold text-stone-900 dark:text-stone-200">LKR {(booking.total_price || 0).toLocaleString()}</p>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white hover:bg-stone-200 dark:hover:bg-stone-700"
                                    onClick={() => setSelectedBooking(booking)}
                                >
                                    View Full Details
                                </Button>
                            </div>
                        ))}
                    </div>

                    {bookings.length === 0 && (
                        <div className="p-12 text-center text-stone-500 italic">
                            No bookings found. Time to market the jungle!
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center bg-stone-50/50 dark:bg-stone-900/50">
                            <h2 className="text-xl font-bold text-stone-900 dark:text-white font-serif">Booking Details</h2>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-stone-500" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                                    <User className="w-6 h-6 text-green-700 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Customer</p>
                                    <p className="text-xl font-bold text-stone-900 dark:text-white">{selectedBooking.customer_name}</p>
                                    <p className="text-stone-500 font-mono mt-1 flex items-center gap-2">
                                        <Phone className="w-3 h-3" /> {selectedBooking.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                        <Calendar className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Check-in</p>
                                        <p className="text-lg font-bold text-stone-800 dark:text-stone-200">{new Date(selectedBooking.check_in).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                        <Calendar className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Check-out</p>
                                        <p className="text-lg font-bold text-stone-800 dark:text-stone-200">{new Date(selectedBooking.check_out).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                                    <DollarSign className="w-6 h-6 text-amber-700 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Total Payment</p>
                                    <p className="text-2xl font-black text-stone-900 dark:text-white">LKR {(selectedBooking.total_price || 0).toLocaleString()}</p>
                                    <p className="text-xs text-stone-500 mt-1 uppercase tracking-tighter italic">Status: {selectedBooking.status}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                {(selectedBooking.status === 'pending' || selectedBooking.status === 'confirmed') && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedBooking.status === 'pending' && (
                                            <Button
                                                onClick={() => handleStatusUpdate(selectedBooking.id, 'confirmed')}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-auto py-3 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none transition-transform hover:scale-[1.02]"
                                            >
                                                Confirm Booking
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => handleStatusUpdate(selectedBooking.id, 'cancelled')}
                                            variant="outline"
                                            className="h-auto py-3 rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 border border-red-100 dark:border-red-900 transition-transform hover:scale-[1.02]"
                                        >
                                            Cancel Booking
                                        </Button>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href={`https://wa.me/${selectedBooking.phone.replace(/[^0-9]/g, '')}?text=Hello ${encodeURIComponent(selectedBooking.customer_name)}, regarding your booking at Sudagala Jungle Glamping...`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-200 dark:shadow-none"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        WhatsApp
                                    </a>
                                    <Button
                                        variant="outline"
                                        className="py-4 h-auto rounded-2xl font-bold border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
                                        onClick={() => setSelectedBooking(null)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

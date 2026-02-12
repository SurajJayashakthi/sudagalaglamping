export default function TermsPage() {
    return (
        <div className="bg-stone-50 dark:bg-stone-950 min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold font-serif mb-12 text-stone-900 dark:text-white text-center">Terms & Conditions</h1>
                <div className="prose dark:prose-invert prose-stone max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Bookings</h2>
                        <p>All bookings are subject to availability and confirmation. A deposit may be required during peak seasons.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Cancellations</h2>
                        <p>Cancellations made within 48 hours of arrival may incur a fee. Please contact us for specific policy details.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Guest Responsibilities</h2>
                        <p>Guests are expected to respect nature and follow all safety guidelines provided by the Sudagala team.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

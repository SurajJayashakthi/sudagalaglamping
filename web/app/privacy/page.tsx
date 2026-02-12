export default function PrivacyPage() {
    return (
        <div className="bg-stone-50 dark:bg-stone-950 min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold font-serif mb-12 text-stone-900 dark:text-white text-center">Privacy Policy</h1>
                <div className="prose dark:prose-invert prose-stone max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Data Collection</h2>
                        <p>We collect personal information such as name, phone number, and booking dates solely for processing your stay at Sudagala Jungle Glamping.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Usage of Information</h2>
                        <p>Your data is used to confirm bookings, calculate pricing, and communicate essential travel information to you.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Data Protection</h2>
                        <p>We implement industry-standard security measures to protect your data from unauthorized access or disclosure.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

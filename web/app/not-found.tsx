import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-8xl font-bold font-serif text-green-900 dark:text-green-500 mb-4">404</h2>
            <h1 className="text-3xl font-bold mb-6 text-stone-900 dark:text-white">Lost in the Jungle?</h1>
            <p className="text-stone-600 dark:text-stone-400 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                It seems the trail you're looking for has been reclaimed by nature. Let's get you back to the main lodge.
            </p>
            <Link href="/">
                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white px-10 rounded-full py-6 text-lg tracking-wide shadow-xl">
                    Return to Base Camp
                </Button>
            </Link>
        </div>
    );
}

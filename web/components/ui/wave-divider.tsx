'use client';

interface WaveDividerProps {
    className?: string;
    fill?: string;
}

export function WaveDivider({ className = '', fill = 'currentColor' }: WaveDividerProps) {
    return (
        <div className={`absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] ${className}`}>
            <svg
                className="relative block w-full h-[60px] md:h-[100px]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
                    fill={fill}
                    className="transition-all"
                />
            </svg>
        </div>
    );
}

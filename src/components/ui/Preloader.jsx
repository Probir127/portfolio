import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const progressRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Animate out
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 1.5,
                        ease: "power4.inOut",
                        onComplete: onComplete
                    });
                }
            });

            // Progress Simulation
            let prog = { val: 0 };
            tl.to(prog, {
                val: 100,
                duration: 2.5,
                ease: "power2.inOut",
                onUpdate: () => setProgress(Math.floor(prog.val))
            });

            // Text Reveal
            tl.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 bg-[#050505] z-[10000] flex flex-col justify-between p-10 font-mono text-teal-500">
            <div className="text-sm uppercase tracking-widest">
                Loading Experience
            </div>

            <div className="flex flex-col items-center">
                <h1 ref={textRef} className="text-4xl md:text-6xl font-black font-serif text-white mb-8">
                    PROBIR SAHA SHOHOM
                </h1>
                <div className="w-full max-w-md h-[1px] bg-gray-900 relative">
                    <div
                        ref={progressRef}
                        className="absolute top-0 left-0 h-full bg-teal-500 transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="text-right text-6xl font-black opacity-50">
                {progress}%
            </div>
        </div>
    );
}

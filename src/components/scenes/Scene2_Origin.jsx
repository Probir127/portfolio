import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Scene2_Origin() {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Massive Title Parallax
            gsap.to(".origin-title-layer", {
                scrollTrigger: {
                    trigger: ".origin-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: -150
            })

            // 2. Photo Clip-Path Reveal
            gsap.fromTo(".origin-photo-reveal",
                { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                {
                    scrollTrigger: {
                        trigger: ".photo-container",
                        start: "top 70%",
                        end: "top 30%",
                        scrub: 1
                    },
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    ease: "power2.inOut"
                }
            )

            // 3. Timeline Items - Stagger Scale
            const items = gsap.utils.toArray('.timeline-item')
            items.forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    scale: 0.8,
                    opacity: 0,
                    x: 100,
                    duration: 1,
                    ease: "power3.out"
                })
            })

            // 4. Summary Text Reveal
            gsap.from(".summary-text", {
                scrollTrigger: {
                    trigger: ".summary-text",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 1,
            })

        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="origin" ref={containerRef} className="origin-section min-h-screen py-32 relative bg-[#050505] overflow-hidden flex items-center">

            {/* Massive Background Title Layer */}
            <div className="origin-title-layer absolute top-20 -left-20 w-[200%] z-0 pointer-events-none opacity-5 whitespace-nowrap">
                <h2 className="text-massive text-outline select-none">ORIGIN STORY</h2>
            </div>

            {/* Constellation Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full">
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" className="text-teal-500 fill-current" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10 w-full">

                {/* Left: Photo Reveal */}
                <div className="photo-container relative lg:sticky lg:top-32 h-fit">
                    <div className="origin-photo-reveal overflow-hidden rounded-sm max-h-[600px] w-full relative group">
                        <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                        <img
                            src="/probir.jpg"
                            alt="Probir Saha Shohom"
                            className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                        />
                    </div>
                </div>

                {/* Right: Narrative Timeline */}
                <div className="space-y-24">
                    <div>
                        <h2 className="text-section-title font-bold font-display mb-12 text-white leading-none">
                            THE <br /> <span className="text-teal-500">GENESIS</span>
                        </h2>

                        {/* Professional Summary */}
                        <div className="summary-text relative pl-8 py-2">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-500 to-transparent"></div>
                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                                {content.origin.summary}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-16 border-l border-gray-900 ml-2 pl-10 relative">
                        {content.origin.timeline.map((item, i) => (
                            <div key={i} className="timeline-item relative group">
                                <span className="absolute -left-[45px] top-2 w-3 h-3 bg-gray-800 rounded-full border border-gray-600 transition-colors duration-300 group-hover:bg-teal-500 group-hover:border-teal-500">
                                    <span className="absolute inset-0 rounded-full bg-teal-500 opacity-0 group-hover:animate-ping"></span>
                                </span>
                                <span className="text-teal-500 font-mono text-xs tracking-widest block mb-1 opacity-60">0{i + 1} — {item.year}</span>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 font-display text-white">{item.event}</h3>
                                <p className="text-gray-500 text-lg leading-relaxed max-w-md">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

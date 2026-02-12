import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { content } from '../../data/content'

export default function Scene1_Hook() {
    const containerRef = useRef(null)
    const [displayText, setDisplayText] = useState('')
    const [showCursor, setShowCursor] = useState(true)

    // GSAP entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

            // Ambient Background Animation
            gsap.to(".bg-orb", {
                x: "random(-100, 100)",
                y: "random(-50, 50)",
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 2
            })

            tl.from(".word-line .char", {
                y: 200,
                opacity: 0,
                duration: 1.5,
                stagger: 0.05,
                rotateX: -90
            }, 0.5)
                .from(".hero-sub", {
                    opacity: 0,
                    y: 20,
                    duration: 1
                }, "-=1")
                .from(".hero-cta", {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.5")
                .from(".scroll-indicator", {
                    opacity: 0,
                    y: -20,
                    duration: 1
                }, "-=0.5")

        }, containerRef)

        return () => ctx.revert()
    }, [])

    // Typing effect — fully state-driven, StrictMode safe
    useEffect(() => {
        const roles = content.hero.roles || ["Backend Architect"]
        let roleIndex = 0
        let charIndex = 0
        let phase = 'typing' // 'typing' | 'pausing' | 'deleting'
        let timeoutId = null

        const tick = () => {
            const currentRole = roles[roleIndex]

            if (phase === 'typing') {
                charIndex++
                setDisplayText(currentRole.slice(0, charIndex))
                if (charIndex >= currentRole.length) {
                    phase = 'pausing'
                    timeoutId = setTimeout(tick, 2000) // Pause before deleting
                } else {
                    timeoutId = setTimeout(tick, 100)
                }
            } else if (phase === 'pausing') {
                phase = 'deleting'
                timeoutId = setTimeout(tick, 50)
            } else if (phase === 'deleting') {
                charIndex--
                setDisplayText(currentRole.slice(0, charIndex))
                if (charIndex <= 0) {
                    phase = 'typing'
                    roleIndex = (roleIndex + 1) % roles.length
                    charIndex = 0
                    timeoutId = setTimeout(tick, 500) // Pause before next word
                } else {
                    timeoutId = setTimeout(tick, 50)
                }
            }
        }

        // Start after preloader animation is done
        const startDelay = setTimeout(() => {
            tick()
        }, 2500)

        return () => {
            clearTimeout(startDelay)
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [])

    // Blinking cursor
    useEffect(() => {
        const id = setInterval(() => setShowCursor(prev => !prev), 530)
        return () => clearInterval(id)
    }, [])

    // Helper to split text
    const SplitWord = ({ text, className }) => (
        <div className={`word-line overflow-hidden inline-block ${className}`}>
            {text.split("").map((char, i) => (
                <span key={i} className="char inline-block transform-style-3d">{char === ' ' ? '\u00A0' : char}</span>
            ))}
        </div>
    )

    return (
        <section id="hero" ref={containerRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] perspective-1000 px-6">

            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="bg-orb absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-teal-900/10 rounded-full blur-[100px]"></div>
                {/* Background Gradient & Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-grid-floor opacity-20 transform perspective-1000 rotateX(60deg) scale(1.5)"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-fog"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-teal-900/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                </div>
            </div>

            <div className="z-10 flex flex-col items-center text-center leading-none relative">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-teal-500/50 to-transparent"></div>

                <h1 className="text-hero-name font-bold uppercase tracking-tighter text-white mix-blend-exclusion">
                    <SplitWord text="Probir Saha" />
                    <br className="md:hidden" />
                    <span className="text-outline mx-4 md:mx-8">Shohom</span>
                </h1>

                <p className="hero-sub text-xl md:text-3xl mt-12 font-light max-w-xl mx-auto leading-relaxed h-[40px] flex items-center gap-2">
                    <span className="text-teal-500 font-mono text-sm md:text-base tracking-widest uppercase opacity-70">Building as</span>
                    <span className="text-white font-bold">{displayText}</span>
                    <span className={`text-teal-500 font-bold ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
                </p>

                {/* CTA Button */}
                <div className="hero-cta mt-16">
                    <a href="#works" className="magnetic-wrap group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-gray-700/50 rounded-full overflow-hidden hover:border-teal-500/50 transition-colors duration-500">
                        <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-300">Explore Work</span>
                        <div className="absolute inset-0 bg-teal-500/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-2 opacity-30 mix-blend-difference">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>

        </section>
    )
}

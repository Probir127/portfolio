import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { content } from '../../data/content'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'

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

            // Code snippet float
            gsap.to(".code-snippet", {
                y: "random(-10, 10)",
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            })

            tl.from(".name-line-1 .char", {
                y: 200,
                opacity: 0,
                duration: 1.4,
                stagger: 0.04,
                rotateX: -90
            }, 0.3)
                .from(".name-line-2 .char", {
                    y: 200,
                    opacity: 0,
                    duration: 1.4,
                    stagger: 0.04,
                    rotateX: -90
                }, 0.5)
                .from(".name-line-3 .char", {
                    y: 200,
                    opacity: 0,
                    duration: 1.4,
                    stagger: 0.04,
                    rotateX: -90
                }, 0.65)
                .from(".hero-badges", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8
                }, "-=0.8")
                .from(".hero-sub", {
                    opacity: 0,
                    y: 20,
                    duration: 1
                }, "-=0.8")
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
                .from(".code-snippet", {
                    opacity: 0,
                    x: 40,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1.2")

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

    return (
        <section id="hero" ref={containerRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] perspective-1000 px-6">

            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="bg-orb absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-teal-900/10 rounded-full blur-[100px]"></div>
                <div className="bg-orb absolute bottom-1/3 right-1/4 w-[20vw] h-[20vw] bg-indigo-900/10 rounded-full blur-[100px]"></div>
                {/* Background Gradient & Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-grid-floor opacity-20 transform perspective-1000 rotateX(60deg) scale(1.5)"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-fog"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-teal-900/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                </div>
            </div>

            {/* Floating Code Snippet — right side accent */}
            <div className="code-snippet absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none opacity-30">
                <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-5 font-mono text-xs leading-7 text-left w-64">
                    <div className="flex gap-1.5 mb-4">
                        <span className="w-3 h-3 rounded-full bg-red-500/60"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500/60"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500/60"></span>
                    </div>
                    <p><span className="text-purple-400">def</span> <span className="text-blue-400">build</span><span className="text-gray-300">(</span><span className="text-orange-300">self</span><span className="text-gray-300">):</span></p>
                    <p className="pl-4"><span className="text-teal-400">return</span> <span className="text-yellow-300">"scalable"</span></p>
                    <p className="mt-2"><span className="text-gray-500"># REST API ready</span></p>
                    <p><span className="text-purple-400">@app</span><span className="text-gray-300">.</span><span className="text-blue-400">route</span><span className="text-gray-300">(</span><span className="text-yellow-300">"/api"</span><span className="text-gray-300">)</span></p>
                    <p><span className="text-purple-400">async def</span> <span className="text-blue-400">handler</span><span className="text-gray-300">():</span></p>
                    <p className="pl-4"><span className="text-teal-400">return</span> <span className="text-gray-300">&#123;</span><span className="text-yellow-300">"ok"</span><span className="text-gray-300">: </span><span className="text-orange-400">True</span><span className="text-gray-300">&#125;</span></p>
                </div>
            </div>

            {/* Main content */}
            <div className="z-10 flex flex-col items-center text-center leading-none relative">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-teal-500/50 to-transparent"></div>

                {/* Stacked Editorial Name */}
                <h1 className="flex flex-col items-center gap-2 md:gap-4">
                    {/* Line 1 — PROBIR — smaller, label feel */}
                    <div className="overflow-hidden">
                        <div className="name-line-1 text-[clamp(1.5rem,4vw,5rem)] font-light tracking-[0.4em] uppercase text-gray-400 mix-blend-exclusion">
                            {['P','R','O','B','I','R'].map((char, i) => (
                                <span key={i} className="char inline-block transform-style-3d">{char}</span>
                            ))}
                        </div>
                    </div>
                    {/* Line 2 — SAHA — biggest, main weight */}
                    <div className="overflow-hidden -mt-2 md:-mt-4">
                        <div className="name-line-2 text-[clamp(4rem,14vw,16rem)] font-black uppercase text-white leading-none mix-blend-exclusion" style={{letterSpacing: '-0.04em'}}>
                            {['S','A','H','A'].map((char, i) => (
                                <span key={i} className="char inline-block transform-style-3d">{char}</span>
                            ))}
                        </div>
                    </div>
                    {/* Line 3 — SHOHOM — outlined */}
                    <div className="overflow-hidden -mt-2 md:-mt-6">
                        <div className="name-line-3 text-[clamp(2rem,7vw,9rem)] font-bold uppercase leading-none mix-blend-exclusion" style={{letterSpacing: '-0.02em', WebkitTextStroke: '1.5px rgba(255,255,255,0.6)', color: 'transparent'}}>
                            {['S','H','O','H','O','M'].map((char, i) => (
                                <span key={i} className="char inline-block transform-style-3d">{char}</span>
                            ))}
                        </div>
                    </div>
                </h1>

                {/* Badges row */}
                <div className="hero-badges flex items-center gap-4 mt-8">
                    {/* Availability badge */}
                    <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                        Open to Work
                    </span>
                    {/* Location badge */}
                    <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/60 border border-gray-800 text-gray-500 font-mono text-xs tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                        Dhaka, BD
                    </span>
                </div>

                {/* Typing Role */}
                <p className="hero-sub text-xl md:text-2xl mt-8 font-light max-w-xl mx-auto leading-relaxed h-[40px] flex items-center gap-2">
                    <span className="text-teal-500 font-mono text-sm tracking-widest uppercase opacity-70">Building as</span>
                    <span className="text-white font-bold">{displayText}</span>
                    <span className={`text-teal-500 font-bold ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
                </p>

                {/* CTA */}
                <div className="hero-cta mt-12 flex flex-col items-center gap-8">
                    <a href="#works" className="magnetic-wrap group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-gray-700/50 rounded-full overflow-hidden hover:border-teal-500/50 transition-colors duration-500">
                        <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-300">Explore Work</span>
                        <div className="absolute inset-0 bg-teal-500/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                    </a>

                    {/* Social Icons */}
                    <div className="flex items-center gap-8 transition-opacity duration-300">
                        <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-teal-500 transition-colors duration-300">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href={content.contact.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-teal-500 transition-colors duration-300">
                            <FaGithub size={20} />
                        </a>
                        <a href={`mailto:${content.contact.email}`} className="text-gray-500 hover:text-teal-500 transition-colors duration-300">
                            <FaEnvelope size={20} />
                        </a>
                    </div>
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

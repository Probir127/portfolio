import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../../data/content'
import { FaCode, FaRobot, FaDatabase, FaTerminal, FaCheckCircle } from 'react-icons/fa'

// ... (imports remain matching existing)

export default function Scene3_ForgeACME() {
    const sectionRef = useRef(null)
    const triggerRef = useRef(null)
    const terminalRef = useRef(null)
    const [typedLines, setTypedLines] = useState([])
    const [hasTriggered, setHasTriggered] = useState(false)
    const [status, setStatus] = useState("OFFLINE")

    useEffect(() => {
        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // Desktop: Horizontal Scroll
            mm.add("(min-width: 768px)", () => {
                const pin = gsap.fromTo(sectionRef.current,
                    { translateX: 0 },
                    {
                        translateX: "-200vw", // 3 Panels
                        ease: "none",
                        duration: 1,
                        scrollTrigger: {
                            trigger: triggerRef.current,
                            start: "top top",
                            end: "+=3000",
                            scrub: 0.6,
                            pin: true,
                            onUpdate: (self) => {
                                // Trigger typing when scrolling into the terminal panel (approx 33% to 66% progress)
                                if (self.progress > 0.28 && !hasTriggered) {
                                    setHasTriggered(true)
                                }
                            }
                        }
                    }
                )
                // ... (Parallax text remains same)
            });

            // Mobile: Trigger on view
            mm.add("(max-width: 767px)", () => {
                ScrollTrigger.create({
                    trigger: terminalRef.current,
                    start: "top 60%",
                    onEnter: () => setHasTriggered(true)
                })
            })

        }, triggerRef)
        return () => ctx.revert()
    }, [hasTriggered])

    // Typing Effect Logic
    useEffect(() => {
        if (!hasTriggered) return

        let timeouts = []
        const lines = content.forge.story

        // Status Animation Sequence
        setStatus("BOOTING...")
        timeouts.push(setTimeout(() => setStatus("INITIALIZING..."), 800))
        timeouts.push(setTimeout(() => setStatus("ONLINE"), 1500))

        // Line Typing
        lines.forEach((line, i) => {
            const id = setTimeout(() => {
                setTypedLines(prev => [...prev, line])
            }, i * 800 + 1500) // Much faster typing: 800ms gap, starts after 1.5s
            timeouts.push(id)
        })

        return () => timeouts.forEach(clearTimeout)
    }, [hasTriggered])


    return (
        <div id="forge" ref={triggerRef} className="overflow-hidden bg-[#050505]">
            <div ref={sectionRef} className="flex flex-col md:flex-row w-full md:w-[300vw] h-auto md:h-screen relative">

                {/* Panel 1: The Context */}
                <section className="w-full md:w-screen h-screen flex flex-col justify-center px-6 md:px-24 border-r border-gray-900/50 relative bg-[#050505]">
                    <span className="text-teal-500 font-mono text-xl tracking-widest mb-4">01. THE FORGE</span>
                    <h2 className="text-massive text-outline leading-[0.85] mb-12 uppercase">
                        {content.forge.company.split(" ")[0]} <br /> {content.forge.company.split(" ").slice(1).join(" ")}
                    </h2>
                    <p className="max-w-xl text-2xl text-gray-400 font-light leading-relaxed parallax-text">
                        {content.forge.role}
                        <br />
                        <span className="text-white font-bold">{content.forge.period}</span>
                    </p>
                </section>

                {/* Panel 2: The Work (Terminal Reimagined) */}
                {/* Panel 2: The Work (Terminal Reimagined) */}
                <section ref={terminalRef} className="w-full md:w-screen h-screen flex items-center justify-center bg-[#080808] relative border-r border-gray-900/50">
                    {/* Tech Background */}
                    <div className="absolute inset-0 bg-grid-floor opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>

                    <div className="relative z-10 h-full flex items-center overflow-hidden w-full">
                        <div className="max-w-6xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mx-auto">
                            <div className="order-2 md:order-1">
                                <h3 className="text-section-title font-black text-white mb-8 parallax-text text-center md:text-left">
                                    SYSTEM <br /> <span className="text-teal-500">KERNEL</span>
                                </h3>
                            </div>

                            <div className="order-1 md:order-2 bg-[#111] p-6 md:p-10 rounded-lg border-l-4 border-teal-500 font-mono text-sm md:text-base shadow-2xl relative min-h-[400px] flex flex-col">
                                <div className="text-green-500 mb-6 border-b border-gray-800 pb-2 flex justify-between items-center">
                                    <span>$ ./deploy_logic.sh</span>
                                    <div className="flex gap-2">
                                        <span className={`w-3 h-3 rounded-full ${status === 'ONLINE' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                                    </div>
                                </div>
                                <div className="text-gray-400 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                                    {typedLines.map((line, i) => (
                                        <p key={i} className="flex gap-3">
                                            <span className="text-teal-500 opacity-50">[{String(i + 1).padStart(2, '0')}]</span>
                                            <span className="text-gray-300 animate-fade-in">{line}</span>
                                        </p>
                                    ))}
                                    <p className="animate-pulse text-teal-500">_</p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-600 uppercase tracking-widest flex justify-between">
                                    <span>Status: <span className={status === 'ONLINE' ? 'text-green-500' : 'text-yellow-500'}>{status}</span></span>
                                    <span>CPU: {status === 'ONLINE' ? '12%' : '0%'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 3: The Impact */}
                <section className="w-full md:w-screen h-screen flex flex-col justify-center items-center relative bg-[#050505]">
                    <h2 className="text-[12vw] font-black text-white leading-none mb-10 mix-blend-difference">
                        IMPACT
                    </h2>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-40">
                        {content.forge.stats.map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-teal-400 to-transparent group-hover:-translate-y-4 transition-transform duration-500">
                                    {stat.value}
                                </div>
                                <div className="text-lg md:text-2xl mt-4 tracking-widest uppercase text-gray-500 font-mono">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}

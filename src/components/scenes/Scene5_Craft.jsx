import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { content } from '../../data/content'

export default function Scene5_Craft() {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Orbit Animation
            gsap.to(".orbit-ring", {
                rotation: 360,
                duration: 30,
                repeat: -1,
                ease: "linear"
            })

            // Skill Items Float
            gsap.to(".skill-item", {
                y: "random(-20, 20)",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            })

            // Skill Progress Bars on Scroll
            gsap.from(".skill-progress", {
                scrollTrigger: {
                    trigger: ".skills-grid",
                    start: "top 80%"
                },
                scaleX: 0,
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.1
            })

        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="craft" ref={containerRef} className="min-h-screen py-32 bg-[#050505] relative overflow-hidden flex flex-col justify-center">

            {/* Background Particles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDIwLCAxODQsIDE2NiwgMC4xKSIvPjwvc3ZnPg==')] opacity-20 animate-[pulse_4s_ease-in-out_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-teal-900/10 to-transparent rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Visual Side */}
                <div className="relative h-[500px] md:h-[600px] flex items-center justify-center order-2 lg:order-1">
                    <h2 className="text-section-title font-bold text-white mb-6 relative z-10 opacity-0 lg:opacity-100 transition-opacity">
                        THE CRAFT
                    </h2>
                    {/* Core */}
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_50px_rgba(20,184,166,0.8)] z-20"></div>

                    {/* Orbits */}
                    {[1, 2, 3].map((ring, i) => (
                        <div key={i} className={`orbit-ring absolute border border-gray-800 rounded-full opacity-50`}
                            style={{ width: `${ring * 200}px`, height: `${ring * 200}px`, borderStyle: i === 2 ? 'dashed' : 'solid' }}>
                        </div>
                    ))}

                    {/* Floating Skills */}
                    <div className="absolute inset-0">
                        {content.craft.stack.map((skill, i) => {
                            const total = content.craft.stack.length
                            const angle = (i / total) * Math.PI * 2;
                            const radius = 250;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;

                            return (
                                <div key={i} className="skill-item absolute top-1/2 left-1/2 bg-[#0a0a0a] border border-gray-800 px-4 py-2 rounded-full text-gray-300 font-mono text-xs hover:border-teal-500 hover:text-white transition-colors duration-300 cursor-none whitespace-nowrap z-30"
                                    style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}>
                                    {skill.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Text Side */}
                <div className="order-1 lg:order-2">
                    <div className="lg:hidden mb-12">
                        <h2 className="text-section-title leading-[0.8]">THE <br />CRAFT</h2>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed border-l-4 border-teal-500 pl-8 mb-16">
                        "{content.craft.philosophy}"
                    </p>

                    <div className="skills-grid space-y-8 mb-16">
                        <h4 className="text-teal-500 font-mono tracking-widest text-sm uppercase mb-6">Core Arsenal</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {content.craft.stack.slice(0, 6).map((skill, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between text-sm text-gray-300 mb-2 font-mono">
                                        <span>{skill.name}</span>
                                        <span className="text-teal-500">{skill.level}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden">
                                        <div
                                            className="skill-progress h-full bg-teal-500 origin-left"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {/* Certifications */}
                        <div className="space-y-4">
                            <h4 className="text-teal-500 font-mono tracking-widest text-sm uppercase">Certifications</h4>
                            <ul className="space-y-2">
                                {content.craft.certifications && content.craft.certifications.map((cert, i) => (
                                    <li key={i} className="text-gray-300 font-light border-b border-gray-800 pb-2 text-sm">
                                        {cert}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Languages & Interests */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-teal-500 font-mono tracking-widest text-sm uppercase">Languages</h4>
                                <ul className="space-y-2">
                                    {content.craft.languages && content.craft.languages.map((lang, i) => (
                                        <li key={i} className="flex justify-between text-gray-300 font-light border-b border-gray-800 pb-2 text-sm">
                                            <span>{lang.name}</span>
                                            <span className="text-gray-500 text-xs uppercase tracking-wide">{lang.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-teal-500 font-mono tracking-widest text-sm uppercase">Interests</h4>
                                <div className="flex flex-wrap gap-2">
                                    {content.craft.interests && content.craft.interests.map((interest, i) => (
                                        <span key={i} className="px-3 py-1 border border-gray-800 rounded-full text-xs text-gray-400 hover:border-teal-500 hover:text-white transition-colors cursor-none">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

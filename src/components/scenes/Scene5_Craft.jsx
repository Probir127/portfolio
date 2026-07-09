import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_ORDER = ['Core', 'Backend', 'Frontend', 'Data', 'Tools', 'Concepts']
const CATEGORY_COLORS = {
    Core:     { text: 'text-teal-400',   border: 'border-teal-500/40',   bg: 'bg-teal-500/10'   },
    Backend:  { text: 'text-blue-400',   border: 'border-blue-500/40',   bg: 'bg-blue-500/10'   },
    Frontend: { text: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-500/10' },
    Data:     { text: 'text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-500/10' },
    Tools:    { text: 'text-green-400',  border: 'border-green-500/40',  bg: 'bg-green-500/10'  },
    Concepts: { text: 'text-pink-400',   border: 'border-pink-500/40',   bg: 'bg-pink-500/10'   },
}

export default function Scene5_Craft() {
    const containerRef = useRef(null)
    const [activeTab, setActiveTab] = useState('Core')

    const grouped = content.craft.stack.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
    }, {})

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Skill Progress Bars on Scroll
            gsap.from('.skill-progress', {
                scrollTrigger: {
                    trigger: '.skills-panel',
                    start: 'top 80%'
                },
                scaleX: 0,
                duration: 1.5,
                ease: 'power3.out',
                stagger: 0.08
            })

            // Stat counters
            gsap.utils.toArray('.stat-num').forEach((el) => {
                const target = parseInt(el.getAttribute('data-val'), 10)
                gsap.fromTo(el, { textContent: 0 }, {
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate() { el.textContent = Math.ceil(parseFloat(el.textContent)) }
                })
            })

            // Section reveal
            gsap.from('.craft-left', {
                scrollTrigger: { trigger: '.craft-section', start: 'top 80%' },
                x: -60, opacity: 0, duration: 1, ease: 'power3.out'
            })
            gsap.from('.craft-right', {
                scrollTrigger: { trigger: '.craft-section', start: 'top 80%' },
                x: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.15
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    // Re-animate bars when tab changes
    useEffect(() => {
        gsap.fromTo('.skill-progress', { scaleX: 0 }, {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.05
        })
    }, [activeTab])

    const colors = CATEGORY_COLORS[activeTab] || CATEGORY_COLORS['Core']
    const currentSkills = grouped[activeTab] || []

    return (
        <section id="craft" ref={containerRef} className="craft-section min-h-screen py-32 bg-[#050505] relative overflow-hidden flex flex-col justify-center">

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-teal-900/10 to-transparent rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                {/* LEFT — Title + Stats + Certs */}
                <div className="craft-left space-y-10">
                    <div>
                        <h2 className="text-section-title font-bold text-white leading-[0.85] mb-8">
                            THE <br /><span className="text-teal-500">CRAFT</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l-4 border-teal-500 pl-6">
                            "{content.craft.philosophy}"
                        </p>
                    </div>

                    {/* Animated Stat Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: 'Projects Built', val: 7 },
                            { label: 'Stack Items', val: content.craft.stack.length },
                            { label: 'Months XP', val: 3 },
                        ].map((s, i) => (
                            <div key={i} className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5 group hover:border-teal-500/40 transition-colors duration-300">
                                <div className="text-4xl font-black text-white font-display mb-1">
                                    <span className="stat-num" data-val={s.val}>0</span>
                                    <span className="text-teal-500">+</span>
                                </div>
                                <div className="text-gray-600 font-mono text-xs uppercase tracking-widest">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Certs + Languages + Interests */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-teal-500 font-mono tracking-widest text-xs uppercase">Certifications</h4>
                            <ul className="space-y-3">
                                {content.craft.certifications && content.craft.certifications.map((cert, i) => (
                                    <li key={i} className="text-gray-400 text-sm font-light border-b border-gray-800/50 pb-3 leading-relaxed">{cert}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <h4 className="text-teal-500 font-mono tracking-widest text-xs uppercase">Languages</h4>
                                {content.craft.languages && content.craft.languages.map((lang, i) => (
                                    <div key={i} className="flex justify-between text-sm border-b border-gray-800/50 pb-2">
                                        <span className="text-gray-300">{lang.name}</span>
                                        <span className="text-gray-600 uppercase text-xs tracking-wider">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-teal-500 font-mono tracking-widest text-xs uppercase">Interests</h4>
                                <div className="flex flex-wrap gap-2">
                                    {content.craft.interests && content.craft.interests.map((interest, i) => (
                                        <span key={i} className="px-3 py-1 border border-gray-800 rounded-full text-xs text-gray-400 hover:border-teal-500 hover:text-white transition-colors cursor-default">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Tabbed Skills Grid */}
                <div className="craft-right skills-panel space-y-6">
                    <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest">Core Arsenal</h4>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORY_ORDER.filter(cat => grouped[cat]).map(cat => {
                            const c = CATEGORY_COLORS[cat]
                            const isActive = activeTab === cat
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest border transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? `${c.text} ${c.border} ${c.bg}`
                                            : 'text-gray-600 border-gray-800 hover:text-gray-400 hover:border-gray-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            )
                        })}
                    </div>

                    {/* Skill bars for active category */}
                    <div className="space-y-5 mt-4">
                        {currentSkills.map((skill, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between text-sm text-gray-300 mb-2 font-mono">
                                    <span className="group-hover:text-white transition-colors">{skill.name}</span>
                                    <span className={colors.text}>{skill.level}%</span>
                                </div>
                                <div className="h-[3px] w-full bg-gray-900 rounded-full overflow-hidden">
                                    <div
                                        className={`skill-progress h-full origin-left rounded-full ${colors.text.replace('text-', 'bg-')}`}
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* All skills tag cloud */}
                    <div className="mt-10 pt-8 border-t border-gray-900">
                        <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-4">Full Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {content.craft.stack.map((skill, i) => {
                                const c = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS['Core']
                                return (
                                    <span
                                        key={i}
                                        onClick={() => setActiveTab(skill.category)}
                                        className={`px-3 py-1 rounded-full text-xs font-mono border cursor-pointer transition-all duration-200 ${c.text} ${c.border} opacity-50 hover:opacity-100`}
                                    >
                                        {skill.name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

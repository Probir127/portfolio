import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../../data/content'
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa'
import { useGitHubData } from '../../hooks/useGitHubData'

// Per-project accent colors (border + ghost num + orb)
const PROJECT_ACCENTS = [
    { border: 'border-orange-500/60', ghost: 'text-orange-900/20', orb: 'bg-orange-900' },
    { border: 'border-indigo-500/60', ghost: 'text-indigo-900/20', orb: 'bg-indigo-900' },
    { border: 'border-blue-500/60',   ghost: 'text-blue-900/20',   orb: 'bg-blue-900'   },
    { border: 'border-cyan-500/60',   ghost: 'text-cyan-900/20',   orb: 'bg-cyan-900'   },
    { border: 'border-purple-500/60', ghost: 'text-purple-900/20', orb: 'bg-purple-900' },
    { border: 'border-teal-500/60',   ghost: 'text-teal-900/20',   orb: 'bg-teal-900'   },
    { border: 'border-yellow-500/60', ghost: 'text-yellow-900/20', orb: 'bg-yellow-900' },
]

export default function Scene4_Projects() {
    const containerRef = useRef(null)
    const { repos, loading } = useGitHubData()
    const [projects, setProjects] = useState(content.projects)
    const [hovered, setHovered] = useState(null)

    // Update stats when repos are fetched
    useEffect(() => {
        if (!loading && repos.length > 0) {
            setProjects(prev => prev.map(p => {
                const match = repos.find(r => r.name === p.repoName || r.name.toLowerCase() === p.title.toLowerCase().replace(" ", "-"));
                if (match) {
                    return {
                        ...p,
                        stats: { stars: match.stargazers_count, forks: match.forks_count },
                        link: match.html_url
                    }
                }
                return p
            }))
        }
    }, [loading, repos])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.project-row').forEach((row) => {
                gsap.from(row, {
                    scrollTrigger: {
                        trigger: row,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1
                    },
                    opacity: 0,
                    y: 100,
                    scale: 0.95
                })
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="works" ref={containerRef} className="min-h-screen py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Geometric Shapes */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-20 right-10 w-64 h-64 border border-gray-800 rounded-full animate-[spin_60s_linear_infinite] opacity-50"></div>
                <div className="absolute bottom-40 left-10 w-96 h-96 border border-gray-800 rotate-45 opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-teal-900/10 to-transparent rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-[90vw] mx-auto relative z-10">
                <h2 className="text-massive text-outline mb-24 md:mb-40 leading-[0.8]">SELECTED<br />WORKS</h2>

                <div className="flex flex-col gap-0">
                    {projects.map((project, i) => {
                        const accent = PROJECT_ACCENTS[i % PROJECT_ACCENTS.length]
                        const num = String(i + 1).padStart(2, '0')

                        return (
                            <div
                                key={i}
                                className="project-row group relative border-t border-gray-800/60 pt-12 pb-16 md:pt-20 md:pb-24 transition-colors hover:border-gray-700/50"
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* Left color accent bar */}
                                <div className={`absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${accent.border.replace('border-','').replace('/60','').replace('border','bg')} via-transparent to-transparent`}
                                    style={{background: 'linear-gradient(to bottom, currentColor 0%, transparent 100%)'}}
                                >
                                    <div className={`w-full h-full border-l-2 ${accent.border} rounded`}></div>
                                </div>

                                {/* Ghost project number — layered behind title */}
                                <div className={`absolute left-0 top-4 md:top-8 font-black font-display select-none pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${accent.ghost}`}
                                    style={{fontSize: 'clamp(6rem, 18vw, 22rem)', lineHeight: 1, letterSpacing: '-0.05em', zIndex: 0}}>
                                    {num}
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10 pl-4 md:pl-6">

                                    {/* Project Title & Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-teal-500 font-mono text-sm tracking-widest">{num}</span>
                                            <div className={`h-[1px] w-12 border-t ${accent.border}`}></div>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t, index) => (
                                                    <span key={index} className="text-gray-500 font-mono text-xs uppercase tracking-widest border border-gray-800 px-2 py-1 rounded-full">{t}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-5xl md:text-8xl font-black font-display text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-white transition-all duration-500">
                                            {project.title}
                                        </h3>

                                        {/* Stats Badge */}
                                        {project.stats && (project.stats.stars > 0 || project.stats.forks > 0) && (
                                            <div className="mt-4 inline-flex items-center gap-4 text-gray-500 text-sm font-mono border border-gray-800/50 bg-gray-900/30 px-4 py-2 rounded-full">
                                                <span className="flex items-center gap-2"><FaStar className="text-yellow-500" /> {project.stats.stars}</span>
                                                <span className="flex items-center gap-2"><FaCodeBranch className="text-teal-500" /> {project.stats.forks}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description & Link */}
                                    <div className="md:text-right max-w-lg">
                                        <p className="text-gray-400 mb-8 text-lg font-light leading-relaxed">{project.desc}</p>
                                        <div className="flex md:justify-end gap-6">
                                            {project.liveLink && (
                                                <a href={project.liveLink} target="_blank" rel="noreferrer" className="group/link flex items-center gap-2 text-teal-400 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
                                                    Live Demo <FaExternalLinkAlt />
                                                </a>
                                            )}
                                            <a href={project.link} target="_blank" rel="noreferrer" className="group/link flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm hover:text-teal-400 transition-colors">
                                                View Source <FaGithub />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover color orb */}
                                <div className={`absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${accent.orb} blur-[120px]`}></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}


import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../../data/content'
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa'
import { useGitHubData } from '../../hooks/useGitHubData'

export default function Scene4_Projects() {
    const containerRef = useRef(null)
    const { repos, loading } = useGitHubData()
    const [projects, setProjects] = useState(content.projects)

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

                <div className="flex flex-col gap-12 md:gap-32">
                    {projects.map((project, i) => (
                        <div key={i} className="project-row group relative border-t border-gray-800 pt-12 md:pt-24 transition-colors hover:border-teal-900/50">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">

                                {/* Project Title & Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-teal-500 font-mono text-sm tracking-widest">0{i + 1}</span>
                                        <div className="h-[1px] w-12 bg-gray-800"></div>
                                        <div className="flex gap-2">
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
                                        <a href={project.link} target="_blank" rel="noreferrer" className="group/link flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm hover:text-teal-400 transition-colors">
                                            View Source <FaGithub />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Reveal Image Background */}
                            <div className={`absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${project.color} blur-[120px]`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

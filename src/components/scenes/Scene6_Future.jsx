import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../../data/content'
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowUp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Scene6_Future() {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.footer-item', {
                scrollTrigger: {
                    trigger: '.footer-grid',
                    start: 'top 95%'
                },
                y: 50,
                opacity: 0,
                stagger: 0.1
            })

            gsap.from('.contact-detail', {
                scrollTrigger: {
                    trigger: '.contact-grid',
                    start: 'top 90%'
                },
                y: 20,
                opacity: 0,
                stagger: 0.1
            })

            // Reticle rotation
            gsap.to('.reticle-outer', {
                rotation: 360,
                duration: 8,
                repeat: -1,
                ease: 'linear'
            })
            gsap.to('.reticle-inner', {
                rotation: -360,
                duration: 5,
                repeat: -1,
                ease: 'linear'
            })

            // Orb pulse
            gsap.to('.cta-orb-glow', {
                scale: 1.15,
                opacity: 0.6,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="contact" ref={containerRef} className="min-h-screen pt-32 pb-12 bg-[#050505] relative flex flex-col justify-between">

            {/* Aurora Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-[20%] left-0 w-full h-[50%] bg-gradient-to-t from-teal-900/20 to-transparent blur-[100px] animate-[pulse_10s_ease-in-out_infinite]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                <p className="text-teal-500 font-mono text-sm tracking-widest mb-8">WHAT'S NEXT?</p>

                <h2 className="text-section-title text-center leading-[0.9] mb-16 mix-blend-difference">
                    LET'S <br /> TALK
                </h2>

                {/* Glowing Teal Orb CTA */}
                <a href={`mailto:${content.contact.email}`} className="group relative mb-20 flex items-center justify-center">
                    {/* Outer glow pulse */}
                    <div className="cta-orb-glow absolute w-72 h-72 md:w-80 md:h-80 rounded-full bg-teal-500/10 blur-[40px]"></div>

                    {/* Reticle outer ring */}
                    <svg className="reticle-outer absolute w-64 h-64 md:w-72 md:h-72" viewBox="0 0 200 200" fill="none">
                        <circle cx="100" cy="100" r="96" stroke="rgba(20,184,166,0.2)" strokeWidth="1" strokeDasharray="6 10" />
                        <circle cx="100" cy="4" r="3" fill="rgba(20,184,166,0.6)" />
                        <circle cx="100" cy="196" r="3" fill="rgba(20,184,166,0.6)" />
                        <circle cx="4" cy="100" r="3" fill="rgba(20,184,166,0.6)" />
                        <circle cx="196" cy="100" r="3" fill="rgba(20,184,166,0.6)" />
                    </svg>

                    {/* Reticle inner ring */}
                    <svg className="reticle-inner absolute w-48 h-48 md:w-56 md:h-56" viewBox="0 0 200 200" fill="none">
                        <circle cx="100" cy="100" r="94" stroke="rgba(20,184,166,0.15)" strokeWidth="1" strokeDasharray="2 20" />
                        <line x1="100" y1="6" x2="100" y2="30" stroke="rgba(20,184,166,0.5)" strokeWidth="1.5" />
                        <line x1="100" y1="170" x2="100" y2="194" stroke="rgba(20,184,166,0.5)" strokeWidth="1.5" />
                        <line x1="6" y1="100" x2="30" y2="100" stroke="rgba(20,184,166,0.5)" strokeWidth="1.5" />
                        <line x1="170" y1="100" x2="194" y2="100" stroke="rgba(20,184,166,0.5)" strokeWidth="1.5" />
                    </svg>

                    {/* Main orb button */}
                    <div className="relative z-10 w-44 h-44 md:w-52 md:h-52 rounded-full flex items-center justify-center overflow-hidden border border-teal-500/30 group-hover:border-teal-400/60 transition-all duration-500"
                        style={{background: 'radial-gradient(circle at 40% 35%, rgba(20,184,166,0.25) 0%, rgba(20,184,166,0.05) 50%, rgba(5,5,5,0.9) 100%)'}}>
                        {/* Hover fill */}
                        <div className="absolute inset-0 bg-teal-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out opacity-90"></div>
                        <span className="relative z-10 text-white font-bold text-xl md:text-2xl tracking-wider group-hover:text-black transition-colors duration-300">SAY HELLO</span>
                    </div>
                </a>

                {/* Contact Details */}
                <div className="contact-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-center">
                    <div className="contact-detail flex flex-col items-center gap-3 group">
                        <div className="p-4 rounded-full bg-gray-900 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                            <FaEnvelope size={20} />
                        </div>
                        <span className="text-gray-400 text-sm font-mono tracking-wider">{content.contact.email}</span>
                    </div>
                    <div className="contact-detail flex flex-col items-center gap-3 group">
                        <div className="p-4 rounded-full bg-gray-900 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                            <FaPhone size={20} />
                        </div>
                        <span className="text-gray-400 text-sm font-mono tracking-wider">{content.contact.phone}</span>
                    </div>
                    <div className="contact-detail flex flex-col items-center gap-3 group">
                        <div className="p-4 rounded-full bg-gray-900 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                            <FaMapMarkerAlt size={20} />
                        </div>
                        <span className="text-gray-400 text-sm font-mono tracking-wider">{content.contact.location}</span>
                    </div>
                </div>
            </div>

            <footer className="footer-grid border-t border-gray-900 pt-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 mt-20">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <div className="footer-item text-gray-500 font-mono text-xs uppercase tracking-widest">
                        © 2026 Probir Saha Shohom
                    </div>
                    <div className="footer-item text-gray-600 font-mono text-xs">
                        All Rights Reserved.
                    </div>
                </div>

                <div className="flex gap-8">
                    <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" className="footer-item text-gray-400 hover:text-teal-400 transition-colors">
                        <FaLinkedin size={24} />
                    </a>
                    <a href={content.contact.github} target="_blank" rel="noopener noreferrer" className="footer-item text-gray-400 hover:text-teal-400 transition-colors">
                        <FaGithub size={24} />
                    </a>
                    <a href={`mailto:${content.contact.email}`} className="footer-item text-gray-400 hover:text-teal-400 transition-colors">
                        <FaEnvelope size={24} />
                    </a>
                </div>

                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="footer-item w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all duration-300"
                >
                    <FaArrowUp size={14} />
                </button>
            </footer>
        </section>
    )
}


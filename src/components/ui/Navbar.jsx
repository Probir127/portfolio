import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import { FaDownload, FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar({ loading }) {
    const navRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    // Scroll Logic: Hide on down, Show on up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false) // Scrolling down
            } else {
                setIsVisible(true) // Scrolling up
            }
            setLastScrollY(currentScrollY)

            // Active Section Logic
            const sections = ['hero', 'origin', 'forge', 'works', 'craft', 'contact']
            sections.forEach(id => {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(id)
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    // Entrance Animation
    useEffect(() => {
        if (!loading) {
            gsap.to(navRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power4.out",
                delay: 0.5
            })
        }
    }, [loading])

    // Smooth Scroll to Section
    const scrollToSection = (id) => {
        const el = document.getElementById(id)
        if (el) {
            // Lenis instance is globally available on window or passed via context usually, 
            // but for now native scrollIntoView with behavior smooth works if Lenis is hijacking it,
            // OR we dispatch a custom event if using the Lenis react wrapper properly.
            // Assuming standard behavior:
            el.scrollIntoView({ behavior: 'smooth' })
        }
        setIsOpen(false)
    }

    const navLinks = [
        { name: 'Origin', id: 'origin' },
        { name: 'Forge', id: 'forge' },
        { name: 'Works', id: 'works' },
        { name: 'Craft', id: 'craft' },
        { name: 'Contact', id: 'contact' },
    ]

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'} -translate-y-full opacity-0`}
            >
                <div className="absolute inset-x-0 top-0 h-full backdrop-blur-xl bg-black/30 border-b border-white/5"></div>

                <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
                    {/* Logo area - scrolls to top */}
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xl font-black tracking-tighter text-white mix-blend-difference z-50">
                        PSS.
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.id)}
                                className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${activeSection === link.id ? 'text-teal-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                <span className="relative">
                                    {link.name}
                                    {activeSection === link.id && (
                                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-teal-400 shadow-[0_0_10px_#2dd4bf]"></span>
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:block">
                        <a
                            href="/Curriculum Vitae_Probir Saha.pdf" download
                            target="_blank"
                            className="group relative px-6 py-2 rounded-full border border-teal-500/30 overflow-hidden flex items-center gap-2 hover:border-teal-500 transition-colors"
                        >
                            <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-teal-400 group-hover:text-black transition-colors duration-300">Download CV</span>
                            <div className="absolute inset-0 bg-teal-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white z-50">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Fullscreen Menu */}
            <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.id)}
                        className={`text-4xl font-black uppercase tracking-tighter ${activeSection === link.id ? 'text-teal-500' : 'text-white'}`}
                    >
                        {link.name}
                    </button>
                ))}
                <a href="/Curriculum Vitae_Probir Saha.pdf" download target="_blank" className="mt-8 px-8 py-3 bg-teal-500 text-black font-bold uppercase tracking-widest rounded-full">
                    Download CV
                </a>
            </div>
        </>
    )
}

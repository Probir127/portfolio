import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5, // Slower follower
                ease: 'power2.out'
            });
        };

        const onHover = () => setIsHovered(true);
        const onLeave = () => setIsHovered(false);

        // Attach listeners to interactive elements
        const links = document.querySelectorAll('a, button, .magnetic-wrap');
        links.forEach(link => {
            link.addEventListener('mouseenter', onHover);
            link.addEventListener('mouseleave', onLeave);
        });

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            links.forEach(link => {
                link.removeEventListener('mouseenter', onHover);
                link.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    // Update hover state animation
    useEffect(() => {
        if (isHovered) {
            gsap.to(cursorRef.current, { scale: 0, duration: 0.2 });
            gsap.to(followerRef.current, {
                scale: 3,
                backgroundColor: 'rgba(20, 184, 166, 0.2)', // Teal transparent
                borderColor: 'transparent',
                duration: 0.3
            });
        } else {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
            gsap.to(followerRef.current, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'white',
                duration: 0.3
            });
        }
    }, [isHovered]);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-teal-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
        </>
    );
}

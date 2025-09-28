import React, { useEffect, useState, useRef } from 'react'

const Testimonial = () => {
    const testimonials = [
        {
            name: "Sara Khan",
            date: "October 2024",
            testimonial: "Future MedsAcademy made my IMAT journey so much easier. The mock tests and mentorship gave me confidence, and I felt fully prepared on exam day.",
            score: 54,
            stars: 5
        },
        {
            name: "Luca Bianchi",
            date: "September 2024",
            testimonial: "The structured lectures and guidance on visa and admissions were priceless. I wouldn’t have secured a spot in Italy without their support.",
            score: 50,
            stars: 4
        },
        {
            name: "Ayesha Ahmed",
            date: "November 2024",
            testimonial: "I especially loved the bi-weekly mock tests with rankings — they pushed me to improve each time. The tutors explained everything so clearly.",
            score: 56,
            stars: 5
        },
        {
            name: "Sara Khan",
            date: "October 2024",
            testimonial: "Future MedsAcademy made my IMAT journey so much easier. The mock tests and mentorship gave me confidence, and I felt fully prepared on exam day.",
            score: 54,
            stars: 3
        },
        {
            name: "Luca Bianchi",
            date: "September 2024",
            testimonial: "The structured lectures and guidance on visa and admissions were priceless. I wouldn’t have secured a spot in Italy without their support.",
            score: 50,
            stars: 4
        },
        {
            name: "Ayesha Ahmed",
            date: "November 2024",
            testimonial: "I especially loved the bi-weekly mock tests with rankings — they pushed me to improve each time. The tutors explained everything so clearly.",
            score: 56,
            stars: 1
        },
    ];

    const containerRef = useRef(null);
    const intervelRef = useRef(null);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollWidth, clientWidth } = containerRef.current;
        if (scrollWidth > clientWidth) {
            intervelRef.current = setInterval(() => {
                if (containerRef.current.scrollLeft >= (scrollWidth - clientWidth) - 150) {
                    containerRef.current.scrollLeft = 0;
                } else {
                    containerRef.current.scrollLeft += scrollWidth / testimonials.length;
                }
            }, 3000);
        }
    }

    useEffect(() => {
        const timer = setTimeout(handleScroll, 100);

        return () => {
            clearTimeout(timer);
            if (intervelRef.current) clearInterval(intervelRef.current);
        }
    }, [testimonials.length]);

    return (
        <div className='py-8'>
            <h2 className='text-3xl px-8'>What Our Students Say</h2>
            <p className='text-(--accent-dark) px-8'>Real stories from Future MedsAcademy students who turned their medical dreams into reality.</p>
            <div className="py-8 m-4 flex overflow-x-auto bg-(--accent-light) rounded-lg scroll-smooth snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" ref={containerRef}>
                {testimonials.map((t, index) => (
                    <div key={index} className="px-4 mx-auto snap-start min-w-[300px] max-w-sm">
                        <div className='rounded shadow-lg p-4 w-full h-full bg-(--primary) flex flex-col justify-between'>
                            <div className='flex items-center gap-2 mb-4 bg-(--accent-dark) p-2 pl-4 rounded-tl-full rounded-bl-full rounded ml-auto w-fit'>
                                {
                                    [...Array(t.stars)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-yellow-400">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                    ))
                                }
                                {
                                    Array(5 - t.stars).fill(0).map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                    ))
                                }
                            </div>
                            <div className='flex items-center gap-4'>
                                {
                                    t.profile ? <img src={t.profile} alt={`${t.name} profile`} className="w-12 h-12 rounded-full" /> : <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">{t.name.charAt(0)}</div>
                                }
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold'>{t.name}</h3>
                                    <span className='text-xs font-light'>{t.date}</span>
                                </div>
                            </div>
                            <p className='px-4 py-8 italic'>"{t.testimonial}"</p>
                            <div className='flex items-center bg-(--accent-dark) p-2 pr-4 rounded-tr-full rounded-br-full rounded w-fit text-(--accent-light)'>
                                <p className='text-sm'>IMAT Score: <span className='font-semibold'>{t.score}</span></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Testimonial
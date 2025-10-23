import React, { useEffect, useRef } from 'react'
import testimonials from '../../data/testimonials'

const Testimonial = () => {
    const containerRef = useRef(null)
    const intervalRef = useRef(null)

    const startAutoScroll = () => {
        const container = containerRef.current
        if (!container) return

        const { scrollWidth, clientWidth } = container
        if (scrollWidth <= clientWidth) return

        intervalRef.current = setInterval(() => {
            const maxScroll = scrollWidth - clientWidth
            const scrollStep = scrollWidth / testimonials.length

            if (container.scrollLeft >= maxScroll - 150) {
                container.scrollLeft = 0
            } else {
                container.scrollLeft += scrollStep
            }
        }, 3000)
    }

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < rating ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={i < rating ? 0 : 1.5}
                className={`size-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
                <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                />
            </svg>
        ))
    }

    useEffect(() => {
        const timer = setTimeout(startAutoScroll, 100)
        return () => {
            clearTimeout(timer)
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    return (
        <div className='py-8'>
            <h2 className='text-3xl px-8'>What Our Students Say</h2>
            <p className='text-(--accent-dark) px-8'>Real stories from Future MedsAcademy students who turned their medical dreams into reality.</p>

            <div
                className="py-8 m-4 flex overflow-x-auto bg-(--accent-light) rounded-lg scroll-smooth snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                ref={containerRef}
            >
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="px-4 mx-auto snap-start min-w-[300px] max-w-sm">
                        <div className='rounded shadow-lg p-4 w-full h-full bg-(--primary) flex flex-col justify-between'>
                            <div className='flex items-center gap-2 mb-4 bg-(--accent-dark) p-2 pl-4 rounded-tl-full rounded-bl-full rounded ml-auto w-fit'>
                                {renderStars(testimonial.stars)}
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold'>{testimonial.name}</h3>
                                    <span className='text-xs font-light'>{testimonial.date}</span>
                                </div>
                            </div>

                            <p className='px-4 py-8 italic'>"{testimonial.testimonial}"</p>

                            <div className='flex items-center bg-(--accent-dark) p-2 pr-4 rounded-tr-full rounded-br-full rounded w-fit text-(--accent-light)'>
                                <p className='text-sm'>IMAT Score: <span className='font-semibold'>{testimonial.score}</span></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial
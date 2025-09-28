
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const featuredGallery = [
        "/assets/featured-gallery/fg-1.jpeg",
        "/assets/featured-gallery/fg-2.jpeg",
        "/assets/featured-gallery/fg-3.jpeg",
        "/assets/featured-gallery/fg-4.jpeg",
        "/assets/featured-gallery/fg-5.jpeg",
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % featuredGallery.length)
        }, 2000)

        return () => clearInterval(interval) // Cleanup on unmount
    }, [featuredGallery.length])

    return (
        <div className='flex flex-col items-center gap-8 flex-wrap-reverse bg-(--accent-light) rounded-md p-8 md:m-8 sm:flex-row'>
            <div className="flex-1 aspect-video w-full relative overflow-hidden">
                {
                    featuredGallery.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Featured ${index + 1}`}
                            className={`w-full h-full object-cover rounded-md transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                }`}
                        />
                    ))
                }
            </div>
            <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
                <h1 className="text-2xl text-(--accent-dark) font-bold md:text-3xl">Prepare for IMAT <br /> with Expert Guidance</h1>
                <p className="">Crack the IMAT exam with step-by-step support for admissions abroad.</p>
                <div className="flex justify-center gap-2 flex-wrap sm:justify-start">
                    <button className="animated-button">
                        <Link to="/">
                            <span className="label text-sm">Access IMAT PYQs</span>
                        </Link>
                    </button>
                    <button className="animated-button">
                        <Link to="/courses">
                            <span className="label text-sm lg:text-base">Explore Courses</span>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
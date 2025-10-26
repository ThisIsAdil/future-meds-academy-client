import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dashboardService } from '../../services/dashboard'

const HeroSection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [featuredImages, setFeaturedImages] = useState([])

    const fetchFeaturedImages = async () => {
        try {
            const { data } = await dashboardService.getFeaturedImages()
            setFeaturedImages(data.data)
        } catch (error) {
            console.error('Error fetching featured images:', error)
        }
    }

    useEffect(() => {
        fetchFeaturedImages()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % featuredImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [featuredImages.length])

    return (
        <div className='flex flex-col items-center gap-8 flex-wrap-reverse bg-(--accent-light) md:my-8 rounded-md p-12  sm:flex-row'>
            {featuredImages.length > 0 && <div className="flex-1 aspect-video w-full relative overflow-hidden">
                {
                    featuredImages.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`IMAT preparation ${index + 1}`}
                            className={`w-full h-full object-cover rounded-md transition-opacity duration-1500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                }`}
                        />
                    ))
                }
            </div>}
            <div className="flex flex-col gap-2 flex-1 text-center sm:text-left">
                <h1 className="text-3xl text-(--accent-dark) font-semibold leading-tight lg:text-4xl">Excel in IMAT with Professional Guidance</h1>
                <p className="text-lg leading-relaxed opacity-90">Comprehensive preparation and expert support for international medical admissions.</p>
                <div className="flex justify-center gap-2 flex-wrap sm:justify-start mt-4">
                    <Link to="/previous-year-papers">
                        <button className="animated-button">
                            <span className="label">View Past Papers</span>
                        </button>
                    </Link>
                    <Link to="/courses">
                        <button className="animated-button">
                            <span className="label">Browse Courses</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
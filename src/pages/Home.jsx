import HeroSection from "../sections/home/HeroSection"
import Courses from "../sections/home/Courses"
// import ImpactAndResult from "../sections/home/ImpactAndResult"
import Team from "../sections/home/Team"
import Testimonial from "../sections/home/Testimonial"
import { Banner } from "../components"

import { MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { topPerformerService } from "../services/topPerformer"

const Home = () => {
  const [topPerformers, setTopPerformers] = useState([])
  const [showAllPerformers, setShowAllPerformers] = useState(false)

  const fetchTopPerformers = async () => {
    try {
      const response = await topPerformerService.getAll();
      setTopPerformers(response.data.data);
    } catch (error) {
      console.error("Error fetching top performers:", error);
    }
  };

  // Fetch top performers when the component mounts
  useEffect(() => {
    fetchTopPerformers();
  }, []);


  const studyAbroadBannerContent = {
    title: "Study Medicine Abroad with Confidence",
    description: "Unlock opportunities to study at top universities across Europe and beyond. Future MedsAcademy, in collaboration with Blooms Academy, offers IELTS preparation courses to help you meet language requirements and secure admission. From choosing the right university to guiding you through applications and visas, we make your journey smooth and stress-free.",
    buttonText: "Explore Study Abroad Options",
    buttonLink: "/study-abroad"
  };

  const displayedPerformers = showAllPerformers ? topPerformers : topPerformers.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto p-2">
      <HeroSection />
      {/* <ImpactAndResult /> */}
      <div className="py-16 px-8 flex flex-col items-center">
        <h2 className="text-3xl text-(--accent-dark) text-center font-semibold">Future MedsAcademy Students Secure Top Ranks in IMAT 2025</h2>
        <p className="max-w-5xl text-lg mx-auto text-center mt-4">
          We’re proud to share our students’ exceptional success in the IMAT 2025, securing top ranks including Rank 1 at the Universities of Messina and Pavia, a testament to our academy’s consistent excellence in medical admissions preparation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mt-8">
          {displayedPerformers.map((student, index) => (
            <div key={index} className="border border-gray-100 p-4 m-4 rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-102 transition-transform">
              <p className="uppercase font-bold text-(--accent-dark) text-center mb-4">Rank {student.rank} <br /> at {student.university}</p>
              {student.image ? (
                <img src={student.image.url} alt={student.name} className="w-full aspect-square object-cover rounded-md" />
              ) : (
                <div className="w-full aspect-square flex items-center justify-center bg-gray-200 rounded-md">
                  <span className="text-gray-500">Image Not Available</span>
                </div>
              )}
              <span className="text-xs flex items-center gap-1 my-2"><MapPin color="#003b73" size={12} strokeWidth={1} /> {student.location}</span>
              <h3 className="text-xl font-semibold text-(--accent-dark)">{student.name}</h3>
              <p className="text-sm font-medium text-(--accent-dark)">Score: {student.score}</p>
              <p className="mt-2 opacity-80">{student.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center mt-8">
          <Link to={"/consultation"} className="animated-button">
            <button className="label">
              Book a Free Consultation
            </button>
          </Link>

          {topPerformers.length > 3 && (
            <button
              onClick={() => setShowAllPerformers(prev => !prev)}
              className="animated-button"
            >
              <span className="label">
                {showAllPerformers ? "Show Less" : `Show ${topPerformers.length - 3} More`}
              </span>
            </button>
          )}
        </div>
      </div>
      <Courses />
      <Team />
      <Testimonial />
      <Banner content={studyAbroadBannerContent} />
    </div>
  )
}

export default Home

import HeroSection from "../sections/home/HeroSection"
import Courses from "../sections/home/Courses"
import ImpactAndResult from "../sections/home/ImpactAndResult"
import Team from "../sections/home/Team"
import Testimonial from "../sections/home/Testimonial"
import { Banner } from "../components"

import { MapPin } from "lucide-react"
import { Link } from "react-router-dom"

// Top Performers from Future MedsAcademy
// 	•	Ali Naqi (New Delhi, India) – Rank 1 at the University of Pavia and Rank 5 overall globally with an impressive score of 84.7.
// Ali’s dedication and strategic preparation throughout the course reflect the quality of mentorship and structured training offered at Future MedsAcademy.
// 	•	Farhat Ullah Khan (Kashmir, India) – Rank 1 at the University of Messina with a remarkable score of 79.
// Farhat’s journey through our intensive mock exam series and personalized feedback sessions highlights how consistent practice leads to excellence.
// 	•	External Candidate (with Srijit Prakash Patil) – Rank 1 at the University of Catania with a score of 82.8.
// This student actively participated in 6–7 of our mock exams, demonstrating that even through partial engagement, the academy’s resources and evaluation methods significantly enhance performance.


const Home = () => {
  const topPerformers = [
    {
      image: "/assets/top-performers/ali-naqi.jpeg",
      name: "Ali Naqi",
      location: "New Delhi, India",
      rank: 1,
      globalRank: 5,
      university: "University of Pavia",
      score: 84.7,
      description: "Ali’s dedication and strategic preparation throughout the course reflect the quality of mentorship and structured training offered at Future MedsAcademy."
    },
    {
      image: "/assets/top-performers/farhat-ullah-khan.jpeg",
      name: "Farhat Ullah Khan",
      location: "Kashmir, India",
      rank: 1,
      globalRank: null,
      university: "University of Messina",
      score: 79,
      description: "Farhat’s journey through our intensive mock exam series and personalized feedback sessions highlights how consistent practice leads to excellence."
    },
    {
      image: null,
      name: "Srijit Prakash Patil",
      location: "Maharashtra, India",
      rank: 1,
      globalRank: null,
      university: "University of Catania",
      score: 82.8,
      description: "This student actively participated in 6–7 of our mock exams, demonstrating that even through partial engagement, the academy’s resources and evaluation methods significantly enhance performance."
    }
  ];

  const studyAbroadBannerContent = {
    title: "Study Medicine Abroad with Confidence",
    description: "Unlock opportunities to study at top universities across Europe and beyond. Future MedsAcademy, in collaboration with Blooms Academy, offers IELTS preparation courses to help you meet language requirements and secure admission. From choosing the right university to guiding you through applications and visas, we make your journey smooth and stress-free.",
    buttonText: "Explore Study Abroad Options",
    buttonLink: "/study-abroad"
  };
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
          {topPerformers.map((student, index) => (
            <div key={index} className="border border-gray-100 p-4 m-4 rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-102 transition-transform">
              <p className="uppercase font-bold text-(--accent-dark) text-center mb-4">Rank {student.rank} <br /> at {student.university}</p>
              {student.image ? (
                <img src={student.image} alt={student.name} className="w-full aspect-square object-cover rounded-md" />
              ) : (
                <div className="w-full aspect-square flex items-center justify-center bg-gray-200 rounded-md">
                  <span className="text-gray-500">Image Not Available</span>
                </div>
              )}
              <span className="text-xs flex items-center gap-1 my-2"><MapPin color="#003b73" size={12} strokeWidth={1} /> {student.location}</span>
              <h3 className="text-xl font-semibold text-(--accent-dark)">{student.name}</h3>
              <p className="text-sm font-medium text-(--accent-dark)">Score: {student.score}</p>
              {
                student.globalRank &&
                <p className="text-sm text-gray-500">Global Rank: {student.globalRank}</p>
              }
              <p className="mt-2 text-justify opacity-80">{student.description}</p>
            </div>
          ))}
        </div>
        <button className="animated-button mt-8">
          <Link to={"/consultation"} className="label">
            Book a Free Consultation
          </Link>
        </button>
      </div>
      <Courses />
      <Team />
      <Testimonial />
      <Banner content={studyAbroadBannerContent} />
    </div>
  )
}

export default Home

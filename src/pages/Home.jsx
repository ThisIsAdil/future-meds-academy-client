import HeroSection from "../sections/home/HeroSection"
import Courses from "../sections/home/Courses"
import ImpactAndResult from "../sections/home/ImpactAndResult"
import Team from "../sections/home/Team"
import Testimonial from "../sections/home/Testimonial"
import { Banner } from "../components"

const Home = () => {
  const studyAbroadBannerContent = {
    title: "Study Medicine Abroad with Confidence",
    description: "Unlock opportunities to study at top universities across Europe and beyond. Future MedsAcademy, in collaboration with Blooms Academy, offers IELTS preparation courses to help you meet language requirements and secure admission. From choosing the right university to guiding you through applications and visas, we make your journey smooth and stress-free.",
    buttonText: "Explore Study Abroad Options",
    buttonLink: "/study-abroad"
  };
  return (
    <div className="max-w-7xl mx-auto p-2">
      <HeroSection />
      <ImpactAndResult />
      <Courses />
      <Team />
      <Testimonial />
      <Banner content={studyAbroadBannerContent} />
    </div>
  )
}

export default Home

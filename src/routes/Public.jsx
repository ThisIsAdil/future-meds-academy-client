import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Navbar, Footer } from "../components"

import { Home, Courses, CourseSyllabus, IMAT, Universities, Blogs, Blog, About, StudyAbroad, TermsAndServices, PrivacyPolicy, PageNotFound, TeamMember, PreviousYearPapers, Consultation, NonEuCutOff, EuCutOff } from "../pages"


const Public = () => {

    const universities = [
        {
            name: "University of Milan",
            logo: "/assets/universities/logo/milan.png",
            thumbnail: "/assets/universities/thumbnail/milan.jpg",
            location: "Milan, Italy",
            seatsInfo: [
                { category: "Eu", seats: 44 },
                { category: "Non Eu", seats: 16 },
            ],
            tuitionFees: "€800 – €4,000 / year (income-based)",
            programLength: "6 years (Medicine & Surgery)",
            cta: "View Details",
            ctaLink: "/blogs/university-of-milan",
        },
        {
            name: "University of Pavia",
            logo: "/assets/universities/logo/pavia.svg",
            thumbnail: "/assets/universities/thumbnail/pavia.jpg",
            location: "Pavia, Italy",
            seatsInfo: [
                { category: "Eu", seats: 70 },
                { category: "Non Eu", seats: 40 },
            ],
            tuitionFees: "€156 – €3,500 / year (income-based)",
            programLength: "6 years (Medicine & Surgery)",
            cta: "View Details",
            ctaLink: "/blogs/university-of-pavia",
        },
        {
            name: "University of Turin",
            logo: "/assets/universities/logo/turin.svg",
            thumbnail: "/assets/universities/thumbnail/turin.webp",
            location: "Turin, Italy",
            seatsInfo: [
                { category: "Eu", seats: 70 },
                { category: "Non Eu", seats: 31 },
            ],
            tuitionFees: "€300 – €4,000 / year (income-based)",
            programLength: "6 years (Medicine & Surgery)",
            cta: "View Details",
            ctaLink: "/blogs/university-of-turin",
        },
    ];

    const StudyAbroadUniversities = [
        {
            name: "Harvard University",
            logo: "/assets/study-abroad-universities/logo/harvard.png",
            thumbnail: "/assets/study-abroad-universities/thumbnail/harvard.png",
            location: "Cambridge, USA",
            seatsInfo: [
                { category: "Domestic", seats: 2000 },
                { category: "International", seats: 1500 },
            ],
            tuitionFees: "$55,000 – $65,000 / year",
            programLength: "4 years (Undergraduate), 2 years (Postgraduate)",
            cta: "View Details",
            ctaLink: "/blogs/harvard-university",
        },
        {
            name: "University of Oxford",
            logo: "/assets/study-abroad-universities/logo/oxford.png",
            thumbnail: "/assets/study-abroad-universities/thumbnail/oxford.webp",
            location: "Oxford, United Kingdom",
            seatsInfo: [
                { category: "Domestic", seats: 1000 },
                { category: "International", seats: 1200 },
            ],
            tuitionFees: "£28,000 – £44,000 / year",
            programLength: "3–6 years (depending on course)",
            cta: "View Details",
            ctaLink: "/blogs/university-of-oxford",
        },
        {
            name: "University of Toronto",
            logo: "/assets/study-abroad-universities/logo/university-toronto.png",
            thumbnail: "/assets/study-abroad-universities/thumbnail/university-toronto.webp",
            location: "Toronto, Canada",
            seatsInfo: [
                { category: "Domestic", seats: 2500 },
                { category: "International", seats: 2000 },
            ],
            tuitionFees: "CAD 45,000 – CAD 65,000 / year",
            programLength: "4 years (Undergraduate), 2 years (Postgraduate)",
            cta: "View Details",
            ctaLink: "/blogs/university-of-toronto",
        },
        {
            name: "ETH Zurich",
            logo: "/assets/study-abroad-universities/logo/eth-zurich.gif",
            thumbnail: "/assets/study-abroad-universities/thumbnail/eth-zurich.jpeg",
            location: "Zurich, Switzerland",
            seatsInfo: [
                { category: "Domestic", seats: 500 },
                { category: "International", seats: 700 },
            ],
            tuitionFees: "CHF 1,200 – CHF 2,000 / year",
            programLength: "3 years (Bachelor), 2 years (Master)",
            cta: "View Details",
            ctaLink: "/blogs/eth-zurich",
        },
    ];



    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/syllabus/:id" element={<CourseSyllabus />} />
                <Route path="/imat" element={<IMAT />} />
                <Route path="/imat/cutoff/eu" element={<EuCutOff />} />
                <Route path="/imat/cutoff/non-eu" element={<NonEuCutOff />} />
                <Route path="/universities" element={<Universities title={"Universities Accepting IMAT in Italy"} universities={universities} />} />
                <Route path="/study-abroad/universities" element={<Universities title={"Universities Offering Study Abroad Programs"} universities={StudyAbroadUniversities} />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/study-abroad" element={<StudyAbroad />} />
                <Route path="/team/:memberId" element={<TeamMember />} />
                <Route path="/previous-year-papers" element={<PreviousYearPapers />} />
                <Route path="/consultation" element={<Consultation />} />

                <Route path="/terms" element={<TermsAndServices />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                <Route path="*" element={<PageNotFound redirect={{ path: "/", label: "Home" }} />} />
            </Routes>

            <Footer />
        </div>
    )
}

export default Public
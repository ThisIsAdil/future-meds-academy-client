import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Navbar, Footer } from "../components"

import { Home, Courses, CourseSyllabus, IMAT, Universities, Blogs, Blog, About, StudyAbroad, TermsAndServices, PrivacyPolicy, PageNotFound, TeamMember, PreviousYearPapers, Consultation, NonEuCutOff, EuCutOff } from "../pages"
import { universityService } from '../services/university'
import { abroadUniversityService } from '../services/abroadUniversity'


const Public = () => {
    const [universities, setUniversities] = useState([])
    const [studyAbroadUniversities, setStudyAbroadUniversities] = useState([

    ])

    const fetchUniversities = async () => {
        try {
            const response = await universityService.getAll();
            setUniversities(response.data.data);
        } catch (error) {
            console.error("Error fetching universities:", error);
        }
    }

    const fetchStudyAbroadUniversities = async () => {
        try {
            const response = await abroadUniversityService.getAll();
            setStudyAbroadUniversities(response.data.data);
        } catch (error) {
            console.error("Error fetching study abroad universities:", error);
        }
    }

    React.useEffect(() => {
        fetchUniversities();
        fetchStudyAbroadUniversities();
    }, []);

    // const StudyAbroadUniversities = [
    //     {
    //         name: "Harvard University",
    //         logo: { url: "/assets/study-abroad-universities/logo/harvard.png" },
    //         campusImage: { url: "/assets/study-abroad-universities/thumbnail/harvard.png" },
    //         programsOffered: ["Medicine", "Engineering", "Business", "Law"],
    //         location: "Cambridge, USA",
    //         seatsInfo: [
    //             { category: "Domestic", seats: 2000 },
    //             { category: "International", seats: 1500 },
    //         ],
    //         tuitionFees: "$55,000 – $65,000 / year",
    //         programLength: "4 years (Undergraduate), 2 years (Postgraduate)",
    //         cta: "View Details",
    //         ctaLink: "/blogs/harvard-university",
    //     },
    //     {
    //         name: "University of Oxford",
    //         logo: { url: "/assets/study-abroad-universities/logo/oxford.png" },
    //         campusImage: { url: "/assets/study-abroad-universities/thumbnail/oxford.webp" },
    //         location: "Oxford, United Kingdom",
    //         seatsInfo: [
    //             { category: "Domestic", seats: 1000 },
    //             { category: "International", seats: 1200 },
    //         ],
    //         tuitionFees: "£28,000 – £44,000 / year",
    //         programLength: "3–6 years (depending on course)",
    //         cta: "View Details",
    //         ctaLink: "/blogs/university-of-oxford",
    //     },
    //     {
    //         name: "University of Toronto",
    //         logo: { url: "/assets/study-abroad-universities/logo/university-toronto.png" },
    //         campusImage: { url: "/assets/study-abroad-universities/thumbnail/university-toronto.webp" },
    //         location: "Toronto, Canada",
    //         seatsInfo: [
    //             { category: "Domestic", seats: 2500 },
    //             { category: "International", seats: 2000 },
    //         ],
    //         tuitionFees: "CAD 45,000 – CAD 65,000 / year",
    //         programLength: "4 years (Undergraduate), 2 years (Postgraduate)",
    //         cta: "View Details",
    //         ctaLink: "/blogs/university-of-toronto",
    //     },
    //     {
    //         name: "ETH Zurich",
    //         logo: { url: "/assets/study-abroad-universities/logo/eth-zurich.gif" },
    //         campusImage: { url: "/assets/study-abroad-universities/thumbnail/eth-zurich.jpeg" },
    //         location: "Zurich, Switzerland",
    //         seatsInfo: [
    //             { category: "Domestic", seats: 500 },
    //             { category: "International", seats: 700 },
    //         ],
    //         tuitionFees: "CHF 1,200 – CHF 2,000 / year",
    //         programLength: "3 years (Bachelor), 2 years (Master)",
    //         cta: "View Details",
    //         ctaLink: "/blogs/eth-zurich",
    //     },
    // ];

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
                <Route path="/study-abroad/universities" element={<Universities title={"Universities Offering Study Abroad Programs"} universities={studyAbroadUniversities} />} />
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
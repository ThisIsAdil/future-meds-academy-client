import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Navbar, Footer } from "../components"

import { Home, Courses, CourseSyllabus, IMAT, Universities, University, Blogs, Blog, About, StudyAbroad, TermsAndServices, PrivacyPolicy, PageNotFound, TeamMember, PreviousYearPapers, Consultation, NonEuCutOff, EuCutOff } from "../pages"
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
                <Route path="/university/:id" element={<University />} />
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
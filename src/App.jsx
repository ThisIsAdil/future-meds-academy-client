import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Navbar, Footer } from "./components"

import { Home, Courses, CourseSyllabus, IMAT, Universities, Blogs, Blog ,About, StudyAbroad, Consultation, TermsAndServices, PrivacyPolicy, PageNotFound } from "./pages"


const App = () => {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/syllabus/:id" element={<CourseSyllabus />} />
        <Route path="/imat" element={<IMAT />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/study-abroad" element={<StudyAbroad />} />


        <Route path="/consultation" element={<Consultation />} />"
        <Route path="/terms" element={<TermsAndServices />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
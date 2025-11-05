import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { courseService } from '../services/courses'

// const courses = [
//     {
//         _id: "665f1a1e1c9d440001a1a001",
//         title: "IMAT Meditalia Prep Course (€129) – 3 Months",
//         description: "A budget-friendly 3-month course designed to prepare you effectively for the IMAT exam with structured practice and expert guidance.",
//         why_choose: [
//             "Mock tests every two weeks with ranking",
//             "12 MedItalia simulations for real exam practice",
//             "Access to previous papers & online simulators",
//             "Career counseling sessions for admissions and future planning"
//         ],
//     },
//     {
//         _id: "665f1a1e1c9d440001a1a002",
//         title: "IMAT Meditalia+ Plus Course (€310) – 3 Months",
//         description: "A comprehensive 3-month course with live lectures, updated study material, and mentorship designed to help you excel in IMAT.",
//         why_choose: [
//             "108 hours of live interactive lectures",
//             "12 exclusive MedItalia simulations",
//             "Latest IMAT study resources & notes",
//             "Bi-weekly mock tests with ranking",
//             "Personalized guidance & career counseling"
//         ],
//     },
//     {
//         _id: "665f1a1e1c9d440001a1a003",
//         title: "Future MedsAcademy Premium Plan",
//         description: "Complete IMAT preparation with live + recorded lectures, mentorship, and everything you need from start to finish.",
//         why_choose: [
//             "108+ hours live + 200+ hours recorded content",
//             "12 major + 6 minor live mock tests",
//             "Subjective tests & detailed solutions",
//             "Mentorship from students studying in Italy",
//             "Notes, important questions & emotional/financial support"
//         ],
//     },
//     {
//         _id: "665f1a1e1c9d440001a1a004",
//         title: "IMAT Physics with Amir Akhtar",
//         description: "Master IMAT Physics with concept-based learning and strategic problem-solving to tackle the toughest questions with confidence.",
//         why_choose: [
//             "Concept-based teaching with real IMAT focus",
//             "Recorded lectures available for revision",
//             "Strategic shortcuts & problem-solving methods",
//             "High-yield syllabus coverage"
//         ],
//     },
//     {
//         _id: "665f1a1e1c9d440001a1a005",
//         title: "IMAT Biology with Talal Adil",
//         description: "Ace IMAT Biology with expert guidance, simplified lessons, and high-yield strategies taught by an experienced tutor.",
//         why_choose: [
//             "2 years of proven IMAT biology teaching",
//             "Focus on most frequently tested IMAT topics",
//             "Simplified diagrams & quick revision methods",
//             "Interactive live + recorded sessions"
//         ],
//     },
//     {
//         _id: "665f1a1e1c9d440001a1a006",
//         title: "IMAT Chemistry with Toranj Maleki",
//         description: "Learn chemistry from an IMAT top scorer (72.4) and gain the strategies you need to solve questions with speed and accuracy.",
//         why_choose: [
//             "Guidance from an IMAT 72.4 scorer",
//             "High-yield topic coverage",
//             "Speed & accuracy techniques",
//             "Interactive & engaging teaching",
//             "Recorded lectures for revision"
//         ],
//     },
//     {
//         _id: "665f1a1e1c9d440001a1a007",
//         title: "IMAT Mathematics with Tahira Faheem & Hayk Sarsyan",
//         description: "Master IMAT Math with a combination of Cambridge-level expertise and logical problem-solving skills.",
//         why_choose: [
//             "Tahira Faheem – Cambridge Specialist Mathematics expert",
//             "Hayk Sarsyan – Logic & programming specialist",
//             "Full coverage of algebra, probability, calculus & logic",
//             "Strategy-based learning with shortcuts",
//             "Live + recorded lessons"
//         ],
//     },
//     {
//         _id: "665f1a1e1c9d440001a1a008",
//         title: "IMAT Logical Reasoning & GK with Amir Akhtar",
//         description: "Sharpen your logical thinking and general knowledge to maximize your IMAT score with proven strategies and practice.",
//         why_choose: [
//             "Comprehensive video lessons on reasoning patterns",
//             "Proven IMAT strategies & quick tricks",
//             "Practice with past papers & high-yield problems",
//             "Step-by-step problem-solving methods",
//             "Interactive practice & mock tests"
//         ],
//     },
//     {
//         _id: "665f1a1e1c9d440001a1a009",
//         title: "IELTS Preparation (with Blooms Academy)",
//         description: "Boost your IELTS score with expert-led courses by Blooms Academy, designed to meet admission requirements abroad.",
//         why_choose: [
//             "Comprehensive IELTS prep covering all 4 skills",
//             "Practice tests & real exam simulations",
//             "Updated study resources & notes",
//             "Guidance tailored for study-abroad applicants"
//         ],
//     }
// ]

const Courses = () => {
    const [courses, setCourses] = useState([])

    const fetchCourses = async () => {
        try {
            const response = await courseService.getAll();
            setCourses(response.data.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const [search, setSearch] = useState('')

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || course.description.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className='max-w-7xl mx-auto my-8'>
            <div className='flex gap-4 flex-wrap items-center justify-end p-4'>
                <input type="text" placeholder='Search Courses...' value={search} onChange={(e) => setSearch(e.target.value)} className='flex-4 p-2 border border-[var(--accent-dark)] rounded-md' />
                <Link to="/consultation" className='animated-button'>
                    <button className='label'>
                        Talk to a Mentor
                    </button>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 bg-(--accent-light) p-4 w-full rounded-md'>
                {filteredCourses.map((course, index) => (
                    <div key={index} className='flex flex-col items-center space-y-4 flex-wrap-reverse border border-gray-200 rounded-md p-4 bg-(--primary)'>
                        <h2 className='text-2xl font-bold text-[var(--accent-dark)] text-center'>{course.title}</h2>
                        {
                            course.thumbnail?.url ? (
                                <img src={course.thumbnail.url} alt='course thumbnail' className='aspect-square object-cover rounded-md' />
                            ) : (
                                <div className='w-full aspect-square flex items-center justify-center bg-gray-200 rounded-md'>
                                    <span className='text-gray-500'>Image Not Available</span>
                                </div>
                            )
                        }
                        <div className='flex flex-col gap-4 justify-between flex-1'>
                            <p>{course.shortDescription}</p>
                            <h3 className='font-semibold'>Why Choose This Course?</h3>
                            <ul>
                                {course.whyChoose.map((point, idx) => (
                                    <li key={idx}><span className='text-green-500 mr-2 mt-0.5'>✓</span> {point}</li>
                                ))}
                            </ul>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                                <Link to={`/courses/syllabus/${course._id}`}>
                                    <button className='animated-button w-full'>
                                        <span className='label'>View Course Details</span>
                                    </button>
                                </Link>
                                <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I want to enroll in ${course.title} now!`)}`} target="_blank" rel="noopener noreferrer">
                                    <button className='animated-button w-full'>
                                        <span className='label'>Enroll Now via WhatsApp</span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredCourses.length === 0 && <div className='text-center text-gray-500'>No courses found</div>}
        </div>
    )
}

export default Courses

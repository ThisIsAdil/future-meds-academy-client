import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const courses = [
    {
        _id: "665f1a1e1c9d440001a1a001",
        title: "IMAT Meditalia Prep Course (€129) – 3 Months",
        description: "A budget-friendly 3-month course designed to prepare you effectively for the IMAT exam with structured practice and expert guidance.",
        why_choose: [
            "Mock tests every two weeks with ranking",
            "12 MedItalia simulations for real exam practice",
            "Access to previous papers & online simulators",
            "Career counseling sessions for admissions and future planning"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    },
    {
        _id: "665f1a1e1c9d440001a1a002",
        title: "IMAT Meditalia+ Plus Course (€310) – 3 Months",
        description: "A comprehensive 3-month course with live lectures, updated study material, and mentorship designed to help you excel in IMAT.",
        why_choose: [
            "108 hours of live interactive lectures",
            "12 exclusive MedItalia simulations",
            "Latest IMAT study resources & notes",
            "Bi-weekly mock tests with ranking",
            "Personalized guidance & career counseling"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    },
    {
        _id: "665f1a1e1c9d440001a1a003",
        title: "Future MedsAcademy Premium Plan",
        description: "Complete IMAT preparation with live + recorded lectures, mentorship, and everything you need from start to finish.",
        why_choose: [
            "108+ hours live + 200+ hours recorded content",
            "12 major + 6 minor live mock tests",
            "Subjective tests & detailed solutions",
            "Mentorship from students studying in Italy",
            "Notes, important questions & emotional/financial support"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    },
    {
        _id: "665f1a1e1c9d440001a1a004",
        title: "IMAT Physics with Amir Akhtar",
        description: "Master IMAT Physics with concept-based learning and strategic problem-solving to tackle the toughest questions with confidence.",
        why_choose: [
            "Concept-based teaching with real IMAT focus",
            "Recorded lectures available for revision",
            "Strategic shortcuts & problem-solving methods",
            "High-yield syllabus coverage"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    },
    {
        _id: "665f1a1e1c9d440001a1a005",
        title: "IMAT Biology with Talal Adil",
        description: "Ace IMAT Biology with expert guidance, simplified lessons, and high-yield strategies taught by an experienced tutor.",
        why_choose: [
            "2 years of proven IMAT biology teaching",
            "Focus on most frequently tested IMAT topics",
            "Simplified diagrams & quick revision methods",
            "Interactive live + recorded sessions"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    },
    {
        _id: "665f1a1e1c9d440001a1a006",
        title: "IMAT Chemistry with Toranj Maleki",
        description: "Learn chemistry from an IMAT top scorer (72.4) and gain the strategies you need to solve questions with speed and accuracy.",
        why_choose: [
            "Guidance from an IMAT 72.4 scorer",
            "High-yield topic coverage",
            "Speed & accuracy techniques",
            "Interactive & engaging teaching",
            "Recorded lectures for revision"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    },
    {
        _id: "665f1a1e1c9d440001a1a007",
        title: "IMAT Mathematics with Tahira Faheem & Hayk Sarsyan",
        description: "Master IMAT Math with a combination of Cambridge-level expertise and logical problem-solving skills.",
        why_choose: [
            "Tahira Faheem – Cambridge Specialist Mathematics expert",
            "Hayk Sarsyan – Logic & programming specialist",
            "Full coverage of algebra, probability, calculus & logic",
            "Strategy-based learning with shortcuts",
            "Live + recorded lessons"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    },
    {
        _id: "665f1a1e1c9d440001a1a008",
        title: "IMAT Logical Reasoning & GK with Amir Akhtar",
        description: "Sharpen your logical thinking and general knowledge to maximize your IMAT score with proven strategies and practice.",
        why_choose: [
            "Comprehensive video lessons on reasoning patterns",
            "Proven IMAT strategies & quick tricks",
            "Practice with past papers & high-yield problems",
            "Step-by-step problem-solving methods",
            "Interactive practice & mock tests"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    },
    {
        _id: "665f1a1e1c9d440001a1a009",
        title: "IELTS Preparation (with Blooms Academy)",
        description: "Boost your IELTS score with expert-led courses by Blooms Academy, designed to meet admission requirements abroad.",
        why_choose: [
            "Comprehensive IELTS prep covering all 4 skills",
            "Practice tests & real exam simulations",
            "Updated study resources & notes",
            "Guidance tailored for study-abroad applicants"
        ],
        cta: [
            {
                path: "/consultation",
                label: "Enroll Now"
            },
            {
                path: "/courses/syllabus",
                label: "View Syllabus"
            }
        ]
    }
]

const Courses = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || course.description.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className='max-w-7xl mx-auto my-8'>
            {/* <div className='bg-(--accent-light) text-center max-w-7xl mx-auto my-8 p-8 space-y-4'>
                <h1 className='text-3xl font-bold text-(--accent-dark) max-w-xl mx-auto'>Discover IMAT & Study Abroad Courses with Future MedsAcademy</h1>
                <p className='max-w-3xl mx-auto'>From IMAT preparation to IELTS training, our expert-led courses are designed to help you crack exams, build confidence, and secure admission to top universities abroad. Learn with live lectures, mock tests, and personalized mentorship that make all the difference.</p>
            </div> */}
            <div className='flex gap-4 flex-wrap items-center justify-end p-4'>
                <input type="text" placeholder='Search Courses...' value={search} onChange={(e) => setSearch(e.target.value)} className='flex-4 p-2 border border-[var(--accent-dark)] rounded-md' />
                {/* <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} className='p-2 border border-[var(--accent-dark)] rounded-md'>
                    <option value="">All Categories</option>
                    <option value="IMAT">IMAT</option>
                    <option value="IELTS">IELTS</option>
                    <option value="Medical">Medical</option>
                </select> */}
                <button className='animated-button'>
                    <Link to="/consultation" className='label'>Talk to a Mentor</Link>
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 bg-(--accent-light) p-4 w-full rounded-md'>
                {filteredCourses.map((course, index) => (
                    <div key={index} className='flex flex-col items-center space-y-4 flex-wrap-reverse border border-gray-200 rounded-md p-4 bg-(--primary)'>
                        <h2 className='text-2xl font-bold text-[var(--accent-dark)] text-center'>{course.title}</h2>
                        <img src={"/assets/courses/" + (course.thumbnail || "default.jpg")} alt='course thumbnail' className='aspect-square object-cover rounded-md' />
                        <div className='flex flex-col gap-4 justify-between flex-1'>
                            <p>{course.description}</p>
                            <h3 className='font-semibold'>Why Choose This Course?</h3>
                            <ul className='list-disc mx-6'>
                                {course.why_choose.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                            <div className='flex items-center'>
                                {course.cta && course.cta.length > 0 && (
                                    course.cta.map((cta, ctaIdx) => (
                                        <button key={ctaIdx} className='animated-button mr-2'>
                                            {cta.path.startsWith('http') ? (
                                                <a href={cta.path} target="_blank" rel="noopener noreferrer" className='label'>{cta.label}</a>
                                            ) : cta.path.toLowerCase().includes('syllabus') ? (
                                                <Link to={cta.path + '/' + course._id} className='label'>{cta.label}</Link>
                                            ) : (
                                                <Link to={cta.path} className='label'>{cta.label}</Link>
                                            )}
                                        </button>
                                    ))
                                )}
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

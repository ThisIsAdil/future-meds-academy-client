import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FAQ } from '../components'

const FAQContent = [
    {
        question: "What is the IMAT exam?",
        answer: "The IMAT (International Medical Admissions Test) is a standardized entrance exam for students who want to study medicine and surgery in English at Italian universities. It assesses skills in logical reasoning, problem-solving, general knowledge, and core science subjects like biology, chemistry, physics, and mathematics."
    },
    {
        question: "When is the IMAT exam held?",
        answer: "The IMAT exam is typically held once a year in September. The exact date may vary each year, so it's important to check the official IMAT website or the specific university's admissions page for the most up-to-date information."
    },
    {
        question: "How long is the IMAT exam?",
        answer: "The IMAT exam lasts for 100 minutes (1 hour and 40 minutes)."
    },
    {
        question: "How many questions are on the IMAT exam?",
        answer: "The IMAT exam consists of 60 multiple-choice questions."
    },
    {
        question: "What subjects are covered in the IMAT exam?",
        answer: "The IMAT exam covers five main sections: Biology (18 questions), Chemistry (12 questions), Physics and Mathematics (10 questions), Logical Reasoning and General Knowledge (20 questions)."
    }
]

const CourseSyllabus = () => {

    const course = {
        id: useParams().id,
        thumbnailUrl: "/default.jpg",
        title: "IMAT Meditalia Prep Course",
        price: "129",
        oneTimePayment: true,
        duration: "3 Months",
        shortDescription: "A budget-friendly 3-month course designed to prepare you effectively for the IMAT exam with structured practice and expert guidance.",
        description: "This 3-month program is ideal for students who want an affordable yet structured approach to IMAT preparation. With bi-weekly mock tests, 12 exclusive MedItalia simulations, and access to past papers, this course ensures you stay exam-ready at every step.",
        whyChoose: [
            "Mock tests every two weeks with ranking",
            "12 MedItalia simulations for real exam practice",
            "Access to previous IMAT papers & simulators",
            "Career counseling sessions for admissions and future planning"
        ],
        syllabus: [
            "Week 1–2: Biology & Chemistry foundations",
            "Week 3–4: Physics & Mathematics",
            "Week 5–6: Logical Reasoning practice",
            "Week 7–8: 6 full-length MedItalia simulations + analysis",
            "Week 9–10: Advanced biology & chemistry focus",
            "Week 11–12: Final 6 simulations + personalized career counseling"
        ],
        instructor: [
            {
                name: "Amir Akhtar",
                title: "Founder & Lead Instructor",
                photoUrl: "/assets/team/amir-akhtar.jpg"
            },
            {
                name: "Talal Adil",
                title: "Senior Instructor",
                photoUrl: "/assets/team/talal-adil.jpg"
            },
            {
                name: "Maham Ovis",
                title: "Biology Instructor",
                photoUrl: "/assets/team/maham-ovis.jpg"
            }
        ]
    }

    return (
        <div className='space-y-2 py-8'>
            <div className='flex flex-wrap justify-center max-w-3xl mx-auto gap-6 p-4 my-8 bg-(--accent-light) rounded-md'>
                <img src={"/assets/courses" + (course.thumbnailUrl || "default.jpg")} className='max-w-40 object-cover rounded-md' />
                <div className='flex flex-col justify-evenly items-start gap-4 max-w-lg'>
                    <div>
                        <h1 className='text-xl font-semibold'>{course.title} (€{course.price}) – {course.duration}</h1>
                        <p>{course.shortDescription}</p>
                    </div>
                    <Link to={`/courses/syllabus/${course.id}`} className='animated-button'>
                        <button className='label'>Enroll Now</button>
                    </Link>
                </div>
            </div>
            <div className='max-w-3xl mx-auto p-4'>
                <h2 className='text-lg font-semibold'>About This Course</h2>
                <p className='text-justify'>{course.description}</p>
            </div>
            <div className='max-w-3xl mx-auto p-4'>
                <h2 className='text-lg font-semibold mb-1'>Why Choose This Course?</h2>
                <ul className='list-disc list-inside px-4 space-y-1'>
                    {course.whyChoose.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
            <div className='max-w-3xl mx-auto p-4'>
                <h2 className='text-lg font-semibold mb-1'>Course Syllabus</h2>
                <ul className='list-disc list-inside px-4 space-y-1'>
                    {course.syllabus.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className='max-w-3xl mx-auto p-4'>
                <h2 className='text-lg font-semibold mb-1'>Instructor</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {course.instructor.map((inst, index) => (
                        <div key={index} className='flex flex-col flex-wrap text-center gap-4 mb-4 items-center bg-(--accent-light) p-4 rounded-md'>
                            <img src={inst.photoUrl} alt={inst.name} className='w-24 h-24 object-cover rounded-full' />
                            <div>
                                <h3 className='text-md font-semibold'>{inst.name}</h3>
                                <p className='italic text-xs'>{inst.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='max-w-3xl mx-auto p-4 mb-8'>
                <h2 className='text-lg font-semibold mb-1'>Enrollment</h2>
                <ul className='list-disc list-inside px-4 space-y-1 mb-8'>
                    {course.oneTimePayment ? <li>One-time payment of €{course.price}</li> : <li>Monthly payment of €{course.price}</li>}
                    <li>Access to all course materials and resources for {course.duration}</li>
                    <li>Certificate of completion upon finishing the course</li>
                </ul>
                <Link to={`/courses/enroll/${course.id}`} className='animated-button'>
                    <button className='label'>Enroll Now</button>
                </Link>
            </div>

            <FAQ faq={FAQContent} whichFaq={course.title} />
        </div>
    )
}

export default CourseSyllabus
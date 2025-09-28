import React from 'react'
import { Link } from 'react-router-dom'

const Courses = () => {
    const courseData = [
        {
            "id": "meditalia-plus-6m",
            "title": "MEDITALIA PLUS+ (6 Months)",
            "tagline": "Save 50% on IMAT Prep",
            "price": {
                "original": "€104/month",
                "discounted": "€52/month",
                "total": "€312 for 6 months"
            },
            "features": [
                "Live lectures (108 hrs)",
                "12 MedItalia simulations",
                "Updated study material",
                "Bi-weekly mock tests with ranking",
                "Personalized guidance",
                "Career counseling sessions",
                "Access to previous papers (online simulators)",
                "Unlimited practice sets, quizzes, lessons, videos, and exams"
            ],
            "cta": "Enroll Now"
        },
        {
            "id": "meditalia-plus-3m",
            "title": "MEDITALIA PLUS+ (3 Months)",
            "tagline": "Flexible IMAT Prep Option",
            "price": {
                "monthly": "€44/month",
                "total": "€132 for 3 months"
            },
            "features": [
                "Unlimited practice sets",
                "Quizzes, lessons, videos, and exams",
                "Mock tests every two weeks (starting 1st March 2025)",
                "12 MedItalia simulations",
                "Access to previous papers (online simulators)"
            ],
            "cta": "Enroll Now"
        }
    ]

    return (
        <div className='bg-(--accent-light) my-8 p-16 rounded-lg shadow-md'>
            <h2 className='text-4xl font-bold text-center text-(--accent-dark)'>Explore Our Courses</h2>
            <div className='grid justify-items-center grid-cols-1 md:grid-cols-2 mt-8 gap-6 w-fit mx-auto'>
                {
                    courseData.map(course => (
                        <div key={course.id} className='bg-(--accent-dark) text-white p-6 rounded-lg shadow-md max-w-md min-w-[300px]'>
                            <h3 className='text-2xl font-semibold text-(--accent-light)'>{course.title}</h3>
                            <p className='text-(--accent) italic mb-4'>{course.tagline}</p>
                            <div className='mb-4'>
                                {course.price.original && (
                                    <span className='text-(--accent) line-through mr-2'>{course.price.original}</span>
                                )}
                                {course.price.discounted && (
                                    <span className='text-(--accent-dark) font-bold text-xl'>{course.price.discounted}</span>
                                )}
                                {course.price.monthly && (
                                    <span className='text-(--accent-dark) font-bold text-xl'>{course.price.monthly}</span>
                                )}
                                {course.price.total && (
                                    <div className='text-(--accent)'>Total: {course.price.total}</div>
                                )}
                            </div>
                            <ul className='list-disc list-inside mb-4 text-(--accent)'>
                                {course.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                            <button className='animated-button text-white '>
                                <span className='label'>{course.cta}</span>
                            </button>
                        </div>
                    ))
                }
            </div>

            <Link to="/courses" className=''>
                <button className='animated-button mt-8 mx-auto block'>
                    <span className='label'>View All Courses</span>
                </button>
            </Link>

        </div>
    )
}

export default Courses
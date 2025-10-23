import React from 'react'
import { Link } from 'react-router-dom'

const Courses = () => {
    const courseData = [
        {
            "id": "meditalia-plus-6m",
            "title": "MEDITALIA PLUS+ (6 Months)",
            "tagline": "Comprehensive IMAT Preparation",
            "price": {
                "original": "€104",
                "discounted": "€52",
                "period": "per month",
                "total": "€312 total"
            },
            "features": [
                "108 hours live lectures",
                "12 MedItalia simulations",
                "Updated study materials",
                "Bi-weekly mock tests with ranking",
                "Personalized guidance",
                "Career counseling sessions",
                "Previous papers access",
                "Unlimited practice resources"
            ],
            "cta": "Enroll Now"
        },
        {
            "id": "meditalia-plus-3m",
            "title": "MEDITALIA PLUS+ (3 Months)",
            "tagline": "Intensive IMAT Preparation",
            "price": {
                "monthly": "€44",
                "period": "per month",
                "total": "€132 total"
            },
            "features": [
                "Unlimited practice sets",
                "Comprehensive study resources",
                "Bi-weekly mock tests",
                "12 MedItalia simulations",
                "Previous papers access"
            ],
            "cta": "Enroll Now"
        }
    ]

    return (
        <section className='py-20 px-6 bg-(--accent-light)'>
            <div className='max-w-5xl mx-auto'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-medium text-(--accent-dark) mb-3'>
                        Our Programs
                    </h2>
                    <p className='max-w-xl mx-auto'>
                        Choose the plan that fits your preparation timeline
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
                    {
                        courseData.map((course, index) => (
                            <div key={course.id} className={`relative bg-(--accent-dark) text-(--accent-light) p-8 rounded-lg`}>
                                {index === 0 && (
                                    <div className='absolute -top-3 left-8'>
                                        <span className='bg-(--accent-light) text-(--accent-dark) border border-(--accent-dark) px-3 py-1 text-sm font-medium rounded'>
                                            Recommended
                                        </span>
                                    </div>
                                )}

                                <div className='mb-6'>
                                    <h3 className='text-xl font-semibold mb-2'>
                                        {course.title}
                                    </h3>
                                    <p className='text-gray-300'>{course.tagline}</p>
                                </div>

                                <div className='mb-6 pb-6 border-b'>
                                    <div className='flex items-baseline gap-2 mb-1'>
                                        {course.price.original && (
                                            <span className='line-through'>{course.price.original}</span>
                                        )}
                                        <span className='text-3xl font-bold'>
                                            {course.price.discounted || course.price.monthly}
                                        </span>
                                        <span className=''>{course.price.period}</span>
                                    </div>
                                    {course.price.total && (
                                        <div className='text-gray-300'>{course.price.total}</div>
                                    )}
                                </div>

                                <ul className='space-y-3 mb-8'>
                                    {course.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className='flex items-start gap-3'>
                                            <div className='w-4 h-4 bg-green-400 rounded-full flex items-center justify-center mt-1 flex-shrink-0'>
                                                <svg className='w-2.5 h-2.5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                                </svg>
                                            </div>
                                            <span className='text-(--accent-light) text-sm'>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`py-3 px-6 font-medium bg-(--accent-light) text-(--accent-dark) hover:scale-[1.02] transition-all cursor-pointer`}>
                                    {course.cta}
                                </button>
                            </div>
                        ))
                    }
                </div>

                <div className='text-center mt-12'>
                    <Link to="/courses">
                        <button className='animated-button flex items-center gap-2 mx-auto'>
                            <span className='label'>View All Programs</span>
                            <svg className='w-4 h-4 label' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Courses
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FAQ } from '../components'
import { courseService } from '../services/courses'

const CourseSyllabus = () => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);

    const fetchCourse = async (courseId) => {
        try {
            const response = await courseService.getById(courseId);
            setCourse(response.data.data);
        } catch (error) {
            console.error("Error fetching course:", error);
        }
    };

    useEffect(() => {
        fetchCourse(id);
    }, [id]);

    if (!course) {
        return <div className='max-w-7xl mx-auto p-4'>Loading course details...</div>;
    }

    return (
        <div className='space-y-2 py-8'>
            <div className='flex flex-wrap justify-center max-w-3xl mx-auto gap-6 p-4 my-8 bg-(--accent-light) rounded-md'>
                {
                    course.thumbnail?.url ? (
                        <img src={course.thumbnail.url} alt='course thumbnail' className='max-w-40 object-cover rounded-md' />
                    ) : (
                        <div className='w-40 h-40 flex items-center justify-center bg-gray-200 rounded-md'>
                            <span className='text-gray-500'>Image Not Available</span>
                        </div>
                    )
                }
                <div className='flex flex-col justify-evenly items-start gap-4 max-w-lg'>
                    <div>
                        <h1 className='text-xl font-semibold'>{course.title} (€{course.price}) – {course.duration}</h1>
                        <p>{course.shortDescription}</p>
                    </div>
                    <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I want to enroll in ${course.title} now!`)}`} target="_blank" rel="noopener noreferrer">
                        <button className='animated-button w-full'>
                            <span className='label'>Enroll Now via WhatsApp</span>
                        </button>
                    </a>
                </div>
            </div>
            <div className='max-w-3xl mx-auto p-4'>
                <h2 className='text-lg font-semibold'>About This Course</h2>
                <p className='text-justify'>{course.about && course.about}</p>
            </div>
            <div className='max-w-3xl mx-auto p-4'>
                <h2 className='text-lg font-semibold mb-1'>Why Choose This Course?</h2>
                <ul className='list-disc list-inside px-4 space-y-1'>
                    {course.whyChoose && course.whyChoose.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
            <div className='max-w-3xl mx-auto p-4'>
                <h2 className='text-lg font-semibold mb-1'>Course Syllabus</h2>
                <ul className='list-disc list-inside px-4 space-y-1'>
                    {course.syllabus && course.syllabus.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className='max-w-3xl mx-auto p-4'>
                <h2 className='text-lg font-semibold mb-1'>Instructor</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {course.instructors && course.instructors.map((inst, index) => (
                        <Link to={`/team/${inst.name.replace(/\s+/g, '-').toLowerCase()}`} key={index} className='flex flex-col flex-wrap text-center gap-4 mb-4 items-center bg-(--accent-light) p-4 rounded-md'>
                            {
                                inst.profilePicture?.url ? (
                                    <img src={inst.profilePicture.url} alt={inst.name} className='w-24 h-24 object-cover rounded-full' />
                                ) : (
                                    <div className='w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full'>
                                        <span className='text-gray-500'>Image Not Available</span>
                                    </div>
                                )
                            }
                            <div>
                                <h3 className='text-md font-semibold'>{inst.name}</h3>
                                <p className='italic text-xs'>{inst.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='max-w-3xl mx-auto p-4 mb-8'>
                <h2 className='text-lg font-semibold mb-1'>Enrollment</h2>
                <ul className='list-disc list-inside px-4 space-y-1 mb-8'>
                    <li>One-time payment of €{course.price}</li>
                    <li>Access to all course materials and resources for {course.duration}</li>
                    <li>Certificate of completion upon finishing the course</li>
                </ul>
                <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I want to enroll in ${course.title} now!`)}`} target="_blank" rel="noopener noreferrer">
                    <button className='animated-button w-full'>
                        <span className='label'>Enroll Now via WhatsApp</span>
                    </button>
                </a>
            </div>

            {
                course.faq &&
                <FAQ faq={course.faq} whichFaq={course.title} />
            }
        </div>
    )
}

export default CourseSyllabus
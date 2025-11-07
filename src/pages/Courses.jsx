import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { courseService } from '../services/courses'

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

        console.log(import.meta.env.VITE_WHATSAPP_NUMBER);
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
                    <div key={index} className='flex flex-col items-center justify-start space-y-4 flex-wrap-reverse border border-gray-200 rounded-md p-4 bg-(--primary)'>
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

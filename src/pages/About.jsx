import React from 'react'
import { Banner } from '../components'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className='mx-auto max-w-7xl'>
            <div className='px-8 py-16 lg:my-8 bg-(--accent-light) space-y-2'>
                <h1 className='text-3xl font-bold text-(--accent-dark)'>About Future MedsAcademy</h1>
                <p>
                    Future MedsAcademy is an international platform dedicated to guiding aspiring medical students toward their dream of studying medicine in Italy. Founded by Amir Akhtar, a medical student at the University of Messina, the academy was built on first-hand experience of the challenges students face with admissions, IMAT preparation, visas, and scholarships.
                </p>
                <p>
                    What began as one student’s mission has grown into a trusted academy that has supported hundreds of students from across the globe. With a growing network of mentors, workshops, and tailored programs, Future MedsAcademy is now recognized as a reliable partner for medical aspirants worldwide. Our goal is to make medical education in Italy accessible, transparent, and stress-free — backed by the knowledge of those who have successfully walked the same path.
                </p>
            </div>
            <div className='flex items-center flex-wrap-reverse justify-center gap-8 p-8 my-8'>
                <div className='flex-1 min-w-xs space-y-4'>
                    <h1 className='text-2xl md:text-3xl font-bold text-(--accent-dark)'>Amir Akhtar’s Journey & Experience</h1>
                    <ul className='space-y-4'>
                        <li>
                            <h4 className='flex items-center gap-2 font-semibold text-(--accent-dark)'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                    <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z" clipRule="evenodd" />
                                </svg>
                                Global Exposure
                            </h4>
                            Through travels across more than 13 countries and connections with peers from over 45 nationalities, Amir has built a strong international network and developed a deep understanding of diverse education systems, cultural perspectives, and the challenges students face when pursuing higher education abroad.
                        </li>
                        <li>
                            <h4 className='flex items-center gap-2 font-semibold text-(--accent-dark)'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                                </svg>
                                Teaching & Mentorship
                            </h4>
                            Amir’s teaching journey spans multiple countries — from science classrooms in India, to workshops in Lithuania, and professional experiences in Saudi Arabia. These roles refined his ability to simplify complex concepts and mentor students with clarity, empathy, and cultural sensitivity.
                        </li>
                        <li>
                            <h4 className='flex items-center gap-2 font-semibold text-(--accent-dark)'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                    <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                                    <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clipRule="evenodd" />
                                </svg>
                                Turning Struggles into Solutions
                            </h4>
                            Like many aspiring medical students, Amir personally navigated the hurdles of IMAT preparation, visa applications, scholarships, and documentation. These struggles inspired him to establish Future MedsAcademy — a platform built to ensure that no student faces this journey alone, and that every step toward studying medicine in Italy is supported with accurate guidance and mentorship.
                        </li>
                    </ul>
                </div>
                <div className='flex-1 min-w-xs max-w-md'>
                    <img className='object-cover w-full rounded-xl' src="/assets/amir-akhtar.jpg" alt="Amir Akhtar" />
                </div>
            </div>
            <div className='px-8 py-16 lg:my-8 bg-(--accent-light) flex items-center justify-center flex-wrap gap-8'>
                <div className='flex-1 min-w-xs max-w-md'>
                    <img src="/assets/team.png" alt="Future MedsAcademy Team" className='object-cover w-full rounded-xl' />
                </div>
                <div className='flex-1 min-w-xs'>
                    <h1 className='text-3xl font-bold text-(--accent-dark) mb-2'>Where We’re Headed</h1>
                    <p>Future MedsAcademy is just getting started. In the next five years, we aim to:</p>
                    <ul className='list-disc space-y-2 m-4 px-2'>
                        <li>
                            Build a larger mentor network of medical students and professionals
                        </li>
                        <li>
                            Become the go-to platform for studying medicine in Italy
                        </li>
                        <li>
                            Expand our support services, workshops, and international collaborations
                        </li>
                        <li>
                            Continue creating a strong, supportive community of future doctors
                        </li>
                    </ul>
                    <p>
                        Our dream is to make Italian medical education accessible to every determined student — regardless of background.
                    </p>
                </div>
            </div>
            <div className='px-8 py-16 lg:my-8 space-y-4 text-center max-w-3xl mx-auto'>
                <h2 className='text-2xl font-bold text-(--accent-dark)'>Changing the Way Students Prepare for IMAT</h2>
                <p>
                    We exist because students deserve clear, structured, and accurate support for IMAT preparation and studying medicine in Italy.
                </p>
                <p className='mb-8'>
                    No more overpriced consultancies, confusing processes, or misleading promises — just transparent guidance, practical resources, and a supportive community built by someone who has faced the same challenges.
                </p>
                <Link to="/courses" className='animated-button'>
                    <button className='label'>
                        Explore Our Courses
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default About
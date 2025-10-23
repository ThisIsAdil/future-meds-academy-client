import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FAQ } from '../components';

const StudyAbroadFAQ = [
    {
        question: "Why should I consider studying medicine abroad?",
        answer:
            "Studying medicine abroad gives you access to world-class universities, internationally recognized degrees, affordable tuition, and the chance to experience different cultures. It also increases career opportunities by expanding your global network."
    },
    {
        question: "Which countries can I apply to through Future MedsAcademy?",
        answer:
            "We currently support admissions to several European countries, including Italy, Lithuania, and others. Each destination has unique advantages, such as language of instruction, eligibility criteria, and cost structure."
    },
    {
        question: "What are the basic eligibility requirements?",
        answer:
            "Most countries require a completed high school diploma with strong grades in science subjects. Some may also require entrance exams (such as IMAT in Italy), proof of English proficiency (IELTS/TOEFL), and visa documentation."
    },
    {
        question: "Do I need IELTS or TOEFL to apply?",
        answer:
            "It depends on the university and country. Many programs in Europe offer English-taught courses and may require IELTS or TOEFL scores. However, some institutions accept alternative proof of English proficiency, such as previous schooling in English."
    },
    {
        question: "How much does it cost to study medicine abroad?",
        answer:
            "Tuition fees and living costs vary by country. For example, in Italy, tuition fees can be significantly lower than in many other countries, while in Lithuania, costs are moderate with flexible payment options. We provide detailed breakdowns during the consultation process."
    },
    {
        question: "What support does Future MedsAcademy provide?",
        answer:
            "We guide you through every step: eligibility checks, application submission, exam preparation, visa assistance, scholarships, accommodation, and settling abroad. We also provide language training through our partner, Blooms Academy."
    },
    {
        question: "Can I work while studying abroad?",
        answer:
            "Yes, many countries allow international students to work part-time during their studies. The number of hours permitted depends on local regulations. We provide guidance on balancing study and work opportunities."
    },
    {
        question: "How do I start the application process?",
        answer:
            "The first step is to book a consultation with our team. We’ll review your academic background, help you choose the best destination, and provide a step-by-step roadmap for your application journey."
    }
];


const StudyAbroad = () => {
    const offeredDestinationCountries = [
        {
            country: "Italy 🇮🇹",
            language: ["English", "Italian"],
            topUniversities: ["University of Rome", "University of Messina"],
            eligibility: ["High school diploma", "IMAT exam for non-EU students"]
        },
        {
            country: "Lithuania 🇱🇹",
            language: ["English"],
            topUniversities: ["Vilnius University", "Lithuanian University of Health Sciences"],
            eligibility: ["High school diploma", "Entrance test requirements"]
        },
        {
            country: "Germany 🇩🇪",
            language: ["German", "English (limited programs)"],
            topUniversities: ["Heidelberg University", "Charité – Berlin University of Medicine"],
            eligibility: ["High school diploma", "TestAS for non-EU students", "German language proficiency"]
        },
        {
            country: "Poland 🇵🇱",
            language: ["English", "Polish"],
            topUniversities: ["Jagiellonian University", "Warsaw Medical University"],
            eligibility: ["High school diploma", "Entrance exam or interview for non-EU students"]
        },
        {
            country: "Spain 🇪🇸",
            language: ["Spanish", "English (few programs)"],
            topUniversities: ["University of Barcelona", "Complutense University of Madrid"],
            eligibility: ["High school diploma", "University entrance exam (Selectividad)", "Spanish language proficiency"]
        }
    ];

    const offeredCountriesContainer = useRef(null)

    const scrollLeft = () => {
        offeredCountriesContainer.current.scrollLeft -= 300
    }

    const scrollRight = () => {
        offeredCountriesContainer.current.scrollLeft += 300
    }

    return (
        <div className='mb-16'>
            <div className='text-center space-y-4 px-4 py-16 max-w-4xl mx-auto'>
                <h1 className='text-2xl md:text-3xl font-bold text-(--accent-dark)'>Study Medicine Abroad with Future MedsAcademy</h1>
                <p>
                    Your journey to becoming a doctor starts here. From understanding eligibility and preparing for entrance exams, to securing visas and settling in a new country, we provide step-by-step guidance to make studying medicine abroad simple, clear, and stress-free.
                </p>
                <div className='flex justify-center flex-wrap gap-4 my-8'>
                    <Link to="/study-abroad/universities" className='animated-button'><span className='label'>Explore Universities</span></Link>
                    <a target='_blank' href="https://bloomsacademy.com" className='animated-button'><span className='label'>Explore Blooms Academy</span></a>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 p-4 gap-8 justify-center mx-auto'>
                <div className='max-w-4xl md:col-span-2 space-y-8 px-4'>
                    <div id='why-study-medicine-abroad' className='space-y-2'>
                        <h1 className='text-2xl font-bold text-(--accent-dark)'>Why Choose to Study Medicine Abroad?</h1>
                        <p className='text-justify'>Studying medicine abroad offers unparalleled opportunities to gain a high-quality education, international exposure, and globally recognized qualifications. By choosing the right destination, students can access world-class universities, diverse learning environments, and cost-effective programs while preparing for a successful medical career.</p>
                        <ul className='space-y-2 p-2'>
                            <li className='flex items-start leading-none gap-2'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                    </svg>
                                </span>
                                International Recognition – Degrees accepted worldwide, enhancing career prospects.
                            </li>
                            <li className='flex items-start leading-none gap-2'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                                Cost Efficiency – Affordable tuition and living expenses compared to domestic programs.
                            </li>
                            <li className='flex items-start leading-none gap-2'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                                    </svg>
                                </span>
                                Academic Excellence – Access to high-quality universities with modern facilities.
                            </li>
                            <li className='flex items-start leading-none gap-2'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                    </svg>
                                </span>
                                Global Exposure – Experience diverse cultures and expand professional networks.
                            </li>
                            <li className='flex items-start leading-none gap-2'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                    </svg>
                                </span>
                                Language Skills – Opportunity to learn or improve foreign language proficiency.
                            </li>
                        </ul>
                    </div>
                    <div id='our-destination-countries' className='space-y-2'>
                        <h1 className='text-2xl font-bold text-(--accent-dark)'>Our Destination Countries</h1>
                        <p>
                            We guide aspiring medical students to study in some of the world’s most sought-after destinations. Each country offers unique opportunities, including language options, recognized universities, and tailored admission pathways. Our goal is to help you choose the right destination that aligns with your academic and career goals.
                        </p>
                        <div className='flex gap-4 overflow-x-scroll snap-x snap-mandatory my-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]' ref={offeredCountriesContainer}>
                            {
                                offeredDestinationCountries.map((country, index) => (
                                    <div key={index} className='bg-(--accent-light) p-4 min-w-xs snap-start' >
                                        <h2 className='text-lg font-semibold pb-2 text-center border-b border-(--accent-dark)'>{country.country}</h2>
                                        <ul className='py-4 text-sm space-y-2'>
                                            <li>Language of Instruction: {country.language.join(", ")}.</li>
                                            <li>Top Universities: {country.topUniversities.join(", ")}.</li>
                                            <li>Eligibility Criteria: {country.eligibility.join(", ")}.</li>
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex justify-between items-center flex-wrap py-8'>
                            <div className='flex gap-2'>
                                <button className='bg-(--accent-dark) p-2 rounded-l-md text-(--accent-light) cursor-pointer' onClick={scrollLeft} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <button className='bg-(--accent-dark) p-2 rounded-r-md text-(--accent-light) cursor-pointer' onClick={scrollRight}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                            <Link to="/universities" className='animated-button'><span className='label'>View All Universities</span></Link>
                        </div>
                        <div id='what-you-need-to-apply' className='bg-(--accent-light) rounded-lg p-8 space-y-2'>
                            <h1 className='text-2xl font-bold text-(--accent-dark)'>What You Need to Apply</h1>
                            <p className='mb-8'>Each country has its own entry requirements for international medical students. From academic grades and entrance exams to language proficiency and visa documentation, we simplify the process by providing clear, step-by-step eligibility criteria for every destination we support.</p>

                            <a href="/path/to/requirements.pdf" download="requirements.pdf" className='animated-button'><span className='label'>Download Requirements PDF</span></a>
                        </div>
                        <div id='helpful-resources' className='py-8 space-y-2'>
                            <h1 className='text-2xl font-bold text-(--accent-dark)'>Helpful Resources for Your Journey</h1>
                            <p>Access curated resources designed to make your study abroad journey easier — from step-by-step country guides to visa checklists and exam preparation courses. Learn, prepare, and stay ahead with Future MedsAcademy and our partner, <a href="https://bloomsacademy.com" target='_blank' rel='noopener noreferrer' className='animated-link'>Blooms Academy</a>.</p>
                            <h4 className='font-bold text-lg text-(--accent-dark)'>Resources</h4>
                            <ul className='list-disc space-y-1 ml-6'>
                                <li><Link to="/path/to/article" className='animated-link'>How to Apply for Medicine in Italy</Link> <span className='text-gray-500 text-sm'>- Blog article</span></li>
                                <li><Link to="/path/to/article" className='animated-link'>Visa Guide for Non-EU Students</Link> <span className='text-gray-500 text-sm'>- Blog article</span></li>
                                <li><Link to="/path/to/article" className='animated-link'>Scholarship Opportunities for Medical Students</Link> <span className='text-gray-500 text-sm'>- Blog article</span></li>
                                <li><Link to="/path/to/course" className='animated-link'>IELTS & English Prep by Blooms Academy</Link> <span className='text-gray-500 text-sm'>- Course page</span></li>
                                <li><Link to="/path/to/webinar" className='animated-link'>Recorded Webinar: Cracking the IMAT</Link> <span className='text-gray-500 text-sm'>- Learning resource</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul className='bg-(--accent-light) w-full hidden md:block rounded-lg p-8 sticky top-24 h-fit self-start'>
                    <h4 className='mb-4'>On This Page</h4>
                    <li className='mb-2'><a href="#why-study-medicine-abroad" className='animated-link'>Why Choose to Study Medicine Abroad?</a></li>
                    <li className='mb-2'><a href="#our-destination-countries" className='animated-link'>Our Destination Countries</a></li>
                    <li className='mb-2'><a href="#what-you-need-to-apply" className='animated-link'>What You Need to Apply</a></li>
                    <li className='mb-2'><a href="#helpful-resources" className='animated-link'>Helpful Resources for Your Journey</a></li>
                </ul>
            </div>
            <FAQ faq={StudyAbroadFAQ} whichFaq={"Study Abroad"} />
        </div>
    )
}

export default StudyAbroad
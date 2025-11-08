import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FAQ } from '../components';

const IMAT = () => {
    const date = new Date();
    const examinationYear = date.getMonth() >= 9 ? date.getFullYear() + 1 : date.getFullYear();

    const [activeSyllabusTab, setactiveSyllabusTab] = useState(0);

    const examOverview = [
        {
            head: "Features",
            body: "Details"
        },
        {
            head: "Exam Duration",
            body: "100 minutes"
        },
        {
            head: "Number of Questions",
            body: "60 multiple-choice questions"
        },
        {
            head: "Sections",
            body: <span>Biology (18 questions), <br />Chemistry (12 questions), <br />Physics and Mathematics (10 questions) <br /> Logical Reasoning and General Knowledge (20 questions)</span>
        },
        {
            head: "Scoring System",
            body: "1.5 points for each correct answer, -0.4 points for each incorrect answer, 0 points for unanswered questions"
        }
    ]

    const syllabusContent = [
        [
            "Argument recognition (premises, conclusions)",
            "Identifying assumptions & inferences",
            "Deductive and inductive reasoning",
            "Logical sequences & patterns", "Syllogisms",
            "Analogies",
            "Problem-solving with numbers, shapes, and patterns",
            "Data interpretation & critical thinking",
            "History (World & European focus)",
            "Geography (Europe, World)",
            "Literature & Philosophy",
            "Current Affairs (past 1–2 years)",
            "Political systems & international organizations",
            "Science & Technology breakthroughs"],
        [
            "The Cell (structure, organelles, mitosis & meiosis)",
            "Biomolecules (carbohydrates, lipids, proteins, nucleic acids)",
            "Genetics (Mendel’s laws, DNA replication, transcription, translation, mutations)",
            "Physiology (nervous system, endocrine system, circulation, respiration, digestion, excretion, reproduction, immune system)",
            "Human anatomy basics",
            "Plant biology basics (photosynthesis, respiration, reproduction)",
            "Ecology & ecosystems",
            "Evolution & natural selection"
        ],
        [
            "Atomic structure & periodic table",
            "Chemical bonds & molecular structure",
            "Stoichiometry (moles, chemical reactions, equations)",
            "Thermodynamics & energetics",
            "Solutions, concentrations, dilutions",
            "Acids, bases, salts, pH",
            "Oxidation-reduction reactions",
            "Organic Chemistry (hydrocarbons, alcohols, aldehydes, ketones, carboxylic acids, esters, polymers)",
            "Biochemistry basics (amino acids, nucleotides, enzymes)"
        ],
        [
            "Units of measurement & SI system",
            "Kinematics (motion, velocity, acceleration)",
            "Dynamics (Newton’s laws, force, work, energy, power)",
            "Fluid mechanics (pressure, density, buoyancy)",
            "Thermodynamics (heat, temperature, laws of thermodynamics)",
            "Optics (reflection, refraction, lenses, mirrors)",
            "Waves & Sound (frequency, wavelength, speed)",
            "Electricity & Magnetism (Ohm’s law, circuits, Coulomb’s law, magnetic fields)",
            "Modern Physics (atoms, radioactivity, nuclear reactions, quantum basics)"
        ],
        [
            "Algebra (equations, inequalities, polynomials, exponents, logarithms)",
            "Functions & Graphs",
            "Sequences & Series",
            "Geometry (areas, volumes, coordinate geometry, angles, trigonometry basics)",
            "Probability & Statistics (mean, median, mode, permutations, combinations)",
            "Calculus (limits, derivatives, integrals – basic level)"
        ]
    ]

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
            answer: "The IMAT exam covers five main sections: Biology (23 questions), Chemistry (15 questions), Physics and Mathematics (13 questions), Logical Reasoning and General Knowledge (9 questions)."
        }
    ]




    return (
        <div className='flex flex-col items-center gap-8 mb-8 mt-16'>
            <div className='flex flex-col items-center gap-4 text-center max-w-4xl mx-auto px-8 pb-[10vh]'>
                <h1 className='text-3xl font-bold text-(--accent-dark)'>Everything You Need to Know About the IMAT {examinationYear} Examination</h1>
                <p>Your complete guide to the International Medical Admissions Test (IMAT) — exam details, preparation strategies, <Link to="/past-papers" className='animated-link'>past papers</Link>, and <Link to="/consultation" className='animated-link'>expert mentorship</Link> with <Link to="/courses" className='animated-link'>Future MedsAcademy</Link>.</p>
                <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                    <Link to="/previous-year-papers"><button className='animated-button'><span className='label'>Access IMAT Past Year Questions</span></button></Link>
                    <Link to="/courses"><button className='animated-button'><span className='label'>Explore IMAT Prep Courses</span></button></Link>
                </div>
            </div>
            <div className='flex justify-center gap-8 w-full mx-auto'>
                <div className='max-w-4xl w-full'>
                    <div id='what-is-imat' className='max-w-6xl flex flex-col justify-center gap-4 bg-(--accent-light) rounded-lg px-8 py-16'>
                        <h1 className='text-3xl font-bold text-(--accent-dark) mx-auto max-w-5xl w-full'>What is IMAT Examination?</h1>
                        <p className='max-w-5xl mx-auto'>The IMAT (International Medical Admissions Test) is a standardized entrance exam for students who want to study medicine and surgery in English at Italian universities. It is required by many public universities in Italy and is used to assess skills in logical reasoning, problem-solving, general knowledge, and core science subjects like biology, chemistry, physics, and mathematics.</p>
                        <p className='max-w-5xl mx-auto'>The test is created by the Italian Ministry of Education in collaboration with Cambridge Assessment and is held once a year, typically in September.</p>
                    </div>
                    <div id='exam-overview' className='py-8 px-4'>
                        <h2 className='text-3xl font-bold text-(--accent-dark)'>IMAT {examinationYear} Exam Overview</h2>
                        <ul className='grid grid-cols-3 gap-2 my-4'>
                            {examOverview.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li className={`p-4 bg-(--accent-light) ${index === 0 ? 'font-bold' : ''}`}>{item.head}</li>
                                    <li className={`p-4 bg-(--accent-light) col-span-2 ${index === 0 ? 'font-bold' : ''}`}>{item.body}</li>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                    <div id='syllabus' className='py-8 px-4'>
                        <h2 className='text-3xl font-bold text-(--accent-dark)'>IMAT {examinationYear} Syllabus</h2>

                        <div>
                            <ul className='flex space-y-2 flex-wrap mt-4'>
                                {["Logical & General Knowledge", "Biology", "Chemistry", "Physics", "Mathematics"].map((section, index) => (
                                    <li key={index} className={'py-2 px-6 cursor-pointer' + (index === activeSyllabusTab ? ' bg-(--accent-dark) rounded-t-xl text-(--accent-light)' : "")} onClick={() => setactiveSyllabusTab(index)}>
                                        {section}
                                    </li>
                                ))}
                            </ul>
                            <ul className='bg-(--accent-light) p-4 list-disc'>
                                {syllabusContent[activeSyllabusTab].map((item, index) => (
                                    <li key={index} className='mx-4 border-b border-(--accent-light)'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div id='preparation' className='py-8 px-4'>
                        <h2 className='text-3xl font-bold text-(--accent-dark)'>How to Prepare for the IMAT Exam</h2>
                        <p className='max-w-3xl'>Cracking the IMAT requires a smart approach that balances consistent study, practice, and time management. Here are some proven strategies:</p>

                        <ul className='list-disc'>
                            <h2 className='flex items-center text-xl font-semibold text-(--accent-dark) gap-2 mt-8'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                                </svg>
                                Study Schedule Tips
                            </h2>
                            <li className='ml-6'>Start at least 3–6 months before the exam</li>
                            <li className='ml-6'>Break the syllabus into manageable weekly goals</li>
                            <li className='ml-6'>Use active recall and spaced repetition for long-term memory</li>
                            <li className='ml-6'>Balance science subjects with logical reasoning practice</li>
                        </ul>
                        <ul className='list-disc'>
                            <h2 className='flex items-center text-xl font-semibold text-(--accent-dark) gap-2 mt-8'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Mock Tests & Time Management
                            </h2>
                            <li className='ml-6'>Take full-length timed mock tests to simulate exam conditions</li>
                            <li className='ml-6'>Review mistakes carefully to avoid repeating them</li>
                            <li className='ml-6'>Learn to skip and return to difficult questions instead of wasting time</li>
                            <li className='ml-6'>Track progress with performance analysis</li>
                        </ul>
                        <ul className='list-disc'>
                            <h2 className='flex items-center text-xl font-semibold text-(--accent-dark) gap-2 mt-8'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                                </svg>
                                Subject-Wise Strategies
                            </h2>
                            <li className='ml-6'>Logic: Practice puzzles, critical thinking, and argument analysis</li>
                            <li className='ml-6'>Biology: Focus on diagrams, cycles, and high-yield topics (cell biology, physiology, genetics)</li>
                            <li className='ml-6'>Chemistry: Revise reaction mechanisms, periodic trends, and problem-solving</li>
                            <li className='ml-6'>Physics: Practice numerical problems and formula applications</li>
                            <li className='ml-6'>Math: Strengthen algebra, probability, and statistics basics</li>
                        </ul>
                    </div>
                    <div id='cutoff-scores' className='py-8 px-4'>
                        <h2 className='text-3xl font-bold text-(--accent-dark)'>IMAT Cutoff Scores (EU & Non-EU Students)</h2>
                        <p>Check official IMAT cutoff trends from the past years for Italian medical universities. Analyze score patterns and plan your preparation strategically.</p>
                        <ul className="flex flex-col sm:flex-row gap-4 mt-4">
                            <li className="mt-4">
                                <Link to="/imat/cutoff/eu">
                                    <button className="animated-button"><span className="label">EU Cutoff Scores</span></button>
                                </Link>
                            </li>
                            <li className="mt-4">
                                <Link to="/imat/cutoff/non-eu">
                                    <button className="animated-button"><span className="label">Non-EU Cutoff Scores</span></button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className='bg-(--accent-light) w-fit hidden md:block rounded-lg p-8 sticky top-24 h-fit self-start'>
                    <h4 className='mb-4'>On This Page</h4>
                    <li className='mb-2 whitespace-nowrap'><a href="#what-is-imat" className='animated-link'>What is IMAT Examination?</a></li>
                    <li className='mb-2 whitespace-nowrap'><a href="#exam-overview" className='animated-link'>IMAT Exam Overview</a></li>
                    <li className='mb-2 whitespace-nowrap'><a href="#syllabus" className='animated-link'>IMAT Syllabus</a></li>
                    <li className='mb-2 whitespace-nowrap'><a href="#preparation" className='animated-link'>How to Prepare for the IMAT Exam</a></li>
                    <li className='mb-2 whitespace-nowrap'><a href="#cutoff-scores" className='animated-link'>IMAT Cutoff Scores</a></li>
                </ul>
            </div>
            <FAQ faq={FAQContent} whichFaq={"IMAT Examination"} />
        </div >
    )
}

export default IMAT
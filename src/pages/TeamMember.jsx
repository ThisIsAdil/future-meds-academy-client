import React from 'react'
import { Link } from 'react-router-dom';

const TeamMember = () => {
    const profileData = {
        profilePhoto: "/assets/team/amir-akhtar.jpg",
        name: "Amir Akhtar",
        designation: "Founder & Physics Tutor",
        about:
            "Amir Akhtar is the founder of Future Meds Academy and a dedicated Physics tutor with over 10 years of experience in guiding students towards success in medical entrance exams. His passion for teaching and commitment to student success have made him a beloved figure among aspiring medical students.",
        youtubeVideoUrl: "https://www.youtube.com/watch?v=geejWrV0UMo?si=ORhQ6jOjTF7K4z84",
        courses: [
            {
                _id: "665f1a1e1c9d440001a1a002",
                title: "IMAT Meditalia Prep Course (€129) – 3 Months",
                thumnail: "/assets/courses/default.jpg",
                description: "A budget-friendly 3-month course designed to prepare you effectively for the IMAT exam with structured practice and expert guidance.",
            },
            {
                _id: "665f1a1e1c9d440001a1a002",
                title: "IMAT Meditalia Prep Course (€249) – 6 Months",
                thumnail: "/assets/courses/default.jpg",
                description: "A comprehensive 6-month course offering in-depth coverage of the IMAT syllabus, personalized feedback, and extensive practice materials to ensure your success.",
            }
        ],
    };


    return (
        <div className='min-h-sceen w-full'>
            <div className='max-w-4xl mx-auto py-16 px-8'>
                <div className='flex flex-col md:flex-row items-center gap-8 mb-8 bg-(--accent-light) p-6 rounded-lg'>
                    <div className='w-48 h-48 flex-shrink-0'>
                        <img
                            src={profileData.profilePhoto}
                            alt={profileData.name}
                            className='w-full h-full object-cover rounded-lg'
                            onError={(e) => { e.target.onerror = null; e.target.src = "/assets/team/default-profile.jpg"; }}
                        />
                    </div>
                    <div className='text-center md:text-left'>
                        <h1 className='text-3xl font-bold text-(--accent-dark)'>{profileData.name}</h1>
                        <p className='text-lg text-(--accent-dark) opacity-70'>{profileData.designation}</p>
                    </div>
                </div>
                <div className='mb-8'>
                    <h2 className='text-2xl font-semibold text-(--accent-dark) mb-4'>About {profileData.name.split(' ')[0]}</h2>
                    <p className='text-justify'>{profileData.about}</p>
                </div>
                <div className='mb-8'>
                    <h2 className='text-2xl font-semibold text-(--accent-dark) mb-4'>Introduction Video</h2>
                    <div className='aspect-video w-full'>
                        <iframe
                            className='w-full h-full rounded-lg'
                            src={profileData.youtubeVideoUrl.replace("watch?v=", "embed/")}
                            title={`${profileData.name} Introduction Video`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl font-semibold text-(--accent-dark) mb-4'>Courses by {profileData.name.split(' ')[0]}</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {profileData.courses.map((course, index) => (
                            <Link to={"/courses/syllabus/" + course._id} key={index} className='bg-white rounded-lg shadow-md p-4'>
                                <img
                                    src={course.thumnail}
                                    alt={course.title}
                                    className='w-full object-cover rounded-md mb-4'
                                    onError={(e) => { e.target.onerror = null; e.target.src = "/assets/courses/default.jpg"; }}
                                />
                                <h3 className='font-semibold text-(--accent-dark) mb-2'>{course.title}</h3>
                                <p className='text-sm text-justify'>{course.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamMember
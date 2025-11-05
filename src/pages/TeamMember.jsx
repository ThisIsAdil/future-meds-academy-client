import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { teamService } from '../services/team';
import { Loader } from '../components';


const TeamMember = () => {
    const memberId = useParams().memberId;
    const [profileData, setProfileData] = useState(null)

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null
        const patterns = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\s?#]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\s?#]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\s?#]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\s?#]+)/
        ]
        for (const p of patterns) {
            const m = url.match(p)
            if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`
        }
        try {
            const u = new URL(url)
            if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/embed/')) return url
        } catch (e) { }
        return null
    }

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await teamService.getById(memberId);
            setProfileData(response?.data?.data || null);

            if (response?.data?.data?.videoIntroductionUrl) {
                const embedUrl = getYouTubeEmbedUrl(response.data.data.videoIntroductionUrl);
                setProfileData((prev) => ({
                    ...prev,
                    videoIntroductionUrl: embedUrl
                }));
            }
        };

        fetchProfileData();
    }, []);

    if (!profileData) {
        return <Loader />;
    }

    return (
        <div className='min-h-sceen w-full'>
            <div className='max-w-4xl mx-auto py-16 px-8'>
                <div className='flex flex-col md:flex-row items-center gap-8 mb-8 bg-(--accent-light) p-6 rounded-lg'>
                    <div className='w-48 h-48 flex-shrink-0'>
                        {
                            profileData.profilePicture?.url === "" ? (
                                <div className='w-full h-full bg-(--accent-dark) flex items-center justify-center rounded-lg'>
                                    <span className='text-6xl text-white font-bold'>{profileData.name.charAt(0)}</span>
                                </div>
                            ) : (
                                <img
                                    src={profileData.profilePicture?.url}
                                    alt={profileData.name}
                                    className='w-full h-full object-cover rounded-lg'
                                    onError={(e) => { e.target.onerror = null; e.target.src = "/assets/team/default-profile.jpg"; }}
                                />
                            )
                        }
                    </div>
                    <div className='text-center md:text-left'>
                        <h1 className='text-3xl font-bold text-(--accent-dark)'>{profileData.name}</h1>
                        <p className='text-lg text-(--accent-dark) opacity-70'>{profileData.designation}</p>
                    </div>
                </div>
                {
                    profileData.about &&
                    <div className='mb-8'>
                        <h2 className='text-2xl font-semibold text-(--accent-dark) mb-4'>About {profileData.name.split(' ')[0]}</h2>
                        <p className='text-justify'>{profileData.about}</p>
                    </div>
                }
                {
                    profileData.videoIntroductionUrl &&
                    <div className='mb-8'>
                        <h2 className='text-2xl font-semibold text-(--accent-dark) mb-4'>Introduction Video</h2>
                        <div className='aspect-video w-full'>
                            <iframe
                                className='w-full h-full rounded-lg'
                                src={profileData.videoIntroductionUrl}
                                title={`${profileData.name} Introduction Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                }
                {
                    profileData.enrolledCourses && profileData.enrolledCourses.length > 0 &&
                    <div>
                        <h2 className='text-2xl font-semibold text-(--accent-dark) mb-4'>Courses by {profileData.name.split(' ')[0]}</h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {profileData.enrolledCourses.map((course, index) => (
                                <Link to={"/courses/syllabus/" + course._id} key={index} className='bg-white rounded-lg shadow-md p-4'>
                                    <img
                                        src={course.thumbnail.url}
                                        alt={course.title}
                                        className='w-full object-cover rounded-md mb-4'
                                        onError={(e) => { e.target.onerror = null; e.target.src = "/assets/courses/default.jpg"; }}
                                    />
                                    <h3 className='font-semibold text-(--accent-dark) mb-2'>{course.title}</h3>
                                    <p className='text-sm text-justify'>{course.shortDescription}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default TeamMember

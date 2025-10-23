import React from 'react'
import { Link } from 'react-router-dom';

const teamMembers = [
    {
        name: "Amir Akhtar",
        role: "Founder & Physics Tutor",
        profile: "/assets/team/amir-akhtar.jpg",
        video: "/assets/team/amir-akhtar.mp4"
    },
    {
        name: "Talal Adil",
        role: "Biology Tutor",
        profile: "/assets/team/talal-adil.jpg",
        video: "/assets/team/talal-adil.mp4"
    },
    {
        name: "Tahira Faheem",
        role: "Maths Tutor",
        profile: "/assets/team/tahira-faheem.jpg",
        video: "/assets/team/tahira-faheem.mp4"
    },
    {
        name: "Hayk Sarsyan",
        role: "Maths Tutor",
        profile: "/assets/team/hayk-sarsyan.jpg",
        video: "/assets/team/hayk-sarsyan.mp4"
    },
    {
        name: "Toranj Maleki",
        role: "Chemistry Tutor",
        profile: "/assets/team/toranj-maleki.jpg",
        video: "/assets/team/toranj-maleki.mp4"
    },
    {
        name: "Maheshi Pratibha",
        role: "Administrator & Mentor",
        profile: "/assets/team/maheshi-pratibha.jpg",
        video: "/assets/team/maheshi-pratibha.mp4"
    },
    {
        name: "Maham Ovis",
        role: "Administrator",
        profile: "/assets/team/maham-ovis.jpg",
        video: "/assets/team/maham-ovis.mp4"
    }
];

const Team = () => {
    return (
        <section className='py-16 px-8'>
            <div className='max-w-6xl mx-auto'>
                <h2 className='text-3xl font-semibold text-center text-(--accent-dark) mb-12'>Meet Our Team</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 justify-items-center">
                    {teamMembers.map((member, index) => (
                        <Link to={`/team/${member.name.replace(/\s+/g, '-').toLowerCase()}`} className='text-center max-w-[160px] bg-(--accent-light) rounded-lg p-2' key={index}>
                            <div className='mb-4 overflow-hidden rounded-md'>
                                <img
                                    src={member.profile}
                                    alt={member.name}
                                    className="object-cover w-full aspect-[3/4] hover:scale-105 transition-transform duration-300"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "/assets/team/default-profile.jpg"; }}
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-(--accent-dark) mb-1 capitalize">{member.name}</h3>
                            <p className="text-xs text-(--accent-dark) opacity-70 leading-relaxed">{member.role}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team
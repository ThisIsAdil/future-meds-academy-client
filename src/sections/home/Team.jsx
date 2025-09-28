import React, { useState } from 'react'

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
        <div className='py-8'>
            <h2 className='text-4xl text-center text-(--accent-dark) font-bold md:text-5xl'>Meet Our Team</h2>

            <div className="flex flex-wrap p-2 gap-4 justify-center">
                {teamMembers.map((member, index) => (
                    <div className='text-center bg-(--accent-light) p-2 rounded-sm max-w-[200px] w-[40vw] hover:scale-105 transition-transform duration-200 hover:shadow-md' key={index}>
                        <img
                            src={member.profile}
                            alt={member.name}
                            className="object-cover w-full rounded-sm aspect-[11/16]"
                            onError={(e) => { e.target.onerror = null; e.target.src = "/assets/team/default-profile.jpg"; }}
                        />
                        <h3 className="text-sm font-semibold pt-2 md:text-base">{member.name}</h3>
                        <p className="text-xs text-gray-600 px-2 md:text-sm">{member.role}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Team

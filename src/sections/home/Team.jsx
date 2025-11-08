import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SmartImage from '../../components/SmartImage'
import { teamService } from '../../services/team'

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([])

    const fetchTeamMembers = async () => {
        try {
            const response = await teamService.getAll();
            setTeamMembers(response.data.data);
        } catch (error) {
            console.error("Error fetching team members:", error);
        }
    }

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    return (
        <section className='py-16 px-8'>
            <div className='max-w-6xl mx-auto'>
                <h2 className='text-3xl font-semibold text-center text-(--accent-dark) mb-12'>Meet Our Team</h2>

                <div className="flex overflow-x-auto gap-8 px-4 snap-x">
                    {teamMembers.map((member, index) => (
                        <Link to={`/team/${member._id}`} className='text-center max-w-md min-w-[160px] snap-start bg-(--accent-light) rounded-lg p-2 hover:shadow-md transition-shadow duration-300' key={index}>
                            <div className='mb-4 overflow-hidden rounded-md'>
                                <SmartImage
                                    src={member.profilePicture.url}
                                    alt={member.name}
                                    className="object-cover w-full aspect-[3/4] hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-(--accent-dark) mb-1 capitalize">{member.name}</h3>
                            <p className="text-xs text-(--accent-dark) opacity-70 leading-relaxed">{member.designation}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team
import React from 'react'
import { Link } from 'react-router-dom'
import teamMembers from '../../data/team'
import SmartImage from '../../components/SmartImage'

const Team = () => {
    return (
        <section className='py-16 px-8'>
            <div className='max-w-6xl mx-auto'>
                <h2 className='text-3xl font-semibold text-center text-(--accent-dark) mb-12'>Meet Our Team</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 justify-items-center">
                    {teamMembers.map((member, index) => (
                        <Link to={`/team/${member.name.replace(/\s+/g, '-').toLowerCase()}`} className='text-center max-w-[160px] bg-(--accent-light) rounded-lg p-2' key={index}>
                            <div className='mb-4 overflow-hidden rounded-md'>
                                <SmartImage
                                    src={member.profile}
                                    alt={member.name}
                                    className="object-cover w-full aspect-[3/4] hover:scale-105 transition-transform duration-300"
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
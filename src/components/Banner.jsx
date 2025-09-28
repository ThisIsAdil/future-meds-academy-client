import React from 'react'
import { Link } from 'react-router-dom'

const Banner = ({ content }) => {
    const { title, description, buttonText, buttonLink } = content;
    return (
        <div className='mb-8 px-[5vw] py-16 text-center rounded-lg flex flex-col justify-center items-center gap-8 bg-(--accent-dark) text-(--primary)'>
            <h1 className='text-2xl md:text-4xl font-bold'>{title}</h1>
            <p>{description}</p>
            <button className="bg-(--accent-light) text-(--accent-dark) p-4">
                <Link to={buttonLink} className="animated-link">{buttonText}</Link>
            </button>
        </div>
    )
}

export default Banner
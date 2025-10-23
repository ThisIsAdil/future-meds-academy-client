import React from 'react'
import { Link } from 'react-router-dom'

const Banner = ({ content }) => {
    const { title, description, buttonText, buttonLink } = content;
    return (
        <section className='py-16 px-6 bg-(--accent-dark) rounded-lg mb-16'>
            <div className='max-w-4xl mx-auto text-center'>
                <h1 className='text-2xl md:text-3xl text-(--primary) font-medium mb-4 tracking-tight'>
                    {title}
                </h1>
                <p className='text-(--accent-light) font-light mb-8 max-w-2xl mx-auto'>
                    {description}
                </p>
                <Link
                    to={buttonLink}
                    className='inline-block bg-(--primary) text-(--accent-dark) font-medium py-3 px-6'
                >
                    {buttonText}
                </Link>
            </div>
        </section>
    )
}

export default Banner
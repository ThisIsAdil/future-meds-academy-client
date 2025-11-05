import React from 'react'
import { SmartImage } from '../components';

const Loader = () => {
    return (
        <div className='text-center min-h-[60vh] flex items-center justify-center'>
            <SmartImage
                src="/assets/favicon.png"
                alt="Default Profile"
                className="w-16 h-16 mx-auto object-contain rounded-lg animate-pulse"
            />
        </div>
    )
}

export default Loader
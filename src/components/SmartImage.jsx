import React from 'react'

const SmartImage = ({ src, alt = '', className = '', fallback = '/assets/team/default-profile.jpg', ...rest }) => {
    const handleError = (e) => {
        e.target.onerror = null
        e.target.src = fallback
    }

    return <img src={src} alt={alt} className={className} onError={handleError} {...rest} />
}

export default SmartImage

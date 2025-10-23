import React from 'react'

const AnimatedButton = ({ children, className = '', ...props }) => {
    return (
        <button className={`animated-button ${className}`} {...props}>
            <span className="label">{children}</span>
        </button>
    )
}

export default AnimatedButton

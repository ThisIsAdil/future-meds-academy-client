import React from 'react'

const PageContainer = ({ children }) => {
    return (
        <div className='h-screen px-4 sm:pl-20 py-16 w-screen overflow-y-scroll'>
            {children}
        </div>
    )
}

export default PageContainer
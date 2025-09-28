import React, { useState } from 'react'

const FAQ = ({ faq, whichFaq }) => {
    const [openItems, setOpenItems] = useState({})

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div className='max-w-5xl w-full mx-auto p-4'>
            <h2 className='text-3xl font-bold text-(--accent-dark) mb-4 uppercase text-center'>Frequently Asked Questions (FAQ)</h2>
            <p className='text-center mb-8'><span className='text-(--accent-dark)'>{whichFaq}</span> related Doubts</p>
            {
                faq.map((item, index) => (
                    <div key={index} className="p-4 my-2 bg-(--accent-light) rounded-sm cursor-pointer" >
                        <h3
                            className="flex justify-between items-center"
                            onClick={() => toggleItem(index)}
                        >
                            {item.question}
                            <span className="ml-2">
                                {openItems[index] ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>
                                }
                            </span>
                        </h3>
                        {openItems[index] && (
                            <p className="mt-2 text-gray-700 border-t border-(--accent-dark) pt-2">
                                {item.answer}
                            </p>
                        )}
                    </div>
                ))
            }
        </div>
    )
}

export default FAQ
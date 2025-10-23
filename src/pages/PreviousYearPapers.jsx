import React, { useState } from 'react'

const pyqs = [
    {
        id: '1',
        exam: 'IMAT',
        year: 2011,
        questionUrl: '/assets/pyqs/imat/questions-2011.pdf',
        answerUrl: '/assets/pyqs/imat/answers-2011.pdf',
        uploadedAt: '2025-10-09T10:30:00Z'
    },
    {
        id: '2',
        exam: 'IMAT',
        year: 2012,
        questionUrl: '/assets/pyqs/imat/questions-2012.pdf',
        answerUrl: '/assets/pyqs/imat/answers-2012.pdf',
        uploadedAt: '2025-10-09T10:30:00Z'
    },
    {
        id: '3',
        exam: "TOLC",
        year: 2012,
        questionUrl: '/assets/pyqs/tolc/questions-2012.pdf',
        answerUrl: '/assets/pyqs/tolc/answers-2012.pdf',
        uploadedAt: '2025-10-09T10:30:00Z'
    },
    {
        id: '4',
        exam: "FMA",
        year: 2024,
        questionUrl: '/assets/pyqs/fma/questions-2024.pdf',
        answerUrl: '/assets/pyqs/fma/answers-2024.pdf',
        uploadedAt: '2025-10-09T10:30:00Z'
    },
]

const PreviousYearPapers = () => {
    const [activeTab, setActiveTab] = useState('IMAT')
    const [selectedYear, setSelectedYear] = useState('')

    return (
        <div className='min-h-screen max-w-6xl mx-auto px-8 py-16'>
            <h1 className='text-3xl font-bold text-(--accent-dark) mb-8 text-center'>Previous Year Papers & Resources</h1>
            <div className='flex gap flex-wrap justify-between'>
                <ul className='flex gap-2 text-(--accent-dark)'>
                    {
                        ['IMAT', 'TOLC', "FMA"].map((tab) => (
                            <li key={tab} className={`cursor-pointer py-2 px-4 rounded-tl-lg rounded-tr-lg ${activeTab === tab ? 'bg-(--accent-dark) text-white' : 'bg-(--accent-light)'}`} onClick={() => setActiveTab(tab)}>{tab}</li>
                        ))
                    }
                </ul>
                <select className='bg-(--accent-dark) text-white p-2 outline-none rounded-sm' name="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">Filter by Year</option>
                    {
                        [...new Set(pyqs.filter(pyq => pyq.exam === activeTab).map(pyq => pyq.year))]
                            .map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))
                    }
                </select>
            </div>
            <div className='bg-(--accent-light) p-4 my-8 rounded-b-lg'>
                {
                    pyqs.filter(pyq => pyq.exam === activeTab).length === 0 ? (
                        <p className='text-(--accent-dark) text-center py-8'>No resources available.</p>
                    ) : (
                        <ul className='flex flex-col gap-4'>
                            {
                                pyqs.filter(pyq => pyq.exam === activeTab && (selectedYear === '' || pyq.year == selectedYear)).map((pyq) => (
                                    <li key={pyq.id} className='bg-white p-4 rounded-lg shadow-md flex flex-col gap-4'>
                                        <div>
                                            <h2 className='text-xl font-semibold text-(--accent-dark)'>{pyq.exam} {pyq.year}</h2>
                                            <p className='text-sm text-(--accent-dark) opacity-70'>Uploaded on: {new Date(pyq.uploadedAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            {pyq.questionUrl && <div className='flex items-center flex-col gap-2'>
                                                <h2>Question Paper</h2> <iframe src={pyq.questionUrl} title={`${pyq.exam} ${pyq.year} Questions`} className='border rounded-lg aspect-square max-w-md' />
                                                <a href={pyq.questionUrl} download className='animated-button w-max mt-2'><span className='label'>Download Questions</span></a>
                                            </div>}
                                            {pyq.answerUrl && <div className='flex items-center flex-col gap-2'>
                                                <h2>Answer Key</h2><iframe src={pyq.answerUrl} title={`${pyq.exam} ${pyq.year} Answers`} className='border rounded-lg aspect-square max-w-md' />
                                                <a href={pyq.answerUrl} download className='animated-button w-max mt-2'><span className='label'>Download Answers</span></a>
                                            </div>}
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default PreviousYearPapers
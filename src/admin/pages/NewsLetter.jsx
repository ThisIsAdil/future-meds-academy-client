import React, { useState } from 'react'

const subscribers = [
    // ...existing code...
    { email: "example@example.com", date: "2023-01-01" },
    { email: "user@example.com", date: "2023-01-02" },
    { email: "admin@example.com", date: "2023-01-03" },
    { email: "newuser@example.com", date: "2023-01-04" },
    { email: "john.doe@email.com", date: "2023-01-05" },
    { email: "jane.smith@email.com", date: "2023-01-06" },
    { email: "michael.johnson@email.com", date: "2023-01-07" },
    { email: "sarah.williams@email.com", date: "2023-01-08" },
    { email: "david.brown@email.com", date: "2023-01-09" },
    { email: "emily.davis@email.com", date: "2023-01-10" },
    { email: "chris.miller@email.com", date: "2023-01-11" },
    { email: "lisa.wilson@email.com", date: "2023-01-12" },
    { email: "robert.moore@email.com", date: "2023-01-13" },
    { email: "amanda.taylor@email.com", date: "2023-01-14" },
    { email: "kevin.anderson@email.com", date: "2023-01-15" },
    { email: "michelle.thomas@email.com", date: "2023-01-16" },
    { email: "james.jackson@email.com", date: "2023-01-17" },
    { email: "jennifer.white@email.com", date: "2023-01-18" },
    { email: "brian.harris@email.com", date: "2023-01-19" },
    { email: "nicole.martin@email.com", date: "2023-01-20" },
    { email: "daniel.thompson@email.com", date: "2023-01-21" },
    { email: "stephanie.garcia@email.com", date: "2023-01-22" },
    { email: "matthew.martinez@email.com", date: "2023-01-23" },
    { email: "lauren.robinson@email.com", date: "2023-01-24" },
    { email: "andrew.clark@email.com", date: "2023-01-25" },
    { email: "jessica.rodriguez@email.com", date: "2023-01-26" },
    { email: "joshua.lewis@email.com", date: "2023-01-27" },
    { email: "ashley.lee@email.com", date: "2023-01-28" },
    { email: "ryan.walker@email.com", date: "2023-01-29" },
    { email: "megan.hall@email.com", date: "2023-01-30" },
    { email: "tyler.allen@email.com", date: "2023-01-31" },
    { email: "hannah.young@email.com", date: "2023-02-01" },
    { email: "brandon.hernandez@email.com", date: "2023-02-02" },
    { email: "samantha.king@email.com", date: "2023-02-03" }
]

const NewsLetter = () => {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10

    // Filter subscribers based on search
    const filteredSubscribers = subscribers.filter(subscriber =>
        subscriber.email.toLowerCase().includes(search.toLowerCase())
    )

    // Calculate pagination
    const totalPages = Math.ceil(filteredSubscribers.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentSubscribers = filteredSubscribers.slice(startIndex, endIndex)

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    // Reset to first page when search changes
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    return (
        <div className='max-w-4xl mx-auto space-y-6'>
            <div className='mb-8'>
                <h1 className='text-3xl font-medium mb-2 text-(--accent-dark)'>Newsletter</h1>
                <p className='text-sm text-gray-600'>{filteredSubscribers.length} subscribers</p>
            </div>

            {/* Search */}

            <input
                type="text"
                placeholder='Search by email'
                className='w-full max-w-md py-3 px-4 bg-(--accent-light) rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-(--accent-light)'
                value={search}
                onChange={handleSearchChange}
            />


            {/* Table */}
            <div className='bg-white rounded-lg overflow-scroll shadow-sm border border-(--accent-light)'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-(--accent-light) border-b border-(--accent-light)'>
                            <th className='py-4 px-6 text-left text-sm font-medium text-gray-700 w-16'>#</th>
                            <th className='py-4 px-6 text-left text-sm font-medium text-gray-700'>Email</th>
                            <th className='py-4 px-6 text-left text-sm font-medium text-gray-700'>Date</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {currentSubscribers.map((subscriber, index) => (
                            <tr key={startIndex + index} className='hover:bg-gray-50 transition-colors duration-150'>
                                <td className='py-4 px-6 text-sm text-gray-500'>{startIndex + index + 1}</td>
                                <td className='py-4 px-6 text-sm text-gray-900'>{subscriber.email}</td>
                                <td className='py-4 px-6 text-sm text-gray-500'>{subscriber.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='flex items-center flex-wrap-reverse justify-between mt-6'>
                    <p className='text-sm text-gray-600 p-2'>
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredSubscribers.length)} of {filteredSubscribers.length}
                    </p>

                    <div className='flex items-center space-x-2'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-(--accent-light)'
                                }`}
                        >
                            Previous
                        </button>

                        <div className='flex space-x-1'>
                            {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                let pageNumber;
                                if (totalPages <= 5) {
                                    pageNumber = index + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = index + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + index;
                                } else {
                                    pageNumber = currentPage - 2 + index;
                                }

                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`w-8 h-8 text-sm rounded-md transition-colors ${currentPage === pageNumber
                                            ? 'bg-(--accent-light) text-gray-900'
                                            : 'text-gray-700 hover:bg-(--accent-light)'
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-(--accent-light)'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewsLetter
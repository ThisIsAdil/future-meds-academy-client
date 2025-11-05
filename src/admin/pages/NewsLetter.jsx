import React, { useEffect, useState } from 'react'
import axiosClient from '../../api/axiosClient'


const NewsLetter = () => {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10
    const [subscribers, setSubscribers] = useState([])

    const fetchSubscribers = async () => {
        try {
            const response = await axiosClient.get('/newsletter');

            setSubscribers(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSubscribers()
    }, [])

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

    // CSV helpers
    function toCsv(rows = []) {
        if (!rows.length) return ''
        const keys = Object.keys(rows[0])
        const escape = (v) => `"${String(v ?? '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
        return [keys.join(','), ...rows.map((r) => keys.map((k) => escape(r[k])).join(','))].join('\n')
    }

    function exportCsv() {
        const rows = filteredSubscribers.map((s, idx) => ({
            no: idx + 1,
            email: s.email || '',
            date: s.date || ''
        }))
        const csv = toCsv(rows)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const now = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '_')
        a.download = `newsletter_subscribers_${now}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className='max-w-4xl mx-auto space-y-6'>
            <div className='mb-8'>
                <h1 className='text-3xl font-medium mb-2 text-(--accent-dark)'>Newsletter</h1>
                <p className='text-sm text-gray-600'>{filteredSubscribers.length} subscribers</p>
            </div>

            {/* Search and actions */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <input
                    type="text"
                    placeholder='Search by email'
                    className='w-full max-w-md py-3 px-4 bg-(--accent-light) rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-(--accent-light)'
                    value={search}
                    onChange={handleSearchChange}
                />

                <div className='flex items-center gap-3'>
                    <button
                        onClick={exportCsv}
                        className='animated-button px-3 py-2'
                        aria-label='Export subscribers CSV'
                    >
                        Export CSV
                    </button>
                </div>
            </div>

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
                                <td className='py-4 px-6 text-sm text-gray-500'>{new Date(subscriber.date).toLocaleDateString()}</td>
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
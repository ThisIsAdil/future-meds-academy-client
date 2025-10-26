import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, startIndex, totalItems }) => {
    if (totalPages <= 1) return null

    const getVisiblePages = () => {
        const visible = Math.min(5, totalPages)
        return [...Array(visible)].map((_, index) => {
            let pageNumber
            if (totalPages <= 5) pageNumber = index + 1
            else if (currentPage <= 3) pageNumber = index + 1
            else if (currentPage >= totalPages - 2) pageNumber = totalPages - 4 + index
            else pageNumber = currentPage - 2 + index
            return pageNumber
        })
    }

    return (
        <div className="flex items-center flex-wrap-reverse justify-between mt-6">
            <p className="text-sm text-gray-600 p-2">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
            </p>

            <div className="flex items-center space-x-2">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Previous
                </button>

                <div className="flex space-x-1">
                    {getVisiblePages().map(pageNumber => (
                        <button key={pageNumber} onClick={() => onPageChange(pageNumber)} className={`w-8 h-8 text-sm rounded-md transition-colors ${currentPage === pageNumber ? 'text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`} style={{ backgroundColor: currentPage === pageNumber ? 'var(--accent-light)' : 'transparent' }}>{pageNumber}</button>
                    ))}
                </div>

                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination

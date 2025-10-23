import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, X, Upload, FileText, Calendar, Eye, Download, BookOpen, GraduationCap } from 'lucide-react'

const PreviousYearQuestionManagement = () => {
    const [pyqs, setPyqs] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [isUploading, setIsUploading] = useState(false)

    const [formData, setFormData] = useState({
        exam: '',
        year: '',
        type: '',
        file: null,
        fileName: ''
    })

    const itemsPerPage = 10
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i)
    const exams = ['IMAT', 'TOLC']
    const types = ['Questions', 'Answers']

    useEffect(() => {
        setPyqs([
            {
                id: '1',
                exam: 'IMAT',
                year: 2024,
                questionUrl: '/api/placeholder/document',
                answerUrl: '/api/placeholder/document',
                uploadedAt: '2025-10-09T10:30:00Z'
            },
            {
                id: '2',
                exam: 'IMAT',
                year: 2023,
                questionUrl: '/api/placeholder/document',
                answerUrl: '/api/placeholder/document',
                uploadedAt: '2025-10-08T14:20:00Z'
            },
            {
                id: '3',
                exam: 'TOLC',
                year: 2024,
                questionUrl: '/api/placeholder/document',
                answerUrl: null,
                uploadedAt: '2025-10-07T09:15:00Z'
            },
        ])
    }, [])

    const filteredPyqs = pyqs.filter(pyq =>
        pyq.exam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pyq.year.toString().includes(searchTerm)
    )

    const totalPages = Math.ceil(filteredPyqs.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentPyqs = filteredPyqs.slice(startIndex, startIndex + itemsPerPage)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type === 'application/pdf') {
            setFormData(prev => ({
                ...prev,
                file: file,
                fileName: file.name
            }))
        } else {
            alert('Please select a PDF file')
        }
    }

    const resetForm = () => {
        setFormData({
            exam: '',
            year: '',
            type: '',
            file: null,
            fileName: ''
        })
    }

    const openAddModal = () => {
        resetForm()
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        resetForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsUploading(true)

        // Simulate upload delay
        setTimeout(() => {
            const existingPyq = pyqs.find(p => p.exam === formData.exam && p.year === parseInt(formData.year))

            if (existingPyq) {
                // Update existing entry
                const updatedPyqs = pyqs.map(p => {
                    if (p.exam === formData.exam && p.year === parseInt(formData.year)) {
                        return {
                            ...p,
                            [formData.type.toLowerCase() + 'Url']: URL.createObjectURL(formData.file),
                            uploadedAt: new Date().toISOString()
                        }
                    }
                    return p
                })
                setPyqs(updatedPyqs)
            } else {
                // Create new entry
                const newPyq = {
                    id: Date.now().toString(),
                    exam: formData.exam,
                    year: parseInt(formData.year),
                    questionUrl: formData.type === 'Questions' ? URL.createObjectURL(formData.file) : null,
                    answerUrl: formData.type === 'Answers' ? URL.createObjectURL(formData.file) : null,
                    uploadedAt: new Date().toISOString()
                }
                setPyqs(prev => [...prev, newPyq])
            }

            setIsUploading(false)
            closeModal()
        }, 1500)
    }

    const handleDeleteFile = (pyqId, fileType) => {
        if (window.confirm(`Are you sure you want to delete this ${fileType.toLowerCase()} file?`)) {
            setPyqs(prev => prev.map(p => {
                if (p.id === pyqId) {
                    const updatedPyq = { ...p }
                    if (fileType === 'Questions') {
                        updatedPyq.questionUrl = null
                    } else {
                        updatedPyq.answerUrl = null
                    }

                    // If both files are null, remove the entire entry
                    if (!updatedPyq.questionUrl && !updatedPyq.answerUrl) {
                        return null
                    }
                    return updatedPyq
                }
                return p
            }).filter(Boolean))
        }
    }

    const handleDeleteEntry = (pyqId) => {
        if (window.confirm('Are you sure you want to delete this entire entry?')) {
            setPyqs(prev => prev.filter(p => p.id !== pyqId))
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const getExamColor = (exam) => {
        const colors = {
            'IMAT': { bg: 'bg-blue-50', text: 'text-blue-800' },
            'TOLC': { bg: 'bg-green-50', text: 'text-green-800' },
        }
        return colors[exam] || colors.IMAT
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-medium" style={{ color: 'var(--accent-dark)' }}>Previous Year Questions</h1>
                    <button onClick={openAddModal} className="animated-button">
                        <span className="label flex items-center gap-2">
                            <Plus size={20} />
                            Upload PYQ
                        </span>
                    </button>
                </div>
                <p className="text-sm text-gray-600">{filteredPyqs.length} question papers available</p>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by exam or year"
                className="w-full max-w-md py-3 px-4 rounded-lg border-0 focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Table */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 w-16">#</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Exam</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Year</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Questions</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Answers</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Uploaded</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentPyqs.map((pyq, index) => {
                            const examColors = getExamColor(pyq.exam)
                            return (
                                <tr key={pyq.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="py-4 px-6 text-sm text-gray-500">{startIndex + index + 1}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${examColors.bg} ${examColors.text}`}>
                                            <BookOpen size={12} className="mr-1" />
                                            {pyq.exam}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                            <Calendar size={12} className="mr-1" />
                                            {pyq.year}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {pyq.questionUrl ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => window.open(pyq.questionUrl, '_blank')}
                                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 transition-colors"
                                                >
                                                    <Eye size={12} className="mr-1" />
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFile(pyq.id, 'Questions')}
                                                    className="p-1 rounded hover:bg-red-50 transition-colors text-red-600"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">Not uploaded</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {pyq.answerUrl ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => window.open(pyq.answerUrl, '_blank')}
                                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-green-800 bg-green-50 hover:bg-green-100 transition-colors"
                                                >
                                                    <Eye size={12} className="mr-1" />
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFile(pyq.id, 'Answers')}
                                                    className="p-1 rounded hover:bg-red-50 transition-colors text-red-600"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">Not uploaded</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-xs text-gray-500">
                                            {formatDate(pyq.uploadedAt)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => handleDeleteEntry(pyq.id)}
                                            className="p-2 rounded hover:bg-red-50 transition-colors text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center flex-wrap-reverse justify-between mt-6">
                    <p className="text-sm text-gray-600 p-2">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPyqs.length)} of {filteredPyqs.length}
                    </p>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Previous
                        </button>
                        <div className="flex space-x-1">
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
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`w-8 h-8 text-sm rounded-md transition-colors ${currentPage === pageNumber ? 'text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        style={{
                                            backgroundColor: currentPage === pageNumber ? 'var(--accent-light)' : 'transparent'
                                        }}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--accent-light)' }}>
                                <h2 className="text-xl font-medium" style={{ color: 'var(--accent-dark)' }}>
                                    Upload PYQ
                                </h2>
                                <button onClick={closeModal} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {/* Exam Selection */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Exam *</label>
                                    <select
                                        name="exam"
                                        value={formData.exam}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                    >
                                        <option value="">Select Exam</option>
                                        {exams.map(exam => (
                                            <option key={exam} value={exam}>{exam}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Year Selection */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Year *</label>
                                    <select
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                    >
                                        <option value="">Select Year</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Type Selection */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>File Type *</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                    >
                                        <option value="">Select Type</option>
                                        {types.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>PDF File *</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            required
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
                                            style={{ borderColor: 'var(--accent-dark)' }}
                                        >
                                            <Upload className="h-5 w-5" style={{ color: 'var(--accent-dark)' }} />
                                            <span className="text-sm" style={{ color: 'var(--accent-dark)' }}>
                                                {formData.fileName || 'Choose PDF file'}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button type="button" onClick={closeModal} className="animated-button">
                                        <span className="label">Cancel</span>
                                    </button>
                                    <button type="submit" disabled={isUploading} className="animated-button">
                                        <span className="label">
                                            {isUploading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current inline-block mr-2"></div>
                                                    Uploading...
                                                </>
                                            ) : (
                                                'Upload'
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredPyqs.length === 0 && (
                <div className="text-center py-16">
                    <FileText className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--accent-dark)' }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>No question papers found</h3>
                    <p className="text-sm mb-6 text-gray-600">
                        {searchTerm ? 'Try adjusting your search criteria.' : 'Start by uploading your first PYQ.'}
                    </p>
                    {!searchTerm && (
                        <button onClick={openAddModal} className="animated-button">
                            <span className="label flex items-center gap-2">
                                <Plus size={16} />
                                Upload PYQ
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default PreviousYearQuestionManagement
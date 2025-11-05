import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, FileText, Calendar, Eye, BookOpen } from 'lucide-react'
import { pyqService } from '../../services/pyqs'

const PreviousYearQuestionManagement = () => {
    const [pyqs, setPyqs] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [isUploading, setIsUploading] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const [formData, setFormData] = useState({
        exam: '',
        year: '',
        questionUrl: '',
        answerUrl: ''
    })

    const itemsPerPage = 10
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i)
    const exams = ['IMAT', 'TOLC', 'FMA']

    const fetchPyqs = async () => {
        try {
            const response = await pyqService.getAll()
            const data = response?.data?.data || response?.data || []
            setPyqs(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error('Failed to fetch PYQs', err)
            setPyqs([])
        }
    }

    useEffect(() => {
        fetchPyqs()
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

    const resetForm = () => {
        setFormData({
            exam: '',
            year: '',
            questionUrl: '',
            answerUrl: ''
        })
        setEditingId(null)
    }

    const openAddModal = () => {
        resetForm()
        setIsModalOpen(true)
    }

    const openEditModal = (pyq) => {
        setEditingId(pyq.id ?? pyq._id)
        setFormData({
            exam: pyq.exam,
            year: pyq.year,
            questionUrl: pyq.documents?.question || '',
            answerUrl: pyq.documents?.answer || ''
        })
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        resetForm()
    }

    const isValidUrl = (value) => {
        try {
            new URL(value)
            return true
        } catch {
            return false
        }
    }

    // ...existing code...
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.exam || !formData.year) {
            alert('Please select exam and year.')
            return
        }

        if (!isValidUrl(formData.questionUrl) || (formData.answerUrl && !isValidUrl(formData.answerUrl))) {
            alert('Please provide valid URLs.')
            return
        }

        setIsUploading(true)

        try {
            const payload = {
                exam: formData.exam,
                year: parseInt(formData.year),
                documents: {
                    question: formData.questionUrl || null,
                    answer: formData.answerUrl || null
                }
            }

            if (editingId) {
                // update existing entry on server
                await pyqService.update(editingId, payload)
            } else {
                // check for existing exam+year on client and use server update to merge, else create
                const existing = pyqs.find(p => p.exam === formData.exam && p.year === parseInt(formData.year))
                if (existing) {
                    // merge documents with existing on server
                    const mergedDocs = {
                        question: formData.questionUrl || existing.documents?.question || null,
                        answer: formData.answerUrl || existing.documents?.answer || null
                    }
                    await pyqService.update(existing.id ?? existing._id, {
                        exam: existing.exam,
                        year: existing.year,
                        documents: mergedDocs
                    })
                } else {
                    await pyqService.create(payload)
                }
            }

            // Refresh list from server to keep UI in sync
            await fetchPyqs()
            closeModal()
        } catch (err) {
            console.error('Failed to save PYQ', err)
            alert('Failed to save. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    // ...existing code...
    const handleDeleteFile = async (pyqId, fileType) => {
        if (!window.confirm(`Are you sure you want to delete this ${fileType.toLowerCase()} URL?`)) return

        setIsUploading(true)
        try {
            const target = pyqs.find(p => (p.id ?? p._id) === pyqId)
            if (!target) {
                alert('Entry not found')
                return
            }

            const updatedDocs = { ...(target.documents || {}) }
            if (fileType === 'Questions') {
                updatedDocs.question = null
            } else {
                updatedDocs.answer = null
            }

            // if both docs become null, delete the entire entry on server
            if (!updatedDocs.question && !updatedDocs.answer) {
                await pyqService.delete(pyqId)
            } else {
                await pyqService.update(pyqId, {
                    exam: target.exam,
                    year: target.year,
                    documents: updatedDocs
                })
            }

            await fetchPyqs()
        } catch (err) {
            console.error('Failed to delete file', err)
            alert('Failed to delete. Try again.')
        } finally {
            setIsUploading(false)
        }
    }

    const handleDeleteEntry = async (pyqId) => {
        if (!window.confirm('Are you sure you want to delete this entire entry?')) return

        setIsUploading(true)
        try {
            await pyqService.delete(pyqId)
            setPyqs(prev => prev.filter(p => (p.id ?? p._id) !== pyqId))
        } catch (err) {
            console.error('Failed to delete entry', err)
            alert('Failed to delete entry. Try again.')
        } finally {
            setIsUploading(false)
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
            'FMA': { bg: 'bg-purple-50', text: 'text-purple-800' }
        }
        return colors[exam] || colors.IMAT
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-medium" style={{ color: 'var(--accent-dark)' }}>Previous Year Questions</h1>
                    <button onClick={openAddModal} className="animated-button">
                        <span className="label flex items-center gap-2">
                            <Plus size={20} />
                            Add PYQ
                        </span>
                    </button>
                </div>
                <p className="text-sm text-gray-600">{filteredPyqs.length} question papers available</p>
            </div>

            <input
                type="text"
                placeholder="Search by exam or year"
                className="w-full max-w-md py-3 px-4 rounded-lg border-0 focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

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
                                <tr key={pyq.id ?? pyq._id} className="hover:bg-gray-50 transition-colors duration-150">
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
                                        {pyq.documents?.question ? (
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => window.open(pyq.documents.question, '_blank')} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 transition-colors">
                                                    <Eye size={12} className="mr-1" />View
                                                </button>
                                                <button onClick={() => handleDeleteFile(pyq.id ?? pyq._id, 'Questions')} className="p-1 rounded hover:bg-red-50 transition-colors text-red-600">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : <span className="text-xs text-gray-400">Not provided</span>}
                                    </td>
                                    <td className="py-4 px-6">
                                        {pyq.documents?.answer ? (
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => window.open(pyq.documents.answer, '_blank')} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-green-800 bg-green-50 hover:bg-green-100 transition-colors">
                                                    <Eye size={12} className="mr-1" />View
                                                </button>
                                                <button onClick={() => handleDeleteFile(pyq.id ?? pyq._id, 'Answers')} className="p-1 rounded hover:bg-red-50 transition-colors text-red-600">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : <span className="text-xs text-gray-400">Not provided</span>}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-xs text-gray-500">{formatDate(pyq.uploadedAt)}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEditModal(pyq)} className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDeleteEntry(pyq.id ?? pyq._id)} className="p-2 rounded hover:bg-red-50 transition-colors text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center flex-wrap-reverse justify-between mt-6">
                    <p className="text-sm text-gray-600 p-2">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPyqs.length)} of {filteredPyqs.length}
                    </p>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}>
                            Previous
                        </button>
                        <div className="flex space-x-1">
                            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                                let pageNumber
                                if (totalPages <= 5) pageNumber = idx + 1
                                else if (currentPage <= 3) pageNumber = idx + 1
                                else if (currentPage >= totalPages - 2) pageNumber = totalPages - 4 + idx
                                else pageNumber = currentPage - 2 + idx
                                return (
                                    <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`w-8 h-8 text-sm rounded-md transition-colors ${currentPage === pageNumber ? 'text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`} style={{ backgroundColor: currentPage === pageNumber ? 'var(--accent-light)' : 'transparent' }}>
                                        {pageNumber}
                                    </button>
                                )
                            })}
                        </div>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}>
                            Next
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--accent-light)' }}>
                                <h2 className="text-xl font-medium" style={{ color: 'var(--accent-dark)' }}>
                                    {editingId ? 'Edit PYQ URLs' : 'Upload PYQ URLs'}
                                </h2>
                                <button onClick={closeModal} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Exam *</label>
                                    <select name="exam" value={formData.exam} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}>
                                        <option value="">Select Exam</option>
                                        {exams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Year *</label>
                                    <select name="year" value={formData.year} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}>
                                        <option value="">Select Year</option>
                                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Question URL (Google Drive) *</label>
                                    <input type="url" name="questionUrl" value={formData.questionUrl} onChange={handleInputChange} placeholder="https://drive.google.com/..." className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Answer URL (Google Drive) (optional)</label>
                                    <input type="url" name="answerUrl" value={formData.answerUrl} onChange={handleInputChange} placeholder="https://drive.google.com/..." className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button type="button" onClick={closeModal} className="animated-button">
                                        <span className="label">Cancel</span>
                                    </button>
                                    <button type="submit" disabled={isUploading} className="animated-button">
                                        <span className="label">
                                            {isUploading ? 'Saving...' : (editingId ? 'Update' : 'Save')}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {filteredPyqs.length === 0 && (
                <div className="text-center py-16">
                    <FileText className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--accent-dark)' }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>No question papers found</h3>
                    <p className="text-sm mb-6 text-gray-600">
                        {searchTerm ? 'Try adjusting your search criteria.' : 'Start by adding your first PYQ URLs.'}
                    </p>
                    {!searchTerm && (
                        <button onClick={openAddModal} className="animated-button">
                            <span className="label flex items-center gap-2">
                                <Plus size={16} />
                                Add PYQ URLs
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default PreviousYearQuestionManagement
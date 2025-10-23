import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, X, Upload, GraduationCap, MapPin, Users, Euro, Clock, ExternalLink } from 'lucide-react'

const IMATUniversities = () => {
    const [universities, setUniversities] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUniversity, setEditingUniversity] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        location: '',
        euSeats: '',
        nonEuSeats: '',
        tuitionFees: '',
        programLength: '',
        logo: null,
        logoUrl: '',
        image: null,
        imageUrl: '',
        blogUrl: '',
        cutoff: {}
    })

    const itemsPerPage = 10

    useEffect(() => {
        setUniversities([
            {
                id: '1',
                name: 'University of Milan',
                location: 'Milan, Italy',
                euSeats: 44,
                nonEuSeats: 16,
                tuitionFees: '€800 – €4,000 / year (income-based)',
                programLength: '6 years (Medicine & Surgery)',
                logoUrl: '/api/placeholder/60/60',
                imageUrl: '/api/placeholder/800/400',
                blogUrl: 'https://imatacademy.com/blogs/university-of-milan',
                cutoff: {
                    '1st Round': 46.7,
                    '2nd Round': 46.3,
                    '3rd Round': 45.4,
                    '4th Round': 45.4,
                    '5th Round': 45.4
                }
            },
            {
                id: '2',
                name: 'La Sapienza University',
                location: 'Rome, Italy',
                euSeats: 45,
                nonEuSeats: 18,
                tuitionFees: '€1,000 – €3,500 / year (income-based)',
                programLength: '6 years (Medicine & Surgery)',
                logoUrl: '/api/placeholder/60/60',
                imageUrl: '/api/placeholder/800/400',
                blogUrl: 'https://imatacademy.com/blogs/la-sapienza',
                cutoff: {
                    '1st Round': 48.2,
                    '2nd Round': 47.8,
                    '3rd Round': 47.1,
                    '4th Round': 46.8
                }
            }
        ])
    }, [])

    const filteredUniversities = universities.filter(university =>
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentUniversities = filteredUniversities.slice(startIndex, startIndex + itemsPerPage)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0]
        if (file) {
            if (fileType === 'logo') {
                setFormData(prev => ({ ...prev, logo: file, logoUrl: URL.createObjectURL(file) }))
            } else if (fileType === 'image') {
                setFormData(prev => ({ ...prev, image: file, imageUrl: URL.createObjectURL(file) }))
            }
        }
    }

    const addCutoffRound = () => {
        const roundCount = Object.keys(formData.cutoff).length + 1
        const roundName = `${roundCount}${getOrdinalSuffix(roundCount)} Round`
        setFormData(prev => ({
            ...prev,
            cutoff: { ...prev.cutoff, [roundName]: '' }
        }))
    }

    const updateCutoffRound = (roundName, score) => {
        setFormData(prev => ({
            ...prev,
            cutoff: { ...prev.cutoff, [roundName]: parseFloat(score) || '' }
        }))
    }

    const removeCutoffRound = (roundName) => {
        setFormData(prev => {
            const newCutoff = { ...prev.cutoff }
            delete newCutoff[roundName]
            return { ...prev, cutoff: newCutoff }
        })
    }

    const getOrdinalSuffix = (num) => {
        const j = num % 10
        const k = num % 100
        if (j === 1 && k !== 11) return 'st'
        if (j === 2 && k !== 12) return 'nd'
        if (j === 3 && k !== 13) return 'rd'
        return 'th'
    }

    const resetForm = () => {
        setFormData({
            id: '', name: '', location: '', euSeats: '', nonEuSeats: '', tuitionFees: '',
            programLength: '', logo: null, logoUrl: '', image: null, imageUrl: '', blogUrl: '', cutoff: {}
        })
    }

    const openAddModal = () => {
        resetForm()
        setEditingUniversity(null)
        setIsModalOpen(true)
    }

    const openEditModal = (university) => {
        setFormData({ ...university, logo: null, image: null })
        setEditingUniversity(university)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingUniversity(null)
        resetForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingUniversity) {
            setUniversities(prev => prev.map(university =>
                university.id === editingUniversity.id ? { ...formData, id: editingUniversity.id } : university
            ))
        } else {
            setUniversities(prev => [...prev, { ...formData, id: Date.now().toString() }])
        }
        closeModal()
    }

    const handleDelete = (universityId) => {
        if (window.confirm('Are you sure you want to delete this university?')) {
            setUniversities(prev => prev.filter(university => university.id !== universityId))
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2 gap-4 flex-wrap">
                    <h1 className="text-3xl font-medium" style={{ color: 'var(--accent-dark)' }}>IMAT Universities</h1>
                    <button onClick={openAddModal} className="animated-button">
                        <span className="label flex items-center gap-2">
                            <Plus size={20} />
                            Add University
                        </span>
                    </button>
                </div>
                <p className="text-sm text-gray-600">{filteredUniversities.length} universities available</p>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by university name or location"
                className="w-full max-w-md py-3 px-4 rounded-lg border-0 focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Table */}
            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 w-16">#</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Logo</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Location</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Seats</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentUniversities.map((university, index) => (
                            <tr key={university.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-4 px-6 text-sm text-gray-500">{startIndex + index + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="h-12 w-12 rounded-full overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)' }}>
                                        {university.logoUrl ? (
                                            <img src={university.logoUrl} alt={university.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center">
                                                <GraduationCap className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm font-medium text-gray-900">{university.name}</div>
                                    <div className="text-xs text-gray-500">{university.programLength}</div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                        <MapPin size={12} className="mr-1" />
                                        {university.location}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="space-y-1">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-blue-800" style={{ backgroundColor: '#dbeafe' }}>
                                            EU: {university.euSeats}
                                        </span>
                                        <br />
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-green-800" style={{ backgroundColor: '#dcfce7' }}>
                                            Non-EU: {university.nonEuSeats}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(university)}
                                            className="p-2 rounded hover:bg-gray-100 transition-colors"
                                            style={{ color: 'var(--accent-dark)' }}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(university.id)}
                                            className="p-2 rounded hover:bg-red-50 transition-colors text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center flex-wrap-reverse justify-between mt-6">
                    <p className="text-sm text-gray-600 p-2">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUniversities.length)} of {filteredUniversities.length}
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

            {/* Modal with Blur Background */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--accent-light)' }}>
                                <h2 className="text-xl font-medium" style={{ color: 'var(--accent-dark)' }}>
                                    {editingUniversity ? 'Edit University' : 'Add New University'}
                                </h2>
                                <button onClick={closeModal} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Logo and Image Upload */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>University Logo</label>
                                        <div className="flex items-center gap-4">
                                            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                                {formData.logoUrl ? (
                                                    <img src={formData.logoUrl} alt="Logo Preview" className="h-full w-full object-cover" />
                                                ) : (
                                                    <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />
                                                )}
                                            </div>
                                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} className="hidden" id="logo-upload" />
                                            <label htmlFor="logo-upload" className="animated-button cursor-pointer">
                                                <span className="label">Choose Logo</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Campus Image</label>
                                        <div className="flex items-center gap-4">
                                            <div className="h-20 w-32 rounded overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                                {formData.imageUrl ? (
                                                    <img src={formData.imageUrl} alt="Image Preview" className="h-full w-full object-cover" />
                                                ) : (
                                                    <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />
                                                )}
                                            </div>
                                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} className="hidden" id="image-upload" />
                                            <label htmlFor="image-upload" className="animated-button cursor-pointer">
                                                <span className="label">Choose Image</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>University Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="University of Milan"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Location *</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="Milan, Italy"
                                        />
                                    </div>
                                </div>

                                {/* Seats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>EU Seats *</label>
                                        <input
                                            type="number"
                                            name="euSeats"
                                            value={formData.euSeats}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="44"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Non-EU Seats *</label>
                                        <input
                                            type="number"
                                            name="nonEuSeats"
                                            value={formData.nonEuSeats}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="16"
                                        />
                                    </div>
                                </div>

                                {/* Tuition and Program Length */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Tuition Fees</label>
                                        <input
                                            type="text"
                                            name="tuitionFees"
                                            value={formData.tuitionFees}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="€800 – €4,000 / year (income-based)"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Program Length</label>
                                        <input
                                            type="text"
                                            name="programLength"
                                            value={formData.programLength}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="6 years (Medicine & Surgery)"
                                        />
                                    </div>
                                </div>

                                {/* Blog URL */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Blog URL</label>
                                    <div className="relative">
                                        <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--accent-dark)' }} size={20} />
                                        <input
                                            type="url"
                                            name="blogUrl"
                                            value={formData.blogUrl}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="https://imatacademy.com/blogs/university-of-milan"
                                        />
                                    </div>
                                </div>

                                {/* Cutoff Data */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="block text-sm font-medium" style={{ color: 'var(--accent-dark)' }}>Cutoff Data</label>
                                        <button
                                            type="button"
                                            onClick={addCutoffRound}
                                            className="animated-button text-sm"
                                        >
                                            <span className="label">+ Add Round</span>
                                        </button>
                                    </div>
                                    <div className="space-y-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--accent-light)' }}>
                                        {Object.entries(formData.cutoff).map(([round, score]) => (
                                            <div key={round} className="flex gap-3 items-center">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={round}
                                                        readOnly
                                                        className="w-full px-3 py-2 rounded border-0 focus:outline-none bg-gray-100 text-gray-700"
                                                        placeholder="Round"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        value={score}
                                                        onChange={(e) => updateCutoffRound(round, e.target.value)}
                                                        className="w-full px-3 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                        style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                        placeholder="Score"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeCutoffRound(round)}
                                                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        {Object.keys(formData.cutoff).length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">No cutoff rounds added yet</p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                                    <button type="button" onClick={closeModal} className="animated-button">
                                        <span className="label">Cancel</span>
                                    </button>
                                    <button type="submit" className="animated-button">
                                        <span className="label">{editingUniversity ? 'Update University' : 'Save University'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredUniversities.length === 0 && (
                <div className="text-center py-16">
                    <GraduationCap className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--accent-dark)' }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>No universities found</h3>
                    <p className="text-sm mb-6 text-gray-600">
                        {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first university.'}
                    </p>
                    {!searchTerm && (
                        <button onClick={openAddModal} className="animated-button">
                            <span className="label flex items-center gap-2">
                                <Plus size={16} />
                                Add University
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default IMATUniversities
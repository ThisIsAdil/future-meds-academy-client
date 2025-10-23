import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, X, Upload, Youtube, User, ChevronLeft, ChevronRight } from 'lucide-react'

const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingMember, setEditingMember] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [availableCourses, setAvailableCourses] = useState([])

    const [formData, setFormData] = useState({
        id: '', name: '', designation: '', about: '', youtubeVideoUrl: '', profilePhoto: null, profilePhotoUrl: '', courses: []
    })

    const itemsPerPage = 10

    useEffect(() => {
        setTeamMembers([
            { id: '1', name: 'Dr. John Doe', designation: 'IMAT Biology Tutor', about: 'Experienced biology tutor with 10+ years in medical entrance exam preparation.', youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', profilePhotoUrl: '/api/placeholder/50/50', courses: ['course1', 'course2'] },
            { id: '2', name: 'Jane Smith', designation: 'Physics & Chemistry Expert', about: 'Specialized in physics and chemistry for IMAT preparation with proven track record.', youtubeVideoUrl: 'https://www.youtube.com/watch?v=abc123', profilePhotoUrl: '/api/placeholder/50/50', courses: ['course3'] }
        ])

        setAvailableCourses([
            { id: 'course1', title: 'IMAT Foundation' },
            { id: 'course2', title: 'Advanced Biology Course' },
            { id: 'course3', title: 'IMAT Strategy 2025' },
            { id: 'course4', title: 'Mock Test Program' }
        ])
    }, [])

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.designation.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({ ...prev, profilePhoto: file, profilePhotoUrl: URL.createObjectURL(file) }))
        }
    }

    const handleCourseChange = (courseId) => {
        setFormData(prev => ({
            ...prev,
            courses: prev.courses.includes(courseId)
                ? prev.courses.filter(id => id !== courseId)
                : [...prev.courses, courseId]
        }))
    }

    const resetForm = () => {
        setFormData({ id: '', name: '', designation: '', about: '', youtubeVideoUrl: '', profilePhoto: null, profilePhotoUrl: '', courses: [] })
    }

    const openAddModal = () => {
        resetForm()
        setEditingMember(null)
        setIsModalOpen(true)
    }

    const openEditModal = (member) => {
        setFormData({ ...member, profilePhoto: null })
        setEditingMember(member)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingMember(null)
        resetForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingMember) {
            setTeamMembers(prev => prev.map(member =>
                member.id === editingMember.id ? { ...formData, id: editingMember.id } : member
            ))
        } else {
            setTeamMembers(prev => [...prev, { ...formData, id: Date.now().toString() }])
        }
        closeModal()
    }

    const handleDelete = (memberId) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            setTeamMembers(prev => prev.filter(member => member.id !== memberId))
        }
    }

    const getCourseCount = (memberCourses) => memberCourses?.length || 0

    const extractYouTubeId = (url) => {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
        return match ? match[1] : null
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-medium" style={{ color: 'var(--accent-dark)' }}>Team Members</h1>
                    <button onClick={openAddModal} className="animated-button">
                        <span className="label flex items-center gap-2">
                            <Plus size={20} />
                            Add Member
                        </span>
                    </button>
                </div>
                <p className="text-sm text-gray-600">{filteredMembers.length} team members</p>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by name or designation"
                className="w-full max-w-md py-3 px-4 rounded-lg border-0 focus:outline-none focus:ring-2"
                style={{
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--secondary)'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Table */}
            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 w-16">#</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Photo</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Designation</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Courses</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentMembers.map((member, index) => (
                            <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-4 px-6 text-sm text-gray-500">{startIndex + index + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="h-10 w-10 rounded-full overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                        {member.profilePhotoUrl ? (
                                            <img src={member.profilePhotoUrl} alt={member.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center">
                                                <User className="h-5 w-5" style={{ color: 'var(--accent-dark)' }} />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900 font-medium">{member.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{member.designation}</td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap" style={{ backgroundColor: 'var(--accent-light)' }}>
                                        {getCourseCount(member.courses)} Course{getCourseCount(member.courses) !== 1 ? 's' : ''}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(member)}
                                            className="p-2 rounded hover:bg-gray-100 transition-colors"
                                            style={{ color: 'var(--accent-dark)' }}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
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
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMembers.length)} of {filteredMembers.length}
                    </p>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
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
                                        className={`w-8 h-8 text-sm rounded-md transition-colors ${currentPage === pageNumber
                                            ? 'text-gray-900'
                                            : 'text-gray-700 hover:bg-gray-100'
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
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
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
                        {/* Blur Background */}
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity"
                            onClick={closeModal}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--accent-light)' }}>
                                <h2 className="text-xl font-medium" style={{ color: 'var(--accent-dark)' }}>
                                    {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded hover:bg-gray-100 transition-colors"
                                    style={{ color: 'var(--accent-dark)' }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Photo */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>
                                        Profile Photo
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="h-16 w-16 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}
                                        >
                                            {formData.profilePhotoUrl ? (
                                                <img src={formData.profilePhotoUrl} alt="Preview" className="h-full w-full object-cover" />
                                            ) : (
                                                <Upload className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} />
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="photo-upload" />
                                        <label htmlFor="photo-upload" className="animated-button cursor-pointer">
                                            <span className="label">Choose Photo</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--accent-light)',
                                            color: 'var(--secondary)'
                                        }}
                                        placeholder="Enter full name"
                                    />
                                </div>

                                {/* Designation */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>
                                        Designation *
                                    </label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--accent-light)',
                                            color: 'var(--secondary)'
                                        }}
                                        placeholder="e.g., IMAT Biology Tutor"
                                    />
                                </div>

                                {/* About */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>
                                        About
                                    </label>
                                    <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleInputChange}
                                        rows={3}
                                        maxLength={400}
                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--accent-light)',
                                            color: 'var(--secondary)'
                                        }}
                                        placeholder="Short bio (max 400 characters)"
                                    />
                                    <div className="text-xs mt-1" style={{ color: 'var(--accent-dark)' }}>
                                        {formData.about.length}/400 characters
                                    </div>
                                </div>

                                {/* YouTube */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>
                                        YouTube Video URL
                                    </label>
                                    <div className="relative">
                                        <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--accent-dark)' }} size={20} />
                                        <input
                                            type="url"
                                            name="youtubeVideoUrl"
                                            value={formData.youtubeVideoUrl}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{
                                                backgroundColor: 'var(--accent-light)',
                                                color: 'var(--secondary)'
                                            }}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                    </div>
                                    {formData.youtubeVideoUrl && extractYouTubeId(formData.youtubeVideoUrl) && (
                                        <div className="mt-3">
                                            <div className="aspect-video w-full max-w-sm">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={`https://www.youtube.com/embed/${extractYouTubeId(formData.youtubeVideoUrl)}`}
                                                    title="Preview"
                                                    frameBorder="0"
                                                    allowFullScreen
                                                    className="rounded-lg"
                                                ></iframe>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Courses */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>
                                        Courses
                                    </label>
                                    <div className="space-y-3 rounded-lg p-4" style={{ backgroundColor: 'var(--accent-light)' }}>
                                        {availableCourses.map(course => (
                                            <label key={course.id} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.courses.includes(course.id)}
                                                    onChange={() => handleCourseChange(course.id)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm" style={{ color: 'var(--accent-dark)' }}>{course.title}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                                    <button type="button" onClick={closeModal} className="animated-button">
                                        <span className="label">Cancel</span>
                                    </button>
                                    <button type="submit" className="animated-button">
                                        <span className="label">{editingMember ? 'Update' : 'Save'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredMembers.length === 0 && (
                <div className="text-center py-16">
                    <User className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--accent-dark)' }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>No team members found</h3>
                    <p className="text-sm mb-6 text-gray-600">
                        {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first team member.'}
                    </p>
                    {!searchTerm && (
                        <button onClick={openAddModal} className="animated-button">
                            <span className="label flex items-center gap-2">
                                <Plus size={16} />
                                Add Team Member
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default TeamManagement
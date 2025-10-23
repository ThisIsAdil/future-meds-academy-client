import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, X, Upload, BookOpen, Clock, Euro, Users, ChevronDown, ChevronUp } from 'lucide-react'

const CoursesManagement = () => {
    const [courses, setCourses] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCourse, setEditingCourse] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [availableInstructors, setAvailableInstructors] = useState([])
    const [expandedSections, setExpandedSections] = useState({
        about: false,
        whyChoose: false,
        syllabus: true,
        faq: false
    })

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        price: '',
        duration: '',
        shortDescription: '',
        about: '',
        whyChoose: [],
        syllabus: [],
        instructors: [],
        enrollment: '',
        faq: [],
        thumbnail: null,
        thumbnailUrl: ''
    })

    const itemsPerPage = 10

    useEffect(() => {
        setCourses([
            {
                id: '1',
                title: 'IMAT Meditalia Prep Course',
                price: 129,
                duration: '3 Months',
                shortDescription: 'A budget-friendly 3-month course designed to prepare you effectively for the IMAT exam.',
                about: 'This 3-month program is ideal for students who want an affordable yet structured approach...',
                whyChoose: [
                    'Mock tests every two weeks with ranking',
                    '12 MedItalia simulations for real exam practice',
                    'Access to previous IMAT papers & simulators',
                    'Career counseling sessions for admissions and future planning'
                ],
                syllabus: [
                    'Week 1–2: Biology & Chemistry foundations',
                    'Week 3–4: Physics & Mathematics',
                    'Week 5–6: Logical Reasoning practice'
                ],
                instructors: ['instructor1', 'instructor2'],
                enrollment: 'One-time payment of €129. Access to all course materials for 3 months.',
                faq: [
                    { question: 'What is the IMAT exam?', answer: 'IMAT is an admission test for medical schools in Italy.' },
                    { question: 'When is the IMAT exam held?', answer: 'Typically in September each year.' }
                ],
                thumbnailUrl: '/api/placeholder/300/200'
            },
            {
                id: '2',
                title: 'IMAT Elite Intensive Course',
                price: 299,
                duration: '6 Months',
                shortDescription: 'Comprehensive 6-month intensive program for serious IMAT aspirants.',
                about: 'This comprehensive program includes everything you need to excel in IMAT...',
                whyChoose: ['Personal mentorship', 'Advanced simulations', 'University application guidance'],
                syllabus: ['Month 1-2: Foundations', 'Month 3-4: Advanced Topics'],
                instructors: ['instructor1'],
                enrollment: 'One-time payment of €299. Access to all course materials for 6 months.',
                faq: [{ question: 'Is this suitable for beginners?', answer: 'Yes, we start from basics.' }],
                thumbnailUrl: '/api/placeholder/300/200'
            }
        ])

        setAvailableInstructors([
            { id: 'instructor1', name: 'Dr. Amir Akhtar' },
            { id: 'instructor2', name: 'Dr. Talal Adil' },
            { id: 'instructor3', name: 'Dr. Maham Ovis' }
        ])
    }, [])

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.duration.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({ ...prev, thumbnail: file, thumbnailUrl: URL.createObjectURL(file) }))
        }
    }

    const handleInstructorChange = (instructorId) => {
        setFormData(prev => ({
            ...prev,
            instructors: prev.instructors.includes(instructorId)
                ? prev.instructors.filter(id => id !== instructorId)
                : [...prev.instructors, instructorId]
        }))
    }

    const addArrayItem = (field, defaultValue = '') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], defaultValue]
        }))
    }

    const updateArrayItem = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }))
    }

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const addFAQ = () => {
        setFormData(prev => ({
            ...prev,
            faq: [...prev.faq, { question: '', answer: '' }]
        }))
    }

    const updateFAQ = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            faq: prev.faq.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }))
    }

    const resetForm = () => {
        setFormData({
            id: '', title: '', price: '', duration: '', shortDescription: '', about: '',
            whyChoose: [], syllabus: [], instructors: [], enrollment: '', faq: [],
            thumbnail: null, thumbnailUrl: ''
        })
    }

    const openAddModal = () => {
        resetForm()
        setEditingCourse(null)
        setIsModalOpen(true)
    }

    const openEditModal = (course) => {
        setFormData({ ...course, thumbnail: null })
        setEditingCourse(course)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingCourse(null)
        resetForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingCourse) {
            setCourses(prev => prev.map(course =>
                course.id === editingCourse.id ? { ...formData, id: editingCourse.id } : course
            ))
        } else {
            setCourses(prev => [...prev, { ...formData, id: Date.now().toString() }])
        }
        closeModal()
    }

    const handleDelete = (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCourses(prev => prev.filter(course => course.id !== courseId))
        }
    }

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const getInstructorNames = (instructorIds) => {
        return instructorIds.map(id =>
            availableInstructors.find(instructor => instructor.id === id)?.name || 'Unknown'
        ).join(', ')
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-medium" style={{ color: 'var(--accent-dark)' }}>Courses</h1>
                    <button onClick={openAddModal} className="animated-button">
                        <span className="label flex items-center gap-2">
                            <Plus size={20} />
                            Add Course
                        </span>
                    </button>
                </div>
                <p className="text-sm text-gray-600">{filteredCourses.length} courses available</p>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by course title or duration"
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
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Course Name</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Duration</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Price</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Instructors</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentCourses.map((course, index) => (
                            <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-4 px-6 text-sm text-gray-500">{startIndex + index + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-16 rounded overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)' }}>
                                            {course.thumbnailUrl ? (
                                                <img src={course.thumbnailUrl} alt={course.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <BookOpen className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                            <div className="text-xs text-gray-500">{course.shortDescription.substring(0, 50)}...</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                        <Clock size={12} className="mr-1" />
                                        {course.duration}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent-dark)' }}>
                                        <Euro size={14} className="mr-1" />
                                        {course.price}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                        <Users size={12} className="mr-1" />
                                        {course.instructors.length} instructor{course.instructors.length !== 1 ? 's' : ''}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(course)}
                                            className="p-2 rounded hover:bg-gray-100 transition-colors"
                                            style={{ color: 'var(--accent-dark)' }}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id)}
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
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCourses.length)} of {filteredCourses.length}
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
                                    {editingCourse ? 'Edit Course' : 'Add New Course'}
                                </h2>
                                <button onClick={closeModal} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Course Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="Enter course title"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Price (€) *</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                placeholder="129"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Duration *</label>
                                            <input
                                                type="text"
                                                name="duration"
                                                value={formData.duration}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                placeholder="3 Months"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Short Description */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Short Description *</label>
                                    <textarea
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleInputChange}
                                        required
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                        placeholder="A brief description that appears on course cards"
                                    />
                                </div>

                                {/* About Section */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => toggleSection('about')}
                                        className="flex items-center justify-between w-full p-3 rounded-lg transition-colors"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}
                                    >
                                        <span className="font-medium">About This Course</span>
                                        {expandedSections.about ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {expandedSections.about && (
                                        <div className="mt-2">
                                            <textarea
                                                name="about"
                                                value={formData.about}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                placeholder="Detailed description about the course"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Why Choose Section */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => toggleSection('whyChoose')}
                                        className="flex items-center justify-between w-full p-3 rounded-lg transition-colors"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}
                                    >
                                        <span className="font-medium">Why Choose This Course?</span>
                                        {expandedSections.whyChoose ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {expandedSections.whyChoose && (
                                        <div className="mt-2 space-y-2">
                                            {formData.whyChoose.map((item, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) => updateArrayItem('whyChoose', index, e.target.value)}
                                                        className="flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                        placeholder="Benefit or feature"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayItem('whyChoose', index)}
                                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addArrayItem('whyChoose')}
                                                className="animated-button w-full"
                                            >
                                                <span className="label">+ Add Benefit</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Syllabus Section */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => toggleSection('syllabus')}
                                        className="flex items-center justify-between w-full p-3 rounded-lg transition-colors"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}
                                    >
                                        <span className="font-medium">Course Syllabus</span>
                                        {expandedSections.syllabus ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {expandedSections.syllabus && (
                                        <div className="mt-2 space-y-2">
                                            {formData.syllabus.map((item, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) => updateArrayItem('syllabus', index, e.target.value)}
                                                        className="flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                        placeholder="Week/Module description"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayItem('syllabus', index)}
                                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addArrayItem('syllabus')}
                                                className="animated-button w-full"
                                            >
                                                <span className="label">+ Add Syllabus Item</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Instructors */}
                                <div>
                                    <label className="block text-sm font-medium mb-3" style={{ color: 'var(--accent-dark)' }}>Instructors</label>
                                    <div className="grid grid-cols-2 gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--accent-light)' }}>
                                        {availableInstructors.map(instructor => (
                                            <label key={instructor.id} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.instructors.includes(instructor.id)}
                                                    onChange={() => handleInstructorChange(instructor.id)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm" style={{ color: 'var(--accent-dark)' }}>{instructor.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Enrollment Details */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Enrollment Details</label>
                                    <textarea
                                        name="enrollment"
                                        value={formData.enrollment}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                        placeholder="Payment details, access duration, certificates, etc."
                                    />
                                </div>

                                {/* FAQ Section */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => toggleSection('faq')}
                                        className="flex items-center justify-between w-full p-3 rounded-lg transition-colors"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}
                                    >
                                        <span className="font-medium">FAQ Section</span>
                                        {expandedSections.faq ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {expandedSections.faq && (
                                        <div className="mt-2 space-y-4">
                                            {formData.faq.map((item, index) => (
                                                <div key={index} className="p-4 rounded-lg border" style={{ borderColor: 'var(--accent-light)', backgroundColor: 'var(--accent-light)' }}>
                                                    <div className="space-y-2">
                                                        <input
                                                            type="text"
                                                            value={item.question}
                                                            onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                                            className="w-full px-3 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                            style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                            placeholder="Question"
                                                        />
                                                        <textarea
                                                            value={item.answer}
                                                            onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                                            rows={2}
                                                            className="w-full px-3 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                            style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                            placeholder="Answer"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeArrayItem('faq', index)}
                                                            className="text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm"
                                                        >
                                                            Remove FAQ
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addFAQ}
                                                className="animated-button w-full"
                                            >
                                                <span className="label">+ Add FAQ</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Course Thumbnail</label>
                                    <div className="flex items-center gap-4">
                                        <div className="h-24 w-32 rounded overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                            {formData.thumbnailUrl ? (
                                                <img src={formData.thumbnailUrl} alt="Preview" className="h-full w-full object-cover" />
                                            ) : (
                                                <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="thumbnail-upload" />
                                        <label htmlFor="thumbnail-upload" className="animated-button cursor-pointer">
                                            <span className="label">Choose Image</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                                    <button type="button" onClick={closeModal} className="animated-button">
                                        <span className="label">Cancel</span>
                                    </button>
                                    <button type="submit" className="animated-button">
                                        <span className="label">{editingCourse ? 'Update Course' : 'Save Course'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredCourses.length === 0 && (
                <div className="text-center py-16">
                    <BookOpen className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--accent-dark)' }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>No courses found</h3>
                    <p className="text-sm mb-6 text-gray-600">
                        {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating your first course.'}
                    </p>
                    {!searchTerm && (
                        <button onClick={openAddModal} className="animated-button">
                            <span className="label flex items-center gap-2">
                                <Plus size={16} />
                                Add Course
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default CoursesManagement
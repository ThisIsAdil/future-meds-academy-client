import React, { useState, useEffect, useCallback } from 'react'
import { Plus, Edit, Trash2, X, Upload, BookOpen, Clock, Euro, Users, ChevronDown, ChevronUp } from 'lucide-react'
import AdminHeader from '../components/refactor/AdminHeader'
import SearchInput from '../components/refactor/SearchInput'
import ModalWrapper from '../components/refactor/ModalWrapper'
import Pagination from '../components/refactor/Pagination'
import { courseService } from '../../services/courses'
import { teamService } from '../../services/team'

const DEFAULT_FORM = {
    id: '', title: '', price: '', duration: '', shortDescription: '', about: '',
    whyChoose: [], syllabus: [], instructors: [], enrollment: '', faq: [],
    thumbnail: null, thumbnailUrl: ''
}

const CoursesManagement = () => {
    const [courses, setCourses] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCourse, setEditingCourse] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [availableInstructors, setAvailableInstructors] = useState([])
    const [expandedSections, setExpandedSections] = useState({
        about: false, whyChoose: false, syllabus: true, faq: false
    })
    const [formData, setFormData] = useState(DEFAULT_FORM)
    const [isLoading, setIsLoading] = useState(false) // added loading state
    const itemsPerPage = 10

    const fetchCourses = useCallback(async () => {
        setIsLoading(true)
        try {
            const [coursesRes, teamRes] = await Promise.all([courseService.getAll(), teamService.getAll()])
            const coursesData = coursesRes?.data?.data || []
            const teamData = (teamRes?.data?.data || []).map(m => ({ _id: m._id, name: m.name }))
            setCourses(coursesData)
            setAvailableInstructors(teamData)
        } catch (err) {
            console.error('Fetch error', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => { fetchCourses() }, [fetchCourses])

    const filteredCourses = courses.filter(c =>
        c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.duration?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage))
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage)

    const setField = (name, value) => setFormData(prev => ({ ...prev, [name]: value }))

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setField(name, value)
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) setFormData(prev => ({ ...prev, thumbnail: file, thumbnailUrl: URL.createObjectURL(file) }))
    }

    const handleInstructorChange = (instId) => {
        setFormData(prev => {
            const exists = prev.instructors.includes(instId)
            return { ...prev, instructors: exists ? prev.instructors.filter(i => i !== instId) : [...prev.instructors, instId] }
        })
    }

    const addArrayItem = (field, defaultValue = '') => setFormData(prev => ({ ...prev, [field]: [...(prev[field] || []), defaultValue] }))
    const updateArrayItem = (field, idx, value) => setFormData(prev => ({ ...prev, [field]: prev[field].map((it, i) => i === idx ? value : it) }))
    const removeArrayItem = (field, idx) => setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) }))

    const addFAQ = () => setFormData(prev => ({ ...prev, faq: [...(prev.faq || []), { question: '', answer: '' }] }))
    const updateFAQ = (idx, field, value) => setFormData(prev => ({ ...prev, faq: prev.faq.map((f, i) => i === idx ? { ...f, [field]: value } : f) }))

    const resetForm = () => setFormData(DEFAULT_FORM)

    const openAddModal = () => { resetForm(); setEditingCourse(null); setIsModalOpen(true) }

    const openEditModal = (course) => {
        const instructors = (course.instructors || []).map(id => String(id))
        setFormData({
            ...DEFAULT_FORM,
            ...course,
            instructors,
            thumbnail: null,
            thumbnailUrl: course.thumbnailUrl || course.thumbnail || ''
        })
        setEditingCourse(course)
        setIsModalOpen(true)
    }

    const closeModal = () => { setIsModalOpen(false); setEditingCourse(null); resetForm() }

    const buildPayload = (data) => {
        // Remove display-only and empty file fields
        const { thumbnailUrl, thumbnail, ...rest } = data
        // Ensure instructors are strings (ids)
        const payload = { ...rest, instructors: (data.instructors || []).map(String) }

        // Remove thumbnail key entirely if there's no file (prevents sending null)
        if (!data.thumbnail) {
            delete payload.thumbnail
        }

        return payload
    }

    const toFormData = (obj) => {
        const fd = new FormData()
        Object.entries(obj).forEach(([key, value]) => {
            if (value === undefined || value === null) return

            if (key === 'thumbnail' && value instanceof File) {
                fd.append('thumbnail', value)
                return
            }

            if (Array.isArray(value)) {
                const hasObject = value.some(v => v !== null && typeof v === 'object')
                if (hasObject) {
                    // Append each object property with bracket notation so backend can reconstruct array of objects
                    value.forEach((item, idx) => {
                        if (item == null) return
                        Object.entries(item).forEach(([prop, val]) => {
                            if (val === undefined || val === null) return
                            fd.append(`${key}[${idx}][${prop}]`, String(val))
                        })
                    })
                } else {
                    // Send primitive arrays as repeated fields: key[]
                    value.forEach(v => fd.append(`${key}[]`, String(v)))
                }
                return
            }

            if (typeof value === 'object') {
                fd.append(key, JSON.stringify(value))
                return
            }

            fd.append(key, String(value))
        })
        return fd
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const payloadObj = buildPayload(formData)

            if (formData.thumbnail) {
                const fd = toFormData({ ...payloadObj, thumbnail: formData.thumbnail })
                // Ensure courseService does not force Content-Type for FormData requests.
                if (editingCourse && editingCourse._id) {
                    await courseService.update(editingCourse._id, fd)
                    // optimistic update: merge non-file fields
                    setCourses(prev => prev.map(c => c._id === editingCourse._id ? { ...c, ...payloadObj } : c))
                } else {
                    const res = await courseService.create(fd)
                    const created = res?.data?.data || res?.data || payloadObj
                    setCourses(prev => [created, ...prev])
                }
            } else {
                if (editingCourse && editingCourse._id) {
                    await courseService.update(editingCourse._id, payloadObj)
                    setCourses(prev => prev.map(c => c._id === editingCourse._id ? { ...c, ...payloadObj } : c))
                } else {
                    const res = await courseService.create(payloadObj)
                    const created = res?.data?.data || res?.data || payloadObj
                    setCourses(prev => [created, ...prev])
                }
            }
        } catch (err) {
            console.error('Save error', err)
        } finally {
            setIsLoading(false)
            closeModal()
        }
    }

    const handleDelete = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return
        setIsLoading(true)
        try {
            await courseService.delete(courseId)
            setCourses(prev => prev.filter(c => c._id !== courseId))
        } catch (err) {
            setCourses(prev => prev.filter(c => c._id !== courseId))
        } finally {
            setIsLoading(false)
        }
    }

    const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white relative">
            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center" aria-live="polite" aria-busy="true" role="status" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent-dark) transparent transparent transparent' }} />
                        <div className="text-sm" style={{ color: 'var(--accent-dark)' }}>Loading...</div>
                    </div>
                </div>
            )}

            <AdminHeader title="Courses" count={filteredCourses.length} onAdd={openAddModal} addLabel="Add Course" addIcon={<Plus size={20} />} />
            <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search by course title or duration" />

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
                        {currentCourses.map((course, idx) => (
                            <tr key={course._id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-4 px-6 text-sm text-gray-500">{startIndex + idx + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-16 rounded overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)' }}>
                                            {course.thumbnail ? <img src={course.thumbnail.url} alt={course.title} className="h-full w-full object-cover" /> :
                                                <div className="h-full w-full flex items-center justify-center"><BookOpen className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} /></div>}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                            <div className="text-xs text-gray-500">{(course.shortDescription || '').substring(0, 50)}...</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                        <Clock size={12} className="mr-1" />{course.duration}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center text-sm font-medium whitespace-nowrap" style={{ color: 'var(--accent-dark)' }}>
                                        <Euro size={14} className="mr-1" />{course.price}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                        <Users size={12} className="mr-1" />{(course.instructors || []).length} instructor{(course.instructors || []).length !== 1 ? 's' : ''}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditModal(course)} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(course._id)} className="p-2 rounded hover:bg-red-50 transition-colors text-red-600"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} itemsPerPage={itemsPerPage} startIndex={startIndex} totalItems={filteredCourses.length} />

            <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title={editingCourse ? 'Edit Course' : 'Add New Course'} maxWidth="max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Course Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Enter course title" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Price (€) *</label>
                                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="129" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Duration *</label>
                                <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="3 Months" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Short Description *</label>
                        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} required rows={2} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="A brief description that appears on course cards" />
                    </div>

                    <div>
                        <button type="button" onClick={() => toggleSection('about')} className="flex items-center justify-between w-full p-3 rounded-lg transition-colors" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                            <span className="font-medium">About This Course</span>
                            {expandedSections.about ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {expandedSections.about && (
                            <div className="mt-2">
                                <textarea name="about" value={formData.about} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Detailed description about the course" />
                            </div>
                        )}
                    </div>

                    <div>
                        <button type="button" onClick={() => toggleSection('whyChoose')} className="flex items-center justify-between w-full p-3 rounded-lg transition-colors" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                            <span className="font-medium">Why Choose This Course?</span>
                            {expandedSections.whyChoose ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {expandedSections.whyChoose && (
                            <div className="mt-2 space-y-2">
                                {(formData.whyChoose || []).map((item, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input type="text" value={item} onChange={(e) => updateArrayItem('whyChoose', i, e.target.value)} className="flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Benefit or feature" />
                                        <button type="button" onClick={() => removeArrayItem('whyChoose', i)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><X size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addArrayItem('whyChoose')} className="animated-button w-full"><span className="label">+ Add Benefit</span></button>
                            </div>
                        )}
                    </div>

                    <div>
                        <button type="button" onClick={() => toggleSection('syllabus')} className="flex items-center justify-between w-full p-3 rounded-lg transition-colors" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                            <span className="font-medium">Course Syllabus</span>
                            {expandedSections.syllabus ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {expandedSections.syllabus && (
                            <div className="mt-2 space-y-2">
                                {(formData.syllabus || []).map((item, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input type="text" value={item} onChange={(e) => updateArrayItem('syllabus', i, e.target.value)} className="flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Week/Module description" />
                                        <button type="button" onClick={() => removeArrayItem('syllabus', i)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><X size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addArrayItem('syllabus')} className="animated-button w-full"><span className="label">+ Add Syllabus Item</span></button>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Instructors</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-3 rounded-lg border" style={{ borderColor: 'var(--accent-light)', backgroundColor: 'var(--accent-light)' }}>
                            {availableInstructors.map(inst => (
                                <label key={inst._id} className="flex items-center gap-2">
                                    <input type="checkbox" checked={formData.instructors.includes(String(inst._id))} onChange={() => handleInstructorChange(String(inst._id))} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="text-sm" style={{ color: 'var(--secondary)' }}>{inst.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Enrollment Details</label>
                        <textarea name="enrollment" value={formData.enrollment} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Payment details, access duration, certificates, etc." />
                    </div>

                    <div>
                        <button type="button" onClick={() => toggleSection('faq')} className="flex items-center justify-between w-full p-3 rounded-lg transition-colors" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                            <span className="font-medium">FAQ Section</span>
                            {expandedSections.faq ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {expandedSections.faq && (
                            <div className="mt-2 space-y-4">
                                {(formData.faq || []).map((item, i) => (
                                    <div key={i} className="p-4 rounded-lg border" style={{ borderColor: 'var(--accent-light)', backgroundColor: 'var(--accent-light)' }}>
                                        <div className="space-y-2">
                                            <input type="text" value={item.question} onChange={(e) => updateFAQ(i, 'question', e.target.value)} className="w-full px-3 py-2 rounded border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }} placeholder="Question" />
                                            <textarea value={item.answer} onChange={(e) => updateFAQ(i, 'answer', e.target.value)} rows={2} className="w-full px-3 py-2 rounded border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }} placeholder="Answer" />
                                            <button type="button" onClick={() => removeArrayItem('faq', i)} className="text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm">Remove FAQ</button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={addFAQ} className="animated-button w-full"><span className="label">+ Add FAQ</span></button>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Course Thumbnail</label>
                        <div className="flex items-center gap-4">
                            <div className="h-24 w-32 rounded overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                {formData.thumbnailUrl ? <img src={formData.thumbnailUrl} alt="Preview" className="h-full w-full object-cover" /> : <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />}
                            </div>
                            <input type="file" accept="image/*" name='thumbnail' onChange={handleFileChange} className="hidden" id="thumbnail-upload" />
                            <label htmlFor="thumbnail-upload" className="animated-button cursor-pointer"><span className="label">Choose Image</span></label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                        <button type="button" onClick={closeModal} disabled={isLoading} className="animated-button"><span className="label">Cancel</span></button>
                        <button type="submit" disabled={isLoading} className="animated-button"><span className="label">{editingCourse ? 'Update Course' : 'Save Course'}</span></button>
                    </div>
                </form>
            </ModalWrapper>

            {filteredCourses.length === 0 && (
                <div className="text-center py-16">
                    <BookOpen className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--accent-dark)' }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>No courses found</h3>
                    <p className="text-sm mb-6 text-gray-600">{searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating your first course.'}</p>
                    {!searchTerm && <button onClick={openAddModal} className="animated-button"><span className="label flex items-center gap-2"><Plus size={16} />Add Course</span></button>}
                </div>
            )}
        </div>
    )
}

export default CoursesManagement
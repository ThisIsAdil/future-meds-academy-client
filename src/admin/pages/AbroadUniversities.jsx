import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Plus, Edit, Trash2, Upload, GraduationCap, MapPin, Globe, DollarSign, ExternalLink, X } from 'lucide-react'
import AdminHeader from '../components/refactor/AdminHeader'
import SearchInput from '../components/refactor/SearchInput'
import ModalWrapper from '../components/refactor/ModalWrapper'
import Pagination from '../components/refactor/Pagination'
import { abroadUniversityService } from '../../services/abroadUniversity'

const ITEMS_PER_PAGE = 10

const EMPTY_FORM = {
    id: '',
    name: '',
    location: '',
    tuitionFees: '',
    programs: [],
    programLength: '',
    admissionInfo: '',
    blogUrl: '',
    // keep these keys exactly as backend expects: "logo" and "campusImage"
    logo: null, // File or string URL
    campusImage: null, // File or string URL
}

const AbroadUniversities = () => {
    const [universities, setUniversities] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUniversity, setEditingUniversity] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const [formData, setFormData] = useState(EMPTY_FORM)
    const [logoPreview, setLogoPreview] = useState(null)
    const [campusPreview, setCampusPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUniversities = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await abroadUniversityService.getAll()
            const data = res?.data?.data || res?.data || []
            setUniversities(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setError('Failed to load universities')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchUniversities() }, [fetchUniversities])

    useEffect(() => {
        return () => {
            if (logoPreview && logoPreview.startsWith?.('blob:')) URL.revokeObjectURL(logoPreview)
            if (campusPreview && campusPreview.startsWith?.('blob:')) URL.revokeObjectURL(campusPreview)
        }
    }, [logoPreview, campusPreview])

    const openAddModal = () => {
        setFormData(EMPTY_FORM)
        setEditingUniversity(null)
        setIsModalOpen(true)
        if (logoPreview && logoPreview.startsWith?.('blob:')) { URL.revokeObjectURL(logoPreview); setLogoPreview(null) }
        if (campusPreview && campusPreview.startsWith?.('blob:')) { URL.revokeObjectURL(campusPreview); setCampusPreview(null) }
    }

    const openEditModal = (u) => {
        // derive a single location field (backwards compatible with older city/country)
        const derivedLocation = u.location || [u.city, u.country].filter(Boolean).join(', ') || ''
        setFormData({
            id: u.id || u._id || '',
            name: u.name || '',
            location: derivedLocation,
            tuitionFees: u.tuitionFees || '',
            programs: Array.isArray(u.programs) ? u.programs : (u.programs ? [u.programs] : []),
            programLength: u.programLength || '',
            admissionInfo: u.admissionInfo || '',
            blogUrl: u.blogUrl || '',
            // keep server urls as strings; only replace with File when user picks a new file
            logo: (u.logo && u.logo.url) ? u.logo.url : (u.logo || null),
            campusImage: (u.campusImage && u.campusImage.url) ? u.campusImage.url : (u.campusImage || null),
        })
        setEditingUniversity(u)
        setIsModalOpen(true)
        if (u.logo?.url || (typeof u.logo === 'string' && u.logo)) setLogoPreview(u.logo?.url || u.logo)
        if (u.campusImage?.url || (typeof u.campusImage === 'string' && u.campusImage)) setCampusPreview(u.campusImage?.url || u.campusImage)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingUniversity(null)
        setFormData(EMPTY_FORM)
        if (logoPreview && logoPreview.startsWith?.('blob:')) { URL.revokeObjectURL(logoPreview); setLogoPreview(null) }
        if (campusPreview && campusPreview.startsWith?.('blob:')) { URL.revokeObjectURL(campusPreview); setCampusPreview(null) }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e, key) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (key === 'logo') {
            if (logoPreview && typeof logoPreview === 'string' && logoPreview.startsWith('blob:')) URL.revokeObjectURL(logoPreview)
            const url = URL.createObjectURL(file)
            setLogoPreview(url)
            setFormData(prev => ({ ...prev, logo: file }))
        } else if (key === 'campusImage') {
            if (campusPreview && typeof campusPreview === 'string' && campusPreview.startsWith('blob:')) URL.revokeObjectURL(campusPreview)
            const url = URL.createObjectURL(file)
            setCampusPreview(url)
            setFormData(prev => ({ ...prev, campusImage: file }))
        }
    }

    const toFormData = (obj) => {
        const fd = new FormData()
        Object.entries(obj).forEach(([k, v]) => {
            if (v === undefined || v === null) return

            // Only append file fields when they are actual File objects.
            if (k === 'logo' || k === 'campusImage') {
                if (v instanceof File) {
                    // backend (Multer) expects fields named exactly "logo" and "campusImage"
                    fd.append(k, v)
                }
                return
            }

            // For arrays (programs) stringify as JSON
            if (Array.isArray(v)) {
                fd.append(k, JSON.stringify(v))
                return
            }

            fd.append(k, String(v))
        })
        return fd
    }

    const saveUniversity = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const hasFile = formData.logo instanceof File || formData.campusImage instanceof File
            const payload = {
                name: formData.name,
                location: formData.location,
                tuitionFees: formData.tuitionFees,
                programs: formData.programs,
                programLength: formData.programLength,
                admissionInfo: formData.admissionInfo,
                blogUrl: formData.blogUrl,
            }

            if (editingUniversity) {
                const id = editingUniversity._id || editingUniversity.id
                if (hasFile) {
                    const fd = toFormData({ ...payload, logo: formData.logo, campusImage: formData.campusImage })
                    await abroadUniversityService.update(id, fd)
                    setUniversities(prev => prev.map(u => (u._id === id || u.id === id) ? { ...u, ...payload } : u))
                } else {
                    await abroadUniversityService.update(id, payload)
                    setUniversities(prev => prev.map(u => (u._id === id || u.id === id) ? { ...u, ...payload } : u))
                }
            } else {
                if (hasFile) {
                    const fd = toFormData({ ...payload, logo: formData.logo, campusImage: formData.campusImage })
                    const res = await abroadUniversityService.create(fd)
                    const created = res?.data?.data || res?.data
                    if (created) setUniversities(prev => [created, ...prev])
                } else {
                    const res = await abroadUniversityService.create(payload)
                    const created = res?.data?.data || res?.data
                    if (created) setUniversities(prev => [created, ...prev])
                }
            }
            closeModal()
        } catch (err) {
            console.error(err)
            setError('Failed to save university')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this university?')) return
        try {
            setUniversities(prev => prev.filter(u => (u._id || u.id) !== id))
            await abroadUniversityService.delete(id)
        } catch (err) {
            console.error(err)
            setError('Failed to delete university')
            fetchUniversities()
        }
    }

    const filteredUniversities = useMemo(() => {
        const q = (searchTerm || '').trim().toLowerCase()
        if (!q) return universities
        return universities.filter(u =>
            (u.name || '').toLowerCase().includes(q) ||
            (u.location || '').toLowerCase().includes(q) ||
            (u.country || '').toLowerCase().includes(q) ||
            (u.city || '').toLowerCase().includes(q)
        )
    }, [universities, searchTerm])

    const totalPages = Math.max(1, Math.ceil(filteredUniversities.length / ITEMS_PER_PAGE))
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentUniversities = filteredUniversities.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <AdminHeader title="Study Abroad Universities" count={filteredUniversities.length} onAdd={openAddModal} addLabel="Add University" addIcon={<Plus size={20} />} />

            <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search by university name or location" />

            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 w-16">#</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Logo</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Location</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Tuition</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Programs</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && currentUniversities.length === 0 && (
                            <tr><td colSpan={7} className="py-8 text-center text-sm text-gray-500">Loading...</td></tr>
                        )}
                        {!loading && currentUniversities.length === 0 && (
                            <tr><td colSpan={7} className="py-8 text-center text-sm text-gray-500">No universities found</td></tr>
                        )}
                        {currentUniversities.map((university, index) => {
                            const displayLocation = university.location || [university.city, university.country].filter(Boolean).join(', ')
                            return (
                                <tr key={university._id || university.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="py-4 px-6 text-sm text-gray-500">{startIndex + index + 1}</td>
                                    <td className="py-4 px-6">
                                        <div className="h-12 w-12 rounded-full overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)' }}>
                                            {university.logo?.url || university.logo ? (
                                                <img src={university.logo?.url || university.logo} alt={university.name} className="h-full w-full object-cover" />
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
                                        <div className="space-y-1">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                                <MapPin size={12} className="mr-1" />
                                                {displayLocation}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-green-800" style={{ backgroundColor: '#dcfce7' }}>
                                            <DollarSign size={12} className="mr-1" />
                                            {university.tuitionFees}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="space-y-1">
                                            {(university.programs || []).slice(0, 2).map((program, idx) => (
                                                <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-blue-800 mr-1" style={{ backgroundColor: '#dbeafe' }}>
                                                    {program}
                                                </span>
                                            ))}
                                            {(university.programs || []).length > 2 && (
                                                <span className="text-xs text-gray-500">+{(university.programs || []).length - 2} more</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditModal(university)} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}>
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(university._id || university.id)} className="p-2 rounded hover:bg-red-50 transition-colors text-red-600">
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

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} itemsPerPage={ITEMS_PER_PAGE} startIndex={startIndex} totalItems={filteredUniversities.length} />

            <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title={editingUniversity ? 'Edit University' : 'Add University'} maxWidth="max-w-4xl">
                <form onSubmit={saveUniversity} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>University Logo</label>
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                    {logoPreview ? <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-cover" /> : <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />}
                                </div>
                                <input id="logo" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} className="hidden" />
                                <label htmlFor="logo" className="animated-button cursor-pointer"><span className="label">Choose Logo</span></label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Campus Image</label>
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-32 rounded overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                    {campusPreview ? <img src={campusPreview} alt="Campus Preview" className="h-full w-full object-cover" /> : <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />}
                                </div>
                                <input id="campus" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'campusImage')} className="hidden" />
                                <label htmlFor="campus" className="animated-button cursor-pointer"><span className="label">Choose Image</span></label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>University Name *</label>
                            <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="University of Cambridge" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Location *</label>
                            <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Cambridge, United Kingdom" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Tuition Fees</label>
                            <input name="tuitionFees" value={formData.tuitionFees} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="£9,250 / year" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Program Length</label>
                            <input name="programLength" value={formData.programLength} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="6 years" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Programs Offered</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.programs.map((program, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent-dark)', color: 'var(--primary)' }}>
                                    {program}
                                </span>
                            ))}
                        </div>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Type a program and press Enter (e.g. Medicine & Surgery)" onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                const value = e.target.value.trim()
                                if (value && !formData.programs.includes(value)) {
                                    setFormData(prev => ({ ...prev, programs: [...prev.programs, value] }))
                                }
                                e.target.value = ''
                            }
                        }} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Admission Information</label>
                        <textarea name="admissionInfo" value={formData.admissionInfo} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Entry requirements, admission process, language requirements, etc." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Blog URL (Optional)</label>
                        <div className="relative">
                            <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--accent-dark)' }} size={20} />
                            <input type="url" name="blogUrl" value={formData.blogUrl} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="https://..." />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                        <button type="button" onClick={closeModal} className="animated-button"><span className="label">Cancel</span></button>
                        <button type="submit" disabled={loading} className="animated-button"><span className="label">{editingUniversity ? 'Update University' : 'Save University'}</span></button>
                    </div>
                    {error && <div className="text-sm text-red-600 mt-3">{error}</div>}
                </form>
            </ModalWrapper>
        </div>
    )
}

export default AbroadUniversities
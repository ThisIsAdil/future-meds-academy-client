import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Plus, Edit, Trash2, Upload, GraduationCap, MapPin, ExternalLink, X } from 'lucide-react'
import AdminHeader from '../components/refactor/AdminHeader'
import SearchInput from '../components/refactor/SearchInput'
import ModalWrapper from '../components/refactor/ModalWrapper'
import Pagination from '../components/refactor/Pagination'
import { universityService } from '../../services/university'

const ITEMS_PER_PAGE = 10

const EMPTY_FORM = {
    id: '',
    name: '',
    about: '',
    location: '',
    tuitionFees: '',
    programLength: '',
    blogUrl: '',
    logo: null, // File or string URL
    campusImage: null, // File or string URL
}

const IMATUniversities = () => {
    const [universities, setUniversities] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(EMPTY_FORM)

    const [logoPreview, setLogoPreview] = useState(null)
    const [campusPreview, setCampusPreview] = useState(null)

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const fetchUniversities = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await universityService.getAll()
            const data = res?.data?.data || []
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
            if (logoPreview) URL.revokeObjectURL(logoPreview)
            if (campusPreview) URL.revokeObjectURL(campusPreview)
        }
    }, [logoPreview, campusPreview])

    const openAdd = () => {
        setForm(EMPTY_FORM)
        setEditing(null)
        setIsModalOpen(true)
        if (logoPreview) { URL.revokeObjectURL(logoPreview); setLogoPreview(null) }
        if (campusPreview) { URL.revokeObjectURL(campusPreview); setCampusPreview(null) }
    }

    const openEdit = (u) => {
        // keep server urls in form as string; only send File when replaced
        setForm({
            id: u.id || u._id || '',
            name: u.name || '',
            about: u.about || '',
            location: u.location || '',
            tuitionFees: u.tuitionFees || '',
            programLength: u.programLength || '',
            blogUrl: u.blogUrl || '',
            logo: (u.logo && u.logo.url) ? u.logo.url : null,
            campusImage: (u.campusImage && u.campusImage.url) ? u.campusImage.url : null,
        })
        setEditing(u)
        setIsModalOpen(true)
        if (u.logo?.url) setLogoPreview(u.logo.url)
        if (u.campusImage?.url) setCampusPreview(u.campusImage.url)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditing(null)
        setForm(EMPTY_FORM)
        if (logoPreview) { URL.revokeObjectURL(logoPreview); setLogoPreview(null) }
        if (campusPreview) { URL.revokeObjectURL(campusPreview); setCampusPreview(null) }
    }

    const onInput = (e) => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
    }

    const onFile = (e, key) => {
        const f = e.target.files?.[0]
        if (!f) return
        // revoke old preview urls if they were created locally
        if (key === 'logo') {
            if (logoPreview && typeof logoPreview === 'string' && logoPreview.startsWith('blob:')) URL.revokeObjectURL(logoPreview)
            const url = URL.createObjectURL(f)
            setLogoPreview(url)
            setForm(prev => ({ ...prev, logo: f }))
        } else if (key === 'campusImage') {
            if (campusPreview && typeof campusPreview === 'string' && campusPreview.startsWith('blob:')) URL.revokeObjectURL(campusPreview)
            const url = URL.createObjectURL(f)
            setCampusPreview(url)
            setForm(prev => ({ ...prev, campusImage: f }))
        }
    }

    const toFormData = (obj) => {
        const fd = new FormData()
        Object.entries(obj).forEach(([k, v]) => {
            if (v === undefined || v === null) return

            // For file fields: only append when the value is a File (i.e. user replaced it).
            // Do NOT append string URLs for logo or campusImage — backend (Multer) expects file fields only.
            if ((k === 'logo' || k === 'campusImage')) {
                if (v instanceof File) {
                    fd.append(k, v)
                }
                return
            }

            // Append other primitives as strings
            fd.append(k, String(v))
        })
        return fd
    }

    const saveUniversity = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            // Determine payload: if either logo/campusImage is File, send FormData
            const hasFile = form.logo instanceof File || form.campusImage instanceof File
            const payloadObj = {
                name: form.name,
                about: form.about,
                location: form.location,
                tuitionFees: form.tuitionFees,
                programLength: form.programLength,
                blogUrl: form.blogUrl,
            }

            if (editing) {
                // update
                if (hasFile) {
                    const fd = toFormData({ ...payloadObj, logo: form.logo, campusImage: form.campusImage })
                    await universityService.update(editing._id || editing.id, fd)
                    // optimistic merge for text fields
                    setUniversities(prev => prev.map(u => u._id === (editing._id || editing.id) ? { ...u, ...payloadObj } : u))
                } else {
                    await universityService.update(editing._id || editing.id, payloadObj)
                    setUniversities(prev => prev.map(u => u._id === (editing._id || editing.id) ? { ...u, ...payloadObj } : u))
                }
            } else {
                if (hasFile) {
                    const fd = toFormData({ ...payloadObj, logo: form.logo, campusImage: form.campusImage })
                    const res = await universityService.create(fd)
                    const created = res?.data?.data || res?.data
                    if (created) setUniversities(prev => [created, ...prev])
                } else {
                    const res = await universityService.create(payloadObj)
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

    const deleteUniversity = async (id) => {
        if (!window.confirm('Are you sure you want to delete this university?')) return
        try {
            setUniversities(prev => prev.filter(u => u._id !== id))
            await universityService.delete(id)
        } catch (err) {
            console.error(err)
            setError('Failed to delete university')
            fetchUniversities()
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return universities
        return universities.filter(u => (u.name || '').toLowerCase().includes(q) || (u.location || '').toLowerCase().includes(q))
    }, [universities, search])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <AdminHeader title="IMAT Universities" count={filtered.length} onAdd={openAdd} addLabel="Add University" addIcon={<Plus size={20} />} />

            <SearchInput value={search} onChange={setSearch} placeholder="Search by name or location" />

            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 w-16">#</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Logo</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Location</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && pageItems.length === 0 && (
                            <tr><td colSpan={5} className="py-8 text-center text-sm text-gray-500">Loading...</td></tr>
                        )}
                        {!loading && pageItems.length === 0 && (
                            <tr><td colSpan={5} className="py-8 text-center text-sm text-gray-500">No universities found</td></tr>
                        )}
                        {pageItems.map((u, idx) => (
                            <tr key={u._id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-4 px-6 text-sm text-gray-500">{startIndex + idx + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="h-12 w-12 rounded-full overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)' }}>
                                        {u.logo?.url ? <img src={u.logo.url} alt={u.name} className="h-full w-full object-cover" /> :
                                            <div className="h-full w-full flex items-center justify-center"><GraduationCap className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} /></div>}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                    <div className="text-xs text-gray-500">{u.programLength}</div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                        <MapPin size={12} className="mr-1" />{u.location}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(u)} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}><Edit size={16} /></button>
                                        <button onClick={() => deleteUniversity(u._id)} className="p-2 rounded hover:bg-red-50 transition-colors text-red-600"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} itemsPerPage={ITEMS_PER_PAGE} startIndex={startIndex} totalItems={filtered.length} />

            <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit University' : 'Add University'} maxWidth="max-w-4xl">
                <form onSubmit={saveUniversity} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>University Name *</label>
                            <input required name="name" value={form.name} onChange={onInput} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="University of Milan" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Location *</label>
                            <input required name="location" value={form.location} onChange={onInput} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Milan, Italy" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Tuition Fees</label>
                            <input name="tuitionFees" value={form.tuitionFees} onChange={onInput} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="€800 – €4,000 / year" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Program Length</label>
                            <input name="programLength" value={form.programLength} onChange={onInput} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="6 years (Medicine & Surgery)" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Blog URL</label>
                        <div className="relative">
                            <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--accent-dark)' }} size={20} />
                            <input type="url" name="blogUrl" value={form.blogUrl} onChange={onInput} className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="https://..." />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>About</label>
                        <textarea name="about" value={form.about} onChange={onInput} rows={4} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Short description about the university" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>University Logo</label>
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                    {logoPreview ? <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-cover" /> : <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />}
                                </div>
                                <input id="logo" type="file" accept="image/*" onChange={(e) => onFile(e, 'logo')} className="hidden" />
                                <label htmlFor="logo" className="animated-button cursor-pointer"><span className="label">Choose Logo</span></label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Campus Image</label>
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-32 rounded overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                    {campusPreview ? <img src={campusPreview} alt="Campus Preview" className="h-full w-full object-cover" /> : <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />}
                                </div>
                                <input id="campus" type="file" accept="image/*" onChange={(e) => onFile(e, 'campusImage')} className="hidden" />
                                <label htmlFor="campus" className="animated-button cursor-pointer"><span className="label">Choose Image</span></label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                        <button type="button" onClick={closeModal} className="animated-button"><span className="label">Cancel</span></button>
                        <button type="submit" disabled={loading} className="animated-button"><span className="label">{editing ? 'Update University' : 'Save University'}</span></button>
                    </div>
                </form>
                {error && <div className="text-sm text-red-600 mt-3">{error}</div>}
            </ModalWrapper>
        </div>
    )
}

export default IMATUniversities
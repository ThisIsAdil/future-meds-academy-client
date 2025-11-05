import React, { useEffect, useMemo, useState } from 'react'
import { Plus, Edit, Trash2, Upload, Youtube, User } from 'lucide-react'
import AdminHeader from '../components/refactor/AdminHeader'
import SearchInput from '../components/refactor/SearchInput'
import ModalWrapper from '../components/refactor/ModalWrapper'
import Pagination from '../components/refactor/Pagination'
import { teamService } from '../../services/team'

const ITEMS_PER_PAGE = 10

const emptyForm = { id: '', name: '', designation: '', about: '', videoIntroductionUrl: '', profilePicture: null, enrolledCourses: [] }

const TeamManagement = () => {
    const [team, setTeam] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyForm)

    // new: saving (for submit/upload) and previewUrl for image preview
    const [saving, setSaving] = useState(false)
    const [previewUrl, setPreviewUrl] = useState(null)

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => { fetchTeam() }, [])

    // cleanup preview on unmount
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    const fetchTeam = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await teamService.getAll()
            const data = res?.data?.data
            setTeam(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setError('Failed to load team members')
        } finally {
            setLoading(false)
        }
    }

    const saveMember = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editing) {
                let response
                // If a new file was selected, form.profilePicture will be a File
                if (form.profilePicture instanceof File) {
                    const fd = new FormData()
                    Object.entries(form).forEach(([key, value]) => {
                        if (value !== null && value !== undefined) {
                            // append file only if it's a File; append other fields as strings
                            if (key === 'profilePicture') {
                                fd.append('profilePicture', value)
                            } else if (Array.isArray(value)) {
                                fd.append(key, JSON.stringify(value))
                            } else {
                                fd.append(key, value)
                            }
                        }
                    })
                    response = await teamService.update(editing._id, fd)
                } else {
                    const payload = { ...form }
                    delete payload.profilePicture
                    response = await teamService.update(editing._id, payload)
                }

                const updatedMember = response.data?.data

                console.log('Update response:', updatedMember)
                if (updatedMember) {
                    setTeam(prev => prev.map(m => m._id === updatedMember._id ? updatedMember : m))
                }
            } else {
                const fd = new FormData()
                Object.entries(form).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        if (key === 'profilePicture') {
                            if (value instanceof File) {
                                fd.append(key, value)
                            }
                        } else if (Array.isArray(value)) {
                            fd.append(key, JSON.stringify(value))
                        } else {
                            fd.append(key, value)
                        }
                    }
                })
                const response = await teamService.create(fd)
                console.log('Create response:', response)
                const savedMember = response.data?.data
                if (savedMember) setTeam(prev => [...prev, savedMember])
            }
            closeModal()
        } catch (err) {
            console.error(err)
            setError('Failed to save member')
        } finally {
            setSaving(false)
        }
    }

    const deleteMember = async (id) => {
        if (!window.confirm('Delete this member?')) return
        try {
            // use _id for consistency
            setTeam(prev => prev.filter(m => m._id !== id))
            await teamService.delete(id)
        } catch (err) {
            console.error(err)
            setError('Failed to delete member')
            fetchTeam()
        }
    }

    const openAdd = () => { setForm(emptyForm); setEditing(null); setIsModalOpen(true); if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null) } }
    const openEdit = (member) => {
        // keep existing profilePicture URL in form as string; this will not be sent unless replaced with a File
        setForm({ ...member })
        setEditing(member)
        setIsModalOpen(true)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
        setPreviewUrl(member?.profilePicture.url || null)
    }
    const closeModal = () => {
        setIsModalOpen(false)
        setEditing(null)
        setForm(emptyForm)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
    }

    const onFile = (e) => {
        const f = e.target.files?.[0]
        if (!f) return
        // revoke previous preview
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
        const url = URL.createObjectURL(f)
        setPreviewUrl(url)
        setForm(prev => ({ ...prev, profilePicture: f }))
    }

    // memoized filtering + pagination
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return team
        return team.filter(m => (m.name || '').toLowerCase().includes(q) || (m.designation || '').toLowerCase().includes(q))
    }, [team, search])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const extractYouTubeId = (url) => {
        const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
        return match ? match[1] : null
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <AdminHeader title="Team Members" count={filtered.length} onAdd={openAdd} addLabel="Add Member" addIcon={<Plus size={20} />} />

            <SearchInput value={search} onChange={setSearch} placeholder="Search by name or designation" />

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
                        {loading && (
                            <tr><td colSpan={6} className="py-8 text-center text-sm text-gray-500">Loading...</td></tr>
                        )}
                        {!loading && pageItems.length === 0 && (
                            <tr><td colSpan={6} className="py-8 text-center text-sm text-gray-500">No team members found</td></tr>
                        )}
                        {pageItems.map((member, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-4 px-6 text-sm text-gray-500">{startIndex + idx + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="h-10 w-10 rounded-full overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                        {member.profilePicture ? (
                                            <img src={member.profilePicture.url} alt={member.name} className="h-full w-full object-cover" />
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
                                        {(member.enrolledCourses || []).length} Course{(member.enrolledCourses || []).length !== 1 ? 's' : ''}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(member)} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}>
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => deleteMember(member._id)} className="p-2 rounded hover:bg-red-50 transition-colors text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} itemsPerPage={ITEMS_PER_PAGE} startIndex={startIndex} totalItems={filtered.length} />

            <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Team Member' : 'Add Team Member'} maxWidth="max-w-2xl">
                <form onSubmit={saveMember} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Profile Photo</label>
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                ) : (form.profilePicture && typeof form.profilePicture === 'string') ? (
                                    <img src={form.profilePicture} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <Upload className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} />
                                )}
                            </div>
                            <input id="photo" name='profilePicture' type="file" accept="image/*" onChange={onFile} className="hidden" />
                            <label htmlFor="photo" className="animated-button cursor-pointer"><span className="label">Choose Photo</span></label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Name *</label>
                        <input required name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Enter full name" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Designation *</label>
                        <input required name="designation" value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="e.g., IMAT Biology Tutor" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>About</label>
                        <textarea name="about" value={form.about} onChange={e => setForm(f => ({ ...f, about: e.target.value }))} rows={3} maxLength={400} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Short bio (max 400 characters)" />
                        <div className="text-xs mt-1" style={{ color: 'var(--accent-dark)' }}>{form.about.length}/400 characters</div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>YouTube Video URL</label>
                        <div className="relative">
                            <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--accent-dark)' }} size={20} />
                            <input type="url" name="videoIntroductionUrl" value={form.videoIntroductionUrl} onChange={e => setForm(f => ({ ...f, videoIntroductionUrl: e.target.value }))} className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="https://www.youtube.com/watch?v=..." />
                        </div>
                        {form.videoIntroductionUrl && extractYouTubeId(form.videoIntroductionUrl) && (
                            <div className="mt-3">
                                <div className="aspect-video w-full max-w-sm">
                                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${extractYouTubeId(form.videoIntroductionUrl)}`} title="Preview" frameBorder="0" allowFullScreen className="rounded-lg" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                        <button type="button" onClick={closeModal} className="animated-button"><span className="label">Cancel</span></button>
                        <button type="submit" disabled={saving} className="animated-button">
                            <span className="label">{saving ? (editing ? 'Updating...' : 'Saving...') : (editing ? 'Update' : 'Save')}</span>
                        </button>
                    </div>
                </form>
            </ModalWrapper>

            {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
    )
}

export default TeamManagement
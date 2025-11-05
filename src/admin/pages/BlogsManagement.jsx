import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Plus, Edit, Trash2, Upload, BookOpen } from 'lucide-react'
import AdminHeader from '../components/refactor/AdminHeader'
import SearchInput from '../components/refactor/SearchInput'
import ModalWrapper from '../components/refactor/ModalWrapper'
import Pagination from '../components/refactor/Pagination'
import { blogService } from '../../services/blog'

const ITEMS_PER_PAGE = 10

const EMPTY_FORM = {
    _id: '',
    title: '',
    description: '',
    content: '',        // plain text / markdown
    tag: '',
    author: '',
    youtubeUrl: '',
    publishedAt: '',
    thumbnail: null,      // File when uploading
    thumbnailUrl: ''      // preview or existing URL
}

const BlogsManagement = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(EMPTY_FORM)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [saving, setSaving] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const fetchBlogs = useCallback(async () => {
        setLoading(true)
        try {
            const res = await blogService.getAll()
            const data = res?.data?.data || []
            setBlogs(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error('Failed to fetch blogs', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchBlogs() }, [fetchBlogs])

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    const openAdd = () => {
        setForm(EMPTY_FORM)
        setEditing(null)
        if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null) }
        setIsModalOpen(true)
    }

    const openEdit = (b) => {
        setForm({
            _id: b._id || '',
            title: b.title || '',
            description: b.description || '',
            content: (b.content && typeof b.content === 'string') ? b.content : '',
            tag: b.tag || '',
            author: b.author || '',
            youtubeUrl: b.youtubeUrl || '',
            publishedAt: b.publishedAt ? b.publishedAt.split('T')[0] : '',
            thumbnail: null,
            thumbnailUrl: b.thumbnail?.url || ''
        })
        if (previewUrl) { URL.revokeObjectURL(previewUrl) }
        setPreviewUrl(b.thumbnail?.url || null)
        setEditing(b)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditing(null)
        setForm(EMPTY_FORM)
        if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null) }
    }

    const onFile = (e) => {
        const f = e.target.files?.[0]
        if (!f) return
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        const url = URL.createObjectURL(f)
        setPreviewUrl(url)
        setForm(prev => ({ ...prev, thumbnail: f, thumbnailUrl: url }))
    }

    const handleChange = (name, value) => setForm(prev => ({ ...prev, [name]: value }))

    const buildPayload = () => {
        return {
            title: form.title,
            description: form.description,
            content: form.content || undefined,
            tag: form.tag || undefined,
            author: form.author || undefined,
            youtubeUrl: form.youtubeUrl || undefined,
            publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined
        }
    }

    const toFormData = (obj, fileKey = 'thumbnail', file = null) => {
        const fd = new FormData()
        Object.entries(obj).forEach(([k, v]) => {
            if (v === undefined || v === null) return
            if (typeof v === 'object') fd.append(k, JSON.stringify(v))
            else fd.append(k, String(v))
        })
        if (file instanceof File) fd.append(fileKey, file)
        return fd
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const payload = buildPayload()
            // if there's a file use multipart, otherwise send JSON
            if (form.thumbnail instanceof File) {
                const fd = toFormData(payload, 'thumbnail', form.thumbnail)
                if (editing && editing._id) {
                    const res = await blogService.update(editing._id, fd)
                    const updated = res?.data?.data || null
                    if (updated) setBlogs(prev => prev.map(b => b._id === updated._id ? updated : b))
                } else {
                    const res = await blogService.create(fd)
                    const created = res?.data?.data || null
                    if (created) setBlogs(prev => [created, ...prev])
                }
            } else {
                if (editing && editing._id) {
                    await blogService.update(editing._id, payload)
                    setBlogs(prev => prev.map(b => b._id === editing._id ? { ...b, ...payload } : b))
                } else {
                    const res = await blogService.create(payload)
                    const created = res?.data?.data || null
                    if (created) setBlogs(prev => [created, ...prev])
                }
            }
        } catch (err) {
            console.error('Save blog error', err)
        } finally {
            setSaving(false)
            closeModal()
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this blog?')) return
        try {
            setBlogs(prev => prev.filter(b => b._id !== id))
            await blogService.delete(id)
        } catch (err) {
            console.error('Delete failed', err)
            fetchBlogs()
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return blogs
        return blogs.filter(b =>
            (b.title || '').toLowerCase().includes(q) ||
            (b.tag || '').toLowerCase().includes(q) ||
            (b.author || '').toLowerCase().includes(q)
        )
    }, [blogs, search])

    console.log(blogs)

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <AdminHeader title="Blogs" count={filtered.length} onAdd={openAdd} addLabel="Add Blog" addIcon={<Plus size={20} />} />
            <SearchInput value={search} onChange={setSearch} placeholder="Search by title, tag or author" />

            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 w-16">#</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Thumb</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Title</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Tag</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Author</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Published</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && <tr><td colSpan={7} className="py-8 text-center text-sm text-gray-500">Loading...</td></tr>}
                        {!loading && pageItems.length === 0 && <tr><td colSpan={7} className="py-8 text-center text-sm text-gray-500">No blogs found</td></tr>}
                        {pageItems.map((b, idx) => (
                            <tr key={b._id || idx} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-4 px-6 text-sm text-gray-500">{startIndex + idx + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="h-12 w-16 rounded overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)' }}>
                                        {b?.thumbnail ? <img src={b.thumbnail.url} alt={b.title} className="h-full w-full object-cover" /> :
                                            <div className="h-full w-full flex items-center justify-center"><BookOpen className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} /></div>}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{b.title}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{b.tag}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{b.author}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : '-'}</td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(b)} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(b._id)} className="p-2 rounded hover:bg-red-50 transition-colors text-red-600"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} itemsPerPage={ITEMS_PER_PAGE} startIndex={startIndex} totalItems={filtered.length} />

            <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Blog' : 'Add Blog'} maxWidth="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Title *</label>
                        <input required value={form.title} onChange={e => handleChange('title', e.target.value)} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Blog title" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input placeholder="Tag" value={form.tag} onChange={e => handleChange('tag', e.target.value)} className="px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} />
                        <input placeholder="Author" value={form.author} onChange={e => handleChange('author', e.target.value)} className="px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} />
                        <input type="date" value={form.publishedAt} onChange={e => handleChange('publishedAt', e.target.value)} className="px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} />
                    </div>

                    <div>
                        <input placeholder="YouTube URL" value={form.youtubeUrl} onChange={e => handleChange('youtubeUrl', e.target.value)} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Short Description</label>
                        <textarea value={form.description} onChange={e => handleChange('description', e.target.value)} rows={2} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }} placeholder="Short summary for listing" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Content (Markdown / plain text)</label>
                        <textarea value={form.content} onChange={e => handleChange('content', e.target.value)} rows={6} className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }} placeholder="Write or paste article content (Markdown or plain text)" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Thumbnail</label>
                        <div className="flex items-center gap-4">
                            <div className="h-24 w-32 rounded overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                {previewUrl ? <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" /> : <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />}
                            </div>
                            <input id="thumb" type="file" accept="image/*" onChange={onFile} className="hidden" />
                            <label htmlFor="thumb" className="animated-button cursor-pointer"><span className="label">Choose Image</span></label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                        <button type="button" onClick={closeModal} className="animated-button"><span className="label">Cancel</span></button>
                        <button type="submit" disabled={saving} className="animated-button"><span className="label">{saving ? (editing ? 'Updating...' : 'Saving...') : (editing ? 'Update' : 'Save')}</span></button>
                    </div>
                </form>
            </ModalWrapper>
        </div>
    )
}

export default BlogsManagement
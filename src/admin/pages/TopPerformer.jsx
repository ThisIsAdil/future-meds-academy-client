import React, { useEffect, useMemo, useState } from 'react'
import { Plus, Edit, Trash2, Upload, User } from 'lucide-react'
import AdminHeader from '../components/refactor/AdminHeader'
import SearchInput from '../components/refactor/SearchInput'
import ModalWrapper from '../components/refactor/ModalWrapper'
import Pagination from '../components/refactor/Pagination'
import { topPerformerService } from '../../services/topPerformer'

const ITEMS_PER_PAGE = 10
const emptyForm = {
    image: null, // File or string url
    name: '',
    location: '',
    rank: '',
    university: '',
    score: '',
    description: '',
}

const TopPerformer = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [saving, setSaving] = useState(false)

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => { fetchItems() }, [])

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    async function fetchItems() {
        setLoading(true)
        setError(null)
        try {
            const res = await topPerformerService.getAll()
            const data = res?.data?.data ?? res?.data ?? res
            setItems(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setError('Failed to load top performers')
        } finally {
            setLoading(false)
        }
    }

    const openAdd = () => {
        setForm(emptyForm)
        setEditing(null)
        setIsModalOpen(true)
        if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null) }
    }

    const openEdit = (it) => {
        setForm({
            // keep original image object when available, otherwise null/string as-is
            image: it.image ?? null,
            name: it.name || '',
            location: it.location || '',
            rank: it.rank ?? '',
            university: it.university || '',
            score: it.score ?? '',
            description: it.description || '',
        })
        setEditing(it)
        setIsModalOpen(true)
        if (previewUrl) { URL.revokeObjectURL(previewUrl) }
        setPreviewUrl(it.image?.url || it.image || null)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditing(null)
        setForm(emptyForm)
        if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null) }
    }

    const onFile = (e) => {
        const f = e.target.files?.[0]
        if (!f) return
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        const url = URL.createObjectURL(f)
        setPreviewUrl(url)
        setForm(prev => ({ ...prev, image: f }))
    }

    const saveItem = async (ev) => {
        ev.preventDefault()
        setSaving(true)
        try {
            let response

            // If image is a File -> send FormData (upload handled server-side)
            if (form.image instanceof File) {
                const fd = new FormData()
                Object.entries(form).forEach(([k, v]) => {
                    if (v === null || v === undefined) return
                    if (k === 'image') fd.append('image', v)
                    else fd.append(k, String(v))
                })
                if (editing) response = await topPerformerService.update(editing._id || editing.id, fd)
                else response = await topPerformerService.create(fd)
            } else {
                // Build JSON payload and ensure image matches expected schema (object with url/publicId)
                const payload = {
                    ...form,
                    // normalize numeric fields
                    rank: form.rank === '' ? undefined : Number(form.rank),
                    globalRank: form.globalRank === '' ? undefined : Number(form.globalRank),
                    score: form.score === '' ? undefined : Number(form.score),
                }

                // Normalize image: if it's a string (url) convert to { url: string }
                if (typeof form.image === 'string' && form.image.trim() !== '') {
                    payload.image = { url: form.image.trim() }
                } else if (form.image && typeof form.image === 'object') {
                    // already object (e.g. { url, publicId })
                    payload.image = form.image
                } else {
                    // no image
                    payload.image = null
                }

                if (editing) response = await topPerformerService.update(editing._id || editing.id, payload)
                else response = await topPerformerService.create(payload)
            }

            const saved = response?.data?.data ?? response?.data ?? response
            if (saved) {
                if (editing) setItems(prev => prev.map(p => ((p._id || p.id) === (saved._id || saved.id) ? saved : p)))
                else setItems(prev => [saved, ...prev])
            }
            closeModal()
        } catch (err) {
            console.error(err)
            setError('Failed to save')
            alert('Failed to save. Try again.')
        } finally {
            setSaving(false)
        }
    }

    const deleteItem = async (id) => {
        if (!window.confirm('Delete this top performer?')) return
        try {
            setItems(prev => prev.filter(p => (p._id || p.id) !== id))
            await topPerformerService.delete(id)
        } catch (err) {
            console.error(err)
            setError('Failed to delete')
            fetchItems()
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return items
        return items.filter(i => `${i.name || ''} ${i.university || ''} ${i.location || ''}`.toLowerCase().includes(q))
    }, [items, search])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <AdminHeader title="Top Performers" count={filtered.length} onAdd={openAdd} addLabel="Add Performer" addIcon={<Plus size={18} />} />

            <SearchInput value={search} onChange={setSearch} placeholder="Search by name, university or location" />

            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)' }}>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 w-16">#</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Photo</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Location</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Rank</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">University</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Score</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && <tr><td colSpan={9} className="py-8 text-center text-sm text-gray-500">Loading...</td></tr>}
                        {!loading && pageItems.length === 0 && <tr><td colSpan={9} className="py-8 text-center text-sm text-gray-500">No performers found</td></tr>}
                        {pageItems.map((p, idx) => {
                            const id = p._id || p.id || idx
                            return (
                                <tr key={id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="py-4 px-6 text-sm text-gray-500">{startIndex + idx + 1}</td>
                                    <td className="py-4 px-6">
                                        <div className="h-10 w-10 rounded-full overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                            {p.image ? <img src={p.image.url || p.image} alt={p.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center"><User className="h-5 w-5" style={{ color: 'var(--accent-dark)' }} /></div>}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">{p.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{p.location}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{p.rank ?? '-'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{p.university}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{p.score ?? '-'}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button onClick={() => openEdit(p)} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}><Edit size={16} /></button>
                                            <button onClick={() => deleteItem(p._id || p.id)} className="p-2 rounded hover:bg-red-50 transition-colors text-red-600"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} itemsPerPage={ITEMS_PER_PAGE} startIndex={startIndex} totalItems={filtered.length} />

            <ModalWrapper isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Performer' : 'Add Performer'} maxWidth="max-w-2xl">
                <form onSubmit={saveItem} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Photo</label>
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                {previewUrl ? <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" /> : (form.image && typeof form.image === 'string') ? <img src={form.image} alt="Preview" className="h-full w-full object-cover" /> : <Upload className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} />}
                            </div>
                            <input id="photo" name="image" type="file" accept="image/*" onChange={onFile} className="hidden" />
                            <label htmlFor="photo" className="animated-button cursor-pointer"><span className="label">Choose Photo</span></label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input required name="name" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="p-2 border rounded" />
                        <input name="location" placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="p-2 border rounded" />
                        <input name="rank" type="number" placeholder="Rank" value={form.rank} onChange={e => setForm(f => ({ ...f, rank: e.target.value }))} className="p-2 border rounded" />
                        <input name="university" placeholder="University" value={form.university} onChange={e => setForm(f => ({ ...f, university: e.target.value }))} className="p-2 border rounded md:col-span-2" />
                        <input name="score" type="number" step="0.1" placeholder="Score" value={form.score} onChange={e => setForm(f => ({ ...f, score: e.target.value }))} className="p-2 border rounded" />
                    </div>

                    <div>
                        <textarea name="description" placeholder="Short description" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full p-2 border rounded" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={closeModal} className="px-3 py-2 border rounded">Cancel</button>
                        <button type="submit" disabled={saving} className="animated-button px-3 py-2 disabled:opacity-50"><span className="label">{saving ? 'Saving...' : (editing ? 'Update' : 'Create')}</span></button>
                    </div>
                </form>
            </ModalWrapper>

            {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
    )
}

export default TopPerformer
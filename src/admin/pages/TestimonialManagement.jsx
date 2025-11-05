// ...existing code...
import React, { useEffect, useMemo, useState } from 'react'
import AdminHeader from '../components/refactor/AdminHeader'
import SearchInput from '../components/refactor/SearchInput'
import Pagination from '../components/refactor/Pagination'
import { testimonialService } from '../../services/testimonial'

function formatLocal(dateStr) {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleString()
}

// helper: convert yyyy-mm-dd (input type=date) to "29 oct 2025"
function formatDateForBackend(isoDate) {
    if (!isoDate) return ''
    const d = new Date(isoDate)
    if (isNaN(d)) return String(isoDate)
    const day = d.getDate()
    const month = d.toLocaleString('en-GB', { month: 'short' }).toLowerCase()
    const year = d.getFullYear()
    return `${day} ${month} ${year}`
}

// helper: convert any parsable date string to yyyy-mm-dd for date input value
function toInputDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d)) return ''
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

export default function TestimonialManagement() {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const ITEMS_PER_PAGE = 10
    const [actionLoadingId, setActionLoadingId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const [form, setForm] = useState({
        name: '',
        date: '', // stored as ISO input value (yyyy-mm-dd)
        testimonial: '',
        score: 0,
        stars: 0,
    })

    useEffect(() => {
        fetchAll()
    }, [])

    async function fetchAll() {
        setLoading(true)
        setError(null)
        try {
            const res = await testimonialService.getAll()
            const data = res?.data?.data ?? res?.data ?? res
            setTestimonials(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setError('Failed to load testimonials')
        } finally {
            setLoading(false)
        }
    }

    function resetForm() {
        setForm({ name: '', date: '', testimonial: '', score: 0, stars: 0 })
        setEditingId(null)
        setShowForm(false)
    }

    function handleEdit(t) {
        setForm({
            name: t.name ?? '',
            date: toInputDate(t.date ?? ''), // convert stored date to yyyy-mm-dd for the input
            testimonial: t.testimonial ?? '',
            score: t.score ?? 0,
            stars: t.stars ?? 0,
        })
        setEditingId(t.id ?? t._id ?? null)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function handleDelete(id) {
        if (!window.confirm('Delete this testimonial?')) return
        setActionLoadingId(id)
        try {
            await testimonialService.delete(id)
            setTestimonials((prev) => prev.filter((p) => (p.id ?? p._id) !== id))
        } catch (err) {
            console.error(err)
            alert('Failed to delete. Try again.')
        } finally {
            setActionLoadingId(null)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.name?.trim() || !form.date?.trim() || !form.testimonial?.trim()) {
            alert('Please fill required fields: name, date, testimonial')
            return
        }
        const payload = {
            name: form.name,
            // send date to backend as "29 oct 2025" (string)
            date: formatDateForBackend(form.date),
            testimonial: form.testimonial,
            score: Number(form.score) || 0,
            stars: Number(form.stars) || 0,
        }
        setActionLoadingId(editingId || 'create')
        try {
            if (editingId) {
                const res = await testimonialService.update(editingId, payload)
                const updated = res?.data?.data ?? res
                setTestimonials((prev) => prev.map((p) => ((p.id ?? p._id) === editingId ? { ...p, ...updated } : p)))
            } else {
                const res = await testimonialService.create(payload)
                const created = res?.data?.data ?? res
                setTestimonials((prev) => [created, ...prev])
            }
            resetForm()
        } catch (err) {
            console.error(err)
            alert('Failed to save testimonial. Try again.')
        } finally {
            setActionLoadingId(null)
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        return testimonials.filter((t) => {
            if (!q) return true
            const hay = `${t.name ?? ''} ${t.testimonial ?? ''} ${t.date ?? ''}`.toLowerCase()
            return hay.includes(q)
        })
    }, [testimonials, search])

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE))
    useEffect(() => {
        if (page > totalPages) setPage(1)
    }, [totalPages, page])

    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <AdminHeader title="Testimonials" count={filtered.length} />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <SearchInput value={search} onChange={setSearch} placeholder="Search name, testimonial or date" />
                <div className="flex items-center gap-3">
                    <button onClick={() => { setShowForm((s) => !s); if (showForm) resetForm() }} className="animated-button px-3 py-2">
                        <span className="label">{showForm ? 'Close Form' : 'Add Testimonial'}</span>
                    </button>

                    <button onClick={fetchAll} className="animated-button px-3 py-2">
                        <span className="label">Refresh</span>
                    </button>
                </div>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 border shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input className="p-2 border rounded" placeholder="Name *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                        {/* date input type */}
                        <input className="p-2 border rounded" type="date" placeholder="Date *" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                        <input className="p-2 border rounded" placeholder="Score (number)" type="number" value={form.score} onChange={(e) => setForm((f) => ({ ...f, score: e.target.value }))} />
                        <input className="p-2 border rounded md:col-span-2" placeholder="Testimonial *" value={form.testimonial} onChange={(e) => setForm((f) => ({ ...f, testimonial: e.target.value }))} />
                        <input className="p-2 border rounded" placeholder="Stars (0-5)" type="number" value={form.stars} onChange={(e) => setForm((f) => ({ ...f, stars: e.target.value }))} />
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                        <button type="submit" disabled={actionLoadingId} className="animated-button px-3 py-2 disabled:opacity-50">
                            <span className="label">{actionLoadingId ? 'Saving...' : editingId ? 'Update' : 'Create'}</span>
                        </button>
                        <button type="button" onClick={resetForm} className="px-3 py-2 border rounded">Cancel</button>
                    </div>
                </form>
            )}

            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                {loading ? (
                    <div className="p-6 text-center text-sm text-gray-500">Loading...</div>
                ) : pageItems.length === 0 ? (
                    <div className="p-6 text-center text-sm text-gray-500">No testimonials found</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)' }}>
                                <th className="py-3 px-4 text-left text-sm font-medium">#</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Date</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Score</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Stars</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Testimonial</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pageItems.map((t, idx) => {
                                const id = t.id ?? t._id ?? idx
                                return (
                                    <tr key={id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-500">{startIndex + idx + 1}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900 font-medium">{t.name || '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{formatLocal(t.date)}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{t.score ?? '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{t.stars ?? '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{t.testimonial || '-'}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEdit(t)} className="animated-button text-xs">
                                                    <span className="label">Edit</span>
                                                </button>
                                                <button onClick={() => handleDelete(id)} disabled={actionLoadingId === id} className="animated-button text-xs disabled:opacity-50">
                                                    <span className="label">{actionLoadingId === id ? '...' : 'Delete'}</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} itemsPerPage={ITEMS_PER_PAGE} startIndex={startIndex} totalItems={filtered.length} />

            {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
    )
}

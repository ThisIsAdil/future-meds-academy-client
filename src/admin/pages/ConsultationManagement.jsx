import React, { useEffect, useMemo, useState } from 'react'
import AdminHeader from '../components/refactor/AdminHeader'
import SearchInput from '../components/refactor/SearchInput'
import Pagination from '../components/refactor/Pagination'
import { consultationService } from '../../services/consultation'

const TOPICS = ['', 'IMAT Prep', 'Study Abroad', 'Visa Guidance', 'IELTS / English', 'Other']

function formatLocal(dateStr) {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleString()
}

function toCsv(rows = []) {
    if (!rows.length) return ''
    const keys = Object.keys(rows[0])
    const escape = (v) => `"${String(v ?? '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    return [keys.join(','), ...rows.map((r) => keys.map((k) => escape(r[k])).join(','))].join('\n')
}

export default function ConsultationManagement() {
    const [consultations, setConsultations] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [search, setSearch] = useState('')
    const [topic, setTopic] = useState('')
    const [status, setStatus] = useState('all')
    const [page, setPage] = useState(1)
    const ITEMS_PER_PAGE = 10
    const [actionLoadingId, setActionLoadingId] = useState(null)

    useEffect(() => {
        fetchAll()
    }, [])

    async function fetchAll() {
        setLoading(true)
        setError(null)
        try {
            const res = await consultationService.getAll()
            const data = res?.data?.data ?? res?.data ?? res
            setConsultations(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setError('Failed to load consultations')
        } finally {
            setLoading(false)
        }
    }

    async function handleMarkCompleted(id) {
        if (!window.confirm('Mark this consultation as completed?')) return
        setActionLoadingId(id)
        try {
            await consultationService.markCompleted(id)
            setConsultations((prev) =>
                prev.map((c) => ((c.id === id || c._id === id) ? { ...c, completed: true, isCompleted: true } : c))
            )
        } catch (err) {
            console.error(err)
            alert('Failed to mark completed. Try again.')
        } finally {
            setActionLoadingId(null)
        }
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        return consultations.filter((c) => {
            if (topic && (c.consultationAbout ?? '') !== topic) return false
            const completed = !!(c.completed ?? c.isCompleted)
            if (status === 'completed' && !completed) return false
            if (status === 'pending' && completed) return false
            if (q) {
                const hay = `${c.fullName ?? ''} ${c.phone ?? ''} ${c.email ?? ''} ${c.consultationAbout ?? ''}`.toLowerCase()
                if (!hay.includes(q)) return false
            }
            return true
        })
    }, [consultations, search, topic, status])

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE))
    useEffect(() => {
        if (page > totalPages) setPage(1)
    }, [totalPages, page])

    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    function exportCsv() {
        const rows = filtered.map((r) => ({
            id: r.id ?? r._id ?? '',
            name: r.fullName ?? '',
            phone: r.phone ?? '',
            email: r.email ?? '',
            preferredDate: r.preferredDate ?? '',
            about: r.consultationAbout ?? '',
            status: !!(r.completed ?? r.isCompleted) ? 'Completed' : 'Incomplete',
        }))
        const csv = toCsv(rows)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `consultations_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '_')}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <AdminHeader title="Consultations" count={filtered.length} />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <SearchInput value={search} onChange={setSearch} placeholder="Search name, phone, email or topic" />
                <div className="flex items-center gap-3">
                    <select value={topic} onChange={(e) => { setTopic(e.target.value); setPage(1) }} className="p-2 border rounded" aria-label="Filter by topic">
                        {TOPICS.map((t) => <option key={t} value={t}>{t || 'Any'}</option>)}
                    </select>
                    <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="p-2 border rounded" aria-label="Filter by status">
                        <option value="all">All</option>
                        <option value="pending">Incomplete</option>
                        <option value="completed">Completed</option>
                    </select>

                    <button onClick={exportCsv} className="animated-button px-3 py-2">
                        <span className="label">Export CSV</span>
                    </button>

                    <button onClick={fetchAll} className="animated-button px-3 py-2">
                        <span className="label">Refresh</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                {loading ? (
                    <div className="p-6 text-center text-sm text-gray-500">Loading...</div>
                ) : pageItems.length === 0 ? (
                    <div className="p-6 text-center text-sm text-gray-500">No consultations found</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)' }}>
                                <th className="py-3 px-4 text-left text-sm font-medium">#</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Phone</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Preferred</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">About</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                                <th className="py-3 px-4 text-left text-sm font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pageItems.map((c, idx) => {
                                const id = c.id ?? c._id ?? idx
                                const completed = !!(c.completed ?? c.isCompleted)
                                return (
                                    <tr key={id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-500">{startIndex + idx + 1}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900 font-medium">{c.fullName || '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{c.phone || '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{c.email || '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{formatLocal(c.preferredDate)}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{c.consultationAbout || '-'}</td>
                                        <td className="py-3 px-4 text-sm">
                                            <span className={completed ? 'text-green-600' : 'text-yellow-600'}>
                                                {completed ? 'Completed' : 'Incomplete'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleMarkCompleted(id)}
                                                disabled={completed || actionLoadingId === id}
                                                className="animated-button text-xs disabled:opacity-50"
                                                aria-disabled={completed || actionLoadingId === id}
                                            >
                                                <span className="label">{actionLoadingId === id ? '...' : completed ? 'Done' : 'Mark Completed'}</span>
                                            </button>
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
import React, { useEffect, useMemo, useState } from 'react'
import AdminHeader from '../components/refactor/AdminHeader'
import ModalWrapper from '../components/refactor/ModalWrapper'
import SearchInput from '../components/refactor/SearchInput'
import Pagination from '../components/refactor/Pagination'
import { universityService } from '../../services/university'

const ITEMS_PER_PAGE = 10

export default function UniversityYearlyData() {
    const [universities, setUniversities] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const [selectedId, setSelectedId] = useState(null) // university _id
    const selected = useMemo(() => universities.find(u => (u._id || u.id) === selectedId) || null, [universities, selectedId])

    // modal for add/edit yearly entry
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingEntryIndex, setEditingEntryIndex] = useState(null) // index in yearlyData
    const [yearForm, setYearForm] = useState({
        year: '',
        euSeats: '',
        euSeatsLeft: '',
        euCutOffRounds: '', // comma-separated
        euFinalCutOff: '',
        nonEuSeats: '',
        nonEuFinalCutOff: '',
        nonEuRankingPdfUrl: '',
    })

    useEffect(() => { fetchUniversities() }, [])

    async function fetchUniversities() {
        setLoading(true)
        setError(null)
        try {
            const res = await universityService.getAll()
            const data = res?.data?.data ?? res?.data ?? res
            setUniversities(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setError('Failed to load universities')
        } finally {
            setLoading(false)
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

    function openAdd() {
        setEditingEntryIndex(null)
        setYearForm({
            year: '',
            euSeats: '',
            euSeatsLeft: '',
            euCutOffRounds: '',
            euFinalCutOff: '',
            nonEuSeats: '',
            nonEuFinalCutOff: '',
            nonEuRankingPdfUrl: '',
        })
        setIsModalOpen(true)
    }

    function openEdit(idx) {
        const e = selected?.yearlyData?.[idx]
        if (!e) return
        setEditingEntryIndex(idx)
        setYearForm({
            year: e.year ?? '',
            euSeats: e.eu?.seats ?? '',
            euSeatsLeft: e.eu?.seatsLeft ?? '',
            euCutOffRounds: Array.isArray(e.eu?.cutOffRounds) ? e.eu.cutOffRounds.join(',') : '',
            euFinalCutOff: e.eu?.finalCutOff ?? '',
            nonEuSeats: e.nonEu?.seats ?? '',
            nonEuFinalCutOff: e.nonEu?.finalCutOff ?? '',
            nonEuRankingPdfUrl: e.nonEu?.rankingPdfUrl ?? '',
        })
        setIsModalOpen(true)
    }

    async function saveYear(e) {
        e.preventDefault()
        if (!selected) {
            alert('Select a university first')
            return
        }

        // basic validation
        if (!yearForm.year) {
            alert('Year is required')
            return
        }

        // build entry
        const entry = {
            year: Number(yearForm.year),
            eu: {
                seats: Number(yearForm.euSeats) || 0,
                seatsLeft: Number(yearForm.euSeatsLeft) || 0,
                cutOffRounds: yearForm.euCutOffRounds
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean)
                    .map(Number),
                finalCutOff: Number(yearForm.euFinalCutOff) || 0,
            },
            nonEu: {
                seats: Number(yearForm.nonEuSeats) || 0,
                finalCutOff: Number(yearForm.nonEuFinalCutOff) || 0,
                rankingPdfUrl: yearForm.nonEuRankingPdfUrl || '',
            }
        }

        // update local copy
        const current = selected.yearlyData ? [...selected.yearlyData] : []
        if (editingEntryIndex === null) {
            // add or replace same year if exists
            const existsIndex = current.findIndex(x => x.year === entry.year)
            if (existsIndex !== -1) current[existsIndex] = entry
            else current.unshift(entry)
        } else {
            current[editingEntryIndex] = entry
        }

        // persist to backend
        try {
            setLoading(true)
            await universityService.update(selected._id || selected.id, { yearlyData: current })
            setUniversities(prev => prev.map(u => ((u._id || u.id) === (selected._id || selected.id) ? { ...u, yearlyData: current } : u)))
            setIsModalOpen(false)
        } catch (err) {
            console.error(err)
            alert('Failed to save yearly data')
        } finally {
            setLoading(false)
        }
    }

    async function deleteEntry(idx) {
        if (!selected) return
        if (!window.confirm('Delete this year entry?')) return
        const current = selected.yearlyData ? [...selected.yearlyData] : []
        current.splice(idx, 1)
        try {
            setLoading(true)
            await universityService.update(selected._id || selected.id, { yearlyData: current })
            setUniversities(prev => prev.map(u => ((u._id || u.id) === (selected._id || selected.id) ? { ...u, yearlyData: current } : u)))
        } catch (err) {
            console.error(err)
            alert('Failed to delete entry')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            <AdminHeader title="University Yearly Data" count={universities.length} />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <SearchInput value={search} onChange={setSearch} placeholder="Search university name or location" />
                <div className="flex items-center gap-3">
                    <button onClick={fetchUniversities} className="animated-button px-3 py-2">
                        <span className="label">Refresh</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)' }}>
                            <th className="py-3 px-4 text-left text-sm font-medium">#</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Location</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Years</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && pageItems.length === 0 && (
                            <tr><td colSpan={5} className="py-6 text-center text-sm text-gray-500">Loading...</td></tr>
                        )}
                        {!loading && pageItems.length === 0 && (
                            <tr><td colSpan={5} className="py-6 text-center text-sm text-gray-500">No universities found</td></tr>
                        )}
                        {pageItems.map((u, idx) => {
                            const id = u._id || u.id || idx
                            const yearsCount = Array.isArray(u.yearlyData) ? u.yearlyData.length : 0
                            const isSelected = (u._id || u.id) === selectedId
                            return (
                                <tr key={id} className={`hover:bg-gray-50 transition-colors duration-150 ${isSelected ? 'bg-(--accent-light)' : ''}`}>
                                    <td className="py-3 px-4 text-sm text-gray-500">{startIndex + idx + 1}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">{u.name}</td>
                                    <td className="py-3 px-4 text-sm text-gray-500">{u.location}</td>
                                    <td className="py-3 px-4 text-sm text-gray-500">{yearsCount}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setSelectedId(u._id || u.id)} className="animated-button text-xs"><span className="label">{isSelected ? 'Selected' : 'Select'}</span></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} itemsPerPage={ITEMS_PER_PAGE} startIndex={startIndex} totalItems={filtered.length} />

            {/* Selected university yearly data */}
            <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="text-sm text-gray-500">Managing yearly data for</div>
                        <div className="text-lg font-medium text-gray-900">{selected ? selected.name : '— Select a university from the list above —'}</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={openAdd} disabled={!selected} className="animated-button px-3 py-2 disabled:opacity-50">
                            <span className="label">Add Year</span>
                        </button>
                    </div>
                </div>

                {!selected ? (
                    <div className="p-6 text-center text-sm text-gray-500">Select a university to view and manage yearly data.</div>
                ) : (
                    <div className="overflow-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)' }}>
                                    <th className="py-3 px-4 text-left text-sm font-medium">Year</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium">EU seats (left)</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium">EU cutoffs</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium">EU final</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium">Non-EU seats</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium">Non-EU final</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {(selected.yearlyData || []).length === 0 && (
                                    <tr><td colSpan={7} className="py-6 text-center text-sm text-gray-500">No yearly data yet</td></tr>
                                )}
                                {(selected.yearlyData || []).map((y, i) => (
                                    <tr key={y.year || i} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-900 font-medium">{y.year}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{(y.eu?.seats ?? '-')}{' '}({y.eu?.seatsLeft ?? '-'})</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{Array.isArray(y.eu?.cutOffRounds) ? y.eu.cutOffRounds.join(', ') : '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{y.eu?.finalCutOff ?? '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{y.nonEu?.seats ?? '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{y.nonEu?.finalCutOff ?? '-'}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => openEdit(i)} className="animated-button text-xs"><span className="label">Edit</span></button>
                                                <button onClick={() => deleteEntry(i)} className="animated-button text-xs"><span className="label">Delete</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEntryIndex === null ? 'Add Yearly Data' : 'Edit Yearly Data'}>
                <form onSubmit={saveYear} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input required type="number" placeholder="Year (e.g. 2025)" className="p-2 border rounded" value={yearForm.year} onChange={(e) => setYearForm(f => ({ ...f, year: e.target.value }))} />
                        <input type="number" placeholder="EU seats" className="p-2 border rounded" value={yearForm.euSeats} onChange={(e) => setYearForm(f => ({ ...f, euSeats: e.target.value }))} />
                        <input type="number" placeholder="EU seats left" className="p-2 border rounded" value={yearForm.euSeatsLeft} onChange={(e) => setYearForm(f => ({ ...f, euSeatsLeft: e.target.value }))} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input placeholder="EU cutOff rounds (comma separated)" className="p-2 border rounded" value={yearForm.euCutOffRounds} onChange={(e) => setYearForm(f => ({ ...f, euCutOffRounds: e.target.value }))} />
                        <input type="number" placeholder="EU final cutOff" className="p-2 border rounded" value={yearForm.euFinalCutOff} onChange={(e) => setYearForm(f => ({ ...f, euFinalCutOff: e.target.value }))} />
                        <input type="number" placeholder="Non-EU seats" className="p-2 border rounded" value={yearForm.nonEuSeats} onChange={(e) => setYearForm(f => ({ ...f, nonEuSeats: e.target.value }))} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input type="number" placeholder="Non-EU final cutOff" className="p-2 border rounded" value={yearForm.nonEuFinalCutOff} onChange={(e) => setYearForm(f => ({ ...f, nonEuFinalCutOff: e.target.value }))} />
                        <input type="url" placeholder="Non-EU ranking PDF URL" className="p-2 border rounded" value={yearForm.nonEuRankingPdfUrl} onChange={(e) => setYearForm(f => ({ ...f, nonEuRankingPdfUrl: e.target.value }))} />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-2 border rounded">Cancel</button>
                        <button type="submit" className="animated-button px-3 py-2"><span className="label">Save</span></button>
                    </div>
                </form>
            </ModalWrapper>

            {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
    )
}

import React, { useEffect, useMemo, useState } from "react";
import { universityService } from "../services/university";

const EuCutOff = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [universities, setUniversities] = useState([]);

    const fetchUniversities = async () => {
        try {
            const response = await universityService.getAll();
            const data = response?.data?.data ?? response?.data ?? response ?? []
            setUniversities(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error("Error fetching universities:", error);
            setUniversities([])
        }
    }

    useEffect(() => {
        fetchUniversities();
    }, []);

    // derive list of available years from universities.yearlyData
    const availableYears = useMemo(() => {
        const years = new Set();
        universities.forEach(u => {
            (u.yearlyData || []).forEach(y => {
                if (typeof y?.year === 'number') years.add(y.year);
            });
        });
        return Array.from(years).sort((a, b) => b - a);
    }, [universities]);

    // build data grouped by year for rendering
    const groupedByYear = useMemo(() => {
        const q = (searchTerm || '').trim().toLowerCase();
        const yearsToRender = selectedYear ? [Number(selectedYear)] : availableYears;
        return yearsToRender.map(year => {
            const rows = universities
                .map(u => {
                    const yd = (u.yearlyData || []).find(d => Number(d.year) === Number(year));
                    if (!yd) return null;
                    // prepare eu/nonEu objects with safe defaults
                    const eu = {
                        seats: yd.eu?.seats ?? null,
                        seatsLeft: yd.eu?.seatsLeft ?? null,
                        cutOffRounds: Array.isArray(yd.eu?.cutOffRounds) ? yd.eu.cutOffRounds : (yd.eu?.cutOffRounds === undefined ? [] : []),
                        finalCutOff: yd.eu?.finalCutOff ?? null
                    };
                    const nonEu = {
                        seats: yd.nonEu?.seats ?? null,
                        finalCutOff: yd.nonEu?.finalCutOff ?? null,
                        rankingPdfUrl: yd.nonEu?.rankingPdfUrl ?? null
                    };
                    return {
                        university: u,
                        eu,
                        nonEu
                    };
                })
                .filter(Boolean)
                .filter(r => {
                    if (!q) return true;
                    return (r.university?.name ?? '').toLowerCase().includes(q);
                });

            // compute max rounds for this year
            const maxRounds = rows.reduce((max, r) => Math.max(max, (r.eu.cutOffRounds || []).length), 0);

            return { year, rows, maxRounds };
        }).filter(g => g.rows.length > 0);
    }, [universities, availableYears, searchTerm, selectedYear]);

    const formatValue = (v) => (v === null || v === undefined || v === '') ? '-' : v;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--accent-dark)' }}>IMAT — EU Cutoffs</h2>

            <div className="flex gap-3 mb-4 flex-wrap">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search university..."
                    className="p-2 border border-[var(--accent-dark)] rounded-md flex-1"
                />
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 border border-[var(--accent-dark)] rounded-md"
                >
                    <option value="">All years</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>

            <div className="space-y-6">
                {groupedByYear.length === 0 && (
                    <div className="p-6 text-center text-sm text-gray-500">No cutoffs found</div>
                )}

                {groupedByYear.map(group => (
                    <section key={group.year} className="bg-[var(--accent-light)] p-4 rounded-md">
                        <h3 className="text-xl font-medium mb-3">{group.year} — EU Cutoffs</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-white">
                                        <th className="border p-2 text-left">University</th>
                                        <th className="border p-2 text-center">EU Seats</th>
                                        <th className="border p-2 text-center">EU Final Cutoff</th>
                                        <th className="border p-2 text-center">EU Seats Left</th>

                                        {Array.from({ length: group.maxRounds }).map((_, i) => (
                                            <th key={i} className="border p-2 text-center">Round {i + 1}</th>
                                        ))}

                                        <th className="border p-2 text-center">Non-EU Seats</th>
                                        <th className="border p-2 text-center">Non-EU Final Cutoff</th>
                                        <th className="border p-2 text-center">Ranking PDF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.rows.map((r, idx) => {
                                        const u = r.university;
                                        const eu = r.eu;
                                        const nonEu = r.nonEu;
                                        const rowKey = `${u.name}-${group.year}-${idx}`;
                                        return (
                                            <tr key={rowKey} className="odd:bg-white even:bg-[var(--primary)]">
                                                <td className="border p-2">{u.name}</td>
                                                <td className="border p-2 text-center">{formatValue(eu.seats)}</td>
                                                <td className="border p-2 text-center">{formatValue(eu.finalCutOff)}</td>
                                                <td className="border p-2 text-center">{formatValue(eu.seatsLeft)}</td>

                                                {Array.from({ length: group.maxRounds }).map((_, i) => (
                                                    <td key={i} className="border p-2 text-center">
                                                        {eu.cutOffRounds && eu.cutOffRounds[i] !== undefined ? formatValue(eu.cutOffRounds[i]) : '-'}
                                                    </td>
                                                ))}

                                                <td className="border p-2 text-center">{formatValue(nonEu.seats)}</td>
                                                <td className="border p-2 text-center">{formatValue(nonEu.finalCutOff)}</td>
                                                <td className="border p-2 text-center">
                                                    {nonEu.rankingPdfUrl ? (
                                                        <a href={nonEu.rankingPdfUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                                            View PDF
                                                        </a>
                                                    ) : '-'}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default EuCutOff;
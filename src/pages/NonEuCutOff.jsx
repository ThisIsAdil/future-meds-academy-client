import React, { useEffect, useMemo, useState } from "react";
import { universityService } from "../services/university";

const NonEuCutOff = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        fetchUniversities();
    }, []);

    async function fetchUniversities() {
        try {
            const res = await universityService.getAll();
            const data = res?.data?.data ?? res?.data ?? res ?? [];
            setUniversities(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch universities", err);
            setUniversities([]);
        }
    }

    const availableYears = useMemo(() => {
        const s = new Set();
        universities.forEach(u => {
            (u.yearlyData || []).forEach(y => {
                if (typeof y?.year === "number") s.add(y.year);
            });
        });
        return Array.from(s).sort((a, b) => b - a);
    }, [universities]);

    const groupedByYear = useMemo(() => {
        const q = (searchTerm || "").trim().toLowerCase();
        const yearsToRender = selectedYear ? [Number(selectedYear)] : availableYears;
        return yearsToRender
            .map((year) => {
                const rows = universities
                    .map((u) => {
                        const yd = (u.yearlyData || []).find(d => Number(d.year) === Number(year));
                        if (!yd) return null;
                        const nonEu = {
                            seats: yd.nonEu?.seats ?? null,
                            finalCutOff: yd.nonEu?.finalCutOff ?? null,
                            rankingPdfUrl: yd.nonEu?.rankingPdfUrl ?? null
                        };
                        return { university: u, nonEu };
                    })
                    .filter(Boolean)
                    .filter(r => {
                        if (!q) return true;
                        return (r.university?.name ?? "").toLowerCase().includes(q);
                    });

                return { year, rows };
            })
            .filter(g => g.rows.length > 0);
    }, [universities, availableYears, searchTerm, selectedYear]);

    const formatValue = (v) => (v === null || v === undefined || v === '' ? '-' : v);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--accent-dark)' }}>IMAT — Non‑EU Cutoffs</h2>

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
                    <div className="p-6 text-center text-sm text-gray-500">No Non‑EU cutoffs found</div>
                )}

                {groupedByYear.map(group => (
                    <section key={group.year} className="bg-[var(--accent-light)] p-4 rounded-md">
                        <h3 className="text-xl font-medium mb-3">{group.year} — Non‑EU Cutoffs</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-white">
                                        <th className="border p-2 text-left">University</th>
                                        <th className="border p-2 text-center">Seats (Non‑EU)</th>
                                        <th className="border p-2 text-center">Final Cutoff (Non‑EU)</th>
                                        <th className="border p-2 text-center">Ranking PDF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.rows.map((r, idx) => {
                                        const u = r.university;
                                        const nonEu = r.nonEu;
                                        const key = `${u._id ?? u.id ?? u.name}-${group.year}-${idx}`;
                                        return (
                                            <tr key={key} className="odd:bg-white even:bg-[var(--primary)]">
                                                <td className="border p-2">
                                                    {u.name}
                                                </td>
                                                <td className="border p-2 text-center">{formatValue(nonEu.seats)}</td>
                                                <td className="border p-2 text-center">{formatValue(nonEu.finalCutOff)}</td>
                                                <td className="border p-2 text-center">
                                                    {nonEu.rankingPdfUrl ? (
                                                        <a href={nonEu.rankingPdfUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View PDF</a>
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

export default NonEuCutOff;

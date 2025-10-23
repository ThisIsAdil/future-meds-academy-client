// ...existing code...
import React, { useMemo, useState } from "react";
import IMAT_CUTOFFS from "../content/IMAT_CUTOFFS";

const NonEuCutOff = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const years = useMemo(() => IMAT_CUTOFFS.map((y) => y.year).sort((a, b) => b - a), []);

    const filtered = IMAT_CUTOFFS.filter((y) =>
        selectedYear ? y.year.toString() === selectedYear : true
    );

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-(--accent-dark)">IMAT — Non‑EU Cutoffs</h2>

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
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-6">
                {filtered.map((yearData) => {
                    const visibleUniversities = yearData.universities.filter((u) =>
                        u.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    if (visibleUniversities.length === 0) return null;

                    return (
                        <section key={yearData.year} className="bg-(--accent-light) p-4 rounded-md">
                            <h3 className="text-xl font-medium mb-3">{yearData.year} — Non‑EU Cutoffs</h3>

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
                                        {visibleUniversities.map((u) => (
                                            <tr key={u.code} className="odd:bg-white even:bg-(--primary)">
                                                <td className="border p-2">{u.name}</td>
                                                <td className="border p-2 text-center">{u.nonEu.seats}</td>
                                                <td className="border p-2 text-center">{u.nonEu.finalCutoff}</td>
                                                <td className="border p-2 text-center">
                                                    {u.nonEu && u.nonEu.pdf ? (
                                                        <a
                                                            href={u.nonEu.pdf}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[var(--accent-dark)] animated-link"
                                                        >
                                                            Ranking PDF
                                                        </a>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default NonEuCutOff;
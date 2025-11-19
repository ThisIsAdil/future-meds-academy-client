import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Loader } from "../components"
import { universityService } from "../services/university"
import { ExternalLink } from "lucide-react"
import ReactMarkdown from "react-markdown";

const University = () => {
    const { id } = useParams()
    const [university, setUniversity] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                const res = await universityService.getById(id)
                setUniversity(res?.data?.data || null)
            } catch (err) {
                console.error("Failed to load university:", err)
                setUniversity(null)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchUniversity()
    }, [id])

    if (loading) return <Loader />
    if (!university)
        return <div className="text-center py-20 text-gray-500">University not found.</div>

    return (
        <div className="max-w-4xl mx-auto my-16 px-4">
            <div className="flex items-center flex-wrap gap-4 mb-6">
                {university.logo?.url ? (
                    <img
                        src={university.logo.url}
                        alt={`${university.name} logo`}
                        className="w-20 h-20 object-contain rounded-md"
                    />
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md border text-sm text-gray-500">
                        No Logo
                    </div>
                )}

                <div>
                    <h1 className="text-2xl font-bold">{university.name}</h1>
                    <p className="text-sm text-gray-600 mt-1">{university.location}</p>
                </div>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap p-4">
                {university.programLength && (
                    <span className="text-sm text-gray-700 px-2 py-1 rounded bg-(--accent-light)">{university.programLength}</span>
                )}
                {university.tuitionFees && (
                    <span className="text-sm text-gray-700 px-2 py-1 rounded bg-(--accent-light)">{university.tuitionFees}</span>
                )}
                {university.blogUrl && (
                    <a
                        href={university.blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="animated-link ml-auto"
                    >
                        <span className="label text-sm text-gray-700">University Blog</span>
                        <ExternalLink className="inline-block ml-1" size={14} />
                    </a>
                )}
            </div>

            {university.campusImage?.url && (
                <div className="mb-6">
                    <img
                        src={university.campusImage.url}
                        alt={`${university.name} campus`}
                        className="w-full rounded-lg object-cover"
                    />
                </div>
            )}

            {university.about && (
                <div className="px-4 pb-8">
                    <ReactMarkdown
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1 {...props} className="text-3xl font-bold mt-6 mb-4 text-gray-900" />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2 {...props} className="text-2xl font-semibold mt-5 mb-3 text-gray-900" />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3 {...props} className="text-xl font-semibold mt-4 mb-2 text-gray-900" />
                            ),
                            p: ({ node, ...props }) => (
                                <p {...props} className="text-base leading-relaxed text-gray-700 mb-4" />
                            ),
                            ul: ({ node, ...props }) => (
                                <ul {...props} className="list-disc list-inside text-gray-700 mb-4 ml-4" />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol {...props} className="list-decimal list-inside text-gray-700 mb-4 ml-4" />
                            ),
                            li: ({ node, ...props }) => (
                                <li {...props} className="mb-1" />
                            ),
                            a: ({ node, ...props }) => (
                                <a
                                    {...props}
                                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            ),
                            blockquote: ({ node, ...props }) => (
                                <blockquote
                                    {...props}
                                    className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
                                />
                            ),
                            code: ({ node, inline, ...props }) =>
                                inline ? (
                                    <code
                                        {...props}
                                        className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono"
                                    />
                                ) : (
                                    <pre
                                        {...props}
                                        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4"
                                    />
                                ),
                            img: ({ node, ...props }) => (
                                <img {...props} className="rounded-lg my-4 max-w-full mx-auto" alt="" />
                            ),
                            hr: ({ node, ...props }) => (
                                <hr {...props} className="my-6 border-gray-300" />
                            ),
                        }}
                    >
                        {university.about}
                    </ReactMarkdown>

                </div>
            )}

            {Array.isArray(university.yearlyData) && university.yearlyData.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Yearly Data</h2>
                    <div className="space-y-4">
                        {university.yearlyData
                            .slice()
                            .sort((a, b) => (b.year || 0) - (a.year || 0))
                            .map((yd, idx) => (
                                <div key={idx} className="border rounded-md p-4 bg-white">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="text-sm text-gray-600">Year: {yd.year || "—"}</div>
                                        <div className="text-sm text-gray-600">Updated: {university.updatedAt ? new Date(university.updatedAt).toLocaleDateString() : "—"}</div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-medium mb-1">EU</h3>
                                            <p className="text-sm text-gray-700 mb-1">Seats: {yd.eu?.seats ?? "—"}</p>
                                            {typeof yd.eu?.seatsLeft !== "undefined" && (
                                                <p className="text-sm text-gray-700 mb-1">Seats Left: {yd.eu.seatsLeft}</p>
                                            )}
                                            {Array.isArray(yd.eu?.cutOffRounds) && yd.eu.cutOffRounds.length > 0 && (
                                                <p className="text-sm text-gray-700 mb-1">Cut-off Rounds: {yd.eu.cutOffRounds.join(", ")}</p>
                                            )}
                                            {typeof yd.eu?.finalCutOff !== "undefined" && (
                                                <p className="text-sm text-gray-700">Final Cut-off: {yd.eu.finalCutOff}</p>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-1">Non-EU</h3>
                                            <p className="text-sm text-gray-700 mb-1">Seats: {yd.nonEu?.seats ?? "—"}</p>
                                            {typeof yd.nonEu?.finalCutOff !== "undefined" && (
                                                <p className="text-sm text-gray-700 mb-1">Final Cut-off: {yd.nonEu.finalCutOff}</p>
                                            )}
                                            {yd.nonEu?.rankingPdfUrl ? (
                                                <a
                                                    href={yd.nonEu.rankingPdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="animated-button inline-block mt-2"
                                                >
                                                    <span className="label">View Ranking PDF</span>
                                                </a>
                                            ) : (
                                                <p className="text-sm text-gray-500 mt-2">Ranking PDF: —</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            )}

            <div className="pt-6 text-end">
                <Link to="/universities" className="animated-button">
                    <span className="label">Back to Universities</span>
                </Link>
            </div>
        </div>
    )
}

export default University
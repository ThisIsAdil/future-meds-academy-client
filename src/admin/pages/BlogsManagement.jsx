import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, X, Upload, FileText, Calendar, User, Tag, Youtube, ExternalLink, Quote, List, Type, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'

const BlogsManagement = () => {
    const [blogs, setBlogs] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingBlog, setEditingBlog] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedSections, setExpandedSections] = useState({
        meta: true,
        content: true,
        related: false
    })

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        meta: {
            thumbnail: null,
            thumbnailUrl: '',
            youtubeEmbedId: '',
            tag: '',
            publishedAt: '',
            author: ''
        },
        content: {
            introduction: '',
            main: [],
            relatedLinks: [],
            tags: []
        }
    })

    const itemsPerPage = 10

    useEffect(() => {
        setBlogs([
            {
                id: '1',
                title: 'IMAT Preparation Tips 2025: Study Smarter, Not Harder',
                description: 'Learn how to build an effective IMAT study plan with proven strategies, past papers, and mock test practice.',
                meta: {
                    thumbnailUrl: '/api/placeholder/300/200',
                    youtubeEmbedId: 'geejWrV0UMo',
                    tag: 'Study Tips',
                    publishedAt: '2025-09-24',
                    author: 'Amir Akhtar'
                },
                content: {
                    introduction: 'Preparing for the IMAT exam can feel overwhelming, but with the right strategy, you can maximize your chances of success.',
                    main: [
                        {
                            type: 'section',
                            headline: 'Plan Your Study Schedule',
                            paragraph: 'A structured study plan helps you avoid last-minute stress and ensures comprehensive coverage of all topics.',
                            list: ['Start with a full diagnostic test', 'Divide syllabus into weekly modules', 'Keep buffer days for revision']
                        },
                        {
                            type: 'section',
                            headline: 'Use Mock Tests for Feedback',
                            paragraph: 'Mock tests help simulate the real exam experience and identify weak areas.',
                            quote: 'The best way to predict your future score is by analyzing your past mistakes.'
                        }
                    ],
                    relatedLinks: [
                        {
                            title: 'Official IMAT Past Papers',
                            url: 'https://universitaly.it/index.php/medicina-in-italia/imat',
                            description: 'Download past IMAT exam papers for practice'
                        }
                    ],
                    tags: ['IMAT', 'Study Tips', 'Exam Preparation']
                }
            },
            {
                id: '2',
                title: 'Top 10 Universities in Italy for IMAT',
                description: 'Comprehensive guide to the best medical universities in Italy accepting IMAT scores.',
                meta: {
                    thumbnailUrl: '/api/placeholder/300/200',
                    youtubeEmbedId: '',
                    tag: 'Universities',
                    publishedAt: '2025-08-10',
                    author: 'Talal Adil'
                },
                content: {
                    introduction: 'Italy offers world-class medical education through its prestigious universities.',
                    main: [
                        {
                            type: 'section',
                            headline: 'University Selection Criteria',
                            paragraph: 'Consider factors like location, curriculum, and research opportunities.',
                            list: ['Academic reputation', 'Research facilities', 'Student support services']
                        }
                    ],
                    relatedLinks: [],
                    tags: ['Universities', 'Italy', 'Medical School']
                }
            }
        ])
    }, [])

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.meta.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.meta.tag.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name.startsWith('meta.')) {
            const metaField = name.split('.')[1]
            setFormData(prev => ({
                ...prev,
                meta: { ...prev.meta, [metaField]: value }
            }))
        } else if (name.startsWith('content.')) {
            const contentField = name.split('.')[1]
            setFormData(prev => ({
                ...prev,
                content: { ...prev.content, [contentField]: value }
            }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({
                ...prev,
                meta: {
                    ...prev.meta,
                    thumbnail: file,
                    thumbnailUrl: URL.createObjectURL(file)
                }
            }))
        }
    }

    const addMainSection = () => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                main: [...prev.content.main, {
                    type: 'section',
                    headline: '',
                    paragraph: '',
                    list: [],
                    quote: ''
                }]
            }
        }))
    }

    const updateMainSection = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                main: prev.content.main.map((section, i) =>
                    i === index ? { ...section, [field]: value } : section
                )
            }
        }))
    }

    const removeMainSection = (index) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                main: prev.content.main.filter((_, i) => i !== index)
            }
        }))
    }

    const addListItem = (sectionIndex) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                main: prev.content.main.map((section, i) =>
                    i === sectionIndex ? {
                        ...section,
                        list: [...(section.list || []), '']
                    } : section
                )
            }
        }))
    }

    const updateListItem = (sectionIndex, itemIndex, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                main: prev.content.main.map((section, i) =>
                    i === sectionIndex ? {
                        ...section,
                        list: section.list.map((item, j) => j === itemIndex ? value : item)
                    } : section
                )
            }
        }))
    }

    const removeListItem = (sectionIndex, itemIndex) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                main: prev.content.main.map((section, i) =>
                    i === sectionIndex ? {
                        ...section,
                        list: section.list.filter((_, j) => j !== itemIndex)
                    } : section
                )
            }
        }))
    }

    const addRelatedLink = () => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                relatedLinks: [...prev.content.relatedLinks, { title: '', url: '', description: '' }]
            }
        }))
    }

    const updateRelatedLink = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                relatedLinks: prev.content.relatedLinks.map((link, i) =>
                    i === index ? { ...link, [field]: value } : link
                )
            }
        }))
    }

    const removeRelatedLink = (index) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                relatedLinks: prev.content.relatedLinks.filter((_, i) => i !== index)
            }
        }))
    }

    const addTag = (tag) => {
        if (tag.trim() && !formData.content.tags.includes(tag.trim())) {
            setFormData(prev => ({
                ...prev,
                content: {
                    ...prev.content,
                    tags: [...prev.content.tags, tag.trim()]
                }
            }))
        }
    }

    const removeTag = (index) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                tags: prev.content.tags.filter((_, i) => i !== index)
            }
        }))
    }

    const resetForm = () => {
        setFormData({
            id: '', title: '', description: '',
            meta: { thumbnail: null, thumbnailUrl: '', youtubeEmbedId: '', tag: '', publishedAt: '', author: '' },
            content: { introduction: '', main: [], relatedLinks: [], tags: [] }
        })
    }

    const openAddModal = () => {
        resetForm()
        setEditingBlog(null)
        setIsModalOpen(true)
    }

    const openEditModal = (blog) => {
        setFormData({ ...blog, meta: { ...blog.meta, thumbnail: null } })
        setEditingBlog(blog)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingBlog(null)
        resetForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingBlog) {
            setBlogs(prev => prev.map(blog =>
                blog.id === editingBlog.id ? { ...formData, id: editingBlog.id } : blog
            ))
        } else {
            setBlogs(prev => [...prev, { ...formData, id: Date.now().toString() }])
        }
        closeModal()
    }

    const handleDelete = (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            setBlogs(prev => prev.filter(blog => blog.id !== blogId))
        }
    }

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 bg-white">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-medium" style={{ color: 'var(--accent-dark)' }}>Blogs</h1>
                    <button onClick={openAddModal} className="animated-button">
                        <span className="label flex items-center gap-2">
                            <Plus size={20} />
                            Add Blog
                        </span>
                    </button>
                </div>
                <p className="text-sm text-gray-600">{filteredBlogs.length} blogs published</p>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by title, author, or tag"
                className="w-full max-w-md py-3 px-4 rounded-lg border-0 focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Table */}
            <div className="bg-white rounded-lg overflow-scroll shadow-sm border" style={{ borderColor: 'var(--accent-light)' }}>
                <table className="w-full">
                    <thead>
                        <tr className="border-b" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 w-16">#</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Blog</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Author</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Date</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Tag</th>
                            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentBlogs.map((blog, index) => (
                            <tr key={blog.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-4 px-6 text-sm text-gray-500">{startIndex + index + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-16 rounded overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)' }}>
                                            {blog.meta.thumbnailUrl ? (
                                                <img src={blog.meta.thumbnailUrl} alt={blog.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <FileText className="h-6 w-6" style={{ color: 'var(--accent-dark)' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-gray-900 truncate">{blog.title}</div>
                                            <div className="text-xs text-gray-500 truncate">{blog.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                        <User size={12} className="mr-1" />
                                        {blog.meta.author}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
                                        <Calendar size={12} className="mr-1" />
                                        {formatDate(blog.meta.publishedAt)}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-blue-800" style={{ backgroundColor: '#dbeafe' }}>
                                        <Tag size={12} className="mr-1" />
                                        {blog.meta.tag}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(blog)}
                                            className="p-2 rounded hover:bg-gray-100 transition-colors"
                                            style={{ color: 'var(--accent-dark)' }}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="p-2 rounded hover:bg-red-50 transition-colors text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center flex-wrap-reverse justify-between mt-6">
                    <p className="text-sm text-gray-600 p-2">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length}
                    </p>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Previous
                        </button>
                        <div className="flex space-x-1">
                            {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                let pageNumber;
                                if (totalPages <= 5) {
                                    pageNumber = index + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = index + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + index;
                                } else {
                                    pageNumber = currentPage - 2 + index;
                                }
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`w-8 h-8 text-sm rounded-md transition-colors ${currentPage === pageNumber ? 'text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        style={{
                                            backgroundColor: currentPage === pageNumber ? 'var(--accent-light)' : 'transparent'
                                        }}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Modal with Blur Background */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--accent-light)' }}>
                                <h2 className="text-xl font-medium" style={{ color: 'var(--accent-dark)' }}>
                                    {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                                </h2>
                                <button onClick={closeModal} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Meta Information Section */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => toggleSection('meta')}
                                        className="flex items-center justify-between w-full p-3 rounded-lg transition-colors"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}
                                    >
                                        <span className="font-medium">Meta Information</span>
                                        {expandedSections.meta ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {expandedSections.meta && (
                                        <div className="mt-4 space-y-4">
                                            {/* Thumbnail */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Thumbnail</label>
                                                <div className="flex items-center gap-4">
                                                    <div className="h-24 w-32 rounded overflow-hidden border-2 border-dashed flex items-center justify-center" style={{ backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-dark)' }}>
                                                        {formData.meta.thumbnailUrl ? (
                                                            <img src={formData.meta.thumbnailUrl} alt="Preview" className="h-full w-full object-cover" />
                                                        ) : (
                                                            <Upload className="h-8 w-8" style={{ color: 'var(--accent-dark)' }} />
                                                        )}
                                                    </div>
                                                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="thumbnail-upload" />
                                                    <label htmlFor="thumbnail-upload" className="animated-button cursor-pointer">
                                                        <span className="label">Choose Image</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Meta Fields */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>YouTube Embed ID</label>
                                                    <div className="relative">
                                                        <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--accent-dark)' }} size={16} />
                                                        <input
                                                            type="text"
                                                            name="meta.youtubeEmbedId"
                                                            value={formData.meta.youtubeEmbedId}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                            placeholder="geejWrV0UMo"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Category Tag</label>
                                                    <input
                                                        type="text"
                                                        name="meta.tag"
                                                        value={formData.meta.tag}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                        placeholder="Study Tips"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Published Date</label>
                                                    <input
                                                        type="date"
                                                        name="meta.publishedAt"
                                                        value={formData.meta.publishedAt}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Author *</label>
                                                    <input
                                                        type="text"
                                                        name="meta.author"
                                                        value={formData.meta.author}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                        placeholder="Amir Akhtar"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Blog Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="IMAT Preparation Tips 2025: Study Smarter, Not Harder"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Short Description *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                            placeholder="Brief description that appears in blog previews"
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => toggleSection('content')}
                                        className="flex items-center justify-between w-full p-3 rounded-lg transition-colors"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}
                                    >
                                        <span className="font-medium">Blog Content</span>
                                        {expandedSections.content ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {expandedSections.content && (
                                        <div className="mt-4 space-y-6">
                                            {/* Introduction */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Introduction</label>
                                                <textarea
                                                    name="content.introduction"
                                                    value={formData.content.introduction}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                    style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                    placeholder="Opening paragraph that hooks the reader..."
                                                />
                                            </div>

                                            {/* Main Content Sections */}
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <label className="block text-sm font-medium" style={{ color: 'var(--accent-dark)' }}>Main Content Sections</label>
                                                    <button
                                                        type="button"
                                                        onClick={addMainSection}
                                                        className="animated-button text-sm"
                                                    >
                                                        <span className="label">+ Add Section</span>
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    {formData.content.main.map((section, index) => (
                                                        <div key={index} className="p-4 rounded-lg border" style={{ borderColor: 'var(--accent-light)', backgroundColor: 'var(--accent-light)' }}>
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-2">
                                                                    <GripVertical size={16} className="text-gray-400" />
                                                                    <span className="text-sm font-medium" style={{ color: 'var(--accent-dark)' }}>Section {index + 1}</span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeMainSection(index)}
                                                                    className="text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                            <div className="space-y-3">
                                                                {/* Headline */}
                                                                <div>
                                                                    <label className="block text-xs font-medium mb-1 text-gray-600">Headline</label>
                                                                    <div className="relative">
                                                                        <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                                        <input
                                                                            type="text"
                                                                            value={section.headline || ''}
                                                                            onChange={(e) => updateMainSection(index, 'headline', e.target.value)}
                                                                            className="w-full pl-10 pr-4 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                                            style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                                            placeholder="Section headline"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {/* Paragraph */}
                                                                <div>
                                                                    <label className="block text-xs font-medium mb-1 text-gray-600">Paragraph</label>
                                                                    <textarea
                                                                        value={section.paragraph || ''}
                                                                        onChange={(e) => updateMainSection(index, 'paragraph', e.target.value)}
                                                                        rows={3}
                                                                        className="w-full px-3 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                                        style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                                        placeholder="Main content paragraph"
                                                                    />
                                                                </div>
                                                                {/* List Items */}
                                                                <div>
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <label className="block text-xs font-medium text-gray-600">Bullet Points</label>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => addListItem(index)}
                                                                            className="text-xs px-2 py-1 rounded transition-colors"
                                                                            style={{ backgroundColor: 'var(--accent-dark)', color: 'var(--primary)' }}
                                                                        >
                                                                            + Add
                                                                        </button>
                                                                    </div>
                                                                    {(section.list || []).map((item, itemIndex) => (
                                                                        <div key={itemIndex} className="flex gap-2 mb-2">
                                                                            <List className="mt-2 flex-shrink-0 text-gray-400" size={16} />
                                                                            <input
                                                                                type="text"
                                                                                value={item}
                                                                                onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                                                                                className="flex-1 px-3 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                                                style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                                                placeholder="Bullet point"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeListItem(index, itemIndex)}
                                                                                className="px-2 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                                            >
                                                                                <X size={14} />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {/* Quote */}
                                                                <div>
                                                                    <label className="block text-xs font-medium mb-1 text-gray-600">Quote (Optional)</label>
                                                                    <div className="relative">
                                                                        <Quote className="absolute left-3 top-3 text-gray-400" size={16} />
                                                                        <textarea
                                                                            value={section.quote || ''}
                                                                            onChange={(e) => updateMainSection(index, 'quote', e.target.value)}
                                                                            rows={2}
                                                                            className="w-full pl-10 pr-4 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                                            style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                                            placeholder="Inspirational quote or key takeaway"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {formData.content.main.length === 0 && (
                                                        <p className="text-sm text-gray-500 text-center py-8">No content sections added yet</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>Tags</label>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {formData.content.tags.map((tag, index) => (
                                                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'var(--accent-dark)', color: 'var(--primary)' }}>
                                                            {tag}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeTag(index)}
                                                                className="ml-1 hover:text-red-300"
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2"
                                                    style={{ backgroundColor: 'var(--accent-light)', color: 'var(--secondary)' }}
                                                    placeholder="Type a tag and press Enter"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault()
                                                            addTag(e.target.value)
                                                            e.target.value = ''
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Related Links Section */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => toggleSection('related')}
                                        className="flex items-center justify-between w-full p-3 rounded-lg transition-colors"
                                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-dark)' }}
                                    >
                                        <span className="font-medium">Related Links</span>
                                        {expandedSections.related ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {expandedSections.related && (
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">External resources and references</span>
                                                <button
                                                    type="button"
                                                    onClick={addRelatedLink}
                                                    className="animated-button text-sm"
                                                >
                                                    <span className="label">+ Add Link</span>
                                                </button>
                                            </div>
                                            {formData.content.relatedLinks.map((link, index) => (
                                                <div key={index} className="p-4 rounded-lg border" style={{ borderColor: 'var(--accent-light)', backgroundColor: 'var(--accent-light)' }}>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium" style={{ color: 'var(--accent-dark)' }}>Link {index + 1}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeRelatedLink(index)}
                                                                className="text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={link.title}
                                                            onChange={(e) => updateRelatedLink(index, 'title', e.target.value)}
                                                            className="w-full px-3 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                            style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                            placeholder="Link title"
                                                        />
                                                        <div className="relative">
                                                            <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                            <input
                                                                type="url"
                                                                value={link.url}
                                                                onChange={(e) => updateRelatedLink(index, 'url', e.target.value)}
                                                                className="w-full pl-10 pr-4 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                                style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                                placeholder="https://..."
                                                            />
                                                        </div>
                                                        <textarea
                                                            value={link.description}
                                                            onChange={(e) => updateRelatedLink(index, 'description', e.target.value)}
                                                            rows={2}
                                                            className="w-full px-3 py-2 rounded border-0 focus:outline-none focus:ring-2"
                                                            style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}
                                                            placeholder="Brief description of the link"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {formData.content.relatedLinks.length === 0 && (
                                                <p className="text-sm text-gray-500 text-center py-4">No related links added yet</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--accent-light)' }}>
                                    <button type="button" onClick={closeModal} className="animated-button">
                                        <span className="label">Cancel</span>
                                    </button>
                                    <button type="submit" className="animated-button">
                                        <span className="label">{editingBlog ? 'Update Blog' : 'Publish Blog'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredBlogs.length === 0 && (
                <div className="text-center py-16">
                    <FileText className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--accent-dark)' }} />
                    <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>No blogs found</h3>
                    <p className="text-sm mb-6 text-gray-600">
                        {searchTerm ? 'Try adjusting your search criteria.' : 'Start creating content for your audience.'}
                    </p>
                    {!searchTerm && (
                        <button onClick={openAddModal} className="animated-button">
                            <span className="label flex items-center gap-2">
                                <Plus size={16} />
                                Add Blog
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default BlogsManagement
import React, { useState, useEffect } from 'react'
import { Users, BookOpen, GraduationCap, Globe, FileText, Mail, HelpCircle, Upload, Trash2, Plus, X } from 'lucide-react'

const Dashboard = () => {
    const [stats, setStats] = useState({
        courses: 12,
        imatUniversities: 25,
        abroadUniversities: 18,
        blogs: 47,
        teamMembers: 8,
        featuredImages: 5,
        newsletters: 156,
        questions: 342
    })

    const [featuredImages, setFeaturedImages] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    const maxImages = 5

    useEffect(() => {
        // Mock featured images data
        setFeaturedImages([
            {
                id: '1',
                url: '/api/placeholder/400/250',
                createdAt: '2025-10-09T10:30:00Z'
            },
            {
                id: '2',
                url: '/api/placeholder/400/250',
                createdAt: '2025-10-09T10:32:00Z'
            },
            {
                id: '3',
                url: '/api/placeholder/400/250',
                createdAt: '2025-10-09T10:35:00Z'
            }
        ])
    }, [])

    const contentStats = [
        { title: 'Courses', count: stats.courses, icon: BookOpen, color: 'blue' },
        { title: 'IMAT Universities', count: stats.imatUniversities, icon: GraduationCap, color: 'purple' },
        { title: 'Study Abroad', count: stats.abroadUniversities, icon: Globe, color: 'green' },
        { title: 'Blog Posts', count: stats.blogs, icon: FileText, color: 'orange' },
        { title: 'Team Members', count: stats.teamMembers, icon: Users, color: 'pink' },
        { title: 'Featured Images', count: stats.featuredImages, icon: Upload, color: 'indigo' },
        { title: 'Newsletters', count: stats.newsletters, icon: Mail, color: 'yellow' },
        { title: 'Questions Bank', count: stats.questions, icon: HelpCircle, color: 'red' }
    ]

    const getColorClasses = (color) => {
        const colors = {
            blue: { bg: 'bg-blue-50', icon: 'text-blue-500' },
            purple: { bg: 'bg-purple-50', icon: 'text-purple-500' },
            green: { bg: 'bg-green-50', icon: 'text-green-500' },
            orange: { bg: 'bg-orange-50', icon: 'text-orange-500' },
            pink: { bg: 'bg-pink-50', icon: 'text-pink-500' },
            indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-500' },
            yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-500' },
            red: { bg: 'bg-red-50', icon: 'text-red-500' }
        }
        return colors[color] || colors.blue
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file && featuredImages.length < maxImages) {
            setIsUploading(true)

            // Simulate upload delay
            setTimeout(() => {
                const newImage = {
                    id: Date.now().toString(),
                    url: URL.createObjectURL(file),
                    createdAt: new Date().toISOString()
                }
                setFeaturedImages(prev => [...prev, newImage])
                setStats(prev => ({ ...prev, featuredImages: prev.featuredImages + 1 }))
                setIsUploading(false)
                e.target.value = '' // Reset file input
            }, 1000)
        }
    }

    const handleDeleteImage = (imageId) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            setFeaturedImages(prev => prev.filter(img => img.id !== imageId))
            setStats(prev => ({ ...prev, featuredImages: prev.featuredImages - 1 }))
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 bg-white">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>
                    Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                    Welcome back! Here's an overview of your content management system.
                </p>
            </div>

            {/* Content Overview */}
            <div>
                <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--accent-dark)' }}>
                    Content Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contentStats.map((stat, index) => {
                        const colors = getColorClasses(stat.color)
                        const Icon = stat.icon
                        return (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200"
                                style={{ borderColor: 'var(--accent-light)' }}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold mt-1" style={{ color: 'var(--accent-dark)' }}>
                                            {stat.count}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                                        <Icon className={`h-6 w-6 ${colors.icon}`} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Featured Images Management */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium" style={{ color: 'var(--accent-dark)' }}>
                        Featured Images
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {featuredImages.length} / {maxImages} images
                        </span>
                        <label className={`animated-button cursor-pointer ${featuredImages.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <span className="label flex items-center gap-2">
                                {isUploading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: 'var(--accent-dark)' }}></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16} />
                                        Upload Image
                                    </>
                                )}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={featuredImages.length >= maxImages || isUploading}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* Images Grid */}
                <div className="bg-white rounded-lg border shadow-sm p-6" style={{ borderColor: 'var(--accent-light)' }}>
                    {featuredImages.length === 0 ? (
                        <div className="text-center py-12">
                            <Upload className="mx-auto h-12 w-12 mb-4" style={{ color: 'var(--accent-dark)' }} />
                            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--accent-dark)' }}>
                                No featured images uploaded
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Upload images to display in your homepage hero section.
                            </p>
                            <label className="animated-button cursor-pointer">
                                <span className="label flex items-center gap-2">
                                    <Plus size={16} />
                                    Upload First Image
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredImages.map((image) => (
                                <div key={image.id} className="relative group">
                                    <div className="aspect-video rounded-lg overflow-hidden border" style={{ backgroundColor: 'var(--accent-light)' }}>
                                        <img
                                            src={image.url}
                                            alt="Featured"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                                            <button
                                                onClick={() => handleDeleteImage(image.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500">
                                            Uploaded on {formatDate(image.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Add more placeholder if under limit */}
                            {featuredImages.length < maxImages && (
                                <label className="aspect-video rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group" style={{ borderColor: 'var(--accent-dark)' }}>
                                    <div className="text-center">
                                        <Plus className="mx-auto h-8 w-8 mb-2 group-hover:scale-110 transition-transform" style={{ color: 'var(--accent-dark)' }} />
                                        <p className="text-sm font-medium" style={{ color: 'var(--accent-dark)' }}>
                                            Add Image
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        disabled={isUploading}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    )}

                    {/* Upload Limit Message */}
                    {featuredImages.length >= maxImages && (
                        <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--accent-light)' }}>
                            <p className="text-sm text-center" style={{ color: 'var(--accent-dark)' }}>
                                Maximum {maxImages} featured images reached. Delete an image to upload a new one.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
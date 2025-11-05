import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AtSign, BarChart3, BookOpen, Earth, FileQuestionMark, GraduationCap, LayoutDashboard, MessageSquare, Newspaper, PanelLeft, Quote, Trophy, Users } from 'lucide-react'

const sidebarContent = [
    {
        label: "Dashboard",
        link: "/admin/",
        icon: <LayoutDashboard className='h-full' />,
    },
    {
        label: "Team Management",
        link: "/admin/team",
        icon: <Users className='h-full' />,
    },
    {
        label: "Courses",
        link: "/admin/courses",
        icon: <BookOpen className='h-full' />,
    },
    {
        label: "IMAT Universities",
        link: "/admin/imat-universities",
        icon: <GraduationCap className='h-full' />,
    },
    {
        label: "Abroad Universities",
        link: "/admin/abroad-universities",
        icon: <Earth className='h-full' />,
    },
    {
        label: "IMAT Cut-Offs",
        link: "/admin/imat-cutoffs",
        icon: <BarChart3 className='h-full' />,
    },
    {
        label: "Top Performers",
        link: "/admin/top-Performers",
        icon: <Trophy className='h-full' />,
    },
    {
        label: "Consultations",
        link: "/admin/consultations",
        icon: <MessageSquare className='h-full' />,
    },
    {
        label: "Testimonials",
        link: "/admin/testimonials",
        icon: <Quote className='h-full' />,
    },
    {
        label: "Blogs",
        link: "/admin/blogs",
        icon: <Newspaper className='h-full' />,
    },
    {
        label: "PYQ's",
        link: "/admin/pyqs",
        icon: <FileQuestionMark className='h-full' />,
    },
    {
        label: "Newsletter Emails",
        link: "/admin/newsletter-emails",
        icon: <AtSign className='h-full' />,
    },
]


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`z-10 bg-(--accent-light) text-(--accent-dark) sm:fixed top-0 left-0 h-screen overflow-y-scroll flex flex-col overflow-hidden border-r border-gray-200 ${isOpen ? "w-64" : "w-0 sm:w-16"} transition-[width] duration-300 ease-in-out`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                    {isOpen ? (
                        <img src="/assets/logo.png" alt="Logo" className="h-8 fade-in" />
                    ) : (
                        <img src="/assets/favicon.png" alt="Logo" className="h-8 fade-in" />
                    )}
                </div>
                <button
                    className="absolute top-4 right-4 sm:static bg-(--accent-light) p-2 rounded-md"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <PanelLeft className={`w-5 h-5 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-3">
                    {sidebarContent.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.link}
                                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-60 transition-colors duration-200 group ${isOpen ? 'justify-start' : 'justify-center'}`}
                                onClick={() => { setIsOpen(false) }}
                            >
                                <span className="w-5 h-5 flex-shrink-0">
                                    {item.icon}
                                </span>
                                {isOpen && (
                                    <span className="text-sm fade-in truncate">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
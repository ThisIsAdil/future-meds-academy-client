import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from "../admin/components/Sidebar"
import { PageNotFound } from '../pages'
import Dashboard from '../admin/pages/Dashboard'
import NewsLetter from '../admin/pages/NewsLetter'
import PageContainer from '../admin/container/PageContainer'
import TeamManagement from '../admin/pages/TeamManagement'
import CoursesManagement from '../admin/pages/CoursesManagement'
import IMATUniversities from '../admin/pages/IMATUniversities'
import BlogsManagement from '../admin/pages/BlogsManagement'
import AbroadUniversities from '../admin/pages/AbroadUniversities'
import PreviousYearQuestionManagement from '../admin/pages/PreviousYearQuestionManagement'

const Admin = () => {
    return (
        <div className='grid grid-cols-[auto_1fr] w-screen overflow-x-hidden'>
            <Sidebar />
            <Routes>
                <Route path="/" element={<PageContainer><Dashboard /></PageContainer>} />
                <Route path="/team" element={<PageContainer><TeamManagement /></PageContainer>} />
                <Route path="/courses" element={<PageContainer><CoursesManagement /></PageContainer>} />
                <Route path="/imat-universities" element={<PageContainer><IMATUniversities /></PageContainer>} />
                <Route path="/abroad-universities" element={<PageContainer><AbroadUniversities /></PageContainer>} />
                <Route path="/blogs" element={<PageContainer><BlogsManagement /></PageContainer>} />
                <Route path="/pyqs" element={<PageContainer><PreviousYearQuestionManagement /></PageContainer>} />
                <Route path="/newsletter-emails" element={<PageContainer><NewsLetter /></PageContainer>} />

                <Route path="*" element={<PageNotFound redirect={{ path: "/admin", label: "Admin Dashboard" }} />} />
            </Routes>
        </div>
    )
}

export default Admin
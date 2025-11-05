import React, { useEffect } from 'react'
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
import ConsultationManagement from '../admin/pages/ConsultationManagement'
import TestimonialManagement from '../admin/pages/TestimonialManagement'
import CutOffManagement from '../admin/pages/CutOffManagement'
import TopPerformer from '../admin/pages/TopPerformer'
import { Loader } from '../components'
import axiosClient from '../api/axiosClient'

const Admin = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const checkAdminToken = async () => {
            setIsLoading(true);
            try {
                const response = await axiosClient.get('/admin-4fa2c9b2c1e5/verify-token', {
                    withCredentials: true,
                });
                if (!response.data.valid) {
                    window.location.replace('/auth');
                }

            } catch (err) {
                window.location.replace('/auth');
            } finally {
                setIsLoading(false);
            }
        }

        checkAdminToken();
    }, [])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='grid grid-cols-[auto_1fr] w-screen overflow-x-hidden'>
            <Sidebar />
            <Routes>
                <Route path="/" element={<PageContainer><Dashboard /></PageContainer>} />
                <Route path="/team" element={<PageContainer><TeamManagement /></PageContainer>} />
                <Route path="/courses" element={<PageContainer><CoursesManagement /></PageContainer>} />
                <Route path="/imat-universities" element={<PageContainer><IMATUniversities /></PageContainer>} />
                <Route path="/abroad-universities" element={<PageContainer><AbroadUniversities /></PageContainer>} />
                <Route path="/imat-cutoffs" element={<PageContainer><CutOffManagement /></PageContainer>} />
                <Route path="/top-performers" element={<PageContainer><TopPerformer /></PageContainer>} />
                <Route path="/consultations" element={<PageContainer><ConsultationManagement /></PageContainer>} />
                <Route path="/testimonials" element={<PageContainer><TestimonialManagement /></PageContainer>} />
                <Route path="/blogs" element={<PageContainer><BlogsManagement /></PageContainer>} />
                <Route path="/pyqs" element={<PageContainer><PreviousYearQuestionManagement /></PageContainer>} />
                <Route path="/newsletter-emails" element={<PageContainer><NewsLetter /></PageContainer>} />

                <Route path="*" element={<PageNotFound redirect={{ path: "/admin", label: "Admin Dashboard" }} />} />
            </Routes>
        </div>
    )
}

export default Admin
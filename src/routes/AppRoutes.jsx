import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { ProjectList } from '../pages/project/ProjectList'
import { ProjectDetail } from '../pages/project/ProjectDetail'

export const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/projects' element={<ProjectList/>} />
                <Route path='/projects/:id' element={<ProjectDetail/>} />
            </Routes>

        </Router>
    )
}

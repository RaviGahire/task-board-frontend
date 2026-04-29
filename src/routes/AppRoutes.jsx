import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from '../components/layout/Header'

export const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<h1>Home page</h1>} />
            </Routes>

        </Router>
    )
}

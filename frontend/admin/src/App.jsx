import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/ui/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Packages from './pages/Packages'
import Equipment from './pages/Equipment'
import Staff from './pages/Staff'
import NotFound from './pages/NotFound'
import Room from './pages/Room'
import Profile from './pages/Profile'
import Trainer from './pages/Trainer'
import { useState } from 'react'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}

          <Route path="/login" element={<Login />} />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected routes */}
          <Route element={<Layout />}>
            <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
            <Route path="/packages" element={<ProtectedRoute><Packages /></ProtectedRoute>} />
            {/* <Route path="/equipment" element={<ProtectedRoute><Equipment/></ProtectedRoute>} /> */}
            <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
            <Route path="/trainer" element={<ProtectedRoute><Trainer /></ProtectedRoute>} />
            <Route path="/rooms" element={<ProtectedRoute><Room /></ProtectedRoute>} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

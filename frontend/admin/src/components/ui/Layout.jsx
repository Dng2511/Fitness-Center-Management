import { useState, useContext } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiHome, FiUsers, FiPackage, FiActivity, FiSettings, FiLogOut, FiUserPlus, FiUser, FiMessageSquare } from 'react-icons/fi'
import { AuthContext } from '../auth/AuthContext'
import './Layout.css'

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const getAvatarLetter = (name) => {
        if (!name) return '';
        return name.trim().charAt(0).toUpperCase();
    }

    return (
        <div className="app-container">
            {/* Mobile Header */}
            <header className="mobile-header">
                <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                <h1 className="logo">TADIZBGym</h1>
            </header>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2 className="logo">TADIZBGym</h2>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item" onClick={() => setSidebarOpen(false)}>
                        <FiHome className="nav-icon" />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/members" className="nav-item">
                        <FiUserPlus className="nav-icon" />
                        <span>Member</span>
                    </Link>
                    <Link to="/rooms" className="nav-item" onClick={() => setSidebarOpen(false)}>
                        <FiSettings className="nav-icon" />
                        <span>Rooms</span>
                    </Link>
                    <Link to="/packages" className="nav-item" onClick={() => setSidebarOpen(false)}>
                        <FiPackage className="nav-icon" />
                        <span>Packages</span>
                    </Link>
                    <Link to="/equipment" className="nav-item" onClick={() => setSidebarOpen(false)}>
                        <FiActivity className="nav-icon" />
                        <span>Equipment</span>
                    </Link>
                    <Link to="/trainer" className="nav-item" onClick={() => setSidebarOpen(false)}>
                        <FiUsers className="nav-icon" />
                        <span>Trainers</span>
                    </Link>
                    <Link to="/staff" className="nav-item" onClick={() => setSidebarOpen(false)}>
                        <FiUser className="nav-icon" />
                        <span>Staff</span>
                    </Link>
                    <Link to="/feedback" className="nav-item" onClick={() => setSidebarOpen(false)}>
                        <FiMessageSquare className="nav-icon" />
                        <span>Feedback</span>
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="avatar">
                            {getAvatarLetter(user?.name)}
                        </div>
                        <div className="user-details">
                            <span className="user-name">{user?.name}</span>
                            <span className="user-role">{user?.role}</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FiLogOut className="logout-icon" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
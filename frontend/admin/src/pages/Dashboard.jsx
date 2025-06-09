import { useState, useEffect } from 'react'
import StatCard from '../components/dashboard/StatCard'
import ProfitChart from '../components/dashboard/ProfitChart'
import PackageChart from '../components/dashboard/PackageChart'
import TopPackagesChart from '../components/dashboard/TopPackagesChart'
import MemberChart from '../components/dashboard/MemberChart'
import { FiUsers, FiDollarSign, FiPackage, FiShoppingCart } from 'react-icons/fi'
import styles from '../components/dashboard/Dashboard.module.css'
import { getDashboardStatistics, getMonthlyRevenue, getActiveMembers, getActiveMemberCount } from '../services/Api/dashboard'

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        recentRevenue: 0,
        transactionCount: 0,
        totalMembers: 0,
        newMembers: 0,
        uniquePackageCount: 0,
        topPackages: [],
        packageStatistics: []
    })

    const [monthlyRevenue, setMonthlyRevenue] = useState({})
    const [activeMembers, setActiveMembers] = useState([])
    const [activeMemberCount, setActiveMemberCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            const [statsResponse, revenueResponse, membersResponse, countResponse] = await Promise.all([
                getDashboardStatistics(),
                getMonthlyRevenue(),
                getActiveMembers(0, 10),
                getActiveMemberCount()
            ])

            setStats(statsResponse.data)
            setMonthlyRevenue(revenueResponse.data)
            setActiveMembers(membersResponse.data.members)
            setActiveMemberCount(countResponse.data)
            setError(null)
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
            setError('Failed to fetch dashboard data. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()

        // Set up auto-refresh every 5 minutes
        const refreshInterval = setInterval(fetchDashboardData, 5 * 60 * 1000)

        return () => clearInterval(refreshInterval)
    }, [])

    if (loading) {
        return <div className="loading">Loading dashboard data...</div>
    }

    if (error) {
        return <div className="error">{error}</div>
    }

    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1>

            {/* Revenue Statistics Section */}
            <section className={styles['dashboard-section']}>
                <h2 className={styles['section-title']}>Revenue Statistics</h2>
                <div className="stats-grid">
                    <StatCard
                        title="Total Revenue"
                        value={`${stats.totalRevenue?.toLocaleString()}₫`}
                        icon={<FiDollarSign size={24} />}
                    />
                    <StatCard
                        title="Recent Revenue (30 days)"
                        value={`${stats.recentRevenue?.toLocaleString()}₫`}
                        icon={<FiDollarSign size={24} />}
                    />
                    <StatCard
                        title="Total Transactions"
                        value={stats.transactionCount}
                        icon={<FiShoppingCart size={24} />}
                    />
                </div>
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Monthly Revenue</h3>
                        <ProfitChart data={monthlyRevenue} />
                    </div>
                </div>
            </section>

            {/* Package Statistics Section */}
            <section className={styles['dashboard-section']}>
                <h2 className={styles['section-title']}>Package Statistics</h2>
                <div className="stats-grid">
                    <StatCard
                        title="Active Packages"
                        value={stats.uniquePackageCount}
                        icon={<FiPackage size={24} />}
                    />
                </div>
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Package Statistics</h3>
                        <PackageChart data={stats.packageStatistics} />
                    </div>
                    <div className="chart-card">
                        <h3>Top Packages Distribution</h3>
                        <TopPackagesChart data={stats.topPackages} />
                    </div>
                </div>
            </section>

            {/* Member Statistics Section */}
            <section className={styles['dashboard-section']}>
                <h2 className={styles['section-title']}>Member Statistics</h2>
                <div className="stats-grid">
                    <StatCard
                        title="Total Members"
                        value={stats.totalMembers}
                        icon={<FiUsers size={24} />}
                    />
                    <StatCard
                        title="New Members (30 days)"
                        value={stats.newMembers}
                        icon={<FiUsers size={24} />}
                    />
                </div>
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Member Growth</h3>
                        <MemberChart data={{
                            monthlyMembers: stats.monthlyMembers,
                            monthlyNewMembers: stats.monthlyNewMembers
                        }} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard

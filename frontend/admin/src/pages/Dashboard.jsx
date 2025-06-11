import { useState, useEffect } from 'react'
import StatCard from '../components/dashboard/StatCard'
import ProfitChart from '../components/dashboard/ProfitChart'
import PackageTable from '../components/dashboard/PackageTable'
import TopPackagesChart from '../components/dashboard/TopPackagesChart'
import MemberChart from '../components/dashboard/MemberChart'
import { FiUsers, FiDollarSign, FiPackage, FiShoppingCart } from 'react-icons/fi'
import styles from '../components/dashboard/Dashboard.module.css'
import {
    getDashboardStatistics,
    getMonthlyRevenue,
    getActiveMembers,
    getActiveMemberCount
} from '../services/Api/dashboard'

const Dashboard = () => {
    const [dashboardStats, setDashboardStats] = useState({
        totalRevenue: 0,
        recentRevenue: 0,
        transactionCount: 0,
        totalMembers: 0,
        newMembers: 0,
        uniquePackageCount: 0,
        packageStatistics: [],
        topPackages: []
    })

    const [monthlyRevenue, setMonthlyRevenue] = useState({})
    const [activeMemberCount, setActiveMemberCount] = useState(0)
    const [activeMembers, setActiveMembers] = useState([])

    // Lấy thống kê tổng quan
    useEffect(() => {
        getDashboardStatistics().then(({ data }) => setDashboardStats(data))
    }, []);

    // Lấy doanh thu theo tháng
    useEffect(() => {
        getMonthlyRevenue().then(({ data }) => setMonthlyRevenue(data))
    }, [])

    // Lấy danh sách thành viên đang hoạt động
    useEffect(() => {
        getActiveMembers().then(({ data }) => setActiveMembers(data.members))
    }, [])

    // Lấy số lượng thành viên đang hoạt động
    useEffect(() => {
        getActiveMemberCount().then(({ data }) => setActiveMemberCount(data))
    }, [])

    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1>

            {/* Revenue Statistics Section */}
            <section className={styles['dashboard-section']}>
                <h2 className={styles['section-title']}>Revenue Statistics</h2>
                <div className="stats-grid">
                    <StatCard
                        title="Total Revenue"
                        value={`${dashboardStats.totalRevenue?.toLocaleString()}₫`}
                        icon={<FiDollarSign size={24} />}
                    />
                    <StatCard
                        title="Recent Revenue (30 days)"
                        value={`${dashboardStats.recentRevenue?.toLocaleString()}₫`}
                        icon={<FiDollarSign size={24} />}
                    />
                    <StatCard
                        title="Total Transactions"
                        value={dashboardStats.transactionCount}
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
                        value={dashboardStats.uniquePackageCount || 0}
                        icon={<FiPackage size={24} />}
                    />
                </div>
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Package Statistics</h3>
                        <PackageTable data={dashboardStats.packageStatistics} />
                    </div>
                    <div className="chart-card">
                        <h3>Top Packages Distribution</h3>
                        <TopPackagesChart data={dashboardStats.topPackages} />
                    </div>
                </div>
            </section>

            {/* Member Statistics Section */}
            <section className={styles['dashboard-section']}>
                <h2 className={styles['section-title']}>Member Statistics</h2>
                <div className="stats-grid">
                    <StatCard
                        title="Total Members"
                        value={dashboardStats.totalMembers}
                        icon={<FiUsers size={24} />}
                    />
                    <StatCard
                        title="New Members (30 days)"
                        value={dashboardStats.newMembers}
                        icon={<FiUsers size={24} />}
                    />
                    <StatCard
                        title="Active Members"
                        value={activeMemberCount}
                        icon={<FiUsers size={24} />}
                    />
                </div>
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Member Growth</h3>
                        <MemberChart data={{
                            monthlyMembers: dashboardStats.monthlyMembers,
                            monthlyNewMembers: dashboardStats.monthlyNewMembers
                        }} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard

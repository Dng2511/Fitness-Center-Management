import { useState, useEffect } from 'react'
import StatCard from '../components/dashboard/StatCard'
import ProfitChart from '../components/dashboard/ProfitChart'
import PackageChart from '../components/dashboard/PackageChart'
import TopPackagesChart from '../components/dashboard/TopPackagesChart'
import MemberChart from '../components/dashboard/MemberChart'
import { FiUsers, FiDollarSign, FiPackage, FiShoppingCart } from 'react-icons/fi'
import styles from '../components/dashboard/Dashboard.module.css'
import {
    getDashboardStatistics,
    getMonthlyRevenue,
    getActiveMembers,
    getActiveMemberCount,
    getTotalPackages,
    getTopPackages,
    getPackageStatistics
} from '../services/Api/dashboard'
import { da } from 'date-fns/locale'

const Dashboard = () => {
    const [dashboardStats, setDashboardStats] = useState({
        totalRevenue: 0,
        recentRevenue: 0,
        transactionCount: 0,
        totalMembers: 0,
        newMembers: 0,
        uniquePackageCount: 0
    })

    const [monthlyRevenue, setMonthlyRevenue] = useState({})

    useEffect(() => {
        getDashboardStatistics().then(({ data }) => setDashboardStats(data))
    }, []);

    useEffect(() => {
        getMonthlyRevenue().then(({ data }) => setMonthlyRevenue(data))
    })

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
            </div>

            {/* Stats Section */}
            <section className={styles['dashboard-section']}>
                <div className="stats-grid">
                    <StatCard
                        title="Total Revenue"
                        value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
                        icon={<FiDollarSign size={24} />}
                    />
                    <StatCard
                        title="Recent Revenue (30 days)"
                        value={`$${dashboardStats.recentRevenue.toLocaleString()}`}
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
                        <h3>Revenue Trends</h3>
                        <ProfitChart data={monthlyRevenue} />
                    </div>
                </div>
            </section>

            {/* Package Statistics Section */}
            <section className={styles['dashboard-section']}>
                <h2 className={styles['section-title']}>Package Statistics</h2>
                <div className="stats-grid">
                    <StatCard
                        title="Total Packages"
                        value={dashboardStats.uniquePackageCount}
                        icon={<FiPackage size={24} />}
                    />
                </div>
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Package Distribution</h3>
                        <PackageChart data={dashboardStats.packageStatistics} />
                    </div>
                    <div className="chart-card">
                        <h3>Top Packages</h3>
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

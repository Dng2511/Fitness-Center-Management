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

const Dashboard = () => {
    const [dashboardStats, setDashboardStats] = useState({
        totalRevenue: 0,
        recentRevenue: 0,
        transactionCount: 0,
        totalMembers: 0,
        newMembers: 0,
        uniquePackageCount: 0
    })

    const [monthlyRevenue, setMonthlyRevenue] = useState({
        labels: [],
        data: []
    })

    const [members, setMembers] = useState({
        list: [],
        total: 0
    })

    const [packages, setPackages] = useState({
        total: 0,
        top: [],
        statistics: []
    })

    const [loadingStates, setLoadingStates] = useState({
        stats: true,
        revenue: true,
        members: true,
        packages: true
    })

    const [errors, setErrors] = useState({
        stats: null,
        revenue: null,
        members: null,
        packages: null
    })

    useEffect(() => {
        let isMounted = true;

        const fetchStats = () => {
            setLoadingStates(prev => ({ ...prev, stats: true }));
            getDashboardStatistics()
                .then(response => {
                    if (isMounted) {
                        console.log('Dashboard Stats:', response.data);
                        setDashboardStats(response.data);
                        setErrors(prev => ({ ...prev, stats: null }));
                    }
                })
                .catch(error => {
                    if (isMounted) {
                        console.error('Error fetching dashboard statistics:', error);
                        setErrors(prev => ({
                            ...prev,
                            stats: 'Failed to fetch dashboard statistics'
                        }));
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoadingStates(prev => ({ ...prev, stats: false }));
                    }
                });
        };

        fetchStats();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchRevenue = () => {
            setLoadingStates(prev => ({ ...prev, revenue: true }));
            getMonthlyRevenue()
                .then(response => {
                    if (isMounted) {
                        const data = response.data;
                        const labels = Object.keys(data);
                        const values = Object.values(data);
                        setMonthlyRevenue({
                            labels,
                            data: values
                        });
                        setErrors(prev => ({ ...prev, revenue: null }));
                    }
                })
                .catch(error => {
                    if (isMounted) {
                        console.error('Error fetching monthly revenue:', error);
                        setErrors(prev => ({
                            ...prev,
                            revenue: 'Failed to fetch monthly revenue'
                        }));
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoadingStates(prev => ({ ...prev, revenue: false }));
                    }
                });
        };

        fetchRevenue();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchMemberData = () => {
            setLoadingStates(prev => ({ ...prev, members: true }));
            Promise.all([
                getActiveMembers(0, 10),
                getActiveMemberCount()
            ])
                .then(([membersResponse, countResponse]) => {
                    if (isMounted) {
                        setMembers({
                            list: membersResponse.data.members || [],
                            total: countResponse.data
                        });
                        setErrors(prev => ({ ...prev, members: null }));
                    }
                })
                .catch(error => {
                    if (isMounted) {
                        console.error('Error fetching member data:', error);
                        setErrors(prev => ({
                            ...prev,
                            members: 'Failed to fetch member data'
                        }));
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoadingStates(prev => ({ ...prev, members: false }));
                    }
                });
        };

        fetchMemberData();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchPackageData = () => {
            setLoadingStates(prev => ({ ...prev, packages: true }));
            Promise.all([
                getTotalPackages(),
                getTopPackages(),
                getPackageStatistics()
            ])
                .then(([totalResponse, topResponse, statsResponse]) => {
                    if (isMounted) {
                        console.log('Package Data:', {
                            total: totalResponse.data,
                            top: topResponse.data,
                            stats: statsResponse.data
                        });
                        setPackages({
                            total: totalResponse.data,
                            top: topResponse.data,
                            statistics: statsResponse.data
                        });
                        setErrors(prev => ({ ...prev, packages: null }));
                    }
                })
                .catch(error => {
                    if (isMounted) {
                        console.error('Error fetching package data:', error);
                        setErrors(prev => ({
                            ...prev,
                            packages: 'Failed to fetch package data'
                        }));
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setLoadingStates(prev => ({ ...prev, packages: false }));
                    }
                });
        };

        fetchPackageData();
        return () => { isMounted = false; };
    }, []);

    const isLoading = Object.values(loadingStates).some(state => state);
    const hasError = Object.values(errors).some(error => error !== null);

    if (isLoading) {
        return <div className="loading">Loading dashboard data...</div>
    }

    if (hasError) {
        return (
            <div className="error">
                {Object.entries(errors).map(([section, error]) =>
                    error && <div key={section}>{error}</div>
                )}
            </div>
        )
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
                        title="Total Packages"
                        value={packages.total || 0}
                        icon={<FiPackage size={24} />}
                    />
                    <StatCard
                        title="Active Packages"
                        value={dashboardStats.uniquePackageCount || 0}
                        icon={<FiPackage size={24} />}
                    />
                </div>
                <div className="charts-section">
                    <div className="chart-card">
                        <h3>Package Statistics</h3>
                        <PackageChart data={packages.statistics} />
                    </div>
                    <div className="chart-card">
                        <h3>Top Packages Distribution</h3>
                        <TopPackagesChart data={packages.top} />
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

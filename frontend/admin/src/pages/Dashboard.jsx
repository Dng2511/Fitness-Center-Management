import { useState } from 'react'
import StatCard from '../components/dashboard/StatCard'
import ProfitChart from '../components/dashboard/ProfitChart'
import MemberChart from '../components/dashboard/MemberChart'
import EquipmentChart from '../components/dashboard/EquipmentChart'
import { FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi'
import styles from './Dashboard.module.css'

const Dashboard = ({ equipmentList = [] }) => {
    const [stats] = useState({
        totalMembers: 0,
        monthlyRevenue: 0,
        totalEquipment: equipmentList.length
    })

    // Mock forum data - in a real app, this would come from an API
    const forumPosts = []


    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <StatCard
                        title="Total Members"
                        value={stats.totalMembers}
                        icon={<FiUsers size={24} />}
                    />
                    <StatCard
                        title="Monthly Revenue"
                        value={`${stats.monthlyRevenue.toLocaleString()}₫`}
                        icon={<FiDollarSign size={24} />}
                    />
                    <StatCard
                        title="Available Equipment"
                        value={stats.totalEquipment}
                        icon={<FiActivity size={24} />}
                    />
                </div>
            </section>

            {/* Charts Section */}
            <section className="charts-section">
                <div className="chart-card">
                    <ProfitChart />
                </div>
                <div className="chart-card">
                    <MemberChart />
                </div>
                <div className="chart-card">
                    <EquipmentChart equipmentData={equipmentList} />
                </div>
            </section>

            {/* Read-only Forum Section */}
            <section className={styles['forum-section']}>
                <div className={styles['forum-header']}>
                    <h2>Member comments</h2>

                </div>

                {/* Forum Posts List */}
                <div className={styles['forum-posts']}>
                    {forumPosts.map(post => (
                        <div key={post.id} className={styles['post-card']}>
                            <div className={styles['post-header']}>
                                <div className={styles['post-author']}>
                                    <div className={styles['author-avatar']}>
                                        {post.author[0].toUpperCase()}
                                    </div>
                                    <span className={styles['author-name']}>{post.author}</span>
                                </div>
                                <span className={styles['post-time']}>
                                    {new Date(post.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <p className={styles['post-content']}>{post.content}</p>
                            <div className={styles['post-stats']}>
                                <span className={styles['likes-count']}>❤️ {post.likes} likes</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Dashboard

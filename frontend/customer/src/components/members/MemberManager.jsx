import { useState } from 'react'
import MemberForm from './MemberForm'
import MemberPayments from './MemberPayments'
import { FiUser, FiDollarSign } from 'react-icons/fi'
import styles from './Member.module.css'

export default function MemberManager() {
    const [activeTab, setActiveTab] = useState('register')

/*     const handleSubmit = async (formData) => {
        try {
            const response = await memberAPI.create({
                ...formData,
                status: 'active',
                registrationDate: new Date().toISOString()
            })
            return response
        } catch (err) {
            throw new Error('Failed to register member. Please check your information and try again.')
        }
    } */

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel the registration?')) {
            window.history.back()
        }
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'register':
                return (
                    <MemberForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                )
            case 'payments':
                return <MemberPayments />
            default:
                return null
        }
    }

    return (
        <div className={styles.memberManager}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'register' ? styles.active : ''}`}
                    onClick={() => setActiveTab('register')}
                >
                    <FiUser /> Membership Registration
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'payments' ? styles.active : ''}`}
                    onClick={() => setActiveTab('payments')}
                >
                    <FiDollarSign /> Payments
                </button>
            </div>

            <div className={styles.tabContent}>
                {renderTabContent()}
            </div>
        </div>
    )
}
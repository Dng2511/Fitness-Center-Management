import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiUser } from 'react-icons/fi'
import MemberProfile from '../components/members/MemberProfile'
import MemberPayments from '../components/members/MemberPayments'
import styles from '../components/members/Member.module.css'

export default function MemberDetails() {
    const { id } = useParams()
    const [member, setMember] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                setLoading(true)


                setMember(null)
            } catch (err) {
                setError('Failed to load member details')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMemberDetails()
    }, [id])


    if (loading) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Loading member details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.errorState}>
                <FiUser size={48} />
                <h2>Error Loading Member</h2>
                <p>{error}</p>
            </div>
        )
    }

    if (!member) {
        return (
            <div className={styles.emptyState}>
                <FiUser size={48} />
                <h2>Member Not Found</h2>
                <p>The requested member could not be found.</p>
            </div>
        )
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <FiUser className={styles.titleIcon} />
                    Member Profile
                </h1>
                <div className={styles.memberStatus}>
                    <span className={`${styles.badge} ${styles[`badge${member.status}`]}`}>
                        {member.membershipType}
                    </span>
                </div>
            </div>

            <div className={styles.memberDetailsGrid}>
                <MemberProfile member={member} />
                <MemberPayments memberId={id} />
            </div>
        </div>
    )
}

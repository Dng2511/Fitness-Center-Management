import { FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import styles from './Member.module.css';

export default function MemberProfile({ member }) {
    return (
        <div className={styles.memberCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                    <FiUser className={styles.cardIcon} />
                    Member Profile
                </h3>
            </div>

            <div className={styles.profileSection}>
                <div className={styles.profileDetail}>
                    <span className={styles.detailLabel}>Name</span>
                    <div className={styles.detailValue}>
                        <FiUser className={styles.detailIcon} /> {member.name}
                    </div>
                </div>

                <div className={styles.profileDetail}>
                    <span className={styles.detailLabel}>Email</span>
                    <div className={styles.detailValue}>
                        <FiMail className={styles.detailIcon} /> {member.email || 'Not provided'}
                    </div>
                </div>

                <div className={styles.profileDetail}>
                    <span className={styles.detailLabel}>Phone</span>
                    <div className={styles.detailValue}>
                        <FiPhone className={styles.detailIcon} /> {member.phone || 'Not provided'}
                    </div>
                </div>

                <div className={styles.profileDetail}>
                    <span className={styles.detailLabel}>Join Date</span>
                    <div className={styles.detailValue}>
                        <FiCalendar className={styles.detailIcon} /> {member.joinDate || 'Not available'}
                    </div>
                </div>
            </div>
        </div>
    );
}
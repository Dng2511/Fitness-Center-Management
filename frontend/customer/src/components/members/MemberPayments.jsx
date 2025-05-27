import { FiDollarSign, FiCalendar, FiCreditCard, FiPackage } from 'react-icons/fi';
import styles from './Member.module.css';

export default function MemberPayments({ memberId }) {
    const payments = [];

    return (
        <div className={styles.memberCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                    <FiDollarSign className={styles.cardIcon} /> Payment History
                </h3>
            </div>

            {payments.length === 0 ? (
                <div className={styles.emptyState}>
                    <FiDollarSign className={styles.emptyStateIcon} />
                    <p className={styles.emptyStateText}>No payment history available</p>
                </div>
            ) : (
                <table className={styles.paymentsTable}>
                    <thead>
                        <tr>
                            <th>
                                <FiCalendar /> Date
                            </th>
                            <th>
                                <FiDollarSign /> Amount
                            </th>
                            <th>
                                <FiPackage /> Package
                            </th>
                            <th>
                                <FiCreditCard /> Method
                            </th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.date}</td>
                                <td>${payment.amount}</td>
                                <td>{payment.package}</td>
                                <td>{payment.method}</td>
                                <td>
                                    <span className={`${styles.badge} ${styles[`badge${payment.status}`]}`}>
                                        {payment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
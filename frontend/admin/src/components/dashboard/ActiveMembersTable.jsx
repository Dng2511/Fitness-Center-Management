import React from 'react';
import styles from './Dashboard.module.css';

const ActiveMembersTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className={styles.loading}>No active members found</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.activeMembersTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Package</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Days Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((member, index) => (
                        <tr key={index}>
                            <td>{member.name}</td>
                            <td>{member.phoneNumber}</td>
                            <td>{member.packageName}</td>
                            <td>{new Date(member.packageStartDate).toLocaleDateString()}</td>
                            <td>{new Date(member.packageEndDate).toLocaleDateString()}</td>
                            <td className={member.daysRemaining <= 7 ? styles.warning : ''}>
                                {member.daysRemaining} days
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveMembersTable; 
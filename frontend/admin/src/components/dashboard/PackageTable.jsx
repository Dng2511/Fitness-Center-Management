import React from 'react';
import styles from './Dashboard.module.css';

const PackageTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className={styles.loading}>No package data available</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.packageTable}>
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Registrations</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((pkg, index) => (
                        <tr key={index}>
                            <td>{pkg.name}</td>
                            <td>{pkg.registrations}</td>
                            <td>{pkg.revenue?.toLocaleString()}₫</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PackageTable; 
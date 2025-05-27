export default function StatCard({ title, value, icon, trend, color = 'primary' }) {
    return (
        <div className={`stat-card stat-card-${color}`}>
            <div className={`stat-icon stat-icon-${color}`}>{icon}</div>
            <div className="stat-info">
                <h3>{title}</h3>
                <p className="stat-value">{value}</p>
                {trend && <p className="stat-trend">{trend}</p>}
            </div>
        </div>
    )
}
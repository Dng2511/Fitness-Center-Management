export default function MemberTable({ data, onUpdateNote }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Deposit Amount per Month</th>
                    <th>Registered Packages</th>
                    <th>Member Type</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>
                            No members found
                        </td>
                    </tr>
                ) : (
                    data.map(member => (
                        <tr key={member.id}>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.phone_number}</td>
                            <td>{member.address}</td>
                            <td>{member.monthly_deposit?.toLocaleString()}₫</td>
                            <td>{member.registered_packages?.join(', ') || 'None'}</td>
                            <td>{member.member_type || 'Regular'}</td>
                            <td>
                                <textarea
                                    value={member.notes || ''}
                                    onChange={(e) => onUpdateNote(member.id, e.target.value)}
                                    placeholder="Add notes..."
                                    rows="2"
                                    style={{
                                        width: '100%',
                                        minWidth: '150px',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        resize: 'vertical'
                                    }}
                                />
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

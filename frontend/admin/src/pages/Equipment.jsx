import { FiSearch, FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import EquipmentTable from '../components/equipment/EquipmentTable'
import EquipmentForm from '../components/equipment/EquipmentForm'
import styles from '../components/room/Room.module.css'

export default function Equipment({ equipmentList, onAddEquipment, onDeleteEquipment }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [showForm, setShowForm] = useState(false)

    const handleSearch = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleDelete = (toolId) => {
        if (window.confirm('Are you sure you want to delete this equipment?')) {
            onDeleteEquipment(toolId);
        }
    }

    const filteredEquipment = equipmentList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.toolId.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Gym Equipment</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    <FiPlus /> Add Equipment
                </button>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search by name or tool ID..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="card">
                {filteredEquipment.length === 0 ? (
                    <p className="text-center text-gray-500">No equipment found</p>
                ) : (
                    <EquipmentTable
                        data={filteredEquipment}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {showForm && (
                <EquipmentForm
                    onSubmit={onAddEquipment}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    )
}

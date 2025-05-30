import { FiSearch, FiPlus } from 'react-icons/fi'
import React from 'react'
import EquipmentTable from '../components/equipment/EquipmentTable'
import EquipmentForm from '../components/equipment/EquipmentForm'
import { deleteEquipment, getEquipments } from '../services/Api/equipment'

export default function Equipment() {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [showForm, setShowForm] = React.useState(false)
    const [equipments, setEquipments] = React.useState([]);

    React.useEffect(() => {
        getEquipments().then(({data}) => {
            setEquipments(data.content);
            console.log(data.content);

            })
    }, [])

    const handleSearch = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleDelete = (id) => {
        try {
            deleteEquipment(id);
            setEquipments(prev => 
                prev.filter(equipment => equipment.id !== id)
            )
        } catch (err) {
            console.log(err)
        }
        

    }

    const onAddEquipment = (data) => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Fitness Equipment</h1>
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
                {equipments.length === 0 ? (
                    <p className="text-center text-gray-500">No equipment found</p>
                ) : (
                    <EquipmentTable
                        data={equipments}
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

import { FiSearch, FiPlus } from 'react-icons/fi'
import React from 'react'
import EquipmentTable from '../components/equipment/EquipmentTable'
import EquipmentForm from '../components/equipment/EquipmentForm'
import { createEquipment, deleteEquipment, getEquipments } from '../services/Api/equipment'
import Pagination from '../components/ui/Pagination'

export default function Equipment() {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [showForm, setShowForm] = React.useState(false)
    const [equipments, setEquipments] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    React.useEffect(() => {
        getEquipments(currentPage).then(({ data }) => {
            setEquipments(data.content);
            setTotalPages(data.totalPages);
        })
    }, [currentPage, showForm])

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
            createEquipment(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {showForm && (
                <EquipmentForm
                    onSubmit={onAddEquipment}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    )
}

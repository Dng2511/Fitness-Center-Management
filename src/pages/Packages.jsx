import { FiPlus, FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import PackageTable from '../components/packages/PackageTable'
import PackageForm from '../components/packages/PackageForm'
import Alert from '../components/ui/Alert'

export default function Packages() {
    const [packages, setPackages] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [alert, setAlert] = useState({ show: false, type: '', message: '' })

    useEffect(() => {
        fetchPackages()
    }, [])

    const fetchPackages = () => {
        // In a real application, this would be an API call
        // fetch('/api/packages')
        //     .then(res => res.json())
        //     .then(data => setPackages(data))
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const filteredPackages = packages.filter(pkg =>
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddPackage = () => {
        setSelectedPackage(null)
        setShowForm(true)
    }

    const handleEditPackage = (pkg) => {
        setSelectedPackage(pkg)
        setShowForm(true)
    }

    const handleSubmit = (formData) => {
        if (formData.id) {
            const updatedPackages = packages.map(pkg =>
                pkg.id === formData.id ? { ...pkg, ...formData } : pkg
            )
            setPackages(updatedPackages)
            setAlert({
                show: true,
                type: 'success',
                message: 'Package updated successfully'
            })
        } else {
            const newPackage = {
                ...formData,
                id: Date.now()
            }
            setPackages([...packages, newPackage])
            setAlert({
                show: true,
                type: 'success',
                message: 'Package added successfully'
            })
        }
        setShowForm(false)
    }

    const handleDeletePackage = (id) => {
        const updatedPackages = packages.filter(pkg => pkg.id !== id)
        setPackages(updatedPackages)
        setAlert({
            show: true,
            type: 'success',
            message: 'Package deleted successfully'
        })
    }

    return (
        <div className="page-container">
            <Alert
                isVisible={alert.show}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, show: false })}
            />

            <div className="page-header">
                <h1 className="page-title">Gym Packages</h1>
                <button className="btn btn-primary" onClick={handleAddPackage}>
                    <FiPlus /> Add Package
                </button>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <PackageForm
                        initialData={selectedPackage}
                        onSubmit={handleSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            <div className="card">
                <PackageTable
                    data={filteredPackages}
                    onEdit={handleEditPackage}
                    onDelete={handleDeletePackage}
                />
            </div>
        </div>
    )
}

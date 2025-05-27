import { FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import PackageTable from '../components/packages/PackageTable'
import Alert from '../components/ui/Alert'

export default function Packages() {
    const [packages, setPackages] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [alert, setAlert] = useState({ show: false, type: '', message: '' })

    useEffect(() => {
        fetchPackages()
    }, [])

    const fetchPackages = () => {

    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const filteredPackages = packages.filter(pkg =>
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

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

            <div className="card">
                <PackageTable
                    data={filteredPackages}
                />
            </div>
        </div>
    )
}

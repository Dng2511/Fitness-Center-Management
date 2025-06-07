import { FiSearch } from 'react-icons/fi'
import React from 'react'
import MemberTable from '../components/members/MemberTable'
import { getMembers } from '../services/Api/member'
import Pagination from '../components/ui/Pagination'

export default function Members() {
    const [members, setMembers] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPages, setTotalPages] = React.useState(1)

    React.useEffect(() => {
        getMembers(currentPage).then(({ data }) => {
            setMembers(data.content)
            setTotalPages(data.totalPages)
        })
    }, [currentPage])

    const handleUpdateNote = (memberId, newNote) => {
        setMembers(prevMembers =>
            prevMembers.map(member =>
                member.id === memberId
                    ? { ...member, notes: newNote }
                    : member
            )
        )
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const filteredMembers = members.filter(member => {
        const name = member.name?.toLowerCase() || ""
        const phone = member.phone?.toLowerCase() || ""
        const query = searchQuery.toLowerCase()
        return name.includes(query) || phone.includes(query)
    })

    return (
        <div className="members-page">
            <div className="page-header">
                <h1 className="page-title">Members Management</h1>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search members by name, phone, ..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="card">
                <MemberTable
                    data={filteredMembers}
                    onUpdateNote={handleUpdateNote}
                />
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

import { FiSearch } from 'react-icons/fi'
import React from 'react'
import MemberTable from '../components/members/MemberTable'
import { getMembers } from '../services/Api/member'

export default function Members() {
    const [members, setMembers] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('')


    React.useEffect(() => {
        getMembers().then(({ data }) => setMembers(data.content))
    }, [])


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
                    data={members}
                    onUpdateNote={handleUpdateNote}
                />
            </div>
        </div>
    )
}

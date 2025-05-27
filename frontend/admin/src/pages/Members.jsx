import { FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import MemberTable from '../components/members/MemberTable'

export default function Members() {
    const [members, setMembers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredMembers, setFilteredMembers] = useState([])

    // Load members from localStorage on component mount
    useEffect(() => {
        const savedMembers = localStorage.getItem('gym_members')
        if (savedMembers) {
            setMembers(JSON.parse(savedMembers))
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('gym_members', JSON.stringify(members))
    }, [members])


    useEffect(() => {
        const filtered = members.filter(member =>
            member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.phone_number?.includes(searchQuery) ||
            member.notes?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredMembers(filtered)
    }, [members, searchQuery])

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
                    data={filteredMembers}
                    onUpdateNote={handleUpdateNote}
                />
            </div>
        </div>
    )
}

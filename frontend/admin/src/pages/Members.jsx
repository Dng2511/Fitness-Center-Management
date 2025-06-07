import { FiSearch } from 'react-icons/fi'
import React from 'react'
import MemberTable from '../components/members/MemberTable'
import { getMembers } from '../services/Api/member'
import Pagination from '../components/pagination';

export default function Members() {
    const [members, setMembers] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [totalPages, setTotalPages] = React.useState();
    const [page, setPage] = React.useState(1);


    React.useEffect(() => {
        getMembers({params:{value: searchQuery}}).then(({ data }) => {
            setMembers(data.content);
            setTotalPages(data.totalPages);
        })
    }, [page])

    React.useEffect(() => {
        getMembers({params:{value: searchQuery}}).then(({ data }) => {
            setMembers(data.content);
            setPage(1);
            setTotalPages(data.totalPages);
        })
    }, [searchQuery])




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

    const handlePrevPage = () => {
        setPage(prev => prev-1);
    }

    const handleNextPage = () => {
        setPage(prev => prev+1);
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


            <Pagination handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} totalPages={totalPages} page={page}/>
        </div>

        
    )
}

import React, { useState } from 'react';
import RoomTable from '../components/room/RoomTable';
import RoomForm from '../components/room/RoomForm';
import RoomDetails from '../components/room/RoomDetails';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { getRooms, updateRoom } from '../services/Api/room';

export default function Room() {
    const [roomList, setRoomList] = useState([]);
    const [lastUsedId, setLastUsedId] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    React.useEffect(() => {
        getRooms().then(({data}) => {
            setRoomList(data)
            console.log(data)})
    }, [showForm])


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleAdd = () => {
        setSelectedRoom(null);
        setShowForm(true);
    };

    const handleViewDetails = (room) => {
        setSelectedRoom(room);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedRoom(null);
    };


    const handleStatusToggle = (room) => {
            const statusCycle = ['AVAILABLE', 'FULL', 'MAINTENANCE', 'CLOSED'];
            const currentIndex = statusCycle.indexOf(room.status);
            const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    
            updateRoom(room.id, {
                ...room,
                status: nextStatus
            });
    
            setRoomList(prev =>
                prev.map(r => r.id === room.id ? { ...r, status: nextStatus } : r)
            );
        };

    const handleSubmit = (formData) => {
        if (formData.id) {
            setRoomList(roomList.map(room =>
                room.id === formData.id ? { ...room, ...formData } : room
            ));
        } else {
            const newId = lastUsedId + 1;
            const newRoom = {
                ...formData,
                id: newId,
                equipment: []
            };
            setRoomList([...roomList, newRoom]);
            setLastUsedId(newId);
        }
        setShowForm(false);
        setSelectedRoom(null);
    };


    const filteredRooms = roomList.filter(room =>
        room.room_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Room Management</h1>
                <button
                    className={`btn btn-primary ${(showForm || showDetails) ? 'disabled' : ''}`}
                    onClick={handleAdd}
                    disabled={showForm || showDetails}
                >
                    <FiPlus /> Add Room
                </button>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="card">
                {filteredRooms.length === 0 ? (
                    <p className="text-center text-gray-500">No rooms found</p>
                ) : (
                    <RoomTable
                        data={filteredRooms}
                        onViewDetails={handleViewDetails}
                        isBlurred={showForm || showDetails}
                        onChangeStatus={handleStatusToggle}
                    />
                )}
            </div>

            {showForm && (
                <RoomForm
                    initialData={selectedRoom}
                    onSubmit={handleSubmit}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedRoom(null);
                    }}
                />
            )}

            {showDetails && (
                <RoomDetails
                    room={selectedRoom}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
}

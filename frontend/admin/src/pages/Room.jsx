import { useState } from 'react';
import RoomTable from '../components/room/RoomTable';
import RoomForm from '../components/room/RoomForm';
import RoomDetails from '../components/room/RoomDetails';
import { FiPlus, FiSearch } from 'react-icons/fi';
import styles from '../components/room/Room.module.css';

export default function Room({ equipmentList, onAddEquipment }) {
    const [roomList, setRoomList] = useState([]);
    const [lastUsedId, setLastUsedId] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

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

    const handleUpdateRoom = (updatedRoom) => {
        setRoomList(roomList.map(room =>
            room.id === updatedRoom.id ? updatedRoom : room
        ));
        if (selectedRoom && selectedRoom.id === updatedRoom.id) {
            setSelectedRoom(updatedRoom);
        }
    };

    const filteredRooms = roomList.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                        onUpdateRoom={handleUpdateRoom}
                        isBlurred={showForm || showDetails}
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
                    onUpdateRoom={handleUpdateRoom}
                    equipmentList={equipmentList}
                    onAddEquipment={onAddEquipment}
                />
            )}
        </div>
    );
}

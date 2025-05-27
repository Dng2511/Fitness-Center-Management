import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import RoomTable from '../components/room/RoomTable';
import RoomDetails from '../components/room/RoomDetails';
import styles from '../components/room/Room.module.css';

export default function Room({ equipmentList, onAddEquipment }) {
    const [roomList, setRoomList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleViewDetails = (room) => {
        setSelectedRoom(room);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
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
                        isBlurred={showDetails}
                    />
                )}
            </div>

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

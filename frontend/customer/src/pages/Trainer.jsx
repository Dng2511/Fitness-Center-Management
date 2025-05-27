import { FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import TrainerTable from '../components/trainer/TrainerTable';

export default function Trainer() {
    const [trainers, setTrainers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const mockTrainers = [];
            setTrainers(mockTrainers);
        } catch (err) {
            setError('Failed to fetch trainers');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTrainers = trainers.filter(trainer =>
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <div className="loading">Loading...</div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Trainer Management</h1>
            </div>

            <div className="search-bar">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search trainers..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                {filteredTrainers.length === 0 ? (
                    <p className="text-center text-gray-500">No trainers found</p>
                ) : (
                    <TrainerTable
                        data={filteredTrainers}
                    />
                )}
            </div>
        </div>
    );
}

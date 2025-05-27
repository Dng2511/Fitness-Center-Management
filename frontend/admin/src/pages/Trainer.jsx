import { FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import TrainerTable from '../components/trainer/TrainerTable';
import TrainerForm from '../components/trainer/TrainerForm';

export default function Trainer() {
    const [trainers, setTrainers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTrainer, setEditingTrainer] = useState(null);
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

    const handleAddTrainer = () => {
        setEditingTrainer(null);
        setShowForm(true);
    };

    const handleEdit = (trainer) => {
        setEditingTrainer(trainer);
        setShowForm(true);
    };

    const handleDelete = async (trainerId) => {
        try {
            setTrainers(trainers.filter(t => t.id !== trainerId));
        } catch (err) {
            setError('Failed to delete trainer');
            console.error(err);
        }
    };

    const handleSubmit = (formData) => {
        if (formData.id) {
            setTrainers(trainers.map(trainer =>
                trainer.id === formData.id ? { ...trainer, ...formData } : trainer
            ));
        } else {
            const newTrainer = {
                ...formData,
                id: Date.now()
            };
            setTrainers([...trainers, newTrainer]);
        }
        setShowForm(false);
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
                <button className="btn btn-primary" onClick={handleAddTrainer}>
                    <FiPlus /> Add Trainer
                </button>
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
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {showForm && (
                <TrainerForm
                    initialData={editingTrainer}
                    onSubmit={handleSubmit}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
}

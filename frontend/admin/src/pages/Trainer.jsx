import { FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import TrainerTable from '../components/trainer/TrainerTable';
import TrainerForm from '../components/trainer/TrainerForm';
import { createTrainer, getTrainers } from '../services/Api/trainer';

export default function Trainer() {
    const [trainers, setTrainers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [editingTrainer, setEditingTrainer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTrainers({
            params: {
                page: page
            }
        }).then(({data}) => {
            setTrainers(data.content);
        })
    }, [page])

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

    const handleSubmit = async ({formData}) => {
        console.log(formData)
        await createTrainer(formData);

        setShowForm(false);
    };



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
                {trainers.length === 0 ? (
                    <p className="text-center text-gray-500">No trainers found</p>
                ) : (
                    <TrainerTable
                        data={trainers}
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

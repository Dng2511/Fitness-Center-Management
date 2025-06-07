import { FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import TrainerTable from '../components/trainer/TrainerTable';
import TrainerForm from '../components/trainer/TrainerForm';
import { getTrainer, createTrainer, editTrainer, deleteTrainer } from '../services/Api/trainer';
import Pagination from '../components/ui/Pagination';

export default function Trainer() {
    const [trainers, setTrainers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTrainer, setEditingTrainer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getTrainer(currentPage).then(({ data }) => {
            setTrainers(data.content);
            setTotalPages(data.totalPages);
        });
    }, [currentPage, showForm]);

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
            await deleteTrainer(trainerId);
            setTrainers(trainers.filter(t => t.id !== trainerId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (formData.id) {
                const { data } = await editTrainer(formData.id, formData);
                setTrainers(trainers.map(trainer =>
                    trainer.id === formData.id ? data : trainer
                ));
            } else {
                const { data } = await createTrainer(formData);
                setTrainers([...trainers, data]);
            }
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredTrainers = trainers.filter(trainer => {
        const name = trainer.name?.toLowerCase() || "";
        const email = trainer.email?.toLowerCase() || "";
        const specialization = Array.isArray(trainer.specializations)
            ? trainer.specializations.join(", ").toLowerCase()
            : (trainer.specialization?.toLowerCase() || "");
        const query = searchQuery.toLowerCase();
        return (
            name.includes(query) ||
            email.includes(query) ||
            specialization.includes(query)
        );
    });

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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

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

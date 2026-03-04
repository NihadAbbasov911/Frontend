import { useState, useEffect } from 'react';
import { getAllCities, createCity, deleteCity } from '../../api/citiesApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import './AdminPages.css';

export default function ManageCities() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) { navigate('/'); return; }
        fetchCities();
    }, []);

    const fetchCities = () => {
        getAllCities().then(r => setCities(r.data)).catch(() => { }).finally(() => setLoading(false));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await createCity({ name });
            toast.success('Şəhər əlavə edildi!');
            setName('');
            fetchCities();
        } catch (err) { toast.error(err.response?.data?.message || 'Xəta'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Silmək istəyirsiniz?')) return;
        try {
            await deleteCity(id);
            toast.success('Şəhər silindi!');
            setCities(cities.filter(c => c.id !== id));
        } catch (err) { toast.error(err.response?.data?.message || 'Xəta'); }
    };

    if (loading) return <div className="page loading-page"><div className="spinner"></div></div>;

    return (
        <div className="page container admin-crud">
            <div className="crud-header">
                <h1>📍 Şəhərlər</h1>
            </div>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', marginBottom: 24 }}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Yeni şəhər adı" style={{ flex: 1 }} />
                <button type="submit" className="btn btn-primary"><FiPlus /> Əlavə Et</button>
            </form>
            <table className="data-table">
                <thead><tr><th>ID</th><th>Ad</th><th></th></tr></thead>
                <tbody>
                    {cities.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}><FiTrash2 /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { getAllBrands, createBrand, deleteBrand } from '../../api/brandsApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import './AdminPages.css';

export default function ManageBrands() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) { navigate('/'); return; }
        fetchBrands();
    }, []);

    const fetchBrands = () => {
        getAllBrands().then(r => setBrands(r.data)).catch(() => { }).finally(() => setLoading(false));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await createBrand({ name });
            toast.success('Marka əlavə edildi!');
            setName('');
            fetchBrands();
        } catch (err) { toast.error(err.response?.data?.message || 'Xəta'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Silmək istəyirsiniz?')) return;
        try {
            await deleteBrand(id);
            toast.success('Marka silindi!');
            setBrands(brands.filter(b => b.id !== id));
        } catch (err) { toast.error(err.response?.data?.message || 'Xəta'); }
    };

    if (loading) return <div className="page loading-page"><div className="spinner"></div></div>;

    return (
        <div className="page container admin-crud">
            <div className="crud-header">
                <h1>🏷️ Markalar</h1>
            </div>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', marginBottom: 24 }}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Yeni marka adı" style={{ flex: 1 }} />
                <button type="submit" className="btn btn-primary"><FiPlus /> Əlavə Et</button>
            </form>
            <table className="data-table">
                <thead><tr><th>ID</th><th>Ad</th><th></th></tr></thead>
                <tbody>
                    {brands.map(b => (
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.name}</td>
                            <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.id)}><FiTrash2 /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

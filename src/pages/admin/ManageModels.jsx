import { useState, useEffect } from 'react';
import { getAllModels, createModel, deleteModel } from '../../api/modelsApi';
import { getAllBrands } from '../../api/brandsApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import './AdminPages.css';

export default function ManageModels() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState('');
    const [brandId, setBrandId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) { navigate('/'); return; }
        getAllModels().then(r => setModels(r.data)).catch(() => { });
        getAllBrands().then(r => setBrands(r.data)).catch(() => { });
        setLoading(false);
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim() || !brandId) return;
        try {
            await createModel({ name, brandId: parseInt(brandId) });
            toast.success('Model əlavə edildi!');
            setName(''); setBrandId('');
            getAllModels().then(r => setModels(r.data));
        } catch (err) { toast.error(err.response?.data?.message || 'Xəta'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Silmək istəyirsiniz?')) return;
        try {
            await deleteModel(id);
            toast.success('Model silindi!');
            setModels(models.filter(m => m.id !== id));
        } catch (err) { toast.error(err.response?.data?.message || 'Xəta'); }
    };

    if (loading) return <div className="page loading-page"><div className="spinner"></div></div>;

    return (
        <div className="page container admin-crud">
            <div className="crud-header">
                <h1>🚘 Modellər</h1>
            </div>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', marginBottom: 24, flexWrap: 'wrap' }}>
                <select value={brandId} onChange={e => setBrandId(e.target.value)} style={{ minWidth: 160 }} required>
                    <option value="">Marka seçin</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Model adı" style={{ flex: 1 }} />
                <button type="submit" className="btn btn-primary"><FiPlus /> Əlavə Et</button>
            </form>
            <table className="data-table">
                <thead><tr><th>ID</th><th>Model</th><th>Marka</th><th></th></tr></thead>
                <tbody>
                    {models.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.name}</td>
                            <td>{brands.find(b => b.id === m.brandId)?.name || m.brandId}</td>
                            <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}><FiTrash2 /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

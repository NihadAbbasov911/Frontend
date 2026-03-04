import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../../api/adminApi';
import { useAuth } from '../../context/AuthContext';
import { FiUsers, FiTruck, FiList, FiActivity } from 'react-icons/fi';
import './AdminPages.css';

export default function AdminDashboard() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) { navigate('/'); return; }
        getDashboardStats().then(r => setStats(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="page loading-page"><div className="spinner"></div></div>;

    return (
        <div className="page container">
            <div className="section-header">
                <h1>🛡️ Admin Panel</h1>
                <p>Platformanın idarəsi</p>
            </div>

            {stats && (
                <div className="grid-4" style={{ marginBottom: 40 }}>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }}><FiUsers /></div>
                        <div className="stat-info"><h3>{stats.totalUsers}</h3><p>İstifadəçilər</p></div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--success)' }}><FiTruck /></div>
                        <div className="stat-info"><h3>{stats.totalCars}</h3><p>Maşınlar</p></div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--info)' }}><FiList /></div>
                        <div className="stat-info"><h3>{stats.activeListings}</h3><p>Aktiv Elanlar</p></div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--warning)' }}><FiActivity /></div>
                        <div className="stat-info"><h3>{stats.liveAuctions}</h3><p>Canlı Hərraclar</p></div>
                    </div>
                </div>
            )}

            <div className="grid-3">
                <Link to="/admin/brands" className="card" style={{ padding: '28px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>🏷️ Markalar</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Marka əlavə et, sil</p>
                </Link>
                <Link to="/admin/models" className="card" style={{ padding: '28px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>🚘 Modellər</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Model əlavə et, sil</p>
                </Link>
                <Link to="/admin/cities" className="card" style={{ padding: '28px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>📍 Şəhərlər</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Şəhər əlavə et, sil</p>
                </Link>
            </div>
        </div>
    );
}

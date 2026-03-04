import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <span className="footer-logo">⚡ AUCTO</span>
                    <p>Azərbaycanın premium avtomobil hərrac platforması</p>
                </div>
                <div className="footer-links">
                    <a href="/cars">Maşınlar</a>
                    <a href="/auctions">Hərraclar</a>
                    <a href="/create-ad">Elan Ver</a>
                </div>
                <div className="footer-copy">
                    © {new Date().getFullYear()} Aucto. Bütün hüquqlar qorunur.
                </div>
            </div>
        </footer>
    );
}

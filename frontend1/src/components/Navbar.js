import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Importa los estilos

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <img src="\public\logo.jpg" alt="Logo" />
        <span>IUDigital Peliculas</span>
        <img src="/icons/logo.jpg" alt="Popcorn" />
      </div>
      <div className="nav-links">
        <Link to="/dashboard">DASHBOARD</Link>
        <Link to="/generos">GÉNEROS</Link>
        <Link to="/directores">DIRECTORES</Link>
        <Link to="/productoras">PRODUCTORAS</Link>
        <Link to="/tipos">TIPOS</Link>
        <Link to="/peliculas">PELÍCULAS</Link>
      </div>
    </nav>
  );
}

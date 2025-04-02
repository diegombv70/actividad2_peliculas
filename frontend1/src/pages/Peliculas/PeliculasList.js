import React, { useState, useEffect } from "react";
import { getPeliculas, addPelicula, getGeneros, getDirectores, getProductoras, getTipos } from "../../services/api";
import "../../styles/PeliculasList.css";

const PeliculasList = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [imagen, setImagen] = useState("");
    const [url, setUrl] = useState("");
    const [anioEstreno, setAnioEstreno] = useState("");
    const [search, setSearch] = useState("");
    const [modoAgregar, setModoAgregar] = useState(false);

    // Estados para los selects de campos relacionados
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    // Estados para las selecciones actuales
    const [generoSeleccionado, setGeneroSeleccionado] = useState("");
    const [directorSeleccionado, setDirectorSeleccionado] = useState("");
    const [productoraSeleccionada, setProductoraSeleccionada] = useState("");
    const [tipoSeleccionado, setTipoSeleccionado] = useState("");

    useEffect(() => {
        getPeliculas().then(setPeliculas);
    }, []);

    // Cargar datos para los selects cuando se active el modo agregar
    useEffect(() => {
        if (modoAgregar) {
            getGeneros().then(data => {
                console.log("📌 Géneros recibidos:", data);  // Debug
                setGeneros(data);
                if (data.length > 0) setGeneroSeleccionado(data[0].id);
            });

            getDirectores().then(data => {
                console.log("📌 Directores recibidos:", data);  // Debug
                setDirectores(data);
                if (data.length > 0) setDirectorSeleccionado(data[0].id);
            });

            getProductoras().then(data => {
                console.log("📌 Productoras recibidas:", data);  // Debug
                setProductoras(data);
                if (data.length > 0) setProductoraSeleccionada(data[0].id);
            });

            getTipos().then(data => {
                console.log("📌 Tipos recibidos:", data);  // Debug
                setTipos(data);
                if (data.length > 0) setTipoSeleccionado(data[0].id);
            });
        }
    }, [modoAgregar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevaPelicula = {
            serial: `SERIAL-${Date.now()}`,
            titulo,
            sinopsis,
            url,
            imagen,
            anio_estreno: parseInt(anioEstreno, 10),
            genero_id: parseInt(generoSeleccionado, 10),
            director_id: parseInt(directorSeleccionado, 10),
            productora_id: parseInt(productoraSeleccionada, 10),
            tipo_id: parseInt(tipoSeleccionado, 10)
        };

        try {
            await addPelicula(nuevaPelicula);
            alert("✅ Película agregada correctamente!");
            // Limpiar campos
            setTitulo("");
            setSinopsis("");
            setImagen("");
            setUrl("");
            setAnioEstreno("");
            getPeliculas().then(setPeliculas);
        } catch (error) {
            console.error("❌ Error al agregar película:", error);
            alert("❌ No se pudo agregar la película. Revisa la consola.");
        }
    };

    // Filtrar películas por búsqueda
    const peliculasFiltradas = peliculas.filter((pelicula) =>
        pelicula.titulo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="peliculas-container">
            <nav className="menu">
                <button onClick={() => setModoAgregar(false)}>🔍 Buscar Películas</button>
                <button onClick={() => setModoAgregar(true)}>➕ Agregar Película</button>
            </nav>

            {modoAgregar ? (
                <div className="form-container">
                    <h2>Agregar Película</h2>
                    <form onSubmit={handleSubmit} className="pelicula-form">
                        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                        <textarea placeholder="Sinopsis" value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} />
                        <input type="text" placeholder="URL de la imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
                        <input type="text" placeholder="Enlace de la película" value={url} onChange={(e) => setUrl(e.target.value)} required />
                        <input type="number" placeholder="Año de estreno" value={anioEstreno} onChange={(e) => setAnioEstreno(e.target.value)} required />

                        <select value={generoSeleccionado} onChange={(e) => setGeneroSeleccionado(e.target.value)} required>
                            {generos.map((genero) => (
                                <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                            ))}
                        </select>

                        <select value={directorSeleccionado} onChange={(e) => setDirectorSeleccionado(e.target.value)} required>
                            {directores.map((director) => (
                                <option key={director.id} value={director.id}>{director.nombres}</option>
                            ))}
                        </select>

                        <select value={productoraSeleccionada} onChange={(e) => setProductoraSeleccionada(e.target.value)} required>
                            {productoras.map((prod) => (
                                <option key={prod.id} value={prod.id}>{prod.nombre}</option>
                            ))}
                        </select>

                        <select value={tipoSeleccionado} onChange={(e) => setTipoSeleccionado(e.target.value)} required>
                            {tipos.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                            ))}
                        </select>

                        <button type="submit">Agregar</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Buscar Películas</h2>
                    <input 
                        type="text" 
                        placeholder="Buscar por título..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="search-bar"
                    />
                    <div className="peliculas-grid">
                        {peliculasFiltradas.length > 0 ? (
                            peliculasFiltradas.map((pelicula) => (
                                <div key={pelicula.id} className="pelicula-card">
                                    <img src={pelicula.imagen} alt={pelicula.titulo} className="pelicula-img"/>
                                    <div className="pelicula-info">
                                        <h3>{pelicula.titulo}</h3>
                                        <p><strong>Año:</strong> {pelicula.anio_estreno}</p>
                                        <p><strong>Sinopsis:</strong> {pelicula.sinopsis || "No disponible"}</p>
                                        <a href={pelicula.url} target="_blank" rel="noopener noreferrer" className="ver-mas-btn">Ver más</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>⚠️ No se encontraron películas.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeliculasList;

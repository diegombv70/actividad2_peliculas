import { useEffect, useState } from "react";
import { addPelicula, getGeneros, getDirectores, getProductoras, getTipos } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AddPelicula = () => {
    const [titulo, setTitulo] = useState("");
    const [url, setUrl] = useState("");
    const [imagen, setImagen] = useState("");
    const [anioEstreno, setAnioEstreno] = useState("");

    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    const [generoSeleccionado, setGeneroSeleccionado] = useState("");
    const [directorSeleccionado, setDirectorSeleccionado] = useState("");
    const [productoraSeleccionada, setProductoraSeleccionada] = useState("");
    const [tipoSeleccionado, setTipoSeleccionado] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const generosData = await getGeneros();
                setGeneros(generosData.filter(g => g.estado.trim().toLowerCase() === "activo"));

                const directoresData = await getDirectores();
                setDirectores(directoresData.filter(d => d.estado.trim().toLowerCase() === "activo"));

                const productorasData = await getProductoras();
                setProductoras(productorasData.filter(p => p.estado.trim().toLowerCase() === "activo"));

                const tiposData = await getTipos();
                setTipos(tiposData.filter(t => t.estado.trim().toLowerCase() === "activo"));

                // Establecer valores iniciales vacíos
                setGeneroSeleccionado("");
                setDirectorSeleccionado("");
                setProductoraSeleccionada("");
                setTipoSeleccionado("");
            } catch (error) {
                console.error("❌ Error al cargar los datos:", error);
            }
        };
        cargarDatos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titulo || !url || !imagen || !anioEstreno || !generoSeleccionado || !directorSeleccionado || !productoraSeleccionada || !tipoSeleccionado) {
            alert("Todos los campos deben estar llenos.");
            return;
        }

        const nuevaPelicula = {
            titulo,
            url,
            imagen,
            anio_estreno: anioEstreno,
            id_genero: generoSeleccionado,
            id_director: directorSeleccionado,
            id_productora: productoraSeleccionada,
            id_tipo: tipoSeleccionado
        };

        try {
            await addPelicula(nuevaPelicula);
            alert("Película agregada con éxito.");
            navigate("/");
        } catch (error) {
            console.error("❌ Error al agregar la película:", error);
            alert("Error al agregar la película.");
        }
    };

    return (
        <div>
            <h2>Agregar Película</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div>
                    <label>URL:</label>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
                </div>
                <div>
                    <label>Año de Estreno:</label>
                    <input type="number" value={anioEstreno} onChange={(e) => setAnioEstreno(e.target.value)} required />
                </div>

                <div>
                    <label>Género:</label>
                    <select value={generoSeleccionado} onChange={(e) => setGeneroSeleccionado(e.target.value)} required>
                        <option value="" disabled>Seleccione un género</option>
                        {generos.map((genero) => (
                            <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Director:</label>
                    <select value={directorSeleccionado} onChange={(e) => setDirectorSeleccionado(e.target.value)} required>
                        <option value="" disabled>Seleccione un director</option>
                        {directores.map((d) => (
                            <option key={d.id} value={d.id}>{d.nombres}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Productora:</label>
                    <select value={productoraSeleccionada} onChange={(e) => setProductoraSeleccionada(e.target.value)} required>
                        <option value="" disabled>Seleccione una productora</option>
                        {productoras.map((p) => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Tipo:</label>
                    <select value={tipoSeleccionado} onChange={(e) => setTipoSeleccionado(e.target.value)} required>
                        <option value="" disabled>Seleccione un tipo</option>
                        {tipos.map((t) => (
                            <option key={t.id} value={t.id}>{t.nombre}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Agregar Película</button>
            </form>
        </div>
    );
};

export default AddPelicula;

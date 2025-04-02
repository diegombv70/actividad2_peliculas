import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDirectorById, updateDirectores } from "../../services/api";
import '../../styles/update.css';

const UpdateDirector = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [director, setDirector] = useState({
        nombres: "",
        estado: "",
    });

    useEffect(() => {
        console.log("ID recibido:", id);

        if (!id) {
            console.error("Error: No se recibió un ID válido.");
            return;
        }

        getDirectorById(id)
            .then((data) => {
                if (!data) {
                    console.error("Error: No se encontró el director.");
                    return;
                }
                setDirector({
                    nombres: data.nombres || "",
                    estado: data.estado || "",
                });
            })
            .catch((error) => console.error("Error obteniendo director:", error));
    }, [id]);

    const handleChange = (e) => {
        setDirector({ ...director, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDirectores(id, director);
            alert("✅ Director actualizado correctamente!");
            navigate("/directores");
        } catch (error) {
            console.error("❌ Error al actualizar director:", error);
            alert("❌ No se pudo actualizar el director. Revisa la consola.");
        }
    };

    if (!id) {
        return <p className="error-message">Error: No se encontró el ID del director.</p>;
    }

    return (
        <div className="update-container">
            <h2>Actualizar Director</h2>
            <form onSubmit={handleSubmit} className="update-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombres" 
                        value={director.nombres} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Estado:</label>
                    <select 
                        name="estado" 
                        value={director.estado} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <button type="submit" className="btn-actualizar">
                    Actualizar Director
                </button>
            </form>
        </div>
    );
};

export default UpdateDirector;

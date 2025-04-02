import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGeneroById, updateGenero } from "../../services/api";
import '../../styles/update.css'

const UpdateGenero = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [genero, setGenero] = useState({
        nombre: "",
        estado: "",
        descripcion: ""
    });

    useEffect(() => {
        if (!id) {
            console.error("Error: No se recibió un ID válido.");
            return;
        }

        getGeneroById(id)
            .then((data) => {
                if (!data) {
                    console.error("Error: No se encontró el género.");
                    return;
                }
                setGenero({
                    nombre: data.nombre || "",
                    estado: data.estado || "",
                    descripcion: data.descripcion || ""
                });
            })
            .catch((error) => console.error("Error obteniendo género:", error));
    }, [id]);

    const handleChange = (e) => {
        setGenero({ ...genero, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateGenero(id, genero);
            alert("✅ Género actualizado correctamente!");
            navigate("/generos");
        } catch (error) {
            console.error("❌ Error al actualizar género:", error);
            alert("❌ No se pudo actualizar el género.");
        }
    };

    return (
        <div className="update-container">
            <div className="update-card">
                <h2 className="update-title">Actualizar Género</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Nombre:</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            value={genero.nombre} 
                            onChange={handleChange} 
                            className="input-field"
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Estado:</label>
                        <select 
                            name="estado" 
                            value={genero.estado} 
                            onChange={handleChange} 
                            className="input-field"
                            required
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Descripción:</label>
                        <textarea 
                            name="descripcion" 
                            value={genero.descripcion} 
                            onChange={handleChange} 
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="btn-actualizar">
                        <i className="fas fa-save"></i> Actualizar Género
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateGenero;

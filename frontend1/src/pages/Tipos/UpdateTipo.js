import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTipoById, updateTipo } from "../../services/api";

const UpdateTipo = () => {
    const { id } = useParams(); // Obtener el ID desde la URL
    const navigate = useNavigate();
    
    const [tipo, setTipo] = useState({
        nombre: "",
        estado: "",
        descripcion: ""
    });

    useEffect(() => {
        console.log("ID recibido:", id);

        if (!id) {
            console.error("Error: No se recibió un ID válido.");
            return;
        }

        getTipoById(id)
            .then((data) => {
                if (!data) {
                    console.error("Error: No se encontró el género.");
                    return;
                }
                setTipo({
                    nombre: data.nombre || "",
                    estado: data.estado || "",
                    descripcion: data.descripcion || ""
                });
            })
            .catch((error) => console.error("Error obteniendo género:", error));
    }, [id]);

    const handleChange = (e) => {
        setTipo({ ...tipo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTipo(id, tipo);
            alert("✅ Tipos actualizado correctamente!");
            navigate("/tipos"); // Redirigir a la lista de tipos
        } catch (error) {
            console.error("❌ Error al actualizar género:", error);
            alert("❌ No se pudo actualizar el género. Revisa la consola.");
        }
    };

    if (!id) {
        return <p className="text-red-500">Error: No se encontró el ID del género.</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Actualizar Tipos</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={tipo.nombre} 
                        onChange={handleChange} 
                        className="border rounded w-full p-2"
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Estado:</label>
                    <select 
                        name="estado" 
                        value={tipo.estado} 
                        onChange={handleChange} 
                        className="border rounded w-full p-2"
                        required
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        value={tipo.descripcion} 
                        onChange={handleChange} 
                        className="border rounded w-full p-2"
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                    Actualizar Tipos
                </button>
            </form>
        </div>
    );
};

export default UpdateTipo;

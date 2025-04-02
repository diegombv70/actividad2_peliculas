import React, { useState } from "react";
import { addTipo } from "../../services/api";

const AddTipo = () => {
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("Activo");
    const [descripcion, setDescripcion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTipo({ nombre, estado, descripcion });
            setNombre("");
            setEstado("Activo");
            setDescripcion("");
            alert("✅ Tipo agregado correctamente!");
        } catch (error) {
            console.error("❌ Error al agregar tipo:", error);
            alert("❌ No se pudo agregar el tipo. Revisa la consola.");
        }
    };

    return (
        <div>
            <h2>Agregar Tipo</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />
                <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                <textarea 
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default AddTipo;

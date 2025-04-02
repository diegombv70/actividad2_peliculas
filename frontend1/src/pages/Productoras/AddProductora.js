import React, { useState } from "react";
import { addProductora } from "../../services/api";

const AddProductora = () => {
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("Activo");
    const [slogan, setSlogan] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!nombre.trim()) {
            alert("❌ El nombre es obligatorio.");
            return;
        }

        console.log("📤 Enviando:", { nombre, estado, slogan, descripcion });

        try {
            await addProductora({ nombre, estado, slogan, descripcion });

            // Resetear el formulario después de agregar
            setNombre("");
            setEstado("Activo");
            setSlogan("");
            setDescripcion("");

            alert("✅ Productora agregada correctamente!");
        } catch (error) {
            console.error("❌ Error al agregar Productora:", error);
            alert("❌ No se pudo agregar la Productora. Revisa la consola.");
        }
    };

    return (
        <div>
            <h2>Agregar Productora</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Slogan (opcional)" 
                    value={slogan} 
                    onChange={(e) => setSlogan(e.target.value)} 
                />
                <textarea
                    placeholder="Descripción (opcional)"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default AddProductora;

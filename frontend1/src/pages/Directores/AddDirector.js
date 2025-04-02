import React, { useState } from "react";
import { addDirector } from "../../services/api";

const AddDirector = () => {
    const [nombres, setnombre] = useState("");
    const [estado, setEstado] = useState("Activo");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDirector({ nombres, estado });
            setnombre("");
            setEstado("Activo");
            alert("✅ Director agregado correctamente!");
        } catch (error) {
            console.error("❌ Error al agregar director:", error);
            alert("❌ No se pudo agregar el director. Revisa la consola.");
        }
    };

    return (
        <div>
            <h2>Agregar Director</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={nombres} 
                    onChange={(e) => setnombre(e.target.value)} 
                    required 
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

export default AddDirector;

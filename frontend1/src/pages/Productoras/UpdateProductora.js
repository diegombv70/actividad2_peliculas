import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductoraById, updateProductoras } from "../../services/api";

const UpdateProductora = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [Productora, setProductora] = useState({
        nombre: "",
        estado: "",
        slogan: "",
        descripcion: ""
    });

    useEffect(() => {
        console.log("ID recibido:", id);

        if (!id) {
            console.error("Error: No se recibió un ID válido.");
            return;
        }

        getProductoraById(id)
            .then((data) => {
                if (!data) {
                    console.error("Error: No se encontró la Productora.");
                    return;
                }
                setProductora({
                    nombre: data.nombre || "",
                    estado: data.estado || "",
                    slogan: data.slogan || "", 
                    descripcion: data.descripcion || "" 
                });
            })
            .catch((error) => console.error("Error obteniendo Productora:", error));
    }, [id]);

    const handleChange = (e) => {
        setProductora({ ...Productora, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProductoras(id, Productora);
            alert("✅ Productora actualizada correctamente!");
            navigate("/productoras"); 
        } catch (error) {
            console.error("❌ Error al actualizar Productora:", error);
            alert("❌ No se pudo actualizar la Productora. Revisa la consola.");
        }
    };

    if (!id) {
        return <p className="text-red-500">Error: No se encontró el ID de la Productora.</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Actualizar Productora</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={Productora.nombre} 
                        onChange={handleChange} 
                        className="border rounded w-full p-2"
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Estado:</label>
                    <select 
                        name="estado" 
                        value={Productora.estado} 
                        onChange={handleChange} 
                        className="border rounded w-full p-2"
                        required
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Slogan:</label>
                    <input 
                        type="text" 
                        name="slogan" 
                        value={Productora.slogan} 
                        onChange={handleChange} 
                        className="border rounded w-full p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        value={Productora.descripcion} 
                        onChange={handleChange} 
                        className="border rounded w-full p-2"
                    />
                </div>

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                    Actualizar Productora
                </button>
            </form>
        </div>
    );
};

export default UpdateProductora;

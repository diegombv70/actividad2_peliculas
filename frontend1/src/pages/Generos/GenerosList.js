import React, { useEffect, useState } from "react";
import { getGeneros } from "../../services/api";
import { Link } from "react-router-dom";
import '../../styles/global.css'; 


const GenerosList = () => {
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        getGeneros().then(setGeneros);
    }, []);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Lista de Géneros</h2>
                <Link to="/generos/agregar" className="btn-agregar">
                <i className="fas fa-plus"></i> Agregar Género
                </Link>
            </div>
            <ul className="border rounded p-4">
                {generos.map((genero) => (
                    <li key={genero.id} className="border-b py-2 flex justify-between items-center">
                        <span>
                            {genero.nombre} - {genero.estado} ({genero.descripcion})
                        </span>
                        <Link to={`/generos/editar/${genero.id}`} className="btn-actualizarlist">
                            <i className="fas fa-edit"></i> Actualizar
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenerosList;


import React, { useEffect, useState } from "react";
import { getDirectores } from "../../services/api";
import { Link } from "react-router-dom";
import '../../styles/global.css'; 

const DirectoresList = () => {
    const [directores, setDirectores] = useState([]);

    useEffect(() => {
        getDirectores().then(setDirectores);
    }, []);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Lista de Directores</h2>
                <Link
                    to="/directores/agregar" className="btn-agregar">
                    + Agregar Directores
                </Link>
            </div>
            <ul className="border rounded p-4">
                {directores.map((director) => (
                    <li key={director.id} className="border-b py-2 flex justify-between items-center">
                        <span>
                            {director.nombres} - {director.estado} ({director.fecha_creacion})
                        </span>
                        <Link to={`/directores/editar/${director.id}`} className="btn-actualizarlist">
                            <i className="fas fa-edit"></i> Actualizar
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default DirectoresList;


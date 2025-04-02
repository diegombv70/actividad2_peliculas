import React, { useEffect, useState } from "react";
import { getTipos } from "../../services/api";
import { Link } from "react-router-dom";

const TiposList = () => {
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        getTipos().then(setTipos);
    }, []);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Lista de Tipos</h2>
                <Link
                    to="/tipos/agregar" className="btn-agregar" >
                    + Agregar Tipo
                </Link>
            </div>
            <ul className="border rounded p-4">
                {tipos.map((tipo) => (
                    <li key={tipo.id} className="border-b py-2 flex justify-between items-center">
                        <span>
                            {tipo.nombre} - {tipo.estado} ({tipo.descripcion})
                        </span>
                        <Link
                            to={`/tipos/editar/${tipo.id}`}
                            className="btn-actualizarlist">
                            <i className="fas fa-edit"></i>
                            Actualizar
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TiposList;

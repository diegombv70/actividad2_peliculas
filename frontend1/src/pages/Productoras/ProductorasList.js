import React, { useEffect, useState } from "react";
import { getProductoras } from "../../services/api";
import { Link } from "react-router-dom";

const ProductorasList = () => {
    const [Productoras, setProductoras] = useState([]);

    useEffect(() => {
        getProductoras().then(setProductoras);
    }, []);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Lista de Productoras</h2>
                <Link
                    to="/Productoras/agregar" className="btn-agregar">
                    Agregar Productoras
                </Link>
            </div>
            <ul className="border rounded p-4">
                {Productoras.map((productora) => (
                    <li key={productora.id} className="border-b py-2 flex justify-between items-center">
                        <span>
                            {productora.nombre} - {productora.slogan} -{productora.estado} ({productora.fecha_creacion})
                        </span>
                        <Link
                            to={`/Productoras/editar/${productora.id}`}
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

export default ProductorasList;

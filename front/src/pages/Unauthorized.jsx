import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso No Autorizado</h1>
            <p className="text-lg text-gray-700 mb-6">
                No tienes permiso para acceder a esta página.
            </p>
            <button
                onClick={goBack}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Volver
            </button>
        </div>
    );
};

export default Unauthorized;
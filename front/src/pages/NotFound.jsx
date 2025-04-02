import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-xl text-gray-700">Página no encontrada</p>
            <button
                onClick={() => navigate(-1)}
                className="mt-6 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Volver
            </button>
        </div>
    );
};

export default NotFound;
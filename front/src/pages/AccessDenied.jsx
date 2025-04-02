import { Link } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import Header from "../components/Header";

const AccessDenied = () => {
    return (
        <>
            <Header />
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
                <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-lg border-2 border-red-200 transform transition-transform duration-300 hover:-translate-y-1">
                    <div className="bg-red-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <FaLock className="text-red-500 text-4xl" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Acceso Denegado</h1>

                    <p className="text-gray-600 mb-8">
                        Lo sentimos, no tienes permisos para acceder a esta página o recurso.
                        Por favor, contacta al administrador si crees que esto es un error.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/login"
                            className="px-6 py-2 bg-primary-yellow text-gray-700 font-medium rounded-md hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <FaArrowLeft />
                            Iniciar Sesión
                        </Link>

                        <Link
                            to="/home"
                            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors duration-200"
                        >
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccessDenied;
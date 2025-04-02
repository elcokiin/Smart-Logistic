import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Header = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout, hasRole } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <header className="bg-(--primary-yellow) shadow-md sticky top-0 z-10">
            <div className="container mx-auto py-4 px-6 flex items-center justify-between gap-4">
                <div className="text-blue-800 font-bold text-2xl font-sans flex flex-col -space-y-3 flex-shrink-0">
                    <h2>smart</h2>
                    <h2>logistics</h2>
                </div>

                <div className="flex-1 flex items-center justify-between flex-col gap-4">
                    <ul className="flex space-x-6 justify-center">
                        {hasRole('superAdmin') && (
                            <>
                                <li>
                                    <Link to="/superAdmin" className="px-3 py-2 font-medium transition-transform duration-150 ease-out -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 relative group hover:text-gray-700">
                                        Panel
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/warehouse-config" className="px-3 py-2 font-medium transition-transform duration-150 ease-out -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 relative group hover:text-gray-700">
                                        Configuración de Almacen
                                    </Link>
                                </li>
                            </>
                        )}
                        {hasRole('admin') && (
                            <>
                                <li>
                                    <Link to="/home" className="px-3 py-2 font-medium transition-transform duration-150 ease-out -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 relative group hover:text-gray-700">
                                        Almacenes
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/store" className="px-3 py-2 font-medium transition-transform duration-150 ease-out -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 relative group hover:text-gray-700">
                                        Tienda Virtual
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {children}
                </div>

                <div className="relative">
                    <figure
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-white p-2.5 rounded-full shadow-md hover:bg-amber-50 transition-transform duration-150 ease-out -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 cursor-pointer flex-shrink-0"
                    >
                        <FaUserAlt className="text-amber-500 text-lg" />
                    </figure>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                            {currentUser && (
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <p className="text-sm font-medium text-gray-700 truncate">
                                        {currentUser.email}
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex cursor-pointer items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2 transition-colors duration-150"
                            >
                                <FaSignOutAlt className="text-red-500" />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
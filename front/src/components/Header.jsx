import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";


const Header = ({ children }) => {
    return (
        <header className="bg-(--primary-yellow) shadow-md sticky top-0 z-10">
            <div className="container mx-auto py-4 px-6 flex items-center justify-between gap-4">
                <div className="text-(--primary-blue) font-bold text-2xl font-sans flex flex-col -space-y-3 flex-shrink-0">
                    <h2>smart</h2>
                    <h2>logistics</h2>
                </div>

                <div className="flex-1 flex items-center justify-between flex-col gap-4">
                    <ul className="flex space-x-6 justify-center">
                        <li>
                            <Link to="/" className="px-3 py-2 font-medium transition-transform duration-150 ease-out -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 relative group hover:text-gray-700">
                                Almacenes
                            </Link>
                        </li>
                        <li>
                            <Link to="/store" className="px-3 py-2 font-medium transition-transform duration-150 ease-out -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 relative group hover:text-gray-700">
                                Tienda Virtual
                            </Link>
                        </li>
                    </ul>

                    {children}
                </div>

                <figure className="bg-white p-2.5 rounded-full shadow-md hover:bg-amber-50 transition-transform duration-150 ease-out -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 cursor-pointer flex-shrink-0">
                    <FaUserAlt className="text-(--second-yellow) text-lg" />
                </figure>
            </div>
        </header>
    );
}

export default Header;
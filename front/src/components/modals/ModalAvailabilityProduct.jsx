import CardProduct from "../CardProduct";

import { FaTimes } from "react-icons/fa";

const ModalAvailabilityProduct = ({ isOpen, onClose, product }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed bg-black/50 top-0 right-0 h-screen w-screen flex flex-col items-center justify-center z-[200]">
            <div className='w-[96%] max-w-[460px] bg-white rounded-lg shadow-lg flex flex-col justify-between'>
                <header className='w-full flex justify-between items-center p-4 bg-(--primary-yellow) rounded-t-lg'>
                    <h2 className='text-xl text-(--primary-blue) font-bold'>Agregar Nuevo Almacén</h2>
                    <button
                        onClick={onClose}
                        className='text-(--primary-blue) hover:text-red-600 duration-200 cursor-pointer'
                    >
                        <FaTimes size={20} />
                    </button>
                </header>

                <main>
                    <div className="p-4 w-full">
                        <h3 className="text-xl font-bold text-[var(--primary-blue)] mb-4">{product.name || product.description}</h3>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm">Disponibilidad tienda virtual:</span>
                                <span
                                    className={`font-bold text-sm rounded-full px-3 py-1 ${product.availability > 0
                                        ? 'bg-[var(--primary-yellow)] text-[var(--primary-blue)]'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {product.availability > 0 ? `Disponible (${product.availability})` : 'No disponible'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Disponibilidad en almacén:</span>
                                <span
                                    className={`font-bold text-sm rounded-full px-3 py-1 ${product.availabilityWarehouse > 0
                                        ? 'bg-[var(--primary-yellow)] text-[var(--primary-blue)]'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {product.availabilityWarehouse > 0 ? `Disponible (${product.availabilityWarehouse})` : 'No disponible'}
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ModalAvailabilityProduct;
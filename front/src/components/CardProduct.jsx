import React from 'react';

const CardProduct = ({ product }) => {
    const { image, description, availability } = product;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="h-48 overflow-hidden">
                <img
                    src={image}
                    alt={description}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="p-4">
                <p className="text-gray-700 mb-3">{description}</p>

                <div className="flex items-center mt-2">
                    <span className="text-sm mr-2">Disponibilidad:</span>
                    <span
                        className={`font-bold text-sm rounded-full px-3 py-1 ${availability > 0 ? 'bg-[var(--primary-yellow)] text-[var(--primary-blue)]' : 'bg-gray-200 text-gray-600'
                            }`}
                    >
                        {availability > 0 ? `Disponible (${availability})` : 'No disponible'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;
import { useState } from 'react';
import Header from '../components/Header';

const WarehouseConfig = () => {
    const [minDistance, setMinDistance] = useState('');
    const [productPercentage, setProductPercentage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí manejarías el envío del formulario, ej. llamada a API
        console.log({ minDistance, productPercentage });
        alert('¡Configuración guardada exitosamente!');
    };

    return (
        <>
            <Header />
            <main className="container mx-auto py-8 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Configuración de Almacenes
                            </h2>

                            <p className="text-gray-600 mb-6">
                                Actualiza los parámetros operativos para tu red de almacenes.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="minDistance" className="block text-sm font-medium text-gray-700 mb-1">
                                        Distancia Mínima Entre Almacenes
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="minDistance"
                                            value={minDistance}
                                            onChange={(e) => setMinDistance(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                                            required
                                        />
                                        <span className="absolute right-3 top-2 text-gray-500">m</span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        La distancia mínima requerida entre ubicaciones de almacenes
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="productPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                                        Porcentaje de Productos en Tienda Virtual
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="productPercentage"
                                            value={productPercentage}
                                            onChange={(e) => setProductPercentage(e.target.value)}
                                            min="0"
                                            max="100"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                                            required
                                        />
                                        <span className="absolute right-3 top-2 text-gray-500">%</span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Porcentaje de cada producto que debe asignarse a la tienda virtual (entre 5% y 30%)
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 cursor-pointer bg-primary-yellow text-gray-700 hover:bg-yellow-400 border border-primary-yellow duration-200 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                                    >
                                        Guardar Configuración
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default WarehouseConfig;

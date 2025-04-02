import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

import { createWarehouse } from '../../services/warehouseService';

const ModalAddWarehouse = ({ isOpen, onClose }) => {
    const { currentUser } = useAuth();
    // Update state variable names to match input field names
    const [formData, setFormData] = useState({
        name: '',
        latitude: '',
        longitude: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmit = async (warehouseData) => {
        try {
            if (currentUser && currentUser?.uid) {
                const newWarehouse = {
                    ...warehouseData,
                    idUserFirebase: currentUser?.uid,
                    dateCreation: new Date()
                }

                await createWarehouse(newWarehouse);
                onClose(); // Close modal after successful submission
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const warehouseData = {
            ...formData,
            userFirebaseId: currentUser?.uid || 'usuario_anónimo',
            createdAt: new Date().toISOString()
        };

        onSubmit(warehouseData);
        // Reset form with the correct field names
        setFormData({ name: '', latitude: '', longitude: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bg-black/50 top-0 right-0 h-screen w-screen flex flex-col items-center justify-center z-[200]">
            <div className='w-[96%] max-w-[460px] bg-white rounded-lg shadow-lg flex flex-col justify-between'>
                <header className='w-full flex justify-between items-center p-4 bg-primary-yellow rounded-t-lg'>
                    <h2 className='text-xl text-gray-700 font-bold'>Agregar Nuevo Almacén</h2>
                    <button
                        onClick={onClose}
                        className='text-gray-700 hover:text-red-600 duration-200 cursor-pointer'
                    >
                        <FaTimes size={20} />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className='p-6'>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>
                                Nombre del almacén
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="latitude" className='block text-sm font-medium text-gray-700 mb-1'>
                                Latitud
                            </label>
                            <input
                                type="number"
                                step="any"
                                id="latitude"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="longitude" className='block text-sm font-medium text-gray-700 mb-1'>
                                Longitud
                            </label>
                            <input
                                type="number"
                                step="any"
                                id="longitude"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow'
                                required
                            />
                        </div>

                        {/* Muestra información del creador (opcional) */}
                        {currentUser && (
                            <div className="mt-2 text-sm text-gray-500">
                                Creando como: {currentUser.email}
                            </div>
                        )}
                    </div>

                    <div className='mt-6'>
                        <button
                            type="submit"
                            className='w-full py-2 px-4 cursor-pointer bg-primary-yellow text-gray-700 hover:bg-yellow-400 border border-primary-yellow duration-200 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow'
                        >
                            Agregar Almacén
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAddWarehouse;
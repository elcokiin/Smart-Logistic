import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ModalAddWarehouse = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        creator: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', creator: '', location: '' });
    };

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
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-yellow)'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="creator" className='block text-sm font-medium text-gray-700 mb-1'>
                                Nombre del creador
                            </label>
                            <input
                                type="text"
                                id="creator"
                                name="creator"
                                value={formData.creator}
                                onChange={handleChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-yellow)'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className='block text-sm font-medium text-gray-700 mb-1'>
                                Ubicación
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--primary-yellow)'
                                required
                            />
                        </div>
                    </div>

                    <div className='mt-6'>
                        <button
                            type="submit"
                            className='w-full py-2 px-4 cursor-pointer bg-(--primary-yellow) text-(--primary-blue) hover:bg-(second-yellow) border border-(--primary-yellow) duration-200 font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--primary-yellow)'
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
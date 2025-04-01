import { FaTrash } from "react-icons/fa";

const TableWarehouse = ({ warehouses = [] }) => {
    return (
        <div className="w-full overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-left">
                <thead className="bg-primary-yellow text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nombre del almacén</th>
                        <th scope="col" className="px-6 py-3">Nombre del creador</th>
                        <th scope="col" className="px-6 py-3">Ubicación</th>
                        <th scope="col" className="px-6 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses.length > 0 ? (
                        warehouses.map((warehouse, index) => (
                            <tr
                                key={warehouse.id || index}
                                className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                            >
                                <td className="px-6 py-4 font-medium">{warehouse.name}</td>
                                <td className="px-6 py-4">{warehouse.creator}</td>
                                <td className="px-6 py-4">{warehouse.location}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => console.log(`Delete warehouse: ${warehouse.id}`)}
                                        className="p-2 bg-white rounded-full shadow hover:bg-red-50 duration-200 cursor-pointer"
                                    >
                                        <FaTrash className="text-red-500 hover:text-red-600 duration-200" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="border-b bg-white">
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                No hay almacenes disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableWarehouse;
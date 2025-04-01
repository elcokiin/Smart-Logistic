import React, { useState } from 'react';

const AdminDashboard = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseName, setWarehouseName] = useState('');

    const handleAddWarehouse = () => {
        if (warehouseName.trim() === '') {
            alert('El nombre del almacén no puede estar vacío.');
            return;
        }
        setWarehouses([...warehouses, warehouseName]);
        setWarehouseName('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard de Administrador</h1>
            <div style={{ marginBottom: '20px' }}>
                <h2>Crear Almacén</h2>
                <input
                    type="text"
                    placeholder="Nombre del almacén"
                    value={warehouseName}
                    onChange={(e) => setWarehouseName(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button onClick={handleAddWarehouse} style={{ padding: '5px 10px' }}>
                    Agregar
                </button>
            </div>
            <div>
                <h2>Lista de Almacenes</h2>
                {warehouses.length === 0 ? (
                    <p>No hay almacenes creados.</p>
                ) : (
                    <ul>
                        {warehouses.map((warehouse, index) => (
                            <li key={index}>{warehouse}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
import api from './api'
/**
 * Creates a new warehouse
 * @returns {Promise} API response
 */
export const createWarehouse = async (warehouseData) => {
    // const warehouseData = {
    //     nameWarehouse: "Almacén Cercano",
    //     latitudeWarehouse: 40.7129,
    //     lenghtWarehouse: -74.0061,
    //     idUserFirebase: 124
    // };

    return await api("/warehouses", {
        method: "POST",
        body: JSON.stringify(warehouseData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
/**
 * Fetches all warehouses
 * @returns {Promise} API response with warehouses data
 */
export const getWarehouses = async () => {
    return await api("warehouses", {
        method: "GET"
    });
};
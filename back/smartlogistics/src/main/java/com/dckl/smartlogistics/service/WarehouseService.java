package com.dckl.smartlogistics.service;

import com.dckl.smartlogistics.model.Warehouse;
import com.dckl.smartlogistics.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@Service
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Autowired
    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Optional<Warehouse> getWarehouseById(int id) {
        return warehouseRepository.findById(id);
    }

    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public Optional<Warehouse> updateWarehouse(int id, Warehouse warehouseData) {
        Optional<Warehouse> existingWarehouseOpt = warehouseRepository.findById(id);
        if (existingWarehouseOpt.isEmpty()) {
            return Optional.empty();
        }

        Warehouse existingWarehouse = existingWarehouseOpt.get();
        existingWarehouse.setNameWarehouse(warehouseData.getNameWarehouse());
        existingWarehouse.setLatitudeWarehouse(warehouseData.getLatitudeWarehouse());
        existingWarehouse.setLenghtWarehouse(warehouseData.getLenghtWarehouse());
        existingWarehouse.setVirtualStorePercentage(warehouseData.getVirtualStorePercentage());
        existingWarehouse.setDateCreation(warehouseData.getDateCreation());
        existingWarehouse.setIdSuperAdmin(warehouseData.getIdSuperAdmin());
        existingWarehouse.setIdUserFirebase(warehouseData.getIdUserFirebase());

        return Optional.of(warehouseRepository.save(existingWarehouse));
    }

    public boolean deleteWarehouse(int id) {
        return warehouseRepository.deleteById(id);
    }

    public boolean isLocationValid(float latitude, float longitude, double maxDistanceMeters) {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        for (Warehouse warehouse : warehouses) {
            double distance = calculateDistance(latitude, longitude, warehouse.getLatitudeWarehouse(), warehouse.getLenghtWarehouse());
            if (distance < maxDistanceMeters) {
                return false;
            }
        }
        return true;
    }

    private double calculateDistance(float lat1, float lon1, float lat2, float lon2) {
        final int EARTH_RADIUS = 6371000; // Radio de la Tierra en metros
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }

    public Map<String, List<Warehouse>> getUsersWithWarehouses() {
        // Simulación de datos: reemplaza con una consulta real a la base de datos
        List<Warehouse> warehouses = warehouseRepository.findAll();
        Map<String, List<Warehouse>> usersWithWarehouses = new HashMap<>();

        for (Warehouse warehouse : warehouses) {
            String userId = String.valueOf(warehouse.getIdUserFirebase()); // Manejo seguro de la conversión
            usersWithWarehouses.computeIfAbsent(userId, k -> new ArrayList<>()).add(warehouse);
        }

        return usersWithWarehouses;
    }
}
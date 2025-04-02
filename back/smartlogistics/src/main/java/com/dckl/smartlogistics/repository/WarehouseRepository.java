package com.dckl.smartlogistics.repository;

import com.dckl.smartlogistics.model.Warehouse;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class WarehouseRepository {

    private final Map<Integer, Warehouse> warehouses = new HashMap<>();
    private int idCounter = 1;

    public List<Warehouse> findAll() {
        return new ArrayList<>(warehouses.values());
    }

    public Optional<Warehouse> findById(int id) {
        Warehouse warehouse = warehouses.get(id);
        return warehouse != null ? Optional.of(warehouse.clone()) : Optional.empty();
    }

    public Warehouse save(Warehouse warehouse) {
        if (warehouse.getIdWarehouse() == null) { // Esto ahora es válido porque idWarehouse es Integer
            warehouse.setIdWarehouse(idCounter++);
        }
        warehouses.put(warehouse.getIdWarehouse(), warehouse.clone());
        return warehouse.clone();
    }

    public boolean deleteById(int id) {
        return warehouses.remove(id) != null;
    }

    public boolean existsById(int id) {
        return warehouses.containsKey(id);
    }
}
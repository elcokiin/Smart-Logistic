package com.dckl.smartlogistics.repository;

import com.dckl.smartlogistics.model.Warehouse;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class WarehouseRepository {
    
    private final Map<Long, Warehouse> warehouses = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);
    
    public List<Warehouse> findAll() {
        return new ArrayList<>(warehouses.values());
    }
    
    public Optional<Warehouse> findById(Long id) {
        Warehouse warehouse = warehouses.get(id);
        return warehouse != null ? Optional.of(warehouse.clone()) : Optional.empty();
    }
    
    public Warehouse save(Warehouse warehouse) {
        if (warehouse.getId() == null) {
            // Nuevo almacén
            Long id = idCounter.getAndIncrement();
            warehouse.setId(id);
        } else if (!warehouses.containsKey(warehouse.getId())) {
            // ID especificado pero no existe
            warehouse.setId(idCounter.getAndIncrement());
        }
        
        // Guardamos un clon para mantener la inmutabilidad
        warehouses.put(warehouse.getId(), warehouse.clone());
        return warehouse.clone();
    }
    
    public boolean deleteById(Long id) {
        return warehouses.remove(id) != null;
    }
    
    public boolean existsById(Long id) {
        return warehouses.containsKey(id);
    }
}
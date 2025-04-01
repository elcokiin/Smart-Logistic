package com.dckl.smartlogistics.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dckl.smartlogistics.model.Warehouse;
import com.dckl.smartlogistics.repository.WarehouseRepository;

@Service
public class WarehouseService {
    
    private final WarehouseRepository warehouseRepository;
    
    // Prototipo base para crear nuevos almacenes
    private final Warehouse prototypeWarehouse;
    
    @Autowired
    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
        
        // Inicializar el prototipo con valores predeterminados
        this.prototypeWarehouse = new Warehouse();
        this.prototypeWarehouse.setCapacity(1000);
        this.prototypeWarehouse.setActive(true);
    }
    
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }
    
    public Optional<Warehouse> getWarehouseById(Long id) {
        return warehouseRepository.findById(id);
    }
    
    public Warehouse createWarehouse(Warehouse warehouseData) {
        // Usar el prototipo como base
        Warehouse newWarehouse = prototypeWarehouse.clone();
        
        // Actualizar con los datos específicos
        newWarehouse.setName(warehouseData.getName());
        newWarehouse.setLocation(warehouseData.getLocation());
        
        // Sobrescribir valores predeterminados si se proporcionan
        if (warehouseData.getCapacity() > 0) {
            newWarehouse.setCapacity(warehouseData.getCapacity());
        }
        
        return warehouseRepository.save(newWarehouse);
    }
    
    public Optional<Warehouse> updateWarehouse(Long id, Warehouse warehouseData) {
        if (!warehouseRepository.existsById(id)) {
            return Optional.empty();
        }
        
        // Obtener el almacén existente
        Optional<Warehouse> existingWarehouseOpt = warehouseRepository.findById(id);
        if (existingWarehouseOpt.isEmpty()) {
            return Optional.empty();
        }
        
        Warehouse existingWarehouse = existingWarehouseOpt.get();
        
        // Actualizar los campos
        if (warehouseData.getName() != null) {
            existingWarehouse.setName(warehouseData.getName());
        }
        
        if (warehouseData.getLocation() != null) {
            existingWarehouse.setLocation(warehouseData.getLocation());
        }
        
        if (warehouseData.getCapacity() > 0) {
            existingWarehouse.setCapacity(warehouseData.getCapacity());
        }
        
        existingWarehouse.setActive(warehouseData.isActive());
        
        Warehouse updatedWarehouse = warehouseRepository.save(existingWarehouse);
        return Optional.of(updatedWarehouse);
    }
    
    public boolean deleteWarehouse(Long id) {
        return warehouseRepository.deleteById(id);
    }
    
    // Método para crear un almacén basado en otro (clonación)
    public Optional<Warehouse> cloneWarehouseWithNewLocation(Long sourceId, String newLocation) {
        Optional<Warehouse> sourceWarehouseOpt = warehouseRepository.findById(sourceId);
        
        if (sourceWarehouseOpt.isEmpty()) {
            return Optional.empty();
        }
        
        Warehouse sourceWarehouse = sourceWarehouseOpt.get();
        Warehouse clonedWarehouse = sourceWarehouse.clone();
        
        // El ID será asignado automáticamente
        clonedWarehouse.setId(null);
        clonedWarehouse.setLocation(newLocation);
        
        return Optional.of(warehouseRepository.save(clonedWarehouse));
    }
}
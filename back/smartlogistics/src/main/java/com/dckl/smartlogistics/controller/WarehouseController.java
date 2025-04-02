package com.dckl.smartlogistics.controller;

import com.dckl.smartlogistics.model.Warehouse;
import com.dckl.smartlogistics.service.WarehouseService;
import com.dckl.smartlogistics.service.GlobalsParametersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {
    
    private final WarehouseService warehouseService;
    private final GlobalsParametersService globalsParametersService;
    
    @Autowired
    public WarehouseController(WarehouseService warehouseService, GlobalsParametersService globalsParametersService) {
        this.warehouseService = warehouseService;
        this.globalsParametersService = globalsParametersService;
    }
    
    @GetMapping
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.getAllWarehouses();
        return ResponseEntity.ok(warehouses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable Integer id) {
        return warehouseService.getWarehouseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> createWarehouse(@RequestBody(required = false) Warehouse warehouse) {

        Warehouse newWarehouse;
        List<Warehouse> warehouses = warehouseService.getAllWarehouses();
        float minDistanceWarehouse = globalsParametersService.getMinDistanceWarehouse(); // Declarar y asignar
        float virtualStorePercentage = globalsParametersService.getVirtualStorePercentage(); // Declarar y asignar

        if (!warehouses.isEmpty()) {
            Warehouse lastWarehouse = warehouses.get(warehouses.size() - 1);
            newWarehouse = lastWarehouse.clone(); // Clonar el último almacén
            newWarehouse.setIdWarehouse(null); // Esto ahora es válido porque idWarehouse es Integer

            newWarehouse.setVirtualStorePercentage(virtualStorePercentage);

            // Si se envían datos en el cuerpo, sobrescribir los valores del clon
            if (warehouse != null) {
                if (warehouse.getNameWarehouse() != null) {
                    newWarehouse.setNameWarehouse(warehouse.getNameWarehouse());
                }
                if (warehouse.getLatitudeWarehouse() != 0.0f) {
                    newWarehouse.setLatitudeWarehouse(warehouse.getLatitudeWarehouse());
                }
                if (warehouse.getLenghtWarehouse() != 0.0f) {
                    newWarehouse.setLenghtWarehouse(warehouse.getLenghtWarehouse());
                }
                if (warehouse.getVirtualStorePercentage() != 0.0f) {
                    newWarehouse.setVirtualStorePercentage(warehouse.getVirtualStorePercentage());
                }
                if (warehouse.getIdSuperAdmin() != 0) { // Validar que no sea el valor por defecto
                    newWarehouse.setIdSuperAdmin(warehouse.getIdSuperAdmin());
                }
                if (warehouse.getIdUserFirebase() != 0) { // Validar que no sea el valor por defecto
                    newWarehouse.setIdUserFirebase(warehouse.getIdUserFirebase());
                }
            }
        } else {
            // Crear un nuevo almacén si no hay existentes
            newWarehouse = new Warehouse();
            newWarehouse.setNameWarehouse("Prototipo Base");
            newWarehouse.setLatitudeWarehouse(0.0f);
            newWarehouse.setLenghtWarehouse(0.0f);

            // Si se envían datos en el cuerpo, establecer los valores
            if (warehouse != null) {
                if (warehouse.getNameWarehouse() != null) {
                    newWarehouse.setNameWarehouse(warehouse.getNameWarehouse());
                }
                if (warehouse.getLatitudeWarehouse() != 0.0f) {
                    newWarehouse.setLatitudeWarehouse(warehouse.getLatitudeWarehouse());
                }
                if (warehouse.getLenghtWarehouse() != 0.0f) {
                    newWarehouse.setLenghtWarehouse(warehouse.getLenghtWarehouse());
                }
                if (warehouse.getIdSuperAdmin() != 0) { // Validar que no sea el valor por defecto
                    newWarehouse.setIdSuperAdmin(warehouse.getIdSuperAdmin());
                }
                if (warehouse.getIdUserFirebase() != 0) { // Validar que no sea el valor por defecto
                    newWarehouse.setIdUserFirebase(warehouse.getIdUserFirebase());
                }
            }
        }

        // Asignar el valor de virtualStorePercentage al nuevo almacén
        newWarehouse.setVirtualStorePercentage(virtualStorePercentage);

        // Validar la ubicación del nuevo almacén
        boolean isValidLocation = warehouseService.isLocationValid(
                newWarehouse.getLatitudeWarehouse(),
                newWarehouse.getLenghtWarehouse(),
                minDistanceWarehouse // Usar el valor dinámico
        );

        if (!isValidLocation) {
            return ResponseEntity.badRequest().body("La distancia a otros almacenes debe ser mayor a " + minDistanceWarehouse + " metros.");
        }

        // Crear el nuevo almacén
        Warehouse createdWarehouse = warehouseService.createWarehouse(newWarehouse);
        return new ResponseEntity<>(createdWarehouse, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Warehouse> updateWarehouse(
            @PathVariable Integer id, 
            @RequestBody Warehouse warehouse) {
        return warehouseService.updateWarehouse(id, warehouse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable Integer id) {
        if (warehouseService.deleteWarehouse(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hola Mundo");
    }

    @GetMapping("/users-warehouses")
    public ResponseEntity<Map<String, List<Warehouse>>> getUsersWithWarehouses() {
        Map<String, List<Warehouse>> usersWithWarehouses = warehouseService.getUsersWithWarehouses();
        return ResponseEntity.ok(usersWithWarehouses);
    }
}
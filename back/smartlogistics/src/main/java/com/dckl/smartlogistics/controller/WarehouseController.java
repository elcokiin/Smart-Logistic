package com.dckl.smartlogistics.controller;

import com.dckl.smartlogistics.model.Warehouse;
import com.dckl.smartlogistics.service.WarehouseService;
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
    
    @Autowired
    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }
    
    @GetMapping
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.getAllWarehouses();
        return ResponseEntity.ok(warehouses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable Long id) {
        return warehouseService.getWarehouseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> createWarehouse(@RequestBody Warehouse warehouse) {
        boolean isValidLocation = warehouseService.isLocationValid(
                warehouse.getLatitudeWarehouse(),
                warehouse.getLenghtWarehouse(),
                300 // Distancia máxima en metros
        );

        if (!isValidLocation) {
            return ResponseEntity.badRequest().body("La distancia a otros almacenes debe ser mayor a 300 metros.");
        }

        Warehouse createdWarehouse = warehouseService.createWarehouse(warehouse);
        return new ResponseEntity<>(createdWarehouse, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Warehouse> updateWarehouse(
            @PathVariable Long id, 
            @RequestBody Warehouse warehouse) {
        return warehouseService.updateWarehouse(id, warehouse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable Long id) {
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
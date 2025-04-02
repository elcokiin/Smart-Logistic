package com.dckl.smartlogistics.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "global_parameter")
public class GlobalsParameters {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Indica que el valor será generado automáticamente por la base de datos
    @Column(name = "id_global_parameter") // Corrige el nombre de la columna
    private Integer idGlobalParameters;

    @Column(name = "min_distance_warehouse")
    private float minDistanceWarehouse;

    @Column(name = "virtual_store_percentage")
    private float virtualStorePercentage;

    public GlobalsParameters() {
    }

    // Getters y Setters
    public float getMinDistanceWarehouse() {
        return minDistanceWarehouse;
    }

    public void setMinDistanceWarehouse(float minDistanceWarehouse) {
        this.minDistanceWarehouse = minDistanceWarehouse;
    }

    public float getVirtualStorePercentage() {
        return virtualStorePercentage;
    }

    public void setVirtualStorePercentage(float virtualStorePercentage) {
        this.virtualStorePercentage = virtualStorePercentage;
    }
}
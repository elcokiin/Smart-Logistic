package com.dckl.smartlogistics.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "globals_parameters")
public class GlobalsParameters {
    @Id
    private Integer idGlobalParameters;

    private float minDistanceWarehouse;
    private float virtualStorePercentage;

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
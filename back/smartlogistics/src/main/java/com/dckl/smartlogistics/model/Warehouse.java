package com.dckl.smartlogistics.model;

import java.util.Objects;

public class Warehouse implements Cloneable {
    
    private Long id;
    private String name;
    private String location;
    private int capacity;
    private boolean active;
    
    // Constructor por defecto
    public Warehouse() {
    }
    
    // Constructor con parámetros
    public Warehouse(Long id, String name, String location, int capacity, boolean active) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.active = active;
    }
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public int getCapacity() {
        return capacity;
    }
    
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
    
    public boolean isActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
    
    // Método de clonación (patrón Prototype)
    @Override
    public Warehouse clone() {
        try {
            return (Warehouse) super.clone();
        } catch (CloneNotSupportedException e) {
            return new Warehouse(this.id, this.name, this.location, this.capacity, this.active);
        }
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Warehouse warehouse = (Warehouse) o;
        return capacity == warehouse.capacity && active == warehouse.active && 
               Objects.equals(id, warehouse.id) && 
               Objects.equals(name, warehouse.name) && 
               Objects.equals(location, warehouse.location);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, name, location, capacity, active);
    }
    
    @Override
    public String toString() {
        return "Warehouse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", capacity=" + capacity +
                ", active=" + active +
                '}';
    }
}
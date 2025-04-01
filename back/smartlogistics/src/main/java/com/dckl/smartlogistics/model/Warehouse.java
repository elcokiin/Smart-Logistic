package com.dckl.smartlogistics.model;

import java.sql.Timestamp;
import java.util.Objects;

public class Warehouse implements Cloneable {

    private Long idWarehouse;
    private String nameWarehouse;
    private String addressWarehouse;
    private float latitudeWarehouse;
    private float lenghtWarehouse;
    private float virtualStorePercentage;
    private Timestamp dateCreation;
    private int idSuperAdmin;
    private int idUserFirebase;

    // Constructor por defecto
    public Warehouse() {
    }

    // Constructor con parámetros
    public Warehouse(Long idWarehouse, String nameWarehouse, String addressWarehouse, float latitudeWarehouse,
                     float lenghtWarehouse, float virtualStorePercentage, Timestamp dateCreation, int idSuperAdmin,
                     int idUserFirebase) {
        this.idWarehouse = idWarehouse;
        this.nameWarehouse = nameWarehouse;
        this.addressWarehouse = addressWarehouse;
        this.latitudeWarehouse = latitudeWarehouse;
        this.lenghtWarehouse = lenghtWarehouse;
        this.virtualStorePercentage = virtualStorePercentage;
        this.dateCreation = dateCreation;
        this.idSuperAdmin = idSuperAdmin;
        this.idUserFirebase = idUserFirebase;
    }

    // Getters y Setters
    public Long getIdWarehouse() {
        return idWarehouse;
    }

    public void setIdWarehouse(Long idWarehouse) {
        this.idWarehouse = idWarehouse;
    }

    public String getNameWarehouse() {
        return nameWarehouse;
    }

    public void setNameWarehouse(String nameWarehouse) {
        this.nameWarehouse = nameWarehouse;
    }

    public String getAddressWarehouse() {
        return addressWarehouse;
    }

    public void setAddressWarehouse(String addressWarehouse) {
        this.addressWarehouse = addressWarehouse;
    }

    public float getLatitudeWarehouse() {
        return latitudeWarehouse;
    }

    public void setLatitudeWarehouse(float latitudeWarehouse) {
        this.latitudeWarehouse = latitudeWarehouse;
    }

    public float getLenghtWarehouse() {
        return lenghtWarehouse;
    }

    public void setLenghtWarehouse(float lenghtWarehouse) {
        this.lenghtWarehouse = lenghtWarehouse;
    }

    public float getVirtualStorePercentage() {
        return virtualStorePercentage;
    }

    public void setVirtualStorePercentage(float virtualStorePercentage) {
        this.virtualStorePercentage = virtualStorePercentage;
    }

    public Timestamp getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Timestamp dateCreation) {
        this.dateCreation = dateCreation;
    }

    public int getIdSuperAdmin() {
        return idSuperAdmin;
    }

    public void setIdSuperAdmin(int idSuperAdmin) {
        this.idSuperAdmin = idSuperAdmin;
    }

    public int getIdUserFirebase() {
        return idUserFirebase;
    }

    public void setIdUserFirebase(int idUserFirebase) {
        this.idUserFirebase = idUserFirebase;
    }

    // Método de clonación (patrón Prototype)
    @Override
    public Warehouse clone() {
        try {
            return (Warehouse) super.clone();
        } catch (CloneNotSupportedException e) {
            return new Warehouse(this.idWarehouse, this.nameWarehouse, this.addressWarehouse, this.latitudeWarehouse,
                    this.lenghtWarehouse, this.virtualStorePercentage, this.dateCreation, this.idSuperAdmin,
                    this.idUserFirebase);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Warehouse warehouse = (Warehouse) o;
        return Float.compare(warehouse.latitudeWarehouse, latitudeWarehouse) == 0 &&
                Float.compare(warehouse.lenghtWarehouse, lenghtWarehouse) == 0 &&
                Float.compare(warehouse.virtualStorePercentage, virtualStorePercentage) == 0 &&
                idSuperAdmin == warehouse.idSuperAdmin &&
                idUserFirebase == warehouse.idUserFirebase &&
                Objects.equals(idWarehouse, warehouse.idWarehouse) &&
                Objects.equals(nameWarehouse, warehouse.nameWarehouse) &&
                Objects.equals(addressWarehouse, warehouse.addressWarehouse) &&
                Objects.equals(dateCreation, warehouse.dateCreation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idWarehouse, nameWarehouse, addressWarehouse, latitudeWarehouse, lenghtWarehouse,
                virtualStorePercentage, dateCreation, idSuperAdmin, idUserFirebase);
    }

    @Override
    public String toString() {
        return "Warehouse{" +
                "idWarehouse=" + idWarehouse +
                ", nameWarehouse='" + nameWarehouse + '\'' +
                ", addressWarehouse='" + addressWarehouse + '\'' +
                ", latitudeWarehouse=" + latitudeWarehouse +
                ", lenghtWarehouse=" + lenghtWarehouse +
                ", virtualStorePercentage=" + virtualStorePercentage +
                ", dateCreation=" + dateCreation +
                ", idSuperAdmin=" + idSuperAdmin +
                ", idUserFirebase=" + idUserFirebase +
                '}';
    }
}
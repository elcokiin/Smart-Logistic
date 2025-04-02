package com.dckl.smartlogistics.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "warehouse")
public class Warehouse implements Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_warehouse")
    private Integer idWarehouse;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    @Column(name = "id_super_admin", nullable = false)
    private Integer idSuperAdmin;

    @Column(name = "id_user_firebase", nullable = false)
    private String idUserFirebase;

    @Column(name = "latitude_warehouse", nullable = false)
    private float latitudeWarehouse;

    @Column(name = "length_warehouse", nullable = false) // Cambiado de "lenght_warehouse" a "length_warehouse"
    private float lengthWarehouse;

    @Column(name = "name_warehouse", nullable = false)
    private String nameWarehouse;

    @Column(name = "virtual_store_percentage", nullable = false)
    private Float virtualStorePercentage;

    @ManyToMany
    @JoinTable(
        name = "warehouse_product",
        joinColumns = @JoinColumn(name = "warehouse_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products = new ArrayList<>();

    // Constructor por defecto
    public Warehouse() {
        this.dateCreation = LocalDateTime.now(); // Asigna la fecha actual por defecto
    }

    // Constructor con parámetros
    public Warehouse(int idWarehouse, String nameWarehouse, float latitudeWarehouse,
                     float lengthWarehouse, Float virtualStorePercentage, LocalDateTime dateCreation, int idSuperAdmin,
                     String idUserFirebase) { 
        this.nameWarehouse = nameWarehouse;
        this.latitudeWarehouse = latitudeWarehouse;
        this.lengthWarehouse = lengthWarehouse;
        this.virtualStorePercentage = virtualStorePercentage;
        this.dateCreation = dateCreation;
        this.idSuperAdmin = idSuperAdmin;
        this.idUserFirebase = idUserFirebase;
    }

    // Getters y Setters
    public Integer getIdWarehouse() {
        return idWarehouse;
    }

    public void setIdWarehouse(Integer idWarehouse) {
        this.idWarehouse = idWarehouse;
    }

    public String getNameWarehouse() {
        return nameWarehouse;
    }

    public void setNameWarehouse(String nameWarehouse) {
        this.nameWarehouse = nameWarehouse;
    }

    public float getLatitudeWarehouse() {
        return latitudeWarehouse;
    }

    public void setLatitudeWarehouse(float latitudeWarehouse) {
        this.latitudeWarehouse = latitudeWarehouse;
    }

    public float getLengthWarehouse() {
        return lengthWarehouse;
    }

    public void setLengthWarehouse(float lengthWarehouse) {
        this.lengthWarehouse = lengthWarehouse;
    }

    public Float getVirtualStorePercentage() {
        return virtualStorePercentage;
    }

    public void setVirtualStorePercentage(Float virtualStorePercentage) {
        this.virtualStorePercentage = virtualStorePercentage;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Integer getIdSuperAdmin() {
        return idSuperAdmin;
    }

    public void setIdSuperAdmin(Integer idSuperAdmin) {
        this.idSuperAdmin = idSuperAdmin;
    }

    public String getIdUserFirebase() {
        return idUserFirebase;
    }

    public void setIdUserFirebase(String idUserFirebase) {
        this.idUserFirebase = idUserFirebase;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    // Método de clonación (patrón Prototype)
    @Override
    public Warehouse clone() {
        try {
            return (Warehouse) super.clone();
        } catch (CloneNotSupportedException e) {
            return new Warehouse(this.idWarehouse, this.nameWarehouse, this.latitudeWarehouse,
                    this.lengthWarehouse, this.virtualStorePercentage, this.dateCreation, this.idSuperAdmin,
                    this.idUserFirebase);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Warehouse warehouse = (Warehouse) o;
        return Float.compare(warehouse.latitudeWarehouse, latitudeWarehouse) == 0 &&
                Float.compare(warehouse.lengthWarehouse, lengthWarehouse) == 0 &&
                Float.compare(warehouse.virtualStorePercentage, virtualStorePercentage) == 0 &&
                Objects.equals(idSuperAdmin, warehouse.idSuperAdmin) && // Comparación correcta
                Objects.equals(idUserFirebase, warehouse.idUserFirebase) && // Comparación correcta
                Objects.equals(idWarehouse, warehouse.idWarehouse) &&
                Objects.equals(nameWarehouse, warehouse.nameWarehouse) &&
                Objects.equals(dateCreation, warehouse.dateCreation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idWarehouse, nameWarehouse, latitudeWarehouse, lengthWarehouse,
                virtualStorePercentage, dateCreation, idSuperAdmin, idUserFirebase);
    }

    @Override
    public String toString() {
        return "Warehouse{" +
                "idWarehouse=" + idWarehouse +
                ", nameWarehouse='" + nameWarehouse + '\'' +
                ", latitudeWarehouse=" + latitudeWarehouse +
                ", lengthWarehouse=" + lengthWarehouse +
                ", virtualStorePercentage=" + virtualStorePercentage +
                ", dateCreation=" + dateCreation +
                ", idSuperAdmin=" + idSuperAdmin +
                ", idUserFirebase=" + idUserFirebase +
                ", products=" + products +
                '}';
    }
}
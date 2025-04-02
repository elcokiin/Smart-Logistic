package com.dckl.smartlogistics.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProduct;

    private String nameProduct;
    private String description;
    private float price;
    private int stock;

    @ManyToMany(mappedBy = "products")
    private List<Warehouse> warehouses = new ArrayList<>();

    // Constructor por defecto
    public Product() {
    }

    // Constructor con parámetros
    public Product(Integer idProduct, String nameProduct, String description, float price, int stock) {
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    // Getters y Setters
    public Integer getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Integer idProduct) {
        this.idProduct = idProduct;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public List<Warehouse> getWarehouses() {
        return warehouses;
    }

    public void setWarehouses(List<Warehouse> warehouses) {
        this.warehouses = warehouses;
    }

    // Métodos equals y hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Float.compare(product.price, price) == 0 &&
                stock == product.stock &&
                Objects.equals(idProduct, product.idProduct) &&
                Objects.equals(nameProduct, product.nameProduct) &&
                Objects.equals(description, product.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProduct, nameProduct, description, price, stock);
    }

    // Método toString
    @Override
    public String toString() {
        return "Product{" +
                "idProduct=" + idProduct +
                ", nameProduct='" + nameProduct + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                '}';
    }
}

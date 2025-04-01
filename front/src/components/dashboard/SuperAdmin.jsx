import React, { useState } from "react";

const SuperAdminDashboard = () => {
    const [config, setConfig] = useState({
        warehouseDistance: "",
        productMatrix: "",
        stockPercentage: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfig({ ...config, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Configuration Saved:", config);
        alert("Configuration saved successfully!");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Super Admin Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Distance Between Warehouses (km):
                        <input
                            type="number"
                            name="warehouseDistance"
                            value={config.warehouseDistance}
                            onChange={handleInputChange}
                            style={{ marginLeft: "10px", padding: "5px" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Product Matrix (JSON format):
                        <textarea
                            name="productMatrix"
                            value={config.productMatrix}
                            onChange={handleInputChange}
                            rows="5"
                            style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Stock Percentage (%):
                        <input
                            type="number"
                            name="stockPercentage"
                            value={config.stockPercentage}
                            onChange={handleInputChange}
                            style={{ marginLeft: "10px", padding: "5px" }}
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Save Configuration
                </button>
            </form>
        </div>
    );
};

export default SuperAdminDashboard;
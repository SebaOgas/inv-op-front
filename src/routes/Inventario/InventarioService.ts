

import type { DTOFamily } from "./DTOFamily";
import type { DTOModeloInventario } from "./DTOModeloInventario";
import type DTOProduct from "./DTOProducto";
import type { DTOProductosAReponer } from "./DTOProductosAReponer";
import type { DTOProductosFaltantes } from "./DTOProductosFaltantes";

const BASE_URL = "http://localhost:8081/invop";

export const InventarioService = {
    getMissingProducts: async (): Promise<DTOProductosFaltantes[]> => {
        const response = await fetch(`${BASE_URL}/inventoryModule/missingProducts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error fetching missing products');
        }
        return await response.json();
    },
    getRestockProducts: async (): Promise<DTOProductosAReponer[]> => {
        const response = await fetch(`${BASE_URL}/inventoryModule/restockProduct`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error fetching missing products');
        }
        return await response.json();
    },

    getAllProducts: async (): Promise<DTOProduct[]> => {
        const response = await fetch(`${BASE_URL}/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    products: {
        get: async (id: number): Promise<DTOProduct> => {
            const response = await fetch(`${BASE_URL}/product/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            if (!response.ok) throw new Error(await response.text());
            return response.json();
        },
        getAllProducts: async (): Promise<DTOProduct[]> => {
            const response = await fetch(`${BASE_URL}/productModule/products`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error fetching products');
            }
            return response.json();
        },
        getProductFamily: async (id: number): Promise<DTOFamily> => {
            const response = await fetch(`${BASE_URL}/productModule/productFamily/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });
            if (!response.ok) throw new Error(await response.text());
            return response.json();
        }
    },
    families: {
        getFamily: async (id: number): Promise<DTOFamily> => {
            const response = await fetch(`${BASE_URL}/productModule/productFamily/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });
            if (!response.ok) throw new Error(await response.text());
            return response.json();
        }
    },
    
    
    
    calculateCGI: async (productId: number): Promise<number> => {
        const response = await fetch(`${BASE_URL}/inventoryModule/calculateCGI/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error calculating CGI');
        }
        return response.json();
    },

    calculateOptimalBatch: async (productId: number): Promise<number> => {
        const response = await fetch(`${BASE_URL}/inventoryModule/optimalBatch/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error calculating optimal batch');
        }
        const data = await response.json();
        return data.optimalBatch;
    },

    calculateOrderPoint: async (productId: number): Promise<number> => {
        const response = await fetch(`${BASE_URL}/inventoryModule/orderPoint/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error calculating order point');
        }
        const data = await response.json();
        return data.orderPoint;
    },

    calculateSafetyStock: async (productId: number): Promise<number> => {
        const response = await fetch(`${BASE_URL}/inventoryModule/safetyStock/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error calculating safety stock');
        }
        const data = await response.json();
        return data.safetyStock;
    },

    getProductData: async (productId: number): Promise<DTOModeloInventario> => {
        const response = await fetch(`${BASE_URL}/inventoryModule/productData/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error calculating safety stock');
        }
        const data : DTOModeloInventario = await response.json();
        return data;
    }

    
};




import type { DTOFamily } from "./DTOFamily";
import type { DTOProducto } from "./DTOProducto";
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
        const response = await fetch(`${BASE_URL}/inventoryModule/restockProducts`, {
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
    calculateModel: async (productId: number): Promise<void> => {
        const response = await fetch(`${BASE_URL}/products/calculate/${productId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error calculating model');
        }
    },
    getAllFamilies: async (): Promise<DTOFamily[]> => {
        const response = await fetch(`${BASE_URL}/productModule/productFamilies`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error fetching families');
        }
        return await response.json();
    },
    getAllProducts: async (): Promise<DTOProducto[]> => {
        const response = await fetch(`${BASE_URL}/productModule/products`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error fetching products');
        }
        return response.json();
    }
};


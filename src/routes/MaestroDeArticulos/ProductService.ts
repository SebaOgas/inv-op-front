import type { ProductResponseDto, CreateProductRequest } from "./DTOProducts";
import type {ProductFamilyDto} from "./DTOProductFamily";

const BASE_URL = "http://localhost:8081/invop/productModule";

export const ProductService = {
    products: {
        getAll: async (): Promise<ProductResponseDto[]> => {
            const response = await fetch(`${BASE_URL}/product`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            if (!response.ok) throw new Error(await response.text());
            return response.json();
        },
        get: async (id: number): Promise<ProductResponseDto> => {
            const response = await fetch(`${BASE_URL}/product/${id}/dto`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            if (!response.ok) throw new Error(await response.text());
            return response.json();
        },
        create: async (product: CreateProductRequest): Promise<ProductResponseDto> => {
            const response = await fetch(`${BASE_URL}/product`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(product)
            });
            if (!response.ok) throw new Error(await response.text());
            return response.json();
        },
        update: async (id: number, product: CreateProductRequest): Promise<void> => {
            const response = await fetch(`${BASE_URL}/product/${id}`, {
                method: "PUT", 
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(product)
            });
            if (!response.ok) throw new Error(await response.text());
        },
        getAllFamilies: async (): Promise<ProductFamilyDto[]> => {
            const response = await fetch(`${BASE_URL}/productFamilies`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            if (!response.ok) throw new Error(await response.text());
            return response.json();
        },
        delete: async (id: number): Promise<void> => {
            const response = await fetch(`${BASE_URL}/product/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            if (!response.ok) throw new Error(await response.text());
        },
        restore: async (id: number): Promise<void> => {
            const response = await fetch(`${BASE_URL}/product/${id}/restore`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({ isDeleted: false })
            });
            if (!response.ok) throw new Error(await response.text());
        }
    }

};
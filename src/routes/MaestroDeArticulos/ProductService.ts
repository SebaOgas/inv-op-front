import type { ProductResponseDto, CreateProductRequest } from "./DTOProducts";

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
        }
    }
};
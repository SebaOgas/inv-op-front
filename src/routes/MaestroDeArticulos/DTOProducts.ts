
export interface ProductResponseDto {
    productId: number;
    productName: string;
    productDescription: string;
    productFamilyName: string;
    inventoryModelName: string;
    stock: number;
    safeStock: number;
    orderLimit: number;
    optimalBatch: number;
    isDeleted: boolean;
    productFamilyId: number;

}

export interface CreateProductRequest {
    productName: string;
    productDescription: string;
    productFamilyId: number;
    optimalBatch: number;
    orderLimit: number;
    safeStock: number;
    stock: number;
}
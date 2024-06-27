
export interface ProductResponseDto {
    productId: number;
    productName: string;
    productDescription: string;
    productFamilyName: string;
    inventoryModelName: string;
    stock: number;
    storageCost: number;
    orderCost: number;
    unitCost: number;
    isDeleted: boolean;
    productFamilyId: number;
    productDemand: number;
    maxStock: number;

}

export interface CreateProductRequest {
    productName: string;
    productDescription: string;
    productFamilyId: number;
    storageCost: number;
    orderCost: number;
    unitCost: number;
    stock: number;
    productDemand: number;
    maxStock: number;
}
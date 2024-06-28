/*export interface DTOProducto {
    id: number;
    name: string;
    stock: number;
}*/

export default interface DTOProduct {
    productId: number;
    productName: string;
    productFamilyId: number;
    productFamilyName: string;
    inventoryModelName: string;
}
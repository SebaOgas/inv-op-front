export default interface DTOPurchaseOrder {
    purchaseOrderId: number,
    purchaseOrderDate: string,
    productId: number,
    productName: string,
    purchaseOrderStatus: string,
    supplierId: number,
    supplierName: string,    
    orderQuantity: number,
}
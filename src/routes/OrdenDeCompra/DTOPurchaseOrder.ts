export default interface DTOPurchaseOrder {
    purchaseOrderId: number,
    purchaseOrderDate: Date,
    productId: number,
    productName: string,
    purchaseOrderStatus: string,
    supplierId: number,
    supplierName: string,    
}
import type DTOProduct from "./DTOProduct";
import type DTOPurchaseOrder from "./DTOPurchaseOrder";
import type DTOSupplier from "./DTOSupplier";




const BASE_URL = "http://localhost:8081/invop";

export const OrdenDeCompraService = {

    purchaseOrder: {
        getList: async (search: string) : Promise<DTOPurchaseOrder[]> => {
            const response = await fetch(`${BASE_URL}/purchaseOrderModule/purchaseOrder`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOPurchaseOrder[] = ret;
            return data;
        },
        get: async (search: string) : Promise<DTOPurchaseOrder> => {
            const response = await fetch(`${BASE_URL}/purchaseOrderModule/purchaseOrder/${search}`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOPurchaseOrder = ret;
            return data;
        },
        create: async (purchaseOrder: DTOPurchaseOrder) : Promise<DTOPurchaseOrder> => {
            const response = await fetch(`${BASE_URL}/purchaseOrderModule/purchaseOrder`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(purchaseOrder)
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error((ret).message)};
            const data : DTOPurchaseOrder = ret;
            return data;
        },
        closePurchaseOrder: async (purchaseOrderId: number) : Promise<DTOPurchaseOrder> => {
            const response = await fetch(`${BASE_URL}/purchaseOrderModule/purchaseOrder/${purchaseOrderId}/close`, {
                method: "POST",
                // headers: {
                //     'Content-Type':
                // }
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error((ret).message)};
            const data : DTOPurchaseOrder = ret;
            return data;
        },
        fixedIntervalPurchaseOrder: async () : Promise<DTOPurchaseOrder[]> => {
            const response = await fetch(`${BASE_URL}/purchaseOrderModule/fixedIntervalPurchaseOrder`, {
                method: "GET",
                mode: 'cors'
            })
            let ret = await response.json();
            if (response.status !== 200) {throw new Error((ret).message);}
            const data : [DTOPurchaseOrder] = ret
            return data;
        },
        batchCreate: async (newPurchaseOrders: DTOPurchaseOrder[]) : Promise<DTOPurchaseOrder[]> => {
            const response = await fetch(`${BASE_URL}/purchaseOrderModule/batchCreate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors',
                body: JSON.stringify(newPurchaseOrders)
            })
            let ret = await response.json();
            if (response.status !== 200) {throw new Error((ret).message);}
            const data : [DTOPurchaseOrder] = ret
            return data;
        },
    },
    product: {
        getList: async () : Promise<DTOProduct[]> => {
            const response = await fetch(`${BASE_URL}/productModule/product`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOProduct[] = ret;
            return data;
        },
        getDefaultSupplier: async (productId: number) : Promise<DTOSupplier> => {
            const response = await fetch(`${BASE_URL}/productModule/product/${productId}/defaultSupplier`);
            let ret = await response.json();
            if (response.status !== 200 ) { throw new Error("" + response.status + (ret).message)};
            const data : DTOSupplier = ret;
            return data;
        }
    },
    supplier: {
        getList: async () : Promise<DTOSupplier[]> => {
            const response = await fetch(`${BASE_URL}/productModule/supplier`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOSupplier[] = ret;
            return data;
        },
    },
}
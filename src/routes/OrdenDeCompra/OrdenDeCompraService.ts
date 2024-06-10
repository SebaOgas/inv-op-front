import type DTOProduct from "./DTOProduct";
import type DTOPurchaseOrder from "./DTOPurchaseOrder";
import type DTONewSale  from "./DTONewSale";



const BASE_URL = "http://localhost:8081/invop";

export const OrdenDeCompraService = {

    purchaseOrder: {
        getList: async (search: string) : Promise<DTOPurchaseOrder[]> => {
            const response = await fetch(`${BASE_URL}/purchasOrderModule/purchaseOrder`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOPurchaseOrder[] = ret;
            return data;
        },
        get: async (search: string) : Promise<DTOPurchaseOrder> => {
            const response = await fetch(`${BASE_URL}/purchasOrderModule/purchaseOrder/${search}`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOPurchaseOrder = ret;
            return data;
        },
        // save: async (sale: DTONewSale) : Promise<DTONewSale> => {
        //     const response = await fetch(`${BASE_URL}/saleModule/sale`, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         mode: 'cors',
        //         body: JSON.stringify(sale)
        //     });
        //     let ret = await response.json();
        //     if (response.status !== 200) {throw new Error((ret).message)};
        //     const data : DTOPurchaseOrder = ret;
        //     return data;
        // },
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
    },
}
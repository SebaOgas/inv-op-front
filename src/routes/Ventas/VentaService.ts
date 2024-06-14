import type DTOProduct from "./DTOProduct";
import type DTOSale from "./DTOSale";
import type DTONewSale  from "./DTONewSale";



const BASE_URL = "http://localhost:8081/invop";

export const VentaService = {

    sale: {
        getList: async (search: string) : Promise<DTOSale[]> => {
            const response = await fetch(`${BASE_URL}/saleModule/sale`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOSale[] = ret;
            return data;
        },
        get: async (search: string) : Promise<DTOSale> => {
            const response = await fetch(`${BASE_URL}/saleModule/sale/${search}`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOSale = ret;
            return data;
        },
        save: async (sale: DTONewSale) : Promise<DTONewSale> => {
            const response = await fetch(`${BASE_URL}/saleModule/sale`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(sale)
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error((ret).message)};
            const data : DTOSale = ret;
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
    },
}
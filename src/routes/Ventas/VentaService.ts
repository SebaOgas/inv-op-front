// import type DTODemandaHistoricaAnual from "./CargarDemandasHistoricas/DTODemandaHistoricaAnual";
// import type DTODemandaHistoricaProducto from "./CargarDemandasHistoricas/DTODemandaHistoricaProducto";
// import type DTODemandPredictionModel from "./DTODemandPredictionModel";
import type DTOSale from "./DTOSale";



const BASE_URL = "http://localhost:8081/invop/saleModule";

export const VentaService = {

    sale: {
        getList: async (search: string) : Promise<DTOSale[]> => {
            const response = await fetch(`${BASE_URL}/sale`, {
                method: "GET",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
            const data : DTOSale[] = ret;
            return data;
        },
        // get: async (search: number) : Promise<DTOSale> => {
        //     const response = await fetch(`${BASE_URL}/sale/${search}`, {
        //         method: "GET",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         mode: 'cors'
        //     });
        //     let ret = await response.json();
        //     if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
        //     const data : DTOSale = ret;
        //     return data;
        // },
        // save: async (sale: DTOSale) : Promise<DTOSale> => {
        //     const response = await fetch(`${BASE_URL}/sale`, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         mode: 'cors'
        //     });
        //     let ret = await response.json();
        //     if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
        //     const data : DTOSale = ret;
        //     return data;
        // },
    },    
    
}
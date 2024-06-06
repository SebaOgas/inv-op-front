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
        // get: async (search: string) : Promise<DTODemandaHistoricaProducto[]> => {
        //     const response = await fetch(`${BASE_URL}/products/${search}`, {
        //         method: "GET",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         mode: 'cors'
        //     });
        //     let ret = await response.json();
        //     if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
        //     const data : DTODemandaHistoricaProducto[] = ret;
        //     return data;
        // },
    },

    // historicDemand: {
    //     get: async (articulo: number, desde: number, hasta: number) : Promise<DTODemandaHistoricaAnual[]> => {
    //         const response = await fetch(`${BASE_URL}/historicDemand/${articulo}?desde=${desde}&hasta=${hasta}`, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             mode: 'cors'
    //         });
    //         let ret = await response.json();
    //         if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
    //         const data : DTODemandaHistoricaAnual[] = ret;
    //         return data;
    //     },
    //     post: async (articulo: number, datos: DTODemandaHistoricaAnual[]) : Promise<DTODemandaHistoricaAnual[]> => {
    //         const response = await fetch(`${BASE_URL}/historicDemand/${articulo}`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             mode: 'cors',
    //             body: JSON.stringify(datos)
    //         });
    //         let ret = await response.json();
    //         if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
    //         const data : DTODemandaHistoricaAnual[] = ret;
    //         return data;
    //     }
    // },

    // model: {
    //     get: async () : Promise<DTODemandPredictionModel[]> => {
    //         const response = await fetch(`${BASE_URL}/model`, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             mode: 'cors'
    //         });
    //         let ret = await response.json();
    //         if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
    //         const data : DTODemandPredictionModel[] = ret;
    //         return data;
    //     },
    //     put: async (dto: DTODemandPredictionModel) : Promise<null> => {
    //         const response = await fetch(`${BASE_URL}/model`, {
    //             method: "PUT",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(dto),
    //             mode: 'cors'
    //         });
    //         if (response.status !== 200) {throw new Error("" + response.status + (await response.json()).mensaje)};
    //         return null;
    //     },
    //     delete: async (id: number) : Promise<null> => {
    //         const response = await fetch(`${BASE_URL}/model/${id}`, {
    //             method: "DELETE",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             mode: 'cors'
    //         });
    //         if (response.status !== 200) {throw new Error("" + response.status + (await response.json()).mensaje)};
    //         return null;
    //     }
    // }
    
    
}
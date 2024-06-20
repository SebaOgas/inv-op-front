import { json } from "@sveltejs/kit";
import type DTODemandaHistoricaAnual from "./CargarDemandasHistoricas/DTODemandaHistoricaAnual";
import type DTODemandaHistoricaProducto from "./CargarDemandasHistoricas/DTODemandaHistoricaProducto";
import type DTODemandPredictionModel from "./DTODemandPredictionModel";
import type DTODemandResults from "./DTODemandResults";
import type DTONextPeriodDemand from "./DTONextPeriodDemand";
import type DTOProductOrFamily from "./DTOProductOrFamily";
import type DTOGeneralDemandParameters from "./Parametros/DTOGeneralDemandParameters";

const BASE_URL = "http://localhost:8081/invop/demandModule";

export const DemandaService = {

    products: {
        get: async (search: string) : Promise<DTODemandaHistoricaProducto[]> => {
            const response = await fetch(`${BASE_URL}/products/${search}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
            const data : DTODemandaHistoricaProducto[] = ret;
            return data;
        }
    },

    historicDemand: {
        get: async (articulo: number, desde: number, hasta: number) : Promise<DTODemandaHistoricaAnual[]> => {
            const response = await fetch(`${BASE_URL}/historicDemand/${articulo}?desde=${desde}&hasta=${hasta}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
            const data : DTODemandaHistoricaAnual[] = ret;
            return data;
        },
        post: async (articulo: number, datos: DTODemandaHistoricaAnual[]) : Promise<DTODemandaHistoricaAnual[]> => {
            const response = await fetch(`${BASE_URL}/historicDemand/${articulo}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(datos)
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
            const data : DTODemandaHistoricaAnual[] = ret;
            return data;
        }
    },

    generalParameters: {
        get: async () : Promise<DTOGeneralDemandParameters> => {
            const response = await fetch(`${BASE_URL}/generalParameters`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
            const data : DTOGeneralDemandParameters = ret;
            return data;
        },
        post: async (dto: DTOGeneralDemandParameters) : Promise<null> => {
            const response = await fetch(`${BASE_URL}/generalParameters`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(dto)
            });
            if (response.status !== 200) {throw new Error("" + response.status + (await response.json()).mensaje)};
            return null;
        }
    },


    productsAndFamilies: {
        get: async (search: string) : Promise<DTOProductOrFamily[]> => {
            const response = await fetch(`${BASE_URL}/productsAndFamilies/${search}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
            const data : DTOProductOrFamily[] = ret;
            return data;
        }
    },

    model: {
        get: async (id: number, family: boolean) : Promise<DTODemandPredictionModel[]> => {
            const response = await fetch(`${BASE_URL}/model/${id}?family=${family}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
            const data : DTODemandPredictionModel[] = ret;
            return data;
        },
        put: async (dto: DTODemandPredictionModel, id: number, family: boolean) : Promise<number> => {
            const response = await fetch(`${BASE_URL}/model/${id}?family=${family}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto),
                mode: 'cors'
            });
            if (response.status !== 200) {throw new Error("" + response.status + (await response.json()).mensaje)};
            return (await response.json()).id;
        },
        delete: async (id: number) : Promise<null> => {
            const response = await fetch(`${BASE_URL}/model/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            if (response.status !== 200) {throw new Error("" + response.status + (await response.json()).mensaje)};
            return null;
        }
    },

    demandPrediction: {
        get: async ( id: number, family: boolean, desde: Date, predecirMesActual: boolean) : Promise<DTODemandResults> => {
            const response = await fetch(`${BASE_URL}/demandPrediction/${id}?family=${family}&desde=${desde}&predecirMesActual=${predecirMesActual}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).mensaje)};
            const data : DTODemandResults = ret;
            return data;
        },
        post: async (dto: DTONextPeriodDemand) : Promise<null> => {
            const response = await fetch(`${BASE_URL}/demandPrediction`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(dto)
            });
            if (response.status !== 200) {throw new Error("" + response.status + (await response.json()).mensaje)};
            return null;
        }
    }
    
    
}
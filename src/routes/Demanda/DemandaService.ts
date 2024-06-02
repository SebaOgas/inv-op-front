import type DTODemandaHistoricaAnual from "./CargarDemandasHistoricas/DTODemandaHistoricaAnual";
import type DTODemandaHistoricaProducto from "./CargarDemandasHistoricas/DTODemandaHistoricaProducto";

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
    }
    
    
}
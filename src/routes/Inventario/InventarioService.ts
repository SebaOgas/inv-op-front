import type DTOFamily from "./DTOFamily";
import type { DTOProductosAReponer } from "./DTOProductosAReponer";
import type { DTOProductosFaltantes } from "./DTOProductosFaltantes";

const BASE_URL = "http://localhost:8081/invop/inventarioModule";

export const InventarioService = {

    families: {
        getList: async () : Promise<DTOFamily[]> => {
            const response = await fetch(`${BASE_URL}/familyModule/family`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOFamily[] = ret;
            return data;
        }
    },

    productosFaltantes:{
        getList: async () : Promise<DTOProductosFaltantes[]> => {
            const response = await fetch(`${BASE_URL}/faltantesModule/faltantes`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOProductosFaltantes[] = ret;
            return data;
        }
    },

    productosAReponer:{
        getList: async () : Promise<DTOProductosAReponer[]> => {
            const response = await fetch(`${BASE_URL}/reponerModule/reponer`, {
                method: "GET",
                mode: 'cors'
            });
            let ret = await response.json();
            if (response.status !== 200) {throw new Error("" + response.status + (ret).message)};
            const data : DTOProductosAReponer[] = ret;
            return data;
        }
    }
    
}
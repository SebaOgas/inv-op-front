import type DTODemandaHistoricaMensual from "./DTODemandaHistoricaMensual";

export default interface DTODemandaHistoricaAnual {
    ano: number,
    meses: DTODemandaHistoricaMensual[]
}
import type DTODemandPredictionPeriod from "./DTODemandPredictionPeriod";

export default interface DTODemandPrediction {
    id: number | null,
    type: string,
    color: string,
    num: number,
    periods: DTODemandPredictionPeriod[]
}
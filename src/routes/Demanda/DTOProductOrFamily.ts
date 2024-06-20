import type DTODemandPrediction from "./DTODemandPrediction";
import type DTODemandPredictionPeriod from "./DTODemandPredictionPeriod";

export default interface DTOProductOrFamily {
    id: number,
    family: boolean,
    name: string
}
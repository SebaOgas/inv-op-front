import type DTODemandPrediction from "./DTODemandPrediction";
import type DTODemandRealPeriod from "./DTODemandRealPeriod";

export default interface DTODemandResults {
    periods: DTODemandRealPeriod[],
    predictions: DTODemandPrediction[]
}
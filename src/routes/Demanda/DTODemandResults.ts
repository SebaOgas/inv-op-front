import type DTODemandPrediction from "./DTODemandPrediction";
import type DTODemandRealPeriod from "./DTODemandRealPeriod";
import type DTONextPeriodDemand from "./DTONextPeriodDemand";

export default interface DTODemandResults {
    periods: DTODemandRealPeriod[],
    predictions: DTODemandPrediction[],
    nextPeriodDemand: DTONextPeriodDemand,
    errorAceptable: number
}
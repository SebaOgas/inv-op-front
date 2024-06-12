export default interface DTODemandPredictionPeriod {
    year: number,
    month: number,
    prediction: number | null,
    error: number | null
}
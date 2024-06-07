export default interface DTODemandPredictionModel {
    id: number | null,
    type: string,
    color: string,
    num: number,
    //PMP
    ponderations: string,
    //PMSE
    alpha: number,
    root: number,
    //RL
    ignorePeriods: number,
    predictPeriods: number,
    //Ix
    length: number,
    count: number,
    expectedDemand: number
}
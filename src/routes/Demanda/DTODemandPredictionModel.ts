export default interface DTODemandPredictionModel {
    id: number | null,
    type: string,
    color: string,
    num: number,
    //PMP
    ponderations: string,
    //PMSE
    alhpa: number,
    root: number,
    //RL
    ignorePeriods: number,
    //Ix
    length: number,
    count: number,
    expectedDemand: number
}
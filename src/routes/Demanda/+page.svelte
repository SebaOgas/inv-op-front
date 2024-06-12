<script lang="ts">
	import SearchBar from "$lib/SearchBar.svelte";
	import ComboBox from "$lib/ComboBox.svelte";
	import DatePicker from "$lib/DatePicker.svelte";
	import XyGraph, {type XYFunction} from "$lib/XYGraph.svelte";
	import { onMount } from "svelte";
    import type DTODemandPredictionModel from "./DTODemandPredictionModel";
    import type DTODemandPredictionPeriod from "./DTODemandPredictionPeriod";
	import { DemandaService } from "./DemandaService";
	import type DTOProductOrFamily from "./DTOProductOrFamily";
	import type DTODemandResults from "./DTODemandResults";
	import { error } from "@sveltejs/kit";
	import CheckBox from "$lib/CheckBox.svelte";


    let productsAndFamilies : DTOProductOrFamily[] = [];
    let productoSeleccionado : DTOProductOrFamily | null = null;
    let models: DTODemandPredictionModel[] = [];
    let fechaDesde: Date;
    let resultados : DTODemandResults | null = null;
    let minMonth : number;
    let minYear : number;
    let maxMonth : number;
    let maxYear : number;
    let predecirMesActual : boolean = true;

    async function getProductsAndFamilies(search: string) {
        productsAndFamilies = await DemandaService.productsAndFamilies.get(search);
        productoSeleccionado = null;
    }

    async function seleccionarProducto(id: number, family: boolean) {
        productsAndFamilies.forEach(p => {
            if(p.id === id && p.family === family) {
                productoSeleccionado = p;
                return;
            }
        });

        if(productoSeleccionado !== null)
            models = await DemandaService.model.get(productoSeleccionado.id, productoSeleccionado.family);
    }


    function addModel(type: string) {
        let num = 1;
        models.forEach(m => {
            if (m.type === type) num++;
        });
        let model : DTODemandPredictionModel = {
			id: null,
			type: type,
			color: "gray",
			num: num,
			ponderations: "",
			alpha: 0,
			root: 0,
			ignorePeriods: 0,
			length: 0,
			expectedDemand: 0
        };

        models = [...models, model];    
    }

    async function putModel(model: DTODemandPredictionModel) {
        if (productoSeleccionado === null) return;
        let id : number = await DemandaService.model.put(model, productoSeleccionado.id, productoSeleccionado.family);
        models.forEach(m => {
            if(m.type === model.type && m.num === model.num) {
                m.id = id;
            }
        })
        models = models;
    }

    async function deleteModel(model: DTODemandPredictionModel) {
        models = models.filter(m => {
            return m.id !== model.id;
        });
        if(model.id === null) return;
        await DemandaService.model.delete(model.id);
    }

    let xLabels : string[] = [];

    let fns : XYFunction[] = [];

    async function predict() {
        if (productoSeleccionado === null) return;

        resultados = await DemandaService.demandPrediction.get(productoSeleccionado.id, productoSeleccionado.family, fechaDesde, predecirMesActual)
        minMonth = new Date(fechaDesde).getMonth() + 1;
        minYear = new Date(fechaDesde).getFullYear();
        maxMonth = minMonth;
        maxYear = minYear;

        fns = [];

        let dr : XYFunction = {
			dots: [],
			color: "gray"
		};

        resultados.periods.forEach(p => {
            if(p.year > maxYear || p.year === maxYear && p.month > maxMonth) {
                maxMonth = p.month;
                maxYear = p.year;
            };

            if(p.value !== null) {
                let x = p.month - 1 + p.year * 12;
                let y = p.value;

                dr.dots.push({
                    x: x, 
                    y: y
                });

                xLabels[x] = p.month + "/" + p.year;       
            }     
        });

        fns = [...fns, dr];

        resultados.predictions.forEach(pr => {
            let fn : XYFunction = {
                dots: [],
                color: pr.color
            };
            pr.periods.forEach(p => {
                if(p.year > maxYear || p.year === maxYear && p.month > maxMonth) {
                    maxMonth = p.month;
                    maxYear = p.year;
                }
                if (p.prediction !== null) {
                    let x = p.month - 1 + p.year * 12;
                    let y = p.prediction;
                    
                    fn.dots.push({
                        x: x, 
                        y: y
                    });

                    xLabels[x] = p.month + "/" + p.year;  
                }
            });
            fns = [...fns, fn];
        });
    }

    

    function range(size: number, startAt : number = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }

    function getPeriods(mes: number, ano: number) : DTODemandPredictionPeriod[] {
        let ret : DTODemandPredictionPeriod[] = [];
        if(resultados === null) return [];
        resultados.predictions.forEach(p => {
            let per = p.periods.find(p => p.month === mes && p.year === ano);
            if (per !== undefined) {
                ret.push(per);
            } else {
                ret.push({
					year: ano,
					month: mes,
					prediction: null,
					error: null
				});
            }
        });
        return ret;
    }

</script>

<div class="filter d-flex flex-row justify-content-between mb-4">
    <div class="filter d-flex flex-row flex-wrap">
        <SearchBar placeholder="Buscar Artículos o Familias" action={getProductsAndFamilies}/>

        <ComboBox placeholder="Artículo/Familia" value={productoSeleccionado?.name !== undefined ? productoSeleccionado.name : ""}>
            {#each productsAndFamilies as p}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span on:click={() => seleccionarProducto(p.id, p.family)}>{p.name}</span>
            {/each}
        </ComboBox>

        <span class="d-flex ms-2">
            <span class="me-2">Analizar desde: </span>
            <DatePicker width={"150px"} bind:value={fechaDesde}/>
        </span>

        <span class="d-flex ms-2">
            <CheckBox bind:checked={predecirMesActual} label={"Predecir mes actual"}/>
        </span>
    </div>
    <div>
        <button class="bg-dark text-lighter" on:click={predict}>Generar Predicciones</button>
    </div>
</div>

{#if productoSeleccionado !== null}
<div class="container-fluid">
    {#each models as m}
        <div class="prediccion d-flex flex-row justify-content-between">
            <div>
                <strong>{m.type} {m.num}</strong>
                {#if m.type === "PMP"}
                    <label>Ponderaciones: <input type="text" bind:value={m.ponderations}></label>
                {:else if m.type === "PMSE"}
                    <label>Raíz: <input type="number" bind:value={m.root} min={0}></label>
                    <label>α: <input type="number" bind:value={m.alpha} min={0} max={1} step={0.1}></label>
                {:else if m.type === "RL"}
                    <label>Ignorar periodos: <input type="number" bind:value={m.ignorePeriods} min={0}></label>
                {:else if m.type === "Ix"}
                    <label>Longitud de ciclo: <input type="number" bind:value={m.length} min={1}></label>
                    <label>Demanda esperada siguiente ciclo: <input type="number" bind:value={m.expectedDemand} min={1}></label>
                {:else}
                    <span>Tipo de modelo desconocido</span>
                {/if}
                <label>Color: <input type="text" bind:value={m.color}></label>
            </div>
            <div class="button-container d-flex flex-row justify-content-center align-items-center">
                <button class="bg-darker text-lighter me-1" on:click={() => putModel(m)}><img src="/save.svg" alt="guardar"></button>
                <button class="bg-darker text-lighter" on:click={() => deleteModel(m)}>X</button>
            </div>
        </div>
    {/each}
    
    <div class="addMetodo d-flex flex-row justify-content-end">
        <button on:click={() => addModel("PMP")}>+ PMP</button>
        <button on:click={() => addModel("PMSE")}>+ PMSE</button>
        <button on:click={() => addModel("RL")}>+ RL</button>
        <button on:click={() => addModel("Ix")}>+ Ix</button>
    </div>

    {#if resultados !== null}
    <h2 class="text-xl">Resultados</h2>
    
    <XyGraph bind:functions={fns} height={450} yMarks={8} precision={{x: 0, y: 2}} bind:xLabels/>
    
    <div class="overflow-auto mb-4">
        <table class="w-100">
            <thead>
                <tr>
                    <th rowspan="2">Periodo</th>
                    <th rowspan="2">DR</th>
                    {#each resultados.predictions as p}
                        <th colspan="2">{p.type} {p.num}</th>
                    {/each}
                </tr>
                <tr>
                    {#each resultados.predictions as p}
                        <th>DP</th>
                        <th>E</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each range(maxYear - minYear + 1, minYear) as ano}
                    {#if ano === minYear && ano === maxYear}
                        {#each range(maxMonth - minMonth + 1, minMonth) as mes}
                            <tr>
                                <td>{mes}/{ano}</td>
                                <td>{
                                    (() => {
                                        let dr = resultados.periods.find(p => p.month === mes && p.year === ano);
                                        if (dr === undefined || dr.value === null) return "-";
                                        return dr.value;
                                    })()
                                }</td>
                                {#each getPeriods(mes, ano) as p}
                                    <td>{p.prediction !== null ? p.prediction.toFixed(3) : "-"}</td>
                                    <td>{p.error === null ? "-" : p.error.toFixed(3)}</td>
                                {/each}
                            </tr>
                        {/each}
                    {:else if ano === minYear}
                        {#each range(12 - minMonth + 1, minMonth) as mes}
                            <tr>
                                <td>{mes}/{ano}</td>
                                <td>{
                                    (() => {
                                        let dr = resultados.periods.find(p => p.month === mes && p.year === ano);
                                        if (dr === undefined || dr.value === null) return "-";
                                        return dr.value;
                                    })()
                                }</td>
                                {#each getPeriods(mes, ano) as p}
                                    <td>{p.prediction !== null ? p.prediction.toFixed(3) : "-"}</td>
                                    <td>{p.error === null ? "-" : p.error.toFixed(3)}</td>
                                {/each}
                            </tr>
                        {/each}
                    {:else if ano === maxYear}
                        {#each range(maxMonth, 1) as mes}
                            <tr>
                                <td>{mes}/{ano}</td>
                                <td>{
                                    (() => {
                                        let dr = resultados.periods.find(p => p.month === mes && p.year === ano);
                                        if (dr === undefined || dr.value === null) return "-";
                                        return dr.value;
                                    })()
                                }</td>
                                {#each getPeriods(mes, ano) as p}
                                    <td>{p.prediction !== null ? p.prediction.toFixed(3) : "-"}</td>
                                    <td>{p.error === null ? "-" : p.error.toFixed(3)}</td>
                                {/each}
                            </tr>
                        {/each}
                    {:else}
                        {#each range(12, 1) as mes}
                            <tr>
                                <td>{mes}/{ano}</td>
                                <td>{
                                    (() => {
                                        let dr = resultados.periods.find(p => p.month === mes && p.year === ano);
                                        if (dr === undefined || dr.value === null) return "-";
                                        return dr.value;
                                    })()
                                }</td>
                                {#each getPeriods(mes, ano) as p}
                                    <td>{p.prediction !== null ? p.prediction.toFixed(3) : "-"}</td>
                                    <td>{p.error === null ? "-" : p.error.toFixed(3)}</td>
                                {/each}
                            </tr>
                        {/each}
                    {/if}
                {/each}
            </tbody>
            <tfoot>
                <tr>
                    <td><strong>Total</strong></td>
                    <td>{resultados.periods.map(p => p.value).reduce((drt, v) => drt + v).toFixed(3)}</td>
                    {#each resultados.predictions as p}
                        <td>{p.periods.map(pe => pe.prediction !== null && resultados !== null && resultados.periods.filter(per => per.month === pe.month && per.year === pe.year && per.value !== null).length === 0 ? pe.prediction : 0).reduce((t, v) => t + v).toFixed(3)}</td>
                        <td>
                            {(() => {
                                let aux = p.periods.map(pe => pe.error).reduce((t, v) => (t !== null ? t : 0) + (v !== null ? v : 0));
                                if (aux === null) return 0;
                                let count = p.periods.filter(pe => pe.error !== null).length;
                                return Number.isNaN(aux / count) ? "-" : (aux / count).toFixed(3);
                            })()}
                        </td>
                    {/each}
                </tr>
            </tfoot>
        </table>
    </div>
    <div class="d-flex flex-row justify-content-end mb-4">
        <button class="bg-dark text-lighter">Generar Orden de Compra</button>
    </div>
    {/if}

</div>
{/if}



<style>
    .prediccion {
        border-radius: var(--radius);
        padding: 4px;
        margin-bottom: 8px;
    }

    .prediccion:hover {
        background-color: var(--light);
    }

    .filter {
        gap: 4px;
    }

    .addMetodo {
        gap: 8px;
    }

    input[type=number] {
        width: 80px;
    }

    th, td {
        white-space: nowrap;
    }

    table tr {
        position: relative;
    }

    table td:first-child, table tr:first-child th:first-child {
        position: sticky;
        top: 0;
        left: 0;
        background-color: var(--lighter);
        z-index: 1;
    }

    .highlighted, .highlighted * {
        background-color: var(--light) !important;
    }

    .button-container>button {
        flex: 1;
    }

    .button-container>button>img {
        height: 14pt;
    }

</style>
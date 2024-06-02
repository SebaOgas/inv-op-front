<script lang="ts">
	import SearchBar from "$lib/SearchBar.svelte";
	import ComboBox from "$lib/ComboBox.svelte";
    import type DTODemandaHistoricaProducto from "./DTODemandaHistoricaProducto";
	import { DemandaService } from "../DemandaService";
	import type DTODemandaHistoricaAnual from "./DTODemandaHistoricaAnual";


    let productos : DTODemandaHistoricaProducto[] = [];
    let productoSeleccionado : DTODemandaHistoricaProducto | null = null;

    async function buscarArticulos(search: string) {
        productos = await DemandaService.products.get(search);
        productoSeleccionado = null;
    }

    let demanda : DTODemandaHistoricaAnual[] = [];
    let nroAnos : number = 3;
    let anoActual = (new Date).getFullYear();
    let ano = anoActual;

    function seleccionarProducto(id: number) {
        productos.forEach(p => {
            if(p.id === id) {
                productoSeleccionado = p;
                return;
            }
        });
        ano = anoActual;
        getDemanda();    
        
    }

    function addAno(q: number) {
        ano = ano + q;
        getDemanda();
    }


    async function getDemanda() {
        if(productoSeleccionado === null) throw new Error("Seleccione un producto");
        demanda = await DemandaService.historicDemand.get(productoSeleccionado.id, ano - nroAnos, ano);
        demanda = demanda.sort((a, b) => a.ano > b.ano ? 1 : -1);
    }


    async function guardar() {
        if(productoSeleccionado === null) throw new Error("Seleccione un producto");
        demanda = await DemandaService.historicDemand.post(productoSeleccionado.id, demanda);
        demanda = demanda.sort((a, b) => a.ano > b.ano ? 1 : -1);
    }

</script>

<div class="filter d-flex flex-row justify-content-between mb-2">
    <div class="filter d-flex flex-row">
        <SearchBar placeholder="Buscar Artículos" action={value => buscarArticulos(value)}/>

        <ComboBox placeholder="Artículo" value={productoSeleccionado?.nombre !== undefined ? productoSeleccionado.nombre : ""}>
            {#each productos as p}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span on:click={() => seleccionarProducto(p.id)}>{p.nombre}</span>
            {/each}
        </ComboBox>
    </div>
    {#if productoSeleccionado !== null}
        <div>
            <button class="bg-dark text-lighter" on:click={() => {addAno(-1)}}>◀</button>
            <button class="bg-dark text-lighter" disabled={ano === anoActual ? true : false} on:click={() => {addAno(1)}}>▶</button>
        </div>
    {/if}
    <div>
        <button class="bg-dark text-lighter" on:click={guardar}>Guardar Cambios</button>
    </div>
    
</div>

{#if demanda.length !== 0 && productoSeleccionado !== null}
<table class="w-100">
    <thead>
        <tr>
            <th>Mes</th>
            {#each demanda as ano}
                <th>{ano.ano}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each [...Array(12).keys()] as mes}
            <tr>
                <td>{mes + 1}</td>
                {#each demanda as ano}
                    {#each ano.meses as m}
                        {#if m.mes === mes + 1}
                            <td><input type="number" bind:value={m.cantidad} min={0}></td>
                        {/if}
                    {/each}
                {/each}
            </tr>
        {/each}
</table>
{/if}


<style>
    .filter {
        gap: 4px;
    }

    input[type=number] {
        text-align: right;
        max-width: 100%;
    }
</style>



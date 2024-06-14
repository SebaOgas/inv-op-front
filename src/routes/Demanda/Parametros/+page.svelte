<script lang="ts">
	import ComboBox from "$lib/ComboBox.svelte";
	import { DemandaService } from "../DemandaService";
    import type DTOGeneralDemandParameters from "./DTOGeneralDemandParameters";
	import { onMount } from "svelte";

    let dto : DTOGeneralDemandParameters = {
		periodosAPredecir: 0,
		metodoCalculoError: "",
		errorAceptable: 0
	};

    onMount(async () => {
        dto = await DemandaService.generalParameters.get();
    });

    async function guardar() {
        await DemandaService.generalParameters.post(dto);
    }

    let errores : Record<string, string> = {};
    errores["MSE"] = "Error Medio Cuadrado";
    errores["MAD"] = "Error Medio Absoluto";
    errores["MAPE"] = "Error Medio Porcentual Absoluto";


    function seleccionarError(error: string) {
        dto.metodoCalculoError = error;
    }

</script>

<div class="d-flex flex-row justify-content-between mb-2">
    <span>Periodos a predecir
    </span>
    <input type="number" min={0} bind:value={dto.periodosAPredecir}>
</div>

<div class="d-flex flex-row justify-content-between mb-2">
    <span>Método de Cálculo de Error</span>
    <ComboBox placeholder="Método de Cálculo" value={errores[dto.metodoCalculoError]}>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each Object.entries(errores) as [k, v]}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span on:click={() => {seleccionarError(k)}}>{v}</span>
        {/each}
    </ComboBox> 
</div>

<div class="d-flex flex-row justify-content-between mb-2">
    <span>Error aceptable</span>
    <input type="number" min={0} bind:value={dto.errorAceptable}>
</div>

<div class="d-flex flex-row justify-content-end mb-2">
    <button class="bg-dark text-lighter" on:click={guardar}>Guardar Cambios</button>
</div>
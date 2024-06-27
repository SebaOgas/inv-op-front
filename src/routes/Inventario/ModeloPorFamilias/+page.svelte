<script lang="ts">
    import { onMount } from 'svelte';
	import { InventarioService } from '../InventarioService';
	import type { DTOFamily } from '../DTOFamily';
 

    let families: DTOFamily[] = [];
    let selectedFamilyId: number = 0;
    let selectedModel: string = '';
    let isLoading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            families = await InventarioService.getAllFamilies();
        } catch (err) {
          
        } finally {
            isLoading = false;
        }
    });

    async function save() {
        try {
            let family = families.find(f => f.id === selectedFamilyId);
            if (family) {
                family.inventoryModel = selectedModel;
            }
        } catch (err) {
            
        }
    }
</script>

<main>
    <div class="container-fluid">
    <h1>Modelo por Familias</h1>

    {#if isLoading}
        <p>Cargando...</p>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else}
        
    
        <div class="mb-3 row">
            <label for="familyName" class="col-sm-4 col-form-label">Familias de artículos:</label>
                <div class="col-sm-4">
                    <select id="family" bind:value={selectedFamilyId} class="form-select" aria-label="Default select example" required>
                        <option value="" disabled selected>Seleccione una familia</option>
                        {#each families as family}
                            <option value={family.id}>{family.name}</option>
                        {/each}
                    </select>
                </div>
        </div>


        <div class="mb-3 row">
            <label for="quantity" class="col-sm-4 col-form-label">Modelo de inventario por familia:</label>
            <div class="col-sm-4">
                <select id="model" bind:value={selectedModel} class="form-select" aria-label="Default select example" required>
                    <option value>Seleccione un modelo</option>   
                    <option value="Lote Fijo">Lote Fijo</option>
                    <option value="Intervalo Fijo">Intervalo Fijo</option>
                </select>
            </div>
        </div>
        

        <div class="mb-3 row">
                <dir class="col-sm-4 col-form-label">
                    <button on:click={save}>Guardar</button>
                </dir>
        </div>
    {/if}
    </div>
</main>


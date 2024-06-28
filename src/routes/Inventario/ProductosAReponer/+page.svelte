<script lang="ts">
    import { onMount } from 'svelte';
    
    import type { DTOProductosAReponer } from '../DTOProductosAReponer';
	import { InventarioService } from '../InventarioService';

    let restockProducts: DTOProductosAReponer[] = [];
    let error: string | null = null;
    let isLoading = true;
    
    onMount(async () => {
        try {
            restockProducts = await InventarioService.getRestockProducts();
        } catch (err) {
            
        } finally {
            isLoading = false;
        }
    });

</script>


<div style="overflow-x: auto;">
    <h1>Productos a Reponer</h1>

    {#if isLoading}
        <p>Cargando...</p>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else if restockProducts.length === 0}
        <p>No hay productos a reponer.</p>
    {:else}
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cantidad a Reponer</th>
                </tr>
            </thead>
            <tbody>
                {#each restockProducts as product}
                    <tr>
                        <td>{product.idRestockProduct}</td>
                        <td>{product.nameRestockProduct}</td>
                        <td>{product.optimalBatch}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>
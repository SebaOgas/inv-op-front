
<script lang="ts">
    import { onMount } from 'svelte';
    
    import type { DTOProductosFaltantes } from '../DTOProductosFaltantes';
	import { InventarioService } from '../InventarioService';

    let missingProducts: DTOProductosFaltantes[] = [];
    let error: string | null = null;
    let isLoading = true;

    onMount(async () => {
        try {
            missingProducts = await InventarioService.getMissingProducts();
        } catch (err) {
            
        } finally {
            isLoading = false;
        }
    });
</script>

<div style="overflow-x: auto;">
    <h1>Productos Faltantes</h1>

    {#if isLoading}
        <p>Cargando...</p>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else if missingProducts.length === 0}
        <p>No hay productos faltantes.</p>
    {:else}
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cantidad Faltante</th>
                </tr>
            </thead>
            <tbody>
                {#each missingProducts as product}
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.missingAmount}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>



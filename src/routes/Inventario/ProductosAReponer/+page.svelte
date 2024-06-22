<script lang="ts">
    import { onMount } from 'svelte';
    
    import type { DTOProductosAReponer } from '../DTOProductosAReponer';
	import { InventarioService } from '../InventarioService';

    let productosAReponer: DTOProductosAReponer[] = [];

    onMount(() => {
		getProductosAReponer();
	});

    async function getProductosAReponer() {
        productosAReponer = await InventarioService.productosAReponer.getList();
    }

</script>


<div style="overflow-x: auto;">
    <h3>Productos A Reponer:</h3>
    <table style="width: 100%;">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            {#each productosAReponer as product}
                <tr>
                    <td>{product.id}</td>
                    <td>{product.nombre}</td>
                    <td>{product.cantidadAReponer}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
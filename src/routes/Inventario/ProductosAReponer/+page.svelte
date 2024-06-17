<script lang="ts">
    import { onMount } from 'svelte';
    
    import type { DTOProductosAReponer } from '../DTOProductosAReponer';
	import { InventarioService } from '../InventarioService';

    let productosAReponer: DTOProductosAReponer[] = [];

    onMount(() => {
		getProductosFaltantes();
	});

    async function getProductosFaltantes() {
        productosAReponer = await InventarioService.productosAReponer.getList();
    }

</script>


<h3>Productos A Reponer:</h3>
<ul>
    {#each productosAReponer as producto}
        <li>{producto.nombre} - Cantidad a reponer: {producto.cantidadAReponer}</li>
    {/each}
</ul>

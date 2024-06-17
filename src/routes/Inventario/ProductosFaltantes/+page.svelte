<script lang="ts">
    import { onMount } from 'svelte';
    
    import type { DTOProductosFaltantes } from '../DTOProductosFaltantes';
	import { InventarioService } from '../InventarioService';

    let productosFaltantes: DTOProductosFaltantes[] = [
        { id: 1, nombre: 'Producto A', cantidadFaltante: 0 },
        { id: 2, nombre: 'Producto B', cantidadFaltante: -2 },
        { id: 3, nombre: 'Producto C', cantidadFaltante: -5 },
        { id: 4, nombre: 'Producto D', cantidadFaltante: -1 }
    ]


    onMount(() => {
		getProductosFaltantes();
	});

    async function getProductosFaltantes() {
        productosFaltantes = await InventarioService.productosFaltantes.getList();
    }
</script>


<h3>Productos Faltantes:</h3>
<ul>
    {#each productosFaltantes as producto}
        <li>{producto.nombre} - Cantidad Faltante: {producto.cantidadFaltante}</li>
    {/each}
</ul>

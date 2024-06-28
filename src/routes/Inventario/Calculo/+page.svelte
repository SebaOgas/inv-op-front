
<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
	import type DTOProduct from '../DTOProducto';
	import type { DTOFamily } from '../DTOFamily';
	import { InventarioService } from '../InventarioService';
	import type { DTOModeloInventario } from '../DTOModeloInventario';
	


    let products: DTOProduct[] = [];
    let selectedProduct: DTOModeloInventario | null = null;

    let isLoading = false;
    let error: string | null = null;





    onMount(async () => {
        await fetchProducts();
    });

    async function fetchProducts() {
        try {
            isLoading = true;
            error = null;
            products = await InventarioService.products.getAllProducts();
        } catch (err) {
          //  error = err.message;
        } finally {
            isLoading = false;
        }
    }


    async function selectProduct(event: Event) {
        const target = event.target as HTMLSelectElement;
        const selectedIndex = target.selectedIndex;
        if (selectedIndex !== 0) {
            selectedProduct = await InventarioService.getProductData(selectedIndex);
        } else {
            selectedProduct = null;
        }
        
        /*if (selectedIndex > 0) { // Avoid selecting the first option which is the placeholder
            selectedProduct = products[selectedIndex - 1];
            try {
                selectedFamily = await InventarioService.products.getProductFamily(selectedProduct.productId);
                if (selectedFamily.inventoryModelName === 'Lote Fijo') {
                    optimalBatch = await InventarioService.calculateOptimalBatch(selectedProduct.productId);
                    orderPoint = await InventarioService.calculateOrderPoint(selectedProduct.productId);
                    safetyStock = await InventarioService.calculateSafetyStock(selectedProduct.productId);
                } else if (selectedFamily.inventoryModelName === 'Intervalo Fijo') {
                    safetyStock = await InventarioService.calculateSafetyStock(selectedProduct.productId);
                }

                cgiCalculation = await InventarioService.calculateCGI(selectedProduct.productId);
            } catch (err) {
                //error = err.message;
            }
        } else {
            selectedProduct = null;

        }*/
    }


    



    
</script>

<style>
    .container {
        max-width: 600px;
        margin: auto;
    }
    .select {
        width: 100%;
        padding: 8px;
    }
    .info {
        margin-top: 20px;
    }
</style>



<div class="container">
    <h1>Seleccionar Producto</h1>
    
    {#if isLoading}
        <p>Cargando productos...</p>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else}
        <select class="select" on:change={selectProduct}>
            <option value="">Selecciona un producto</option>
            {#each products as product}
                <option value="{product.productId}">{product.productName}</option>
            {/each}
        </select>

        {#if selectedProduct}
            <div class="info">
                <h2>Producto Seleccionado</h2>

                <p><strong>Nombre del Producto:</strong> {selectedProduct.nombre}</p>
                <p><strong>Nombre de la Familia:</strong> {selectedProduct.familia}</p>
                <p><strong>Modelo de Inventario:</strong> {selectedProduct.modeloInventario}</p>
                <p><strong>Cálculo de CGI:</strong> {selectedProduct.cgi.toFixed(3)}</p>
            

                {#if selectedProduct.modeloInventario === 'Lote Fijo'}
                    <p><strong>Lote Óptimo:</strong> {selectedProduct.optimalBatch}</p>
                    <p><strong>Punto de Pedido:</strong> {selectedProduct.orderLimit}</p>
                    <p><strong>Stock de Seguridad:</strong> {Math.ceil(selectedProduct.safetyStock)}</p>
                {:else if selectedProduct.modeloInventario === 'Intervalo Fijo'}
                    <p><strong>Stock de Seguridad:</strong> {Math.ceil(selectedProduct.safetyStock)}</p>
                {/if}

            </div>
        {/if}
    {/if}
</div>
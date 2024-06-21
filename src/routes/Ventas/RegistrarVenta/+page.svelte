<script lang="ts">
    
    import type DTOProduct from '../DTOProduct';
	import ComboBox from "$lib/ComboBox.svelte";

    import { onMount } from 'svelte';
    import { VentaService } from '../VentaService';
	import type { ActionData } from './$types';
	import type DTONewSale from '../DTONewSale';

    let productos : DTOProduct[] = [];

    export let form: ActionData;

    let newSale : DTONewSale = {
        customerName: "",
        quantity: 0
    }

    onMount(() => {
		getProducts();
	});

    async function getProducts() {
        productos = await VentaService.product.getList();
    }


    function redir(url: string) {
        window.location.href = url;
    }

    function getErrorMessage(): string {

        if (form?.formError == null) {
            return "Hubo un error, por favor intentelo más tarde.";
        }

        return form.formError;
    }

    async function createSale() {
        try {
            await VentaService.sale.create(newSale);
            alert('Orden de compra creada correctamente');
            if (typeof window !== 'undefined') {
                window.location.href = "/Ventas";
            }
        } catch (error) {
            console.error("Error creando la orden de compra:", error);
            alert('Error al crear la orden de compra: ' + error.message);
        }
    }

</script>


<div class="container-fluid">
    <h1>Registrar Venta</h1>
    <form method="POST" on:submit|preventDefault={createSale}>
        <div class="mb-3 row">
            <label for="customerName" class="col-sm-4 col-form-label">Nombre del cliente:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" name="customerName" bind:value={newSale.customerName} required>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="productName" class="col-sm-4 col-form-label">Producto</label>
            <div class="col-sm-4">
                <select name="productId"  class="form-select" aria-label="Default select example" bind:value={newSale.productId} required>
                    <option selected>Seleccione un producto</option>                    
                    {#each productos as product }
                        <option value={product.productId}>{product.productName}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="quantity" class="col-sm-4 col-form-label">Cantidad pedida</label>
            <div class="col-sm-4">
                <input type="number" class="form-control" name="quantity" min=0 bind:value={newSale.quantity} required>
            </div>
        </div>
        <div class="position-fixed end-0 m-2">
            <button type="submit">Guardar</button>
            <button type="button" on:click={() => {redir("/Ventas")}}>Cancelar</button>
        </div>
    </form>
</div>


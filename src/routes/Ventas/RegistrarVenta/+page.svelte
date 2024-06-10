<script lang="ts">
    
    import type DTOProduct from '../DTOProduct';
	import ComboBox from "$lib/ComboBox.svelte";

    import { format } from 'date-fns';
    import { onMount } from 'svelte';
    import { VentaService } from '../VentaService';
	import type { ActionData } from './$types';

    let productos : DTOProduct[] = [];

    export let form: ActionData;

    onMount(() => {
		getProducts();
        console.log(productos)
	});

    async function getProducts() {
        productos = await VentaService.product.getList();
        console.log(productos);
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

</script>


<div class="container-fluid">
    {#if form !== null && !form?.success}
    <div class="alert alert-danger" role="alert">
        {getErrorMessage()}
    </div>
    {/if}
    {#if form !== null && form?.success}
        <div class="alert alert-success" role="alert">
            La venta se guardó con éxito.
        </div>
    {/if}
    <h1>Registrar Venta</h1>
    <form method="POST" action="?/createSale">
        <div class="mb-3 row">
            <label for="customerName" class="col-sm-4 col-form-label">Nombre del cliente:</label>
            <div class="col-sm-4">
                
                {#if form?.formData.customerName !== undefined && !form?.success}
                    <input type="text" class="form-control" name="customerName" value={form?.formData.customerName} required>
                {:else}
                    <input type="text" class="form-control" name="customerName" required>
                {/if}
                </div>
            </div>
            <div class="mb-3 row">
                <label for="productName" class="col-sm-4 col-form-label">Producto</label>
                <div class="col-sm-4">
                <select name="productId"  class="form-select" aria-label="Default select example" required>
                    <option selected>Seleccione un producto</option>                    
                    {#each productos as product }
                        <option value="{product.productId}">{product.productName}</option>
                    {/each}

                </select>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="quantity" class="col-sm-4 col-form-label">Cantidad pedida</label>
                <div class="col-sm-4">
                {#if form?.formData.quantity !== undefined && !form?.success}
                    <input type="number" class="form-control" name="quantity" min=0 value={form?.formData.quantity}>
                {:else}
                <input type="number" class="form-control" name="quantity" min=0 required>
                {/if}
                </div>
            </div>
            <dir class="position-fixed end-0 m-2">
                <button type="submit">Guardar</button>
                <button type="button" on:click={() => {redir("/Ventas")}}>Cancelar</button>
            </dir>
    </form>
    
</div>


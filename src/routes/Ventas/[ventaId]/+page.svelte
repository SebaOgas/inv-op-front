<script lang="ts">
    import { format } from 'date-fns';
	export let data;

    function redir(url: string) {
        window.location.href = url;
    }

</script>
<div class="container-fluid">
    <h1>Venta</h1>
    <div class="mb-3 row">
        <label for="customerName" class="col-sm-4 col-form-label">Nombre del cliente:</label>
        <div class="col-sm-4">
            <input type="text" readonly class="form-control" id="customerName" value="{data.sale.customerName}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="productName" class="col-sm-4 col-form-label">Nombre del producto</label>
            <div class="col-sm-4">
            <input type="text" readonly class="form-control" id="productName" value="{data.sale.productName}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="quantity" class="col-sm-4 col-form-label">Cantidad pedida</label>
            <div class="col-sm-4">
            <input type="text" readonly class="form-control" id="quantity" value="{data.sale.quantity}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="saleDate" class="col-sm-4 col-form-label">Cantidad pedida</label>
            <div class="col-sm-4">
            <input type="text" readonly class="form-control" id="saleDate" value="{format(data.sale.saleDate, 'dd/MM/yyyy')}">
            </div>
        </div>
        <button type="button" class="position-fixed end-0 m-4" on:click={() => {redir("/Ventas")}}>Volver</button>
</div>


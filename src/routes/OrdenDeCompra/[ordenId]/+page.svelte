<script lang="ts">
    import { format } from 'date-fns';
	import { PurchaseOrderStatusEnum } from '../PurchaseOrderStatusEnum';
	export let data;

    function redir(url: string) {
        window.location.href = url;
    }

    function parseStatus(status: string){
		// console.log(status);
		switch (status) {
			case PurchaseOrderStatusEnum.OPEN: return "Abierta";
			case PurchaseOrderStatusEnum.CLOSED: return "Cerrada";
			default: return '';
		}
	}

</script>
<div class="container-fluid">
    <h1>Detalle de Orden</h1>
    <div class="mb-3 row">
        <label for="supplierName" class="col-sm-4 col-form-label">Nombre del proveedor</label>
        <div class="col-sm-4">
            <input type="text" readonly class="form-control" name="supplierName" value="{data.purchaseOrder.supplierName}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="productName" class="col-sm-4 col-form-label">Nombre del producto</label>
            <div class="col-sm-4">
            <input type="text" readonly class="form-control" name="productName" value="{data.purchaseOrder.productName}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="orderQuantity" class="col-sm-4 col-form-label">Cantidad pedida</label>
            <div class="col-sm-4">
            <input type="text" readonly class="form-control" name="orderQuantity" value="{data.purchaseOrder.orderQuantity}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="purchaseOrderStatus" class="col-sm-4 col-form-label">Estado de la orden</label>
            <div class="col-sm-4">
            <input type="text" readonly class="form-control" name="purchaseOrderStatus" value="{parseStatus(data.purchaseOrder.purchaseOrderStatus)}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="purchaseOrderDate" class="col-sm-4 col-form-label">Fecha de la orden</label>
            <div class="col-sm-4">
            <input type="text" readonly class="form-control" name="purchaseOrderDate" value="{format(data.purchaseOrder.purchaseOrderDate, 'dd/MM/yyyy')}">
            </div>
        </div>
        <button type="button" class="position-fixed end-0 m-4" on:click={() => {redir("/OrdenDeCompra")}}>Volver</button>
</div>


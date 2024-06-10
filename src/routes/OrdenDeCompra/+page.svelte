<script lang="ts">
	import type DTOPurchaseOrder from './DTOPurchaseOrder';
	import { OrdenDeCompraService } from './OrdenDeCompraService';
	import { onMount } from 'svelte';
	import { format } from 'date-fns';


	const PurchaseOrderStatusEnum = {
		OPEN: "OPEN",
		CLOSED: "CLOSED"
	}

	function parseStatus(status: string){
		console.log(status);
		switch (status) {
			case PurchaseOrderStatusEnum.OPEN: return "Abierta";
			case PurchaseOrderStatusEnum.CLOSED: return "Cerrada";
			default: return '';
		}
	}

	function redir(url: string) {
		window.location.href = url;
	}

	let purchaseOrders: DTOPurchaseOrder[] = [];

	onMount(() => {
		getPurchaseOrders();
	});

	async function getPurchaseOrders() {
		purchaseOrders = await OrdenDeCompraService.purchaseOrder.getList('');
		// console.log(sales);
	}

</script>

<div class="container-fluid">
	<h2 class="position-fixed">Listado de ordenes de compra</h2>
	<button class="position-fixed end-0 m-2"
		on:click={() => {
			redir('/OrdenDeCompra/RegistrarOrdenDeCompra');
		}}>Generar Orden de Compra</button	
	>
    <br>
    <br>
	<table class="table table-hover">
		<thead>
			<tr>
				<td class="col-sm-1">Fecha de la orden</td>
				<td class="col-sm-4">Proveedor</td>
				<td class="col-sm-4">Producto</td>
				<td class="col-sm-2">Estado de la orden</td>
				<!-- <td>Fecha</td> -->
				<td class="col-sm-1">Accion</td>
			</tr>
		</thead>

		<tbody>
			{#if purchaseOrders.length > 0}
				{#each purchaseOrders as purchaseOrder (purchaseOrder.purchaseOrderId)}
					<tr>
						<td>{format(purchaseOrder.purchaseOrderDate, 'dd/MM/yyyy')}</td>
						<!-- <td>{sale.saleId}</td> -->
						<td>{purchaseOrder.supplierName}</td>
						<td>{purchaseOrder.productName}</td>
						<td>{parseStatus(purchaseOrder.purchaseOrderStatus)}</td>
						<td><a href="/OrdenDeCompra/{purchaseOrder.purchaseOrderId}">Ver</a></td>
					</tr>
				{/each}
			{:else}
				<h3>No hay ordenes de compra registradas</h3>
			{/if}
		</tbody>
	</table>
</div>

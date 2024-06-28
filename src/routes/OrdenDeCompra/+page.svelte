<script lang="ts">
	import type DTOPurchaseOrder from './DTOPurchaseOrder';
	import { OrdenDeCompraService } from './OrdenDeCompraService';
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import { PurchaseOrderStatusEnum } from './PurchaseOrderStatusEnum';

	function parseStatus(status: string){
		// console.log(status);
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
	let showClosed = false;

	onMount(() => {
		getPurchaseOrders();
	});

	async function getPurchaseOrders() {
		purchaseOrders = await OrdenDeCompraService.purchaseOrder.getList('');
		// console.log(sales);
	}

	async function closePurchaseOrder(productId: number) {
		try {
			await OrdenDeCompraService.purchaseOrder.closePurchaseOrder(productId);
		} catch (error) {
			alert("Hubo un error al cerrar la orden: " + error.message)
		}

		window.location.href = window.location.href;
		
	}

</script>

<div class="container-fluid">
	<h2 class="position-fixed">Listado de ordenes de compra</h2>
</div>
<div class="position-fixed end-0">
	<div class="container-fluid">
		<button class=""
			on:click={() => {
				redir('/OrdenDeCompra/RegistrarOrdenDeCompra');
			}}>Generar Orden de Compra</button	
		>
		<button class=""
			on:click={() => {
				redir('/OrdenDeCompra/CalcularOrdenesDeCompra');
			}}>Calcular ordenes de Compra</button	
		>
	</div>
	<div class="container-fluid end-0">
		<label>
			<input type="checkbox" class="" bind:checked={showClosed} />
			Mostrar cerrados
		</label>
	</div>
</div>
<div class="i-flex">
    <br>
    <br>
	<table class="table table-hover">
		<thead>
			<tr>
				<td class="col-sm-1">Fecha de la orden</td>
				<td class="col-sm-3">Proveedor</td>
				<td class="col-sm-2">Producto</td>
				<td class="col-sm-2">Cantidad pedida</td>
				<td class="col-sm-2">Estado de la orden</td>
				<!-- <td>Fecha</td> -->
				<td class="col-sm-2">Accion</td>
			</tr>
		</thead>

		<tbody>
			{#if purchaseOrders.length > 0}
				{#each purchaseOrders as purchaseOrder (purchaseOrder.purchaseOrderId)}
					{#if purchaseOrder.purchaseOrderStatus === PurchaseOrderStatusEnum.OPEN || showClosed }
						<tr>
							<td>{format(purchaseOrder.purchaseOrderDate, 'dd/MM/yyyy')}</td>
							<!-- <td>{sale.saleId}</td> -->
							<td>{purchaseOrder.supplierName}</td>
							<td>{purchaseOrder.productName}</td>
							<td>{purchaseOrder.orderQuantity}</td>
							<td>{parseStatus(purchaseOrder.purchaseOrderStatus)}</td>
							<td>
								<!-- <a href="/OrdenDeCompra/{purchaseOrder.purchaseOrderId}">Ver</a> -->
								<!-- <button on:click={() => redir(`/OrdenDeCompra{purchaseOrder.purchaseOrderId}`)}>Modificar</button> -->
								<button on:click={() => redir(`/OrdenDeCompra/${purchaseOrder.purchaseOrderId}`)}>Ver</button>
								<!-- <button on:click={() => redir(`/OrdenDeCompra/${purchaseOrder.purchaseOrderId}`)} style="background-color: green; color: aliceblue;">Completar</button> -->
								{#if purchaseOrder.purchaseOrderStatus !== PurchaseOrderStatusEnum.CLOSED}
								<button on:click={() => closePurchaseOrder(purchaseOrder.purchaseOrderId)} style="background-color: green; color: aliceblue;">Completar</button>
								{/if}
							</td>
						</tr>
					{/if}
				{/each}
			{:else}
				<h3>No hay ordenes de compra registradas</h3>
			{/if}
		</tbody>
	</table>
</div>

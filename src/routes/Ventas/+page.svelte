<script lang="ts">
	import type DTOSale from './DTOSale';
	import { VentaService } from './VentaService';
	import { onMount } from 'svelte';
	import { format } from 'date-fns';

	function redir(url: string) {
		window.location.href = url;
	}

	let sales: DTOSale[] = [];

	onMount(() => {
		getSales();
	});

	async function getSales() {
		sales = await VentaService.sale.getList('');
		// console.log(sales);
	}

</script>

<div class="container-fluid">
	<h2 class="position-fixed">Listado de ventas</h2>
	<button class="position-fixed end-0 m-2"
		on:click={() => {
			redir('/Ventas/RegistrarVenta');
		}}>Registrar Venta</button
	>
    <br>
    <br>
	<table class="table table-hover">
		<thead>
			<tr>
				<td>Cliente</td>
				<td>Fecha</td>
				<td>Producto</td>
				<td>Cantidad</td>
				<!-- <td>Fecha</td> -->
				<td>Accion</td>
			</tr>
		</thead>

		<tbody>
			{#if sales.length > 0}
				{#each sales as sale (sale.saleId)}
					<tr>
						<!-- <td>{sale.saleId}</td> -->
						<td>{sale.customerName}</td>
						<td>{format(sale.saleDate, 'dd/MM/yyyy')}</td>
						<td>{sale.productName}</td>
						<td>{sale.quantity}</td>
						<td><button on:click={() => redir(`/Ventas/${sale.saleId}`)}>Ver</button></td>
					</tr>
				{/each}
			{:else}
				<h3>No hay ventas registradas</h3>
			{/if}
		</tbody>
	</table>
</div>

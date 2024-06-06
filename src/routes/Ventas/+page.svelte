<script lang="ts">
    import type  DTOSale from './DTOSale';
    import { VentaService } from './VentaService';
    import { onMount } from 'svelte';
    // import ListaVentas from './ListaVentas.svelte';
    import Modal from "./ModalVenta.svelte"
	import { format } from 'date-fns';


    function redir(url: string) {
        window.location.href = url;
    }

    let sales: DTOSale[] = [];

    onMount(() => {
        getSales();
    });

    async function getSales() {
        sales = await VentaService.sale.getList("");
        console.log(sales)
    }

    let showPopup = false;

    const onShowPopup = (ev) => {
        showPopup = true;
    }

    const onPopupClose = (data, sale) => {
        showPopup = false;
        console.log(data);
        console.log(sale);
    }



</script>
<h2>Listado de ventas</h2>
<button on:click={() => {redir("/Ventas/RegistrarVenta")}}>Registrar Venta</button>
<!-- <ListaVentas sales={sales}></ListaVentas> -->


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
					<!-- <td><a href="/Ventas/{sale.saleId}">Ver</a></td> -->
                    <td><button on:click={onShowPopup}>Ver</button></td>
                    <Modal open={showPopup} onClosed={(data) => onPopupClose(data, sale)} sale={sale}></Modal>
				</tr>
			{/each}
		{:else}
			<h3>No hay ventas registradas</h3>
		{/if}
	</tbody>
</table>


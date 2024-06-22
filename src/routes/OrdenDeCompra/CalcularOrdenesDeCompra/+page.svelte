<script lang="ts">
import { onMount } from 'svelte';
import type DTOPurchaseOrders from '../DTOPurchaseOrder';
import { OrdenDeCompraService } from '../OrdenDeCompraService';

let purchaseOrders : DTOPurchaseOrders[] = [];

async function getFixedIntervalPurchaseOrders() {
    purchaseOrders = await OrdenDeCompraService.purchaseOrder.fixedIntervalPurchaseOrder();
}

onMount(() => {
    getFixedIntervalPurchaseOrders();
})

async function createPurchaseOrders() {
    try {
        await OrdenDeCompraService.purchaseOrder.batchCreate(purchaseOrders);
        alert('Ordenes de compra creadas correctamente');
        if (typeof window !== 'undefined') {
            window.location.href = "/OrdenDeCompra";
        }
    } catch (error) {
        alert("Hubo un error al crear las ordenes de compra: " + error.message)
    }
}
</script>

<div >
	<h1>Calcular ordenes de compra por intervalo fijo</h1>
    <div class="i-flex">
        <table class="table table-hover">
            <thead>
                <tr>
                    <td class="col-sm-4">Producto</td>
                    <td class="col-sm-4">Proveedor</td>
                    <td class="col-sm-4">Cantidad a pedir</td>
                </tr>
            </thead>
            <tbody>
                {#each purchaseOrders as purchaseOrder}
                    <tr>
                        <td>{purchaseOrder.productName}</td>
                        <td>{purchaseOrder.supplierName}</td>
                        <td>{purchaseOrder.orderQuantity}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="position-fixed m end-0">
        <button type="button" on:click={() => createPurchaseOrders()}>Confirmar</button>
        <button type="button" on:click={() => window.location.href = "/OrdenDeCompra"}>Cancelar</button>
    </div>
</div>

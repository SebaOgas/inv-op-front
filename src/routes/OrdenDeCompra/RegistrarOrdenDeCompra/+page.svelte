<script lang="ts">
    import { onMount } from 'svelte';
    import { OrdenDeCompraService } from "../OrdenDeCompraService";
    import type  DTOProduct from "../DTOProduct";
    import type DTOSupplier from '../DTOSupplier';
    import type DTOPurchaseOrder from '../DTOPurchaseOrder';
    import { format } from 'date-fns';

    
    let newPurchaseOrder : DTOPurchaseOrder = {
        purchaseOrderDate: Date.now(),
        orderQuantity: 0
    };

    let products: DTOProduct[] = [];

    let suppliers: DTOSupplier[] = []

    async function fetchProducts() {
        try {
            products = await OrdenDeCompraService.product.getList();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    async function fetchSuppliers() {
        try {
            suppliers = await OrdenDeCompraService.supplier.getList();
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    }

    async function crearOrdenDeCompra() {
        try {
            await OrdenDeCompraService.purchaseOrder.create(newPurchaseOrder);
            alert('Orden de compra creada correctamente');
            if (typeof window !== 'undefined') {
                window.location.href = "/OrdenDeCompra";
            }
        } catch (error) {
            console.error("Error creando la orden de compra:", error);
            alert('Error al crear la orden de compra: ' + error.message);
        }
    }

    async function obtenerValoresPorDefecto(productId: number){
        try {
            newPurchaseOrder.supplierId = (await OrdenDeCompraService.product.getDefaultSupplier(productId)).supplierId;
            newPurchaseOrder.orderQuantity = products.find(product => product.productId == productId )?.optimalBatch;
        } catch (error) {
            console.log("Hubo un error al obtener el proveedor por default");
        }
    }

    onMount(() => {
        fetchProducts();
        fetchSuppliers();
        // console.log(products)
    });

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        // console.log("event:" + event)
        // console.log("name:"+ name)
        // console.log("value:" + value)
        // console.log(products)

        if (name === 'productId'){
            obtenerValoresPorDefecto(value);
        }
    }

</script>

<div>
    <h2>Crear orden de compra</h2>
    <form on:submit|preventDefault={crearOrdenDeCompra}>
        <div>
            <label for="purchaseOrderDate">Fecha del pedido:</label>
            <!-- <input type="text" id="purchaseOrderDate" name="purchaseOrderDate" bind:value={newPurchaseOrder.purchaseOrderDate} required readonly/> -->
            <input type="text" id="purchaseOrderDate" name="purchaseOrderDate" value={format(newPurchaseOrder.purchaseOrderDate, 'dd/MM/yyyy')} required readonly/>
        </div>
        <div>
            <label for="product">Articulo:</label>
            <select id="productId" name="productId" bind:value={newPurchaseOrder.productId} on:change={handleInputChange} required>
                <option value="">Seleccionar artículo</option>
                {#each products as product}
                    <option value={product.productId}>{product.productName}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="supplier">Proveedor:</label>
            <select id="supplier" name="supplierid" bind:value={newPurchaseOrder.supplierId} required>
                <option value="">Seleccionar artículo</option>
                {#each suppliers as supplier}
                    <option value={supplier.supplierId}>{supplier.supplierName}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="stock">Cantidad a ordenar:</label>
            <input type="number" id="orderQuantity" name="orderQuantity" bind:value={newPurchaseOrder.orderQuantity} required min="0"/>
        </div>
        <button type="submit">Crear Producto</button>
        <button type="button" on:click={() => window.location.href = "/OrdenDeCompra"}>Cancelar</button>
    </form>
</div>
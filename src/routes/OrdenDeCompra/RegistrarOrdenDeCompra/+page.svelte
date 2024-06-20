<script lang="ts">
    import { onMount } from 'svelte';
    import { OrdenDeCompraService } from "../OrdenDeCompraService";
    import type  DTOProduct from "../DTOProduct";
    import type DTOSupplier from '../DTOSupplier';
    import { format } from 'date-fns';

    let currentDate = ""
    
    let newPurchaseOrder = {
        purchaseOrderDate: '',
        productId: 0,
        supplierId: 0,
        orderQuantity: 0
    };

    let products: DTOProduct[] = [];

    let suppliers: DTOSupplier[] = []

    async function fetchProducts() {
        try {
            products = await OrdenDeCompraService.product.getList();
        } catch (error) {
            console.error("Error fetching product families:", error);
        }
    }

    async function fetchSuppliers() {
        try {
            suppliers = await OrdenDeCompraService.supplier.getList();
        } catch (error) {
            console.error("Error fetching product families:", error);
        }
    }

    async function crearOrdenDeCompra() {
        try {
        //     await ProductService.products.create(newProduct);
            alert('Producto creado correctamente');
            if (typeof window !== 'undefined') {
                window.location.href = "/OrdenDeCompra"; // Redirige a la página principal o a donde prefieras
            }
        } catch (error) {
            console.error("Error creando la orden de compra:", error);
            alert('Error al crear la orden de compra: ' + error.message);
        }
    }

    async function obtenerValoresPorDefecto(productId: string){
        try {
            newPurchaseOrder.supplierId = (await OrdenDeCompraService.product.getDefaultSupplier(productId)).supplierId;
            //TODO: sugerir cantidad.
            // newPurchaseOrder.orderQuantity = products.find(product => product.productId = productId ).optimalBatch;
        } catch (error) {
            console.log("Hubo un error al obtener el proveedor por default");
        }
    }

    onMount(() => {
        fetchProducts();
        fetchSuppliers();
        console.log(products)
        currentDate = format(Date.now(), 'dd/MM/yyyy');
    });

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        console.log("event:" + event)
        console.log("name:"+ name)
        console.log("value:" + value)
        console.log(products)

        if (name === 'productId'){
            obtenerValoresPorDefecto(value);
        }

        // if (name === 'productFamilyId') {
        //     newProduct.productFamilyId = parseInt(value, 10); // Parse the value to number if necessary
        // } else {
        //     newProduct = { ...newProduct, [name]: value };
        // }
    }

</script>

<div>
    <h2>Crear orden de compra</h2>
    <form on:submit|preventDefault={crearOrdenDeCompra}>
        <div>
            <label for="purchaseOrderDate">Fecha del pedido:</label>
            <input type="text" id="purchaseOrderDate" name="purchaseOrderDate" bind:value={currentDate} required readonly/>
        </div>
        <div>
            <label for="product">Articulo:</label>
            <!-- <select id="productFamily" name="productFamilyId" bind:value={newProduct.productFamilyId} on:change={handleInputChange} required> -->
            <select id="productId" name="productId" bind:value={newPurchaseOrder.productId} on:change={handleInputChange} required>
                <option value="">Seleccionar artículo</option>
                {#each products as product}
                    <option value={product.productId}>{product.productName}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="supplier">Proveedor:</label>
            <!-- <select id="productFamily" name="productFamilyId" bind:value={newProduct.productFamilyId} on:change={handleInputChange} required> -->
            <select id="supplier" name="supplierid" bind:value={newPurchaseOrder.supplierId} required>
                <option value="">Seleccionar artículo</option>
                {#each suppliers as supplier}
                    <option value={supplier.supplierId}>{supplier.supplierName}</option>
                {/each}
            </select>
        </div>
        <!-- <div>
            <label for="optimalBatch">Lote Óptimo:</label>
            <input type="number" id="optimalBatch" name="optimalBatch" bind:value={newProduct.optimalBatch} on:input={handleInputChange} required />
            <input type="number" id="optimalBatch" name="optimalBatch" bind:value={newProduct.optimalBatch} on:input={handleInputChange} required />
        </div>
        <div>
            <label for="orderLimit">Límite de Orden:</label>
            <input type="number" id="orderLimit" name="orderLimit" bind:value={newProduct.orderLimit} on:input={handleInputChange} required />
        </div>
        <div>
            <label for="safeStock">Stock Seguro:</label>
            <input type="number" id="safeStock" name="safeStock" bind:value={newProduct.safeStock} on:input={handleInputChange} required />
        </div> -->
        <div>
            <label for="stock">Cantidad a ordenar:</label>
            <!-- <input type="number" id="stock" name="stock" bind:value={newProduct.stock} on:input={handleInputChange} required /> -->
            <input type="number" id="stock" name="stock" required />
        </div>
        <button type="submit">Crear Producto</button>
        <button type="button" on:click={() => window.location.href = "/OrdenDeCompra"}>Cancelar</button>
    </form>
</div>
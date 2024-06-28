<script lang="ts">
    import { onMount } from 'svelte';
    import { ProductService } from "../ProductService";
    import type { ProductFamilyDto } from "../DTOProductFamily";

    let newProduct = {
        productName: '',
        productDescription: '',
        productFamilyId: 0,
        storageCost: 0,
        orderCost: 0,
        unitCost: 0,
        stock: 0,
        productDemand: 0,
        maxStock: 0
    };

    let productFamilies: ProductFamilyDto[] = [];

    async function fetchProductFamilies() {
        try {
            productFamilies = await ProductService.products.getAllFamilies();
        } catch (error) {
            console.error("Error fetching product families:", error);
        }
    }

    async function createProduct() {
        try {
            await ProductService.products.create(newProduct);
            alert('Producto creado correctamente');
            if (typeof window !== 'undefined') {
                window.location.href = "/MaestroDeArticulos"; // Redirige a la página principal o a donde prefieras
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert('Error al crear el producto: ' + error.message);
        }
    }

    onMount(() => {
        fetchProductFamilies();
    });

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;

        if (newProduct) {
            if (name === 'productFamilyId') {
                newProduct.productFamilyId = parseInt(value, 10);
            } else if (['storageCost', 'orderCost', 'unitCost', 'stock', 'maxStock', 'productDemand'].includes(name)) {
                newProduct = { ...newProduct, [name]: parseFloat(value) };
            } else {
                newProduct = { ...newProduct, [name]: value };
            }
        }
    }
</script>

<div>
    <h2>Crear Nuevo Producto</h2>
    <form on:submit|preventDefault={createProduct}>
        <div>
            <label for="productName">Nombre:</label>
            <input type="text" id="productName" name="productName" bind:value={newProduct.productName} on:input={handleInputChange} required />
        </div>
        <div>
            <label for="productDescription">Descripción:</label>
            <input type="text" id="productDescription" name="productDescription" bind:value={newProduct.productDescription} on:input={handleInputChange} required />
        </div>
        <div>
            <label for="productFamily">Familia:</label>
            <select id="productFamily" name="productFamilyId" bind:value={newProduct.productFamilyId} on:change={handleInputChange} required>
                <option value="">Seleccionar Familia</option>
                {#each productFamilies as family}
                    <option value={family.productFamilyId}>{family.productFamilyName}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="storageCost">Costo de almacenamiento:</label>
            <input type="number" id="storageCost" name="storageCost" bind:value={newProduct.storageCost} on:input={handleInputChange} step="0.01" min="0" required />
        </div>
        <div>
            <label for="orderCost">Costo de compra:</label>
            <input type="number" id="orderCost" name="orderCost" bind:value={newProduct.orderCost} on:input={handleInputChange} step="0.01" min="0" required />
        </div>
        <div>
            <label for="unitCost">Costo por unidad:</label>
            <input type="number" id="unitCost" name="unitCost" bind:value={newProduct.unitCost} on:input={handleInputChange} step="0.01" min="0" required />
        </div>
        <div>
            <label for="stock">Stock:</label>
            <input type="number" id="stock" name="stock" bind:value={newProduct.stock} on:input={handleInputChange} min="0" required />
        </div>
        <div>
            <label for="maxStock">Stock máximo:</label>
            <input type="number" id="maxStock" name="maxStock" bind:value={newProduct.maxStock} on:input={handleInputChange} min="0" required />
        </div>
        <div>
            <label for="productDemand">Demanda:</label>
            <input type="number" id="productDemand" name="productDemand" bind:value={newProduct.productDemand} on:input={handleInputChange} min="0" required />
        </div>
        <button type="submit">Crear Producto</button>
        <button type="button" on:click={() => window.location.href = "/MaestroDeArticulos"}>Cancelar</button>
    </form>
</div>
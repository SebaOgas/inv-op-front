<script lang="ts">
    import { onMount } from 'svelte';
    import { ProductService } from "../ProductService";
    import type { ProductFamilyDto } from "../DTOProductFamily";

    let newProduct = {
        productName: '',
        productDescription: '',
        productFamilyId: 0,
        optimalBatch: 0,
        orderLimit: 0,
        safeStock: 0,
        stock: 0
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

        if (name === 'productFamilyId') {
            newProduct.productFamilyId = parseInt(value, 10); // Parse the value to number if necessary
        } else {
            newProduct = { ...newProduct, [name]: value };
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
            <label for="optimalBatch">Lote Óptimo:</label>
            <input type="number" id="optimalBatch" name="optimalBatch" bind:value={newProduct.optimalBatch} on:input={handleInputChange} required />
        </div>
        <div>
            <label for="orderLimit">Límite de Orden:</label>
            <input type="number" id="orderLimit" name="orderLimit" bind:value={newProduct.orderLimit} on:input={handleInputChange} required />
        </div>
        <div>
            <label for="safeStock">Stock Seguro:</label>
            <input type="number" id="safeStock" name="safeStock" bind:value={newProduct.safeStock} on:input={handleInputChange} required />
        </div>
        <div>
            <label for="stock">Stock:</label>
            <input type="number" id="stock" name="stock" bind:value={newProduct.stock} on:input={handleInputChange} required />
        </div>
        <button type="submit">Crear Producto</button>
        <button type="button" on:click={() => window.location.href = "/MaestroDeArticulos"}>Cancelar</button>
    </form>
</div>
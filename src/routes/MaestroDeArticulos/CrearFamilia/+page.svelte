<script lang="ts">
    import { onMount } from 'svelte';
    import { ProductService } from "../ProductService";
    import type { ProductFamilyDto } from "../DTOProductFamily";

    let newProductFamily: ProductFamilyDto = {
        productFamilyId: 0,
        productFamilyName: '',
        inventoryModelId: 0,
        inventoryModelName: '',
        supplierId: 0,
        supplierName: ''
    };

    let inventoryModels: { inventoryModelId: number; inventoryModelName: string; }[] = [];
    let suppliers: { supplierId: number; supplierName: string; }[] = [];

    async function fetchInventoryModels() {
        try {
            inventoryModels = await ProductService.products.getAllInventoryModels();
        } catch (error) {
            console.error("Error fetching inventory models:", error);
        }
    }

    async function fetchSuppliers() {
        try {
            suppliers = await ProductService.products.getAllSuppliers();
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    }

    async function createProductFamily() {
    try {
        await ProductService.products.createFamily(newProductFamily);
        alert('Familia de producto creada correctamente');
        if (typeof window !== 'undefined') {
            window.location.href = "/MaestroDeArticulos/Familias";
        }
    } catch (error) {
        console.error("Error creating product family:", error);
        alert('Error al crear la familia de producto: ' + error.message);
    }
}

    onMount(() => {
        fetchInventoryModels();
        fetchSuppliers();
    });

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;

        if (name === 'inventoryModelId') {
            newProductFamily.inventoryModelId = parseInt(value, 10); // Parse the value to number if necessary
        } else if (name === 'supplierId') {
            newProductFamily.supplierId = parseInt(value, 10); // Parse the value to number if necessary
        } else {
            newProductFamily = { ...newProductFamily, [name]: value };
        }
    }
</script>

<div>
    <h2>Crear Nueva Familia de Producto</h2>
    <form on:submit|preventDefault={createProductFamily}>
        <div>
            <label for="productFamilyName">Nombre de la Familia:</label>
            <input type="text" id="productFamilyName" name="productFamilyName" bind:value={newProductFamily.productFamilyName} on:input={handleInputChange} required />
        </div>
        <div>
            <label for="inventoryModelId">Modelo de Inventario:</label>
            <select id="inventoryModelId" name="inventoryModelId" bind:value={newProductFamily.inventoryModelId} on:change={handleInputChange} required>
                <option value="">Seleccionar Modelo de Inventario</option>
                {#each inventoryModels as model}
                    <option value={model.inventoryModelId}>{model.inventoryModelName}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="supplierId">Proveedor:</label>
            <select id="supplierId" name="supplierId" bind:value={newProductFamily.supplierId} on:change={handleInputChange} required>
                <option value="">Seleccionar Proveedor</option>
                {#each suppliers as supplier}
                    <option value={supplier.supplierId}>{supplier.supplierName}</option>
                {/each}
            </select>
        </div>
        <button type="submit">Crear Familia de Producto</button>
        <button type="button" on:click={() => window.location.href = "/MaestroDeArticulos/Familias"}>Cancelar</button>
    </form>
</div>
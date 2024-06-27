<script lang="ts">
    import { onMount } from 'svelte';
    import { ProductService } from '../ProductService';
    import type { ProductFamilyDto } from '../DTOProductFamily';
    import type { InventoryModelDTO } from '../DTOInventoryModel';
    import type { SupplierDTO } from '../DTOSupplier';

    let productFamily: ProductFamilyDto | null = null;
    let updatedProductFamily: ProductFamilyDto | null = null;
    let productFamilies: ProductFamilyDto[] = [];
    let productFamilyId: number | null = null;
    let inventoryModels: InventoryModelDTO[] = [];
    let suppliers: SupplierDTO[] = [];

    async function fetchProductFamily(productFamilyId: number) {
        try {
            productFamily = await ProductService.products.getFamily(productFamilyId);
            updatedProductFamily = { ...productFamily }; // Copy the fetched object
        } catch (error) {
            console.error('Error fetching product family:', error);
        }
    }

    async function fetchProductFamilies() {
        try {
            productFamilies = await ProductService.products.getAllFamilies();
        } catch (error) {
            console.error('Error fetching product families:', error);
        }
    }

    async function fetchInventoryModels() {
        try {
            inventoryModels = await ProductService.products.getAllInventoryModels();
        } catch (error) {
            console.error('Error fetching inventory models:', error);
        }
    }

    async function fetchSuppliers() {
        try {
            suppliers = await ProductService.products.getAllSuppliers();
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    }

    async function updateProductFamily() {
        if (productFamilyId && updatedProductFamily) {
            try {
                // Ensure the selected inventory model and supplier are correctly set in updatedProductFamily
                const selectedInventoryModel = inventoryModels.find(model => model.inventoryModelName === updatedProductFamily.inventoryModelName);
                const selectedSupplier = suppliers.find(supplier => supplier.supplierName === updatedProductFamily.supplierName);

                if (selectedInventoryModel) {
                    updatedProductFamily.inventoryModelId = selectedInventoryModel.inventoryModelId;
                }
                if (selectedSupplier) {
                    updatedProductFamily.supplierId = selectedSupplier.supplierId;
                }

                await ProductService.products.updateFamily(productFamilyId, updatedProductFamily);
                alert('Familia de producto actualizada correctamente');
                redir('Familias'); // Redirect to the families page after updating
            } catch (error) {
                console.error('Error updating product family:', error);
                alert('Error al actualizar la familia de producto: ' + error.message);
            }
        }
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        productFamilyId = parseInt(params.get('id') || '', 10);
        if (!isNaN(productFamilyId)) {
            Promise.all([
                fetchProductFamilies(),
                fetchProductFamily(productFamilyId),
                fetchInventoryModels(),
                fetchSuppliers()
            ]).then(() => {
                // Optionally, you can add actions after loading all data
            });
        }
    });

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;

        if (updatedProductFamily) {
            updatedProductFamily = { ...updatedProductFamily, [name]: value };
        }
    }

    function redir(url: string) {
        window.location.href = `/MaestroDeArticulos/${url}`;
    }
</script>

{#if updatedProductFamily && productFamily}
    <div>
        <h2>Modificar Familia de Producto</h2>
        <form on:submit|preventDefault={updateProductFamily}>
            <div>
                <label for="productFamilyName">Nombre de la Familia:</label>
                <input type="text" id="productFamilyName" name="productFamilyName" bind:value={updatedProductFamily.productFamilyName} on:input={handleInputChange} />
            </div>
            <div>
                <label for="inventoryModelName">Modelo de Inventario:</label>
                <select id="inventoryModelName" name="inventoryModelName" bind:value={updatedProductFamily.inventoryModelName} on:change={handleInputChange}>
                    {#each inventoryModels as model}
                        <option value={model.inventoryModelName}>{model.inventoryModelName}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="supplierName">Nombre del Proveedor:</label>
                <select id="supplierName" name="supplierName" bind:value={updatedProductFamily.supplierName} on:change={handleInputChange}>
                    {#each suppliers as supplier}
                        <option value={supplier.supplierName}>{supplier.supplierName}</option>
                    {/each}
                </select>
            </div>
            <button type="submit">Guardar</button>
            <button type="button" on:click={() => redir('Familias')}>Cancelar</button>
        </form>
    </div>
{:else}
    <p>Cargando...</p>
{/if}
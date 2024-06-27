<script lang="ts">
    import { onMount } from 'svelte';
    import { ProductService } from "../ProductService";
    import type { ProductResponseDto, CreateProductRequest } from "../DTOProducts";
    import type { ProductFamilyDto } from "../DTOProductFamily";
    let product: ProductResponseDto | null = null;
    let updatedProduct: CreateProductRequest | null = null;
    let productFamilies: ProductFamilyDto[] = [];
    let productId: number | null = null;

    async function fetchProduct(productId: number) {
        try {
            product = await ProductService.products.get(productId);
            updatedProduct = {
                productName: product.productName,
                productDescription: product.productDescription,
                productFamilyId: product.productFamilyId, 
                storageCost: product.storageCost,
                unitCost: product.unitCost,
                orderCost: product.orderCost,
                stock: product.stock,
                maxStock: product.maxStock,
                productDemand: product.productDemand
            };
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    async function fetchProductFamilies() {
        try {
            productFamilies = await ProductService.products.getAllFamilies();
        } catch (error) {
            console.error("Error fetching product families:", error);
        }
    }

    async function updateProduct() {
        if (productId && updatedProduct) {
            try {
                await ProductService.products.update(productId, updatedProduct);
                alert('Producto actualizado correctamente');
                redir(''); // Redirigir a la página principal o a donde prefieras después de actualizar
            } catch (error) {
                console.error("Error updating product:", error);
                alert('Error al actualizar el producto: ' + error.message);
            }
        }
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        productId = parseInt(params.get('id') || '', 10);
        if (!isNaN(productId)) {
            fetchProductFamilies().then(() => {
                fetchProduct(productId);
            });
        }
    });

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;

        if (updatedProduct) {
            if (name === 'productFamilyId') {
                updatedProduct.productFamilyId = parseInt(value, 10);
            } else if (['storageCost', 'orderCost', 'unitCost', 'stock'].includes(name)) {
                updatedProduct = { ...updatedProduct, [name]: parseFloat(value) };
            } else {
                updatedProduct = { ...updatedProduct, [name]: value };
            }
        }
    }

    function redir(url: string) {
        window.location.href = `/MaestroDeArticulos/${url}`;
    }
</script>

{#if updatedProduct && product}
    <div>
        <h2>Modificar Producto</h2>
        <form on:submit|preventDefault={updateProduct}>
            <div>
                <label for="productName">Nombre:</label>
                <input type="text" id="productName" name="productName" bind:value={updatedProduct.productName} on:input={handleInputChange} />
            </div>
            <div>
                <label for="productDescription">Descripción:</label>
                <input type="text" id="productDescription" name="productDescription" bind:value={updatedProduct.productDescription} on:input={handleInputChange} />
            </div>
            <div>
                <label for="productFamily">Familia:</label>
                <select id="productFamily" name="productFamilyId" bind:value={updatedProduct.productFamilyId} on:change={handleInputChange}>
                    {#each productFamilies as family}
                        <option value={family.productFamilyId}>{family.productFamilyName}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="orderCost">Costo de Compra:</label>
                <input type="number" id="orderCost" name="orderCost" bind:value={updatedProduct.orderCost} on:input={handleInputChange} step="0.01" />
            </div>
            <div>
                <label for="storageCost">Costo de almacenamiento:</label>
                <input type="number" id="storageCost" name="storageCost" bind:value={updatedProduct.storageCost} on:input={handleInputChange} step="0.01" />
            </div>
            <div>
                <label for="unitCost">Costo por unidad:</label>
                <input type="number" id="unitCost" name="unitCost" bind:value={updatedProduct.unitCost} on:input={handleInputChange} step="0.01" />
            </div>
            <div>
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" bind:value={updatedProduct.stock} />
            </div>
            <div>
                <label for="stock">Stock máximo:</label>
                <input type="number" id="maxStock" name="maxStock" bind:value={updatedProduct.maxStock} />
            </div>
            <div>
                <label for="stock">Demanda:</label>
                <input type="number" id="productDemand" name="productDemand" bind:value={updatedProduct.productDemand} />
            </div>
            <button type="submit">Guardar</button>
            <button type="button" on:click={() => redir('')}>Cancelar</button>
        </form>
    </div>
{:else}
    <p>Cargando...</p>
{/if}
<script lang="ts">
    import { onMount } from 'svelte';
    import { ProductService } from './ProductService';
    import type { ProductResponseDto } from './DTOProducts';

    let products: ProductResponseDto[] = [];
    let showDeleted = false; // Estado para controlar si se muestran productos eliminados

    async function fetchProducts() {
        try {
            products = await ProductService.products.getAll();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function restoreProduct(product: ProductResponseDto) {
        try {
            await ProductService.products.restore(product.productId);
            alert('Producto restaurado correctamente.');
            fetchProducts(); // Actualizar la lista después de restaurar
        } catch (error) {
            console.error('Error al restaurar producto:', error);
            alert('Error al restaurar el producto: ' + error.message);
        }
    }

    async function deleteOrRestoreProduct(product: ProductResponseDto) {
        if (product.isDeleted) {
            // Restaurar el producto
            restoreProduct(product);
        } else {
            // Eliminar el producto
            const confirmacion = confirm('¿Estás seguro de que deseas dar de baja este producto?');
            if (confirmacion) {
                try {
                    await ProductService.products.delete(product.productId);
                    alert('Producto dado de baja correctamente.');
                    fetchProducts(); // Actualizar la lista después de dar de baja
                } catch (error) {
                    console.error('Error al dar de baja producto:', error);
                    alert('Error al dar de baja el producto: ' + error.message);
                }
            }
        }
    }

    onMount(() => {
        fetchProducts();
    });

    function redir(url: string) {
        window.location.href = `/MaestroDeArticulos/${url}`;
    }
</script>

<div class="filter d-flex">
    <!-- Checkbox para mostrar productos eliminados -->
    <label>
        <input type="checkbox" bind:checked={showDeleted} />
        Mostrar eliminados
    </label>
    <button on:click={() => redir('Crear')} class="bg-dark text-lighter" style="margin-left: 10px;">Crear</button>
</div>

<div style="overflow-x: auto;">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Familia</th>
                <th>Modelo</th>
                <th>Stock</th>
                <th>Stock mínimo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each products as product}
                {#if !product.isDeleted || showDeleted}
                    <tr>
                        <td>{product.productId}</td>
                        <td>{product.productName}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.productFamilyName}</td>
                        <td>{product.inventoryModelName}</td>
                        <td>{product.stock}</td>
                        <td>{product.safeStock}</td>
                        <td>
                            {#if !product.isDeleted}
                                <button on:click={() => redir(`Modificar?id=${product.productId}`)}>Modificar</button>
                                <button on:click={() => redir(`Ver?id=${product.productId}`)}>Ver</button>
                                <button on:click={() => deleteOrRestoreProduct(product)} style="background-color: red;">Dar de baja</button>
                            {:else}
                                <button on:click={() => redir(`Modificar?id=${product.productId}`)}>Modificar</button>
                                <button on:click={() => redir(`Ver?id=${product.productId}`)}>Ver</button>
                                <button on:click={() => restoreProduct(product)} style="background-color: green;">Dar de alta</button>
                            {/if}
                        </td>
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>

<style>
    .filter {
        gap: 4px;
    }
</style>
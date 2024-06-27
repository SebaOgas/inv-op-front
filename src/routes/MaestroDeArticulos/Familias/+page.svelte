<script lang="ts">
    import { onMount } from 'svelte';
    import { ProductService } from '../ProductService';
    import type { ProductFamilyDto } from '../DTOProductFamily';

    let productFamilies: ProductFamilyDto[] = [];

    async function fetchProductFamilies() {
        try {
            productFamilies = await ProductService.products.getAllFamilies();
        } catch (error) {
            console.error('Error fetching product families:', error);
        }
    }

    onMount(() => {
        fetchProductFamilies();
    });

    function redir(url: string) {
        window.location.href = `/MaestroDeArticulos/${url}`;
    }
</script>

<div class="filter d-flex">
    <!-- Botón para redirigir a la página de creación de producto -->
    <button on:click={() => redir('CrearFamilia')} class="bg-dark text-lighter" style="margin-left: 10px;">Crear</button>
    <button on:click={() => redir('')} class="bg-dark text-lighter" style="margin-left: 10px;">Ver Productos</button>
</div>

<div style="overflow-x: auto;">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre de la Familia</th>
                <th>Modelo de Inventario</th>
                <th>Nombre del Proveedor</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each productFamilies as family}
                <tr>
                    <td>{family.productFamilyId}</td>
                    <td>{family.productFamilyName}</td>
                    <td>{family.inventoryModelName}</td>
                    <td>{family.supplierName}</td>
                    <td>
                        <button on:click={() => redir(`ModificarFamilia?id=${family.productFamilyId}`)}>Modificar</button>
                        <button on:click={() => redir(`VerFamilia?id=${family.productFamilyId}`)}>Ver</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .filter {
        gap: 4px;
    }
</style>
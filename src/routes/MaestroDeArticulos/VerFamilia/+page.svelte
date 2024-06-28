<script lang="ts">
    import { onMount } from 'svelte';
    import { ProductService } from "../ProductService";
    import type { ProductFamilyDto } from "../DTOProductFamily";

    let productFamily: ProductFamilyDto | null = null;

    async function fetchProductFamily(productFamilyId: number) {
        try {
            productFamily = await ProductService.products.getFamily(productFamilyId);
        } catch (error) {
            console.error("Error fetching product family:", error);
        }
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const productFamilyId = parseInt(params.get('id') || '', 10);
        if (!isNaN(productFamilyId)) {
            fetchProductFamily(productFamilyId);
        }
    });

    function redir(url: string) {
        window.location.href = `/MaestroDeArticulos/${url}`;
    }
</script>

<div>
    {#if productFamily}
        <h2>{productFamily.productFamilyName}</h2>
        <p>ID: {productFamily.productFamilyId}</p>
        <p>Modelo de Inventario: {productFamily.inventoryModelName}</p>
        <p>Proveedor: {productFamily.supplierName}</p>

        <!-- Botones para modificar y volver -->
        <div style="float: right;">
            <button on:click={() => redir(`ModificarFamilia?id=${productFamily.productFamilyId}`)}>Modificar</button>
            <button on:click={() => redir("Familias")}>Volver</button>
        </div>
    {:else}
        <p>Cargando...</p>
    {/if}
</div>
<script lang="ts">
  import { onMount } from 'svelte';
  import { ProductService } from "../ProductService";
  import type { ProductResponseDto } from "../DTOProducts";

  let product: ProductResponseDto | null = null;

  async function fetchProduct(productId: number) {
      try {
          product = await ProductService.products.get(productId);
      } catch (error) {
          console.error("Error fetching product:", error);
      }
  }

  onMount(() => {
      const params = new URLSearchParams(window.location.search);
      const productId = parseInt(params.get('id') || '', 10);
      if (!isNaN(productId)) {
          fetchProduct(productId);
      }
  });

  function redir(url: string) {
    window.location.href = "/MaestroDeArticulos/" + url;
  }

  function confirmarEliminar() {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmacion) {
      // Aquí puedes agregar la lógica para eliminar el elemento
      alert("Elemento eliminado correctamente."); // Solo un ejemplo de alerta
    } else {
      // Si el usuario cancela la eliminación, no haces nada
    }
  }
</script>

<div>
  {#if product}
      <h2>{product.productName}</h2>
      <p>Descripción: {product.productDescription}</p>
      <p>Familia: {product.productFamilyName}</p>
      <p>Modelo: {product.inventoryModelName}</p>
      <p>Stock: {product.stock}</p>
      <p>Stock óptimo: {product.optimalBatch}</p>
      <p>Límite de orden: {product.orderLimit}</p>
      <p>Safe Stock: {product.safeStock}</p>

      <!-- Botones para volver, modificar y eliminar -->
      <div style="float: right;">
          <button on:click={() => redir("")}>Volver</button>
          <button on:click={() => redir(`Modificar/${product.productId}`)}>Modificar</button>
          <button on:click={confirmarEliminar} style="background-color: red;">Eliminar</button>
      </div>
  {:else}
      <p>Cargando...</p>
  {/if}
</div>

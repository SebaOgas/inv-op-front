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

  async function deleteOrRestoreProduct() {
      try {
          if (product?.isDeleted) {
              await ProductService.products.restore(product.productId);
              alert('Producto restaurado correctamente.');
          } else {
              const confirmacion = confirm("¿Estás seguro de que deseas dar de baja este elemento?");
              if (confirmacion) {
                  await ProductService.products.delete(product.productId);
                  alert("Producto dado de baja correctamente.");
              }
          }
          fetchProduct(product.productId); // Actualizar el producto después de dar de baja o restaurar
      } catch (error) {
          console.error('Error al cambiar estado del producto:', error);
          alert('Error al cambiar estado del producto: ' + error.message);
      }
  }

  function redir(url: string) {
      window.location.href = `/MaestroDeArticulos/${url}`;
  }

  function confirmarEliminar() {
      const confirmacion = confirm("¿Estás seguro de que deseas eliminar este elemento?");
      if (confirmacion) {
          // Lógica para eliminar el producto (debes implementarla en ProductService)
          // Por ejemplo:
          // await ProductService.products.delete(product.productId);
          alert("Producto eliminado correctamente."); // Solo un ejemplo de alerta
          redir(''); // Redirigir a la página principal después de eliminar
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
      <p>Stock Óptimo: {product.optimalBatch}</p>
      <p>Límite de Orden: {product.orderLimit}</p>
      <p>Stock Seguro: {product.safeStock}</p>

      <!-- Botones para volver, modificar, dar de baja/restaurar y eliminar -->
      <div style="float: right;">
          {#if !product.isDeleted}
              <button on:click={() => redir(`Modificar?id=${product.productId}`)}>Modificar</button>
              <button on:click={deleteOrRestoreProduct} style="background-color: red;">Dar de baja</button>
              <button on:click={() => redir("")}>Volver</button>
          {:else}
              <button on:click={() => redir(`Modificar?id=${product.productId}`)}>Modificar</button>
              <button on:click={deleteOrRestoreProduct} style="background-color: green;">Restaurar</button>
              <button on:click={() => redir("")}>Volver</button>
          {/if}
      </div>
  {:else}
      <p>Cargando...</p>
  {/if}
</div>
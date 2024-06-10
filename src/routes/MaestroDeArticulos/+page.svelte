<script lang="ts">
<<<<<<< Updated upstream
import SearchBar from "$lib/SearchBar.svelte";
function redir(url: string) {
        window.location.href = "/MaestroDeArticulos/" + url;
    }
function confirmarEliminar() {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmacion) {
      alert("Elemento eliminado correctamente.");
    } else {
    }
  }

</script>


<div class="filter d-flex">
    <SearchBar placeholder="Buscar Artículos"/>
    <button on:click={() => redir("Crear")} class="bg-dark text-lighter" style="margin-left: 10px;">Crear</button>

=======
    import { onMount } from 'svelte';
    import SearchBar from "$lib/SearchBar.svelte";
    import ComboBox from "$lib/ComboBox.svelte";
    import { ProductService } from "./ProductService";
    import type { ProductResponseDto, CreateProductRequest } from "./DTOProducts";

    function redir(url: string) {
        window.location.href = "/MaestroDeArticulos/" + url;
    }
    let products: ProductResponseDto[] = [];
    let selectedProduct: ProductResponseDto | null = null;

    async function fetchProducts() {
        products = await ProductService.products.getAll();
    }

    function selectProduct(id: number) {
        selectedProduct = products.find(p => p.productId === id) || null;
    }

    async function deleteProduct(id: number) {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmacion) {
            // Implementar la lógica para eliminar el producto
            alert("Producto eliminado correctamente.");
        }
    }

    onMount(() => {
        fetchProducts();
    });
</script>

<div class="filter d-flex">
    <SearchBar placeholder="Buscar Artículos" action={fetchProducts} />
    <button on:click={() => redir("Crear")} class="bg-dark text-lighter" style="margin-left: 10px;">Crear</button>
>>>>>>> Stashed changes
</div>

<div style="overflow-x: auto;">
    <table style="width: 100%;">
        <thead>
            <tr>
<<<<<<< Updated upstream
                <th>Número</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Modelo</th>
                <th>Precio</th>
                <th></th> 
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Artículo A</td>
                <td>Descripción del Artículo A</td>
                <td>Monto Fijo</td>
                <td>$ 1000</td>
                <td>
                    <button on:click={() => redir("Modificar")}>Modificar</button>
                    <button on:click={() => redir("Ver")}>Ver</button>
                    <button on:click={confirmarEliminar} style="background-color: red;">Eliminar</button>
                </td>
            </tr>
            <tr>
                <td></td>
            </tr>
        </tbody>
    </table>
</div>
=======
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Familia</th>
                <th>Modelo</th>
                <th>Stock</th>
                <th>Stock minimo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each products as product}
                <tr>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.productFamilyName}</td>
                    <td>{product.inventoryModelName}</td>
                    <td>{product.stock}</td>
                    <td>
                        <button on:click={() => redir(`Modificar/${product.productId}`)}>Modificar</button>
                      <button on:click={() => redir(`Ver?id=${product.productId}`)}>Ver</button>
                      <button on:click={() => deleteProduct(product.productId)} style="background-color: red;">Eliminar</button>
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

    input[type=number] {
        text-align: right;
        max-width: 100%;
    }
</style>
>>>>>>> Stashed changes

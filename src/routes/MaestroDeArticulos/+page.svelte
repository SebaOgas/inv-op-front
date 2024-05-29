<script lang="ts">
import SearchBar from "$lib/SearchBar.svelte";
function redir(url: string) {
        window.location.href = "/MaestroDeArticulos/" + url;
    }
function confirmarEliminar() {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmacion) {
      // Aquí puedes agregar la lógica para eliminar el elemento
      alert("Elemento eliminado correctamente.");
    } else {

    }
  }

</script>


<div class="filter d-flex">
    <SearchBar placeholder="Buscar Artículos"/>
    <button on:click={() => redir("Crear")} class="bg-dark text-lighter" style="margin-left: 10px;">Crear</button>

</div>

<div style="overflow-x: auto;">
    <table style="width: 100%;">
        <thead>
            <tr>
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
                    <!-- Botones de modificar, ver y eliminar -->
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

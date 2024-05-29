<script lang="ts">
    import ComboBox from "$lib/ComboBox.svelte";
    function redir(url) {
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
<div>
    <h3>Modificar Artículo</h3>
    <div>
        <label>Nombre: <input type="string" value="Articulo A"></label>
    </div>
    
    <div>
        <label>Descripción: <input type="string" value="Descripción del Artículo A"></label>
    </div>
    <div>
        <label>Precio: <input type="string" value="1000"></label>
    </div>

    <div class="filter d-flex flex-row ">
        <label >Modelo: </label>
        <ComboBox placeholder="Lote fijo/Intervalo Fijo">
        </ComboBox>

    </div>

  
  
    <div style="float: right;">
        <button on:click={() => redir("")}>Cancelar</button>
        <button >Guardar</button>
        <button on:click={confirmarEliminar} style="background-color: red;">Eliminar</button>
    </div>
</div>


<script lang="ts">
    import ComboBox from "$lib/ComboBox.svelte";
    
    function redir(url) {
        window.location.href = "/MaestroDeArticulos/" + url;
    }
  
    
</script>

<div>
    <h3>Crear Artículo</h3>
    
    <div>
        <label>Nombre: <input type="string" value=""></label>
    </div>
    
    <div>
        <label>Descripción: <input type="string" value=""></label>
    </div>
    <div>
        <label>Precio: <input type="string" value=""></label>
    </div>
    <div class="filter d-flex flex-row">
        <label>Modelo:</label>
        <ComboBox placeholder="Lote fijo/Intervalo Fijo" />
    </div>
  
    <div style="float: right;">
        <button on:click={() => redir("")}>Cancelar</button>
        <button>Guardar</button>
    </div>
</div>

<script lang="ts">
    function redir(url: string) {
        window.location.href = "/Inventario/" + url;
    }

    function back() {
        window.history.back();
    }
</script>

<div class="container-fluid">
    <h1>Inventario</h1>

    <button class="position-fixed top-0 end-0 m-2" on:click={back}>↩</button>
    
    <button on:click={() => {redir("ModeloPorFamilias")}}>Determinar modelo de inventario</button>

    <button on:click={() => {redir("ProductosFaltantes")}}>Listado de productos faltantes</button>

    <button on:click={() => {redir("ProductosAReponer")}}>Listado de productos a reponer</button>
    

    <slot/>
</div>
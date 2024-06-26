<script lang="ts">
    function redir(url: string) {
        window.location.href = "/Demanda/" + url;
    }

    function back() {
        window.history.back();
    }
</script>

<div class="container-fluid">
    <h1>Demanda</h1>

    <button class="position-fixed top-0 end-0 m-2" on:click={back}>↩</button>

    <button on:click={() => redir("../")}>Inicio</button>

    <button on:click={() => redir("")}>Simular</button>

    <button on:click={() => redir("CargarDemandasHistoricas")}>Cargar Demandas Históricas</button>

    <button on:click={() => redir("Parametros")}>Gestionar Parámetros</button>

    <hr>

    <slot/>
</div>
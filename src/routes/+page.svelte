<script lang="ts">
    function redir(url: string) {
        window.location.href = url;
    }
</script>

<div class="container-fluid">
    <h1>Sistema de Manejo de Inventarios</h1>

    <button on:click={() => {redir("MaestroDeArticulos")}}>Maestro de Artículos</button>
    <button on:click={() => {redir("Inventario")}}>Inventario</button>
    <button on:click={() => {redir("OrdenDeCompra")}}>Orden De Compra</button>
    <button on:click={() => {redir("Demanda")}}>Demanda</button>
    <button on:click={() => {redir("Ventas")}}>Ventas</button>

    <hr>

    <h2>Investigación Operativa</h2>

    <h3>Grupo 9</h3>

    <div>
        <strong>Integrantes:</strong>
        <ul>
            <li>Burgos, Lucca</li>
            <li>Carrizo, Martina</li>
            <li>Ogás, Sebastián</li>
            <li>Palladino, Facundo</li>
        </ul>
    </div>
</div>



<script lang="ts">
    function redirect(url: string) {
        window.location.href = url;
    }
</script>

<h1>Sistema de Manejo de Inventarios</h1>

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

<div>
    <button on:click={() => {redirect("MaestroDeArticulos")}}>Maestro de Artículos</button>
    <button on:click={() => {redirect("Inventario")}}>Inventario</button>
    <button on:click={() => {redirect("OrdenDeCompra")}}>Orden De Compra</button>
    <button on:click={() => {redirect("Demanda")}}>Demanda</button>
    <button on:click={() => {redirect("Ventas")}}>Ventas</button>
</div>
<script lang="ts">
    function redir(url: string) {
        window.location.href = "/Ventas/" + url;
    }

    function back() {
        window.history.back();
    }
</script>

<div class="container-fluid">
    <h1>Ventas</h1>

    <button class="position-fixed top-0 end-0 m-2" on:click={back}>↩</button>
    <button on:click={() => {redir("../")}}>Inicio</button>
    <hr>

    <slot/>
</div>
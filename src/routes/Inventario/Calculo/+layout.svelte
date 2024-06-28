
<script lang="ts">
    function redir(url: string) {
        window.location.href = "/CalculoModeloInventario/" + url;
    }

    function back() {
        window.history.back();
    }
</script>

<div class="container-fluid">

    <button class="position-fixed top-0 end-0 m-2" on:click={back}>↩</button>

    <hr>

    <slot/>
</div>
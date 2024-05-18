<script lang="ts">
    export let placeholder: string = "";

    let shown = false;

    function toggleShown() {
        shown = !shown;
    }

    export let value: string = "";
    export let width: number = -1;
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="combobox" on:click={toggleShown} style="width: {width >= 0 ? width + "%" : "fit-content"}">
    <div class="value">
        <span class="ph" style="display: {value === "" ? "block" : "none"};">{placeholder}</span>
        <span>{value}</span>
        <div class="options bg-lighter" style="display: {shown ? "flex" : "none"};">
            <slot/>
        </div>
    </div>
    <img src="/comboboxarrow.png" alt="Desplegar" style="{shown ? "transform: rotate(-90deg)" : ""}" />
</div>



<style>
    .combobox ::selection, .combobox :global(::selection) {
        background-color: inherit;
        color: inherit;
    }

    .combobox {
        font-size: 12px;
        background-color: var(--lighter);
        color: var(--darker);
        border-radius: 4px;
        border: 1px solid var(--darker);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    @media (max-width: 575px) {
        .combobox {
            width: 100% !important;
        }
    }

    .ph {
        color: var(--dark);
    }

    img {
        height: 20px;
        widows: 20px;
        transition: transform 500ms;
    }

    .options {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: stretch;
        position: absolute;
        top: 100%;
        left: 0;
        border: 1px solid var(--darker);
        border-radius: 4px;
        width: 100%;
    }



    .options :global(:hover) {
        background-color: var(--dark);
        color: var(--lighter);
    }
</style>
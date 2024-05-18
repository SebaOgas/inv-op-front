<script lang="ts">
    export let label: string = "";
    export let name: string = "";
    export let checked: boolean = false;
    export let value: string = "on";
    export let classes: string = "";
</script>


<label class="checkbox">
    <input type="checkbox" {name} {value} bind:checked/>
    <span class="{classes}">{label}</span>
</label>


<style>

    .checkbox {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-content: center;
        gap: 4px;
        cursor: pointer;
        width: fit-content;
    }

    .checkbox::selection {
        background-color: inherit;
        color: inherit;
    }

    .checkbox input {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
        display: flex;
        align-content: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 1px solid var(--darker);
        background: var(--lighter);
        transition: background-color 500ms, border-color 500ms;
    }

    .checkbox input:checked {
        background-color: var(--dark);
        border-color: var(--dark);
    }

    .checkbox input::before {
        content: "";
        transform: scale(0);
        background-image: url("/aceptar.png");
        background-size: contain;
        background-repeat: no-repeat;
        transition: transform 500ms;
        width: 20px;
        height: 20px;
    }

    .checkbox input:checked::before {
        transform: scale(1);
    }

    .checkbox:hover input {
        filter: brightness(1.1);
    }





</style>
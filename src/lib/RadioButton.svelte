<script lang="ts">
    export let label: string = "";
    export let name: string = "";
    export let group: string = "";
    export let checked: boolean = false;
    export let value: string;
</script>


<label class="radiobutton">
    <input type="radio" {name} bind:group={group} {checked} {value}/>
    {label}
</label>


<style>

    .radiobutton {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-content: center;
        gap: 4px;
        cursor: pointer;
        width: fit-content;
    }

    .radiobutton::selection {
        background-color: inherit;
        color: inherit;
    }

    .radiobutton input {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
        display: flex;
        align-content: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid var(--darker);
        background: var(--lighter);
        transition: background-color 500ms, border-color 500ms;
    }

    .radiobutton input:checked {
        background-color: var(--dark);
        border-color: var(--dark);
    }

    .radiobutton input::before {
        content: "";
        transform: scale(0);
        background-image: url("/aceptar.png");
        background-size: contain;
        background-repeat: no-repeat;
        transition: transform 500ms;
        width: 20px;
        height: 20px;
    }

    .radiobutton input:checked::before {
        transform: scale(1);
    }

    .radiobutton:hover input {
        filter: brightness(1.1);
    }





</style>
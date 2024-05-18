<script lang="ts">
    import DatePicker from "$lib/DatePicker.svelte"
    import {formatDate} from "$lib/DatePicker.svelte"
    import CheckBox from "$lib/CheckBox.svelte"
    import RadioButton from "$lib/RadioButton.svelte"
    import ComboBox from "$lib/ComboBox.svelte"
    import SearchBar from "$lib/SearchBar.svelte"


    let date: Date;
    let startDate: Date;
    let endDate: Date;
    let checkboxMarcada: boolean;
    let radio: string;
    let cb: string;
    let busqueda: string = "";

    function setCB(value: string) {
        cb = value;
    }

    function buscar(value: string) {
        busqueda= value;
    }
</script>

<div class="bg-darker">
    <h1 class="text-lighter">Pruebas</h1>

    <p class="text-light">
        Esta página es puramente para pruebas técnicas del framework Svelte Kit
    </p>
</div>


<DatePicker bind:value={date}/>

<span class="text-m">Fecha seleccionada: {formatDate(date)}</span>

<DatePicker range={true} time={true} bind:startDate={startDate} bind:endDate={endDate}/>

<span>Rango seleccionado: {formatDate(startDate, true)} - {formatDate(endDate, true)}</span>

<CheckBox label={"Checkbox"} bind:checked={checkboxMarcada}/>

<span>CheckBox marcada: {checkboxMarcada}</span>

<RadioButton value={"1"} label={"Botón Radial 1"} bind:group={radio}/>
<RadioButton value={"2"} label={"Botón Radial 2"} bind:group={radio}/>
<RadioButton value={"3"} label={"Botón Radial 3"} bind:group={radio}/>

<span>Valor seleccionado: {radio}</span>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<ComboBox placeholder={"Lista desplegable"} value={cb}>
    <span on:click={() => setCB("AAA")}>AAA</span>
    <span on:click={() => setCB("BBB")}>BBB</span>
    <span on:click={() => setCB("CCC")}>CCC</span>
</ComboBox>

<span>Valor seleccionado: {cb}</span>

<SearchBar placeholder={"Buscar..."} action={buscar}/>

<span>Texto buscado: {busqueda}</span>

<div>
    <button class="bg-dark text-lighter" on:click={() => {alert("Botón clickeado!")}}>Botón</button>
</div>

<table>
    <thead>
        <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
            <th>Columna 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
        </tr>
        <tr>
            <td>D</td>
            <td>E</td>
            <td>F</td>
        </tr>
        <tr>
            <td>G</td>
            <td>H</td>
            <td>I</td>
        </tr>
    </tbody>
</table>
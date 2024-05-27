<script lang="ts">
	import SearchBar from "$lib/SearchBar.svelte";
	import ComboBox from "$lib/ComboBox.svelte";
	import DatePicker from "$lib/DatePicker.svelte";
	import XyGraph, {type XYFunction} from "$lib/XYGraph.svelte";

    let fns : XYFunction[] = [
        {
			dots: [{x:0, y:0}, {x:1, y:10}, {x:2, y:5}, {x:3, y:8}],
			color: "blue"
		},
        {
			dots: [{x:1, y:2}, {x:2, y:3}, {x:3, y:7}, {x:4, y:8}, {x:5, y:0}],
			color: "red"
		},
        {
			dots: [{x:0, y:6}, {x:2, y:3}, {x:3, y:1}, {x:4, y:10}, {x:5, y:3}],
			color: "green"
		},
        {
			dots: [{x:0, y:1}, {x:1, y:4}, {x:2, y:8}, {x:3, y:7}, {x:4, y:7}, {x:5, y:6}],
			color: "violet"
		},
    ];

</script>

<div class="filter d-flex flex-row justify-content-between mb-4">
    <div class="filter d-flex flex-row flex-wrap">
        <SearchBar placeholder="Buscar Artículos o Familias"/>

        <ComboBox placeholder="Artículo/Familia">

        </ComboBox>

        <span class="d-flex ms-2">
            <span class="me-2">Analizar desde: </span>
            <DatePicker width={"150px"}/>
        </span>
    </div>
    <div>
        <button class="bg-dark text-lighter">Generar Predicciones</button>
    </div>
</div>

<div class="container-fluid">
    <div class="prediccion d-flex flex-row justify-content-between">
        <div>
            <strong>PMP 1</strong>
            <label>Ponderaciones: <input type="text" value="3;2;1"></label>
            <label>Color: <input type="text" value="blue"></label>
        </div>
        <button class="bg-darker text-lighter">X</button>
    </div>
    <div class="prediccion d-flex flex-row justify-content-between">
        <div>
            <strong>PMSE 1</strong>
            <label>Predicciones: <input type="number" value={1} min={0}></label>
            <label>Raíz: <input type="number" value={0} min={0}></label>
            <label>α: <input type="number" value={0.5} min={0} max={1} step={0.1}></label>
            <label>Color: <input type="text" value="red"></label>
        </div>
        <button class="bg-darker text-lighter">X</button>
    </div>
    <div class="prediccion d-flex flex-row justify-content-between">
        <div>
            <strong>RL 1</strong>
            <label>Predicciones: <input type="number" value={1} min={0}></label>
            <label>Ignorar periodos: <input type="number" value={0} min={0}></label>
            <label>Color: <input type="text" value="green"></label>
        </div>
        <button class="bg-darker text-lighter">X</button>
    </div>
    <div class="prediccion d-flex flex-row justify-content-between">
        <div>
            <strong>Ix 1</strong>
            <label>Longitud de ciclo: <input type="number" value={12} min={1}></label>
            <label>Ciclos anteriores a analizar: <input type="number" value={3} min={1}></label>
            <label>Demanda esperada siguiente ciclo: <input type="number" value={3} min={1}></label>
            <label>Color: <input type="text" value="purple"></label>
        </div>
        <button class="bg-darker text-lighter">X</button>
    </div>
    <div class="addMetodo d-flex flex-row justify-content-end">
        <button>+ PMP</button>
        <button>+ PMSE</button>
        <button>+ RL</button>
        <button>+ Ix</button>
    </div>
    <h2 class="text-xl">Resultados</h2>
    <XyGraph functions={fns} height={450} yMarks={8} precision={{x: 0, y: 2}}/>
    <div class="overflow-auto mb-4">
        <table class="w-100">
            <thead>
                <tr>
                    <th rowspan="2">Periodo</th>
                    <th rowspan="2">DR</th>
                    <th colspan="2">PMP 1</th>
                    <th colspan="2">PMSE 1</th>
                    <th colspan="2">RL 1</th>
                    <th colspan="2">Ix 1</th>
                </tr>
                <tr>
                    <th>DP</th>
                    <th>E</th>
                    <th>DP</th>
                    <th>E</th>
                    <th>DP</th>
                    <th>E</th>
                    <th>DP</th>
                    <th>E</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>01/2024</td>
                    <td>313</td>
                    <td>423</td>
                    <td>321</td>
                    <td>123</td>
                    <td>564</td>
                    <td>342</td>
                    <td>567</td>
                    <td>234</td>
                    <td>468</td>
                </tr>
                <tr>
                    <td>02/2024</td>
                    <td>313</td>
                    <td>423</td>
                    <td>321</td>
                    <td>123</td>
                    <td>564</td>
                    <td>342</td>
                    <td>567</td>
                    <td>234</td>
                    <td>468</td>
                </tr>
                <tr>
                    <td>03/2024</td>
                    <td>313</td>
                    <td>423</td>
                    <td>321</td>
                    <td>123</td>
                    <td>564</td>
                    <td>342</td>
                    <td>567</td>
                    <td>234</td>
                    <td>468</td>
                </tr>
                <tr>
                    <td>04/2024</td>
                    <td>313</td>
                    <td>423</td>
                    <td>321</td>
                    <td>123</td>
                    <td>564</td>
                    <td>342</td>
                    <td>567</td>
                    <td>234</td>
                    <td>468</td>
                </tr>
                <tr class="highlighted">
                    <td>05/2024</td>
                    <td>313</td>
                    <td>423</td>
                    <td>321</td>
                    <td>123</td>
                    <td>564</td>
                    <td>342</td>
                    <td>567</td>
                    <td>234</td>
                    <td>468</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td><strong>Total</strong></td>
                    <td>4234</td>
                    <td>4150</td>
                    <td>84</td>
                    <td>4150</td>
                    <td>84</td>
                    <td class="text-bold">4150</td>
                    <td class="text-bold">84</td>
                    <td>4150</td>
                    <td>84</td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div class="d-flex flex-row justify-content-end mb-4">
        <button class="bg-dark text-lighter">Generar Orden de Compra</button>
    </div>

</div>



<style>
    .prediccion {
        border-radius: var(--radius);
        padding: 4px;
        margin-bottom: 8px;
    }

    .prediccion:hover {
        background-color: var(--light);
    }

    .filter {
        gap: 4px;
    }

    .addMetodo {
        gap: 8px;
    }

    input[type=number] {
        width: 80px;
    }

    th, td {
        white-space: nowrap;
    }

    table tr {
        position: relative;
    }

    table td:first-child, table tr:first-child th:first-child {
        position: sticky;
        top: 0;
        left: 0;
        background-color: var(--lighter);
        z-index: 1;
    }

    .highlighted, .highlighted * {
        background-color: var(--light) !important;
    }

</style>
<script>
	import SearchBar from "$lib/SearchBar.svelte";
	import ComboBox from "$lib/ComboBox.svelte";

</script>

<div class="filter d-flex flex-row justify-content-between mb-2">
    <div class="filter d-flex flex-row">
        <SearchBar placeholder="Buscar Artículos"/>

        <ComboBox placeholder="Artículo">

        </ComboBox>
    </div>
    <div>
        <button class="bg-dark text-lighter">◀</button>
        <button class="bg-dark text-lighter" disabled>▶</button>
    </div>
    <div>
        <button class="bg-dark text-lighter">Guardar Cambios</button>
    </div>
    
</div>

<table class="w-100">
    <thead>
        <tr>
            <th>Mes</th>
            <th>2021</th>
            <th>2022</th>
            <th>2023</th>
            <th>2024</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>2</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>3</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>4</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>5</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>6</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>7</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>8</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>9</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>10</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>11</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
        <tr>
            <td>12</td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
            <td><input type="number" value={130} min={0}></td>
        </tr>
</table>


<style>
    .filter {
        gap: 4px;
    }

    input[type=number] {
        text-align: right;
        max-width: 100%;
    }
</style>



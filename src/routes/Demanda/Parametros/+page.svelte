<script>
	import ComboBox from "$lib/ComboBox.svelte";


</script>

<div class="d-flex flex-row justify-content-between mb-2">
    <span>Periodos a predecir
    </span>
    <input type="number" min={0} value={1}>
</div>

<div class="d-flex flex-row justify-content-between mb-2">
    <span>Método de Cálculo de Error</span>
    <ComboBox placeholder="Método de Cálculo">
        <span>Error Medio Cuadrado</span>
        <span>Error Medio Absoluto</span>
        <span>Error Medio Porcentual Absoluto</span>
    </ComboBox> 
</div>

<div class="d-flex flex-row justify-content-between mb-2">
    <span>Error aceptable</span>
    <input type="number" min={0} value={0.1}>
</div>
<script lang="ts">
	import { onMount } from "svelte";
	import type DTOFamily from "../DTOFamily";
	import { InventarioService } from "../InventarioService";

	
    let familias : DTOFamily[] = [];
    let inventoryModel = '';

    onMount(() => {
		getFamilies();
	});

    async function getFamilies() {
        familias = await InventarioService.families.getList();
    }

  </script>
  


  <div class="container-fluid">
   
    <div class="mb-3 row">
        
<label for="familyName" class="col-sm-4 col-form-label">Familias de artículos:</label>
        <div class="col-sm-4">
        <select name="familyId"  class="form-select" aria-label="Default select example" required>
            <option selected>Seleccione una familia</option>                    
            {#each familias as familia }
                <option value="{familia.familyId}">{familia.familyName}</option>
            {/each}

        </select>
        </div>
    </div>

    

    <div class="mb-3 row">
        <label for="quantity" class="col-sm-4 col-form-label">Modelo de inventario por familia:</label>
        <div class="col-sm-4">
            <select class="form-select" aria-label="Default select example" required>
                
                <option selected>Seleccione un modelo</option>   
                <option value="Lote Fijo">Lote Fijo</option>
                <option value="Intervalo Fijo">Intervalo Fijo</option>
                <option value="CGI">CGI</option>

            </select>
            </div>
        
    </div>

  <div class="mb-3 row">
    <dir class="col-sm-4 col-form-label">
        <button type="submit">Guardar</button>
    </dir>
</div>

</div>
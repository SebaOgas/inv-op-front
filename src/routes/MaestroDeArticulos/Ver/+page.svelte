<script lang="ts">
    function redir(url) {
      window.location.href = "/MaestroDeArticulos/" + url;
    }
  
    function confirmarEliminar() {
      const confirmacion = confirm("¿Estás seguro de que deseas eliminar este elemento?");
      if (confirmacion) {
        // Aquí puedes agregar la lógica para eliminar el elemento
        alert("Elemento eliminado correctamente."); // Solo un ejemplo de alerta
      } else {
        // Si el usuario cancela la eliminación, no haces nada
      }
    }
  </script>
  
  <div>
    <h2>Nombre del articulo A</h2>
    <p>Descripción: Descripcion del artículo A</p>
    <p>Modelo: Lote Fijo</p>
    <p>Precio: $1000</p>
  
    <!-- Botones para volver, modificar y eliminar -->
    <div style="float: right;">
      <button on:click={() => redir("")}>Volver</button>
      <button on:click={() => redir("Modificar")}>Modificar</button>
      <button on:click={confirmarEliminar} style="background-color: red;">Eliminar</button>
    </div>
  </div>
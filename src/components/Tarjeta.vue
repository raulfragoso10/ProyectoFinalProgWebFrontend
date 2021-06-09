<template>
  <div>
      <div class="alert alert-primary mt-3" role="alert">
        <div>{{ id + ' - ' 
            + nombre + ' - '
            + descripcion + ' - '
            + prioridad + ' - '
            + personal + ' - '
            + categoria + ' - '
            + estatus }}</div>

      </div>     
  </div>
</template>

<script>
export default {
  name: "Tarjeta",
  props: {
    id: Number,
    nombre: String,
    descripcion: String,
    prioridad: String,
    personal: String,
    categoria: String,
    estatus: String
  },
};
</script>

<style>

</style>
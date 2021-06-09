<template>
  <div>
    <div class="mt-3"> Seleccione categoria </div>
    <b-form-select v-model="ticketFiltro.categoria" :options="selectCategoria" size="sm" class="mt-3">Seleccione</b-form-select>
    <b-button class="ms-3" @click="onBuscar(ticketFiltro)">Buscar</b-button>     
    <Tarjeta
    v-show="validador"
    v-for="t in ticketFiltro"
    :key="t.id"
    :nombre="t.nombre"
    :id="t.id"
    :descripcion="t.descripcion"
    :prioridad="t.prioridad"
    :personal="t.personal"
    :categoria="t.categoria"
    :estatus="t.estatus"
    >
    </Tarjeta>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import Tarjeta from '../components/Tarjeta.vue'
export default {
name: 'Editar',
components: {
    Tarjeta,
  },
  data() {
    return {
      validador: false,
      ticketFiltro: {
        id: "",
        nombre: "",
        descripcion: "",
        prioridad: "",
        personal: "",
        categoria: "",
        estatus: ""
      },
      erroresValidacion: false,
    };
  },
computed: {
        ...mapState(["selectCategoria"]),
},
methods: {
    ...mapActions(['selectCategorias', 'buscarTickets']),
    onBuscar(item) {  
      this.buscarTickets({
        id: item.categoria,
        onComplete: (response) => {
        Vue.set(this, 'ticketFiltro', response.data)
        console.log(this.ticketFiltro)
        this.validador = true
        //console.log(item.categoria)
          /*this.$notify({
            type: "success",
            title: response.data.mensaje,
          });*/
        },
      });
    },    
},
created() {
    this.selectCategorias({
    })
}
}
</script>

<style>
</style>
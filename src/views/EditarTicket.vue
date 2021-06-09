  
<template>
  <div>
      <h1>Editar Ticket</h1>
      <b-form @submit.prevent="guardarTicket()">
      <Input
        v-model="ticket.id"
        id="id"
        titulo="ID"
        placeholder="Ingrese el ID"
        disabled
        class="mb-2"
      />
      <Input
        v-model="ticket.nombre"
        id="nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        class="mb-2"
        disabled
      />
      <Input
        v-model="ticket.descripcion"
        id="descripcion"
        titulo="Descripción"
        placeholder="Ingrese la descripción"
        :maxlength="80"
        :error="erroresValidacion"
        mensajeError="Es necesario ingresar la descripción"
        class="mb-2"
      />      

    <div class="mt-3"> Prioridad </div>
    <b-form-select v-model="ticket.prioridad" :options="optionsPrioridad" size="sm" class="mt-3"></b-form-select>

    <div class="mt-3"> Personal </div>
    <b-form-select v-model="ticket.personal" :options="personalConcatenado" size="sm" class="mt-3"></b-form-select>    

    <div class="mt-3"> Categoria </div>
    <b-form-select v-model="ticket.categoria" :options="selectCategoria" size="sm" class="mt-3"></b-form-select>  

    <div class="mt-3"> </div>
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import Input from "../components/Input";
export default {
name: 'Editar',
components: {
    Input,
  },
  data() {
    return {
      ticket: {
        id: "",
        nombre: "",
        descripcion: "",
        prioridad: "",
        personal: "",
        categoria: "",
        estatus: ""
      },
      erroresValidacion: false,
      optionsPrioridad: [        
        { value: 1, text: '1.- Baja' },
        { value: 2, text: '2.- Media' },
        { value: 3, text: '3.- Alta' }
      ],      
    };
  },
computed: {
        ...mapState(["personalConcatenado","selectCategoria"]),
    validacionNombre() {
      return (
        this.ticket.nombre !== undefined && this.ticket.nombre.trim() !== ""
      );
    },
},
methods: {
    ...mapActions(['obtenerTicket', 'editarTicket', 'personalConcatenados', 'selectCategorias']),
    guardarTicket() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        //Guardar
        console.log(this.ticket)
         this.editarTicket({
          id: this.$route.params.id,
          params: this.ticket,
          onComplete: (response) => {  
           console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'HomeTicket'
            })
            
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: 'error', 
              title: error.response.data.mensaje,
            });
          }, 
        }); 
      } else {
        this.erroresValidacion = true;
      }
    }
},
created() {
    this.personalConcatenados({
    }),
    this.selectCategorias({
    }),
    this.obtenerTicket({
        id: this.$route.params.id,
        onComplete: (response) => {
            Vue.set(this, 'ticket', response.data.data)
        }
    })
}
}
</script>

<style>
</style>
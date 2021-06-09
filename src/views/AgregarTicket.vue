<template>
  <div>
    <h1>Agregar Ticket</h1>
    <b-form @submit.prevent="guardarTicket()">

      <Input
        v-model="ticket.nombre"
        id="nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="ticket.descripcion"
        id="descripcion"
        titulo="Descripción"
        placeholder="Ingrese la descripción"
        :maxlength="100"
        class="mb-2"
      />

    <div class="mt-3"> Prioridad </div>
    <b-form-select v-model="ticket.prioridad" :options="optionsPrioridad" class="mt-3"></b-form-select>
    
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
import { mapActions, mapState } from "vuex";
import Input from "../components/Input";
export default {
  name: "AgregarTicket",
  components: {
    Input,
  },
  data() {
    return {
      ticket: {
        nombre: "",
        descripcion: "",
        prioridad: "",
        personal: "",
        categoria: "",
        estatus: "ABT"
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
    ...mapActions(['crearTicket', 'personalConcatenados', 'selectCategorias']),
    guardarTicket() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        //Guardar
        this.crearTicket({
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
    },
  },
created() {
    this.personalConcatenados({
    }),
    this.selectCategorias({
    })
}
};
</script>

<style></style>
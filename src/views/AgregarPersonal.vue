<template>
  <div>
    <h1>Agregar Personal</h1>
    <b-form @submit.prevent="guardarPersonal()">
      <Input
        v-model="personal.nombre"
        id="nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="personal.apellidos"
        id="apellidos"
        titulo="Apellido"
        placeholder="Ingrese los apellidos"
        :maxlength="80"
        :error="erroresValidacion && !validacionApellidos"
        mensajeError="Es necesario ingresar los apellidos"
        class="mb-2"
      />
      <Input
        v-model="personal.telefono"
        id="telefono"
        titulo="Telefono"
        placeholder="Ingrese el telefono"
        :maxlength="10"
        class="mb-2"
      />              
      <Input
        v-model="personal.direccion"
        id="direccion"
        titulo="Direccion"
        placeholder="Ingrese la direccion"
        :maxlength="50"
        class="mb-2"
      />    

      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "../components/Input";
export default {
  name: "AgregarPersonal",
  components: {
    Input,
  },
  data() {
    return {
      personal: {
        nombre: "",
        apellidos: "",
        telefono: "",
        direccion: ""
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.personal.nombre !== undefined && this.personal.nombre.trim() !== ""
      );
    },
    validacionApellidos() {
      return (
        this.personal.apellidos !== undefined && this.personal.apellidos.trim() !== ""
      );
    },    
  },
  methods: {
    ...mapActions(["crearPersonal"]),
    guardarPersonal() {
      if (this.validacionNombre && this.validacionApellidos) {
        this.erroresValidacion = false;
        //Guardar
        this.crearPersonal({
          params: this.personal,
          onComplete: (response) => {
            console.log(response.data);      
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'HomePersonal'
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
};
</script>

<style></style>
  
<template>
  <div>
      <h1>Editar Personal</h1>
      <b-form @submit.prevent="guardarPersonal()">
      <Input
        v-model="personal.id"
        id="id"
        titulo="ID"
        placeholder="Ingrese el ID"
        disabled
        class="mb-2"
      />
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
        titulo="Apellidos"
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
        :maxlength="10"
        placeholder="Ingrese el telefono"
        class="mb-2"
      />
      <Input
        v-model="personal.direccion"
        id="direccion"
        titulo="Dirección"
        :maxlength="150"
        placeholder="Ingrese la dirección"
      />
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
      personal: {
        nombre: "",
        apellidos: "",
        telefono: "",
        direccion: "",
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
    ...mapActions(['obtenerPersonal', 'editarPersonal']),
    guardarPersonal() {
      if (this.validacionNombre && this.validacionApellidos) {
        this.erroresValidacion = false;
        //Guardar
         this.editarPersonal({
          id: this.$route.params.id,
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
    }
},
created() {
    this.obtenerPersonal({
        id: this.$route.params.id,
        onComplete: (response) => {
            Vue.set(this, 'personal', response.data.data)
        }
    })
}
}
</script>

<style>
</style>
<template>
  <div>
    <h1>Personal</h1>

    <b-button variant="primary" to="/agregarPersonal">Agregar</b-button>

    <Table :items="personal" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button class="me-1" @click="onEditar(item)">Editar</b-button>
        <b-button @click="onEliminar(item)">Eliminar</b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
export default {
  name: "HomePersonal",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "id", label: "Clave" },
        { key: "nombre" },
        { key: "apellidos" },
        {
          key: "telefono",
          label: "Teléfono",
          formatter: (value) => {
            return value || "Sin datos";
          },
        },
        {
          key: "direccion",
          label: "Dirección",
          formatter: (value) => {
            return value || "-";
          },
        },
        { key: "actions", label: "Accion" },
      ],
    };
  },
  computed: {
    ...mapState(["personal", "loading"]),
  },
  methods: {
    ...mapActions(["setPersonal", "eliminarPersonal"]),
    onEditar(item) {
      console.log("Editar", item.item.id);
      this.$router.push({
        name: "EditarPersonal",
        params: {
          id: item.item.id,
        },
      });
    },
    onEliminar(item) {
      console.log("Eliminar", item.item.id);
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Personal",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarPersonal({
              id: item.item.id,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setPersonal(), 1000);
              },
            onError: (error) => {
              console.log(error.response.data.mensaje);
              this.$notify({
                type: 'error',  
                title: error.response.data.mensaje,
              });
            },              
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
  },
  mounted() {
    this.setPersonal();
  },
};
</script>
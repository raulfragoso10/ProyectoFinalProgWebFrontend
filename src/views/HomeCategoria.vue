<template>
  <div>
    <h1>Categorias</h1>
    <b-button variant="primary" to="/agregarCategoria">Agregar</b-button>

    <Table :items="categorias" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button @click="onEliminar(item)">Eliminar</b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
export default {
  name: "HomeCategoria",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "id", label: "Clave" },
        { key: "nombre" },
        { key: "actions", label: "Accion" },
      ],
    };
  },
  computed: {
    ...mapState(["categorias", "loading"]),
  },
  methods: {
    ...mapActions(["setCategorias", "eliminarCategoria"]),
    onEliminar(item) {
      console.log("Eliminar", item.item.id);
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Categoria",
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
            this.eliminarCategoria({
              id: item.item.id,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje, 
                });
                setTimeout(() => this.setCategorias(), 1000);
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
    this.setCategorias();
  },
};
</script>
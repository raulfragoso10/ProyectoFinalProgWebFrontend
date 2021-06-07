<template>
  <div>
    <h1>Tickets</h1>

    <b-button variant="primary" to="/agregarTicket">Agregar</b-button>

    <Table :items="ticket" :fields="campos" :busy="loading">
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
  name: "HomeTicket",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "id", label: "Clave" },
        { key: "nombre" },
        {
          key: "descripcion",
          label: "Descripción",
          formatter: (value) => {
            return value || "-";
          },
        },
        { key: "prioridad" },
        { key: "personal" },        
        { key: "categoria" },
        { key: "estatus" },                
        { key: "actions", label: "Accion" },
      ],
    };
  },
  computed: {
    ...mapState(["ticket", "loading"]),
  },
  methods: {
    ...mapActions(["setTicket", "eliminarTicket"]),
    onEditar(item) {
      console.log("Editar", item.item.id);
      this.$router.push({
        name: "EditarTicket",
        params: {
          id: item.item.id,
        },
      });
    },
    onEliminar(item) {
      console.log("Eliminar", item.item.id);
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Ticket",
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
            this.eliminarTicket({
              id: item.item.id,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setTicket(), 1000);
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
    this.setTicket();
  },
};
</script>
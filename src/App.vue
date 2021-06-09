<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" toggleable>
    <b-navbar-brand tag="h1" class="mx-2" to="/">
       Inicio
    <b-button variant="primary" class="ms-5 me-5" to="/homeCategoria">Categorias</b-button>
    <b-button variant="primary" class="ms-5 me-5" to="/homePersonal">Personal</b-button>
    <b-button variant="primary" class="ms-5 me-5" to="/homeTicket">Tickets</b-button>       
    </b-navbar-brand>
  </b-navbar>
    <router-view class="container  mt-3" />
    <notifications position="bottom right" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
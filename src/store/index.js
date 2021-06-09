import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorias: [],
    personal: [],
    ticket: [],
    ticketFiltro: [],
    selectCategoria: [],
    personalConcatenado: [],
    loading: false
  },
  mutations: {
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_PERSONAL(state, personal) {
      state.personal = personal;
    },
    SET_PERSONA1(state, persona1) {
      state.persona1 = persona1;
    },
    SET_TICKET1(state, ticket1) {
      state.ticket1 = ticket1;
    },
    SET_TICKETFILTRO(state, ticketFiltro) {
      state.ticketFiltro = ticketFiltro;
    },
    SET_PERSONACONCATENADO(state, personalConcatenado) {
      state.personalConcatenado = personalConcatenado;
    },
    SET_OBTENERCATEGORIA(state, obtenerCategoria) {
      state.obtenerCategoria = obtenerCategoria;
    },
    SET_SELECTCATEGORIA(state, selectCategoria) {
      state.selectCategoria = selectCategoria;
    },    
    SET_TICKET(state, ticket) {
      state.ticket = ticket;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    setCategorias({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/')
      .then( response => {
        commit('SET_CATEGORIAS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    }, 
    selectCategorias({commit}){
      axios.get('http://localhost:3000/selectCategoria')
      .then( response => {
        commit('SET_SELECTCATEGORIA', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    personalConcatenados({commit}){
      axios.get('http://localhost:3000/personalConcatenado')
      .then( response => {
        commit('SET_PERSONACONCATENADO', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    crearCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/', params)
      .then(onComplete)
      .catch(onError)
    },
    crearTicket({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/ticket', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    setPersonal({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/personal')
      .then( response => {
        commit('SET_PERSONAL', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },    
    setTicket({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/ticket')
      .then( response => {
        commit('SET_TICKET', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },    
    crearPersonal({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/personal', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPersonal({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/personal/${id}`)
      .then(onComplete)
      .catch(onError)
    },        
    eliminarTicket({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/ticket/${id}`)
      .then(onComplete)
      .catch(onError)
    },            
    obtenerPersonal({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/personal/${id}`)
      .then( response => {
        commit('SET_PERSONA1', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },           
    obtenerTicket({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/ticket/${id}`)
      .then( response => {
        commit('SET_TICKET1', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },        
    buscarTickets({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/ticketFiltro/${id}`)
      .then( response => {
        commit('SET_TICKETFILTRO', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },    
    editarPersonal({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/personal/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    editarTicket({commit}, {id, params, onComplete, onError} ) {
      console.log(id + " " + params)
      axios.put(`http://localhost:3000/ticket/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    cambiarEstatus({commit}, {id, params, onComplete, onError} ) {
      console.log(id + " y " + params)
      axios.put(`http://localhost:3000/cambiarEstatus/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },    
  },
  modules: {
  }
})
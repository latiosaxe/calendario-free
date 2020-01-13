import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
// You need a specific loader for CSS files
Vue.use(Vuex)

// import all
import {Datepicker, Timepicker, DatetimePicker} from '@livelybone/vue-datepicker';
// Global register
Vue.component('datepicker', Datepicker);
Vue.component('timepicker', Timepicker);
Vue.component('datetime-picker', DatetimePicker);




export const store = new Vuex.Store({
  state: {
    loadedEvents: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedEvents (state, payload) {
      state.loadedEvents = payload
    },
    deleteEvent (state, payload) {
      var filtered = state.loadedEvents.filter(element => element.id != payload.id);
      state.loadedEvents = filtered;
    },
    createEvent (state, payload) {
      state.loadedEvents.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadEvents ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('events').once('value')
        .then((data) => {
          const events = []
          const obj = data.val()
          for (let key in obj) {
            events.push({
              id: key,
              slug: obj[key].slug,
              name: obj[key].name,
              email: obj[key].email,
              description: obj[key].description,
              event_18: obj[key].event_18,
              image: obj[key].image,
              price_inscription: obj[key].price_inscription,
              price_public: obj[key].price_public,
              date: obj[key].date,
              date_init: obj[key].date_init,
              date_end: obj[key].date_end,
              website: obj[key].website,
              address_full: obj[key].address_full,
              address_lat: obj[key].address_lat,
              address_long: obj[key].address_long,
              address_country: obj[key].address_country,
              address_country_code: obj[key].address_country_code,
              address_city: obj[key].address_city,
              tickets: obj[key].tickets,
              user_id: obj[key].user_id,
            })
          }
          commit('setLoadedEvents', events)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createEvent ({commit, getters}, payload) {
      let event = {
        slug: payload.slug,
        name: payload.name,
        email: payload.email,
        description: payload.description,
        event_18: payload.event_18,
        image: payload.image,
        price_inscription: payload.price_inscription,
        price_public: payload.price_public,
        date: payload.date,
        date_init: payload.date_init,
        date_end: payload.date_end,
        website: payload.website,
        address_full: payload.address_full,
        address_lat: payload.address_lat,
        address_long: payload.address_long,
        address_country: payload.address_country,
        address_country_code: payload.address_country_code,
        address_city: payload.address_city,
        tickets: payload.tickets,
        user_id: payload.user_id
      }
      firebase.database().ref('events').push(event)
        .then((data) => {
          const key = data.key
          event.id = key
          commit('createEvent', event)
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it sadf
    },
    editEvent ({commit, getters}, payload) {
      let event = payload;
      Object.keys(event).forEach((key) => (event[key] == '' || event[key] == undefined) && delete event[key]); 
      console.log( event );
      firebase.database().ref('events/'+ payload.id).set(event)
        .then((data) => {
          commit('deleteEvent', event)
          commit('createEvent', event)
        })
        .catch((error) => {
          console.log(error)
        })
      // // Reach out to firebase and store it sadf
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredEvents: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredEvents: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredEvents: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedEvent (state) {
      return (eventSlug) => {
        return state.loadedEvents.find((event) => {
          return event.slug === eventSlug
        })
      }
    },
    editEvent (state) {
      return (eventSlug) => {
        // console.log(eventSlug, state.loadedEvents)
        const event = state.loadedEvents.find((event) => {
          return event.slug === eventSlug
        })
        if(state.user){
          if(event && event.user_id == state.user.id){
            return event
          }else{
            return {'error': 'No eres el propietario de este evento', code: 1}
          }
        }else{
          return {'error': 'No estas registrado', code: 0}
        }
      }
    },
    
    loadedEvents (state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        return ( new Date(eventA.date + ' 12:00') - new Date(eventB.date + ' 12:00'))
      })
    },
    
    getNextEvents(state, getters){
      let now = new Date();
      now.setDate(now.getDate()-1); //PLUS ONE DAY
      return getters.loadedEvents.filter(event => new Date(event.date + ' 12:00') >= now );
    },
    getPastEvents (state, getters){
      let now = new Date();
      now.setDate(now.getDate()-1); //MINUS ONE DAY
      return getters.loadedEvents.filter(event => new Date(event.date + ' 12:00') < now );
    },
    getCountryEvents(state, getters){
      return getters.loadedEvents.filter((event, index, self) =>
        index === self.findIndex((t) => ( t.address_country_code === event.address_country_code ))
      ).map(function(event) { return { country_code: event["address_country_code"], country: event["address_country"]  } });
    },
  
    userEvents (state, getters){
      return (state.user ) ? getters.loadedEvents.filter(event => event.user_id == state.user.id ) : [];
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})

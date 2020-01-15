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
    eventComments: [],
    user: null,
    loading: false,
    error: null,
    usersLoaded:[],
    news: []
  },
  mutations: {
    setLoadedNews (state, payload) {
      state.news = payload
    },
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
    setEventComments(state, payload) {
      let res = payload;
      if(res.length > 0){
        res.forEach(element => {
          element.id = Object.getOwnPropertyNames(element).sort()[0];
        });
      }
      state.eventComments = res;
    },
    setUser (state, payload) {
      state.user = payload
      if(state.user){
        firebase.database().ref('users/' + state.user.id).once('value')
        .then((data) => {
          const obj = data.val()
          state.user.name = obj.name;
          state.user.username = obj.username;
          state.user.profile_pic = obj.profile_pic;
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
      }else{
        window.location.href = "/eventos";
      }
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    createNew( state ){
      state.news.push(state);
    },
    checkUserById (state, payload){
      // console.log("CheckUserById", payload, state.usersLoaded)
      let user = state.usersLoaded.find((event) => {
        // console.log("----", event);
        return event.id === payload
      })
      // console.log("User", user);
      if(!user){
        firebase.database().ref('users/' + payload).once('value')
        .then((data) => {
          const obj = data.val()
          let newUser = {}
          newUser.id = payload;
          newUser.name = obj.name;
          newUser.username = obj.username;
          newUser.profile_pic = obj.profile_pic;
          // console.log("NEW USER", newUser);
          state.usersLoaded.push( newUser )
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
      }
      // console.log(state.usersLoaded);
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
              top_four: obj[key].top_four,
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
        user_id: payload.user_id,
        top_four: payload.top_four,
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
    createComment ({commit, getters}, payload) {
      let newComment = payload;
      console.log("New comment", newComment);
      firebase.database().ref('comments').push(newComment)
      .then((data) => {
        // const key = data.key
        // event.id = key
        // commit('createEvent', event)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    eventComments({commit, getters}, payload){
      firebase.database().ref('comments').orderByChild("event").equalTo(payload).on("value", snapshot => {
        let array = [];
        let obj = snapshot.val();
        Object.keys(obj).forEach((key) => {
          array.push({[key]: obj[key]});
        });
        commit('setEventComments', array)
      });
    },
    getUserById({commit, getters}, payload){
      commit('checkUserById', payload)
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, username: payload.username, name: payload.name, profile_pic: payload.profile_pic})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    loadNews ({commit}) {
      // commit('setLoading', true)
      firebase.database().ref('news').once('value')
        .then((data) => {
          const news = []
          const obj = data.val()
          for (let key in obj) {
            news.push({
              id: key,
              title: obj[key].title,
              slug: obj[key].slug,
              image: obj[key].image,
              content: obj[key].content,
              time: obj[key].time
            })
          }
          console.log(news);
          commit('setLoadedNews', news)
          // commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            // commit('setLoading', false)
          }
        )
    },
    createNew ({commit, getters}, payload) {
      let singleNew = payload;
      let now = new Date()
      singleNew.time = now.toString();
      // console.log("CreateNew", singleNew);
      firebase.database().ref('news').push(singleNew)
        .then((data) => {
          singleNew
          const key = data.key
          singleNew.id = key
          commit('createNew', singleNew)
          window.location.href = "/noticias";
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    setEventComments(state){
      return state.eventComments;
    },
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
        return ( new Date(eventA.date) - new Date(eventB.date))
      })
    },
    
    getNextEvents(state, getters){
      let now = new Date();
      now.setDate(now.getDate()-1); //PLUS ONE DAY
      return getters.loadedEvents.filter(event => new Date(event.date) >= now );
    },
    getPastEvents (state, getters){
      let now = new Date();
      now.setDate(now.getDate()-1); //MINUS ONE DAY
      return getters.loadedEvents.filter(event => new Date(event.date) < now );
    },
    getCountryEvents(state, getters){
      return getters.loadedEvents.filter((event, index, self) =>
        index === self.findIndex((t) => ( t.address_country_code === event.address_country_code ))
      ).map(function(event) { return { country_code: event["address_country_code"], country: event["address_country"]  } });
    },
    loadedNews(state){
      return state.news
    },
    loadedNew(state){
      return (newSlug) => {
        return state.news.find((single) => {
          return single.slug === newSlug
        })
      }
    },
    userEvents (state, getters){
      return (state.user ) ? getters.loadedEvents.filter(event => event.user_id == state.user.id ) : [];
    },
    user (state) {
      return state.user
    },
    updateUserInfo(state){
      return (userInfo) => {
        firebase.database().ref('users/' + state.user.id).set({
          username: (userInfo.username) ? userInfo.username : '',
          name: (userInfo.name) ? userInfo.name : '',
          profile_pic: (userInfo.profile_pic) ? userInfo.profile_pic : ''
          // Add more stuff here
        }, function(error) {
          if (error) {
            console.log(error)
          } else {
            state.user.username= (userInfo.username) ? userInfo.username : '',
            state.user.name= (userInfo.name) ? userInfo.name : '',
            state.user.profile_pic= (userInfo.profile_pic) ? userInfo.profile_pic : ''
          }
        });
      }
    },
    getUserById(state){
      return (user_id) =>{
        return state.usersLoaded.find((event) => {
          return event.id === user_id
        })
      }
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})

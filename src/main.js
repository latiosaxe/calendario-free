import Vue from 'vue';
import App from './scripts/App.vue';
import firebase from 'firebase'

import router from './router'
import { store } from './store'
import config from './scripts/config/config';

import DateFilter from './scripts/filters/date'
Vue.filter('date', DateFilter);

import Notifications from 'vue-notification'
Vue.use(Notifications)

var SocialSharing = require('vue-social-sharing');
Vue.use(SocialSharing);


import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

// Vue.component('vue-bulma-text-editor', vueBulmaTextEditor);

// import VueGeolocation from 'vue-browser-geolocation';
// Vue.use(VueGeolocation); 

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  created: function () {
    firebase.initializeApp(config)
    firebase.auth().languageCode = 'es';
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadEvents')
    console.log("Running Firebase!");
  },
});



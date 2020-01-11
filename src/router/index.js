import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../scripts/pages/MainPage.vue';
import Event from '../scripts/pages/events/Event.vue';
import Events from '../scripts/pages/events/Events.vue';
import SubmitEvent from '../scripts/pages/events/SubmitEvent.vue';
import LoginPage from '../scripts/pages/LoginPage.vue';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: MainPage },
    { path: '/eventos', component: Events },
    {
      path: '/eventos/:slug',
      name: 'Event',
      props: true,
      component: Event
    },
    { path: '/evento/nuevo', component: SubmitEvent },
    { path: '/login', component: LoginPage },
  ],
  mode: 'history'
})
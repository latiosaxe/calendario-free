import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../scripts/pages/MainPage.vue';
import Event from '../scripts/pages/events/Event.vue';
import Events from '../scripts/pages/events/Events.vue';
import SubmitEvent from '../scripts/pages/events/SubmitEvent.vue';
import EditEvent from '../scripts/pages/events/EditEvent.vue';
import LoginPage from '../scripts/pages/user/LoginPage.vue';
import UserPage from '../scripts/pages/user/UserPage.vue';

Vue.use(Router)

// { path: '/', component: MainPage },
export default new Router({
  routes: [
    { path: '/', component: Events },
    { path: '/eventos', component: Events },
    {
      path: '/eventos/:slug',
      name: 'Event',
      props: true,
      component: Event
    },{
      path: '/eventos/:slug/editar',
      name: 'Event',
      props: true,
      component: EditEvent
    },
    { path: '/evento/nuevo', component: SubmitEvent },
    { path: '/login', component: LoginPage },
    { path: '/usuario', component: UserPage },
  ],
  mode: 'history'
})
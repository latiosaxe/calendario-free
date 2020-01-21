import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../scripts/pages/MainPage.vue';
import PageNotFound from '../scripts/pages/PageNotFound.vue';
import Event from '../scripts/pages/events/Event.vue';
import Events from '../scripts/pages/events/Events.vue';
import SubmitEvent from '../scripts/pages/events/SubmitEvent.vue';
import EditEvent from '../scripts/pages/events/EditEvent.vue';
import LoginPage from '../scripts/pages/user/LoginPage.vue';
import UserPage from '../scripts/pages/user/UserPage.vue';

import News from '../scripts/pages/news/News.vue';
import New from '../scripts/pages/news/New.vue';
import CreateNew from '../scripts/pages/news/CreateNew.vue';

import FMS from '../scripts/pages/Leagues/Ascenso.vue';

Vue.use(Router)

// { path: '/', component: MainPage },
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Events },

    { path: '/eventos', component: Events },
    { path: '/eventos/:slug',name: 'Event', props: true, component: Event },
    { path: '/eventos/:slug/editar', name: 'Event', props: true, component: EditEvent },
    { path: '/evento/nuevo', component: SubmitEvent },

    { path: '/noticia/nueva', component: CreateNew },
    { path: '/noticias', component: News },
    { path: '/noticias/:slug', component: New, props: true },
    
    { path: '/login', component: LoginPage },
    { path: '/usuario', component: UserPage },

    { path: '/fms', component: FMS },

    {
        path: '*',
        component: PageNotFound
    }
  ]
})
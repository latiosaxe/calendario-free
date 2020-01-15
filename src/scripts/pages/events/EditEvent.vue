<template>
  <div>
    <section class="hero is-light">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">Editar evento</h1>
                <h2 class="subtitle">
                    Sólo tu puedes editar este evento, si tienes alguna duda <a href="https://www.instagram.com/60segundosfreestyle/" target="_blank">mandamos un mensaje por IG</a>
                </h2>
            </div>
        </div>
    </section>
    <div class="section__container">
        <div class="container">
          <form v-if="event" @submit.prevent="validateForm()">
            <div v-if="event.code == 0">
              <p class="has-text-centered">{{event.error}}</p>
              <p style="margin-top: 10px" class="has-text-centered"><router-link to="/login" class="button is-warning"><span>Ingresa</span></router-link></p>
            </div>
            <div v-else-if="event.code == 1">
              <p class="has-text-centered">{{event.error}}</p>
            </div>
            <EventForm v-else :event="event"/>
          </form>
          <div v-else class="container flyer__full_width_text">
            <p>Cargando</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import config from '../../config/config';

import { string_to_slug } from '../../helpers'
import {Datepicker, Timepicker, DatetimePicker} from '@livelybone/vue-datepicker'; 
import EventForm from './EventForm.vue';

export default {
  props: ['slug'],
  name: 'NewEvent',
  components:{
    Datepicker, Timepicker, DatetimePicker, EventForm
  },
  computed: {
    event() {
      return this.$store.getters.editEvent(this.slug);
    },
    address(){
      console.log( this.event.address);
      return (this.event) ? this.event.address : '';
    }
  },
  data(){
    return{
      loading: true,
      newEvent: {
        name: '',
        slug: '',
        image: '',
        email: '',
        website: '',
        tickets: '',
        description: '',
        price_public: '',
        price_inscription: '',
        event_18: false,
        date: '',
        date_init: '',
        date_end: '',
        address: this.address,
        address_country: '',
        address_state: '',
        address_lat: false,
        address_long: false,
      }
    }
  },
  methods: {
    validateForm(){
      this.newEvent = this.event;
      if(this.newEvent.name.length > 0){
        this.newEvent.slug = string_to_slug(this.newEvent.name);

          this.$store.dispatch('editEvent', this.newEvent);
        // const eventValid = this.$store.getters.loadedEvent(this.newEvent.slug);

        // if(eventValid){
        //   this.$notify({
        //     group: 'foo',
        //     type: 'error',
        //     title: 'No se ha podido crear el evento',
        //     text: 'Ya existe un evento con el mismo nombre'
        //   });
        // }else{
        //   console.log("Pushing Event", this.newEvent);
        //   // this.$router.push('/eventos');
        // }
      }
    }
  }
}
</script>
<template>
  <div>
    <section class="hero is-light">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">Crea un evento</h1>
                <h2 class="subtitle">
                    Ten cuidado de no duplicar eventos
                </h2>
            </div>
        </div>
    </section>
    <div class="section__container">
        <div class="container">
          <form class="mobile_helper" @submit.prevent="validateForm()">
            <EventForm :event="newEvent"/>
          </form>
        </div>
    </div>
  </div>
</template>

<script>

import { string_to_slug } from '../../helpers'
import {Datepicker, Timepicker, DatetimePicker} from '@livelybone/vue-datepicker'; 
import EventForm from './EventForm.vue';

export default {
  name: 'NewEvent',
  components:{
    Datepicker, Timepicker, DatetimePicker, EventForm
  },
  mounted(){
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.newEvent.user_id = this.$store.getters.user.id
    //   }else{
    //     this.$router.push('/eventos');
    //   }
    // })
  },
  data(){
    return{
      newEvent: {
        name: '',
        slug: '',
        image: '',
        email: '',
        website: '',
        tickets: '',
        organization: '',
        description: '',
        price_public: '',
        price_inscription: '',
        event_18: false,
        date: '',
        date_init: '',
        date_end: '',
        address: '',
        address_country: '',
        address_state: '',
        address_lat: false,
        address_long: false,
        top_four: '',
        is_plaza: false,
        user_id:false
      }
    }
  },
  methods: {
    
    validateForm(){
      if(this.newEvent.name.length > 0){
        this.newEvent.slug = string_to_slug(this.newEvent.name);

        const eventValid = this.$store.getters.loadedEvent(this.newEvent.slug);

        if(eventValid){
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'No se ha podido crear el evento',
            text: 'Ya existe un evento con el mismo nombre'
          });
        }else{
          console.log("Pushing Event", this.newEvent);
          if(!this.newEvent.date){this.newEvent.date=new Date().toString();console.log("Today!")}
          this.$store.dispatch('createEvent', this.newEvent);
          this.$router.push('/eventos');
        }
      }
    }
  }
}
</script>
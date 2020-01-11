<template>
    <div>
        <section class="hero is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Eventos</h1>
                    <h2 class="subtitle" style="margin-bottom: 0">
                        <p>Habilita <strong>tu locación</strong> para mostrarte los eventos mas cerca de ti.</p>
                    </h2>
                    <p class="create_new">
                        <router-link to="/evento/nuevo">
                            <button class="button is-black">
                                <span>Crear Evento</span> <i class="fas fa-calendar-plus"></i>
                            </button>
                        </router-link>
                    </p>
                </div>
            </div>
        </section>
        <div class="section__container">
            <div class="container" v-if="nextEvents.length > 0">
                <div class="columns is-vcentered">
                    <div class="column is-hidden-mobile">
                        <div class=flyers__title>
                            <p v-if="filters.past">Eventos anteriores: <strong>{{ pastEvents.length }}</strong></p>
                            <p v-else>Próximos eventos: <strong>{{ nextEvents.length }}</strong></p>
                        </div>
                    </div>
                    <div class="column has-text-right flyers__filter">
                        <span class="is-hidden-mobile">Filtrar: </span>
                        <div class="select">
                            <select @change="changeTime($event)">
                                <option value="future">Próximos eventos</option>
                                <option value="past">Eventos pasados</option>
                            </select>
                        </div>
                        <div class="select">
                            <select @change="changeCountry($event)">
                                <option value="ALL">Todos los paises</option>
                                <option v-for="single in countryEvents" :value="single.country_code" :key="single.country_code">{{ single.country }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr class="is-hidden-mobile">
                <div class="columns is-multiline">
                    <template v-if="eventsDisplayed.length > 0">
                        <div class="column is-one-third" v-for="event in eventsDisplayed" :key="event.id">
                            <Flyer :event="event"  :onlyFlyer="false"/>
                        </div>
                    </template>
                    <template v-else>
                        <div class="flyer__full_width_text">
                            <p>No hay eventos para tu busqueda</p>
                        </div>
                    </template>
                </div>
            </div>

            <div v-else class="container flyer__full_width_text">
                <p>Cargando</p>
            </div>
        </div>
    </div>
</template>

<script>
import Flyer from './Flyer.vue'

export default {
    name: 'Event',
    components: {
        Flyer
    },
    computed: {
      allEvents () {
        return this.$store.getters.loadedEvents;
      },
      nextEvents () {
        return this.$store.getters.getNextEvents;
      },
      eventsDisplayed(){
          let res = [];
          (this.filters.past) ? res = this.pastEvents : res = this.nextEvents;

          if( this.filters.country != 'ALL' ){
              res = res.filter(event => event.address_country_code == this.filters.country );
          }
          return res
      },
      countryEvents(){
        return this.$store.getters.getCountryEvents;
      }
    },
    data(){
        return{
            filters:{
                past: false,
                country: 'ALL'
            },
            pastEvents: []
        }
    },
    methods: {
        changeTime(event){
            if( event.target.value === 'past' ){
                this.pastEvents = this.$store.getters.getPastEvents
                console.log("CHECK CHECK", this.pastEvents );
                this.filters.past = true
            }else{
                this.pastEvents = []
                this.filters.past = false
            } 
        },
        changeCountry(event){
            console.log("Country", event.target.value);
            this.filters.country = event.target.value;
        }
    },
    mounted(){
        
        console.log(this.pastEvents);

        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(
        //         function (position) {
        //         //do work work here
        //             /*
        //             $.post("url-here", {
        //                 long: position.coords.longitude,
        //                 lat: position.coords.latitude
        //             }).done(function (response) {
        //                 alert(responsse)
        //             });
        //             */
        //         },
        //         function (error) {
        //             alert(error.message);
        //         }, {
        //             enableHighAccuracy: true
        //             , timeout: 5000
        //         }
        //     );
        // } else {
        //     alert("Geolocation is not supported by this browser.");
        // }
    }
}
</script>
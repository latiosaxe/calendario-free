<template>
    <div>
        <section class="hero is-warning">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Eventos</h1>
                    <h2 class="subtitle" style="margin-bottom: 0">
                        <p>Habilita <strong>tu locación</strong> para mostrarte los eventos mas cerca de ti.</p>
                    </h2>
                    <p v-if="this.$store.getters.user" class="create_new">
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
            <div class="container" v-if="eventsDisplayed.length > 0">
                <div class="columns is-vcentered">
                    <div class="column is-hidden-mobile">
                        <div class=flyers__title>
                            <p v-if="filters.past">Eventos anteriores: <strong>{{ eventsDisplayed.length }}</strong></p>
                            <p v-else>Próximos eventos: <strong>{{ eventsDisplayed.length }}</strong></p>
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
                                <option value="ALL" selected>Todos los paises</option>
                                <option value="CLOSEST">Mas cercanos</option>
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
    metaInfo: {
      title: 'CelendarioFree',
      titleTemplate: '%s - Próximos eventos!',
    },
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
          console.log("- PAST", this.filters.past);
          console.log("- NEXT", this.nextEvents);
          (this.filters.past) ? res = this.pastEvents : res = this.nextEvents;
          console.log("- res", res);
          if( this.filters.country == 'CLOSEST' ){
              let distance = 0;
              res = res.filter(function(event) {
                  distance = this.getDistance(this.userCoords.lat, this.userCoords.long, event.address_lat, event.address_long, "K")
                  return distance <= this.distanceInKM
              }.bind(this))
          }else if( this.filters.country != 'ALL' ){
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
            distanceInKM: 500,
            filters:{
                past: false,
                country: 'ALL'
            },
            userCoords: {
                lat: false,
                long: false,
            },
            pastEvents: []
        }
    },
    methods: {
        changeTime(event){
            if( event.target.value === 'past' ){
                this.pastEvents = this.$store.getters.getPastEvents
                // console.log("CHECK CHECK", this.pastEvents );
                this.filters.past = true
            }else{
                this.pastEvents = []
                this.filters.past = false
            } 
        },
        changeCountry(event){
            console.log("Country", event.target.value);
            this.filters.country = event.target.value;
        },
        askLocation(){
            if (navigator.geolocation) {
                let self = this;
                navigator.geolocation.getCurrentPosition(
                function (position) {
                    console.log(position);
                    self.userCoords.lat = position.coords.latitude
                    self.userCoords.long = position.coords.longitude
                    console.log(self.userCoords);
                },
                function (error) {
                    self.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Geolocalización denegada',
                        text: 'Para poder ver los eventos mas cercanos a tu ubicación tienes que permitir al navegador brindarnos tu ubicación'
                    });
                }, {
                    enableHighAccuracy: true
                    , timeout: 5000
                });
            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Geolocalización no valida',
                    text: 'Tu navegador no cuenta con geolocalización, aun asi puedes ver todos los eventos por país.'
                });
            }
        },

        getDistance(lat1, lon1, lat2, lon2, unit){
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);;
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist.toFixed(1)
        }
    },
    mounted(){
       this.askLocation();
    }
}
</script>
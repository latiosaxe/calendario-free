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
          <form @submit.prevent="validateForm()">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Nombre <span>*</span></label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Jam 105" required v-model="newEvent.name">
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Imagen <small style="font-size: 60%;">(Proximamente se podrán subir imagenes)</small></label>
                  <div class="control">
                    <input class="input" type="text" placeholder="https://home-statics.boletia.com/uploads/event/banner/163239/Boletia-Banner.jpg" v-model="newEvent.image">
                  </div>
                </div>
                <!-- <p><small>Tamaño 500x300, Formatos aceptados .jpg, .png</small></p> -->
              </div>
            </div>

            <div class="columns">
                <div class="column">
                <div class="field">Dirección</div>
                <div class="control">
                  <input type="text" placeholder="Monumento a la Revolución" v-model="newEvent.address__full" class="input"/>
                </div>
              </div>
              <div class="column">
                <div class="field">Ciudad <span>*</span></div>
                <div class="control">
                  <input type="text" v-model="address" placeholder="Ciudad de México" class="input" required="required"/>
                </div>
                <div v-if="address_siggestions.length && showSuggestions">
                  <ul class="address_suggestions">
                    <li v-for="address in address_siggestions" :key="address.latitude" v-html="address.label" @click="setAddress(address)"></li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Correo de Contacto" value="" v-model="newEvent.email">
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <!-- <p class="help is-danger">This email is invalid</!-->
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Sitio Web</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="http://" v-model="newEvent.website">
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Descripción</label>
                  <div class="control">
                    <textarea class="textarea" placeholder="El mejor puto evento..." v-model="newEvent.description"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Precio al publico</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="$500"  v-model="newEvent.price_public">
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Precio inscripción</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="$500"  v-model="newEvent.price_inscription">
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <div class="label">Día del Evento</div>
                  <div class="control" style="position: relative">
                    <datepicker :value="time_init"
                        @input="log"
                        :min="time_init"
                        :dayStr="dayStr"
                        :scrollbarProps="{isMobile: false}"
                        :popperProps="defaultPopperProps"/>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <div class="label">Hora de Inicio</div>
                  <div class="control">
                    <input class="input" type="text" placeholder="13:00 hrs" v-model="newEvent.date_init">
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <div class="label">Hora de Finalización</div>
                  <div class="control">
                    <input class="input" type="text" placeholder="18:00 hrs" v-model="newEvent.date_end">
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox"  v-model="newEvent.event_18">
                      Evento exclusivo para mayores de Edad
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-4 is-offset-8">
                <div class="field is-grouped" style="justify-content: flex-end;">
                  <div class="control">
                     <button class="button is-primary is-large">
                      <span>Crear Evento</span>
                      <span class="icon is-small">
                        <i class="fas fa-check"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import { string_to_slug } from '../../helpers'
import {Datepicker, Timepicker, DatetimePicker} from '@livelybone/vue-datepicker'; 

export default {
  name: 'NewEvent',
  components:{
    Datepicker, Timepicker, DatetimePicker
  },
  data(){
    return{
      dayStr: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      time_init: `${new Date().getFullYear()}-${(new Date().getMonth()+1)}-${new Date().getDate()}`,
      
      newEvent: {
        name: '',
        slug: '',
        image: '',
        email: '',
        website: '',
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
      },

      address: '',
      address_siggestions: [],
      showSuggestions: true,
      awaitingSearch: false,

      defaultPopperProps: {
        arrowPosition: 'start',
        arrowOffsetScaling: 1,
        popperOptions: {
          placement: 'bottom-start',
          positionFixed: true,
        },
      },
      isM: { isMobile: true, maxHeight: 200 }
    }
  },
  methods: {
    log(val) {
      this.time_init = val
      console.log(val)
    },
    setAddress(address){
      console.log("Set Address", address);
      fetch(`https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${address.locationId}&apiKey=4F2y36xDz6ZYDdx9UppWVPlbdsGAxirK-FWVWH03Vb8`)
          .then(result => result.json())
          .then(result => {
            console.log( result );
            this.newEvent.address = address.label.replace(/<span>/g, '').replace(/<\/span>/g, '')
            this.address = this.newEvent.address;
            this.newEvent.address_country = result.Response.View[0].Result[0].Location.Address.AdditionalData[0].value
            this.newEvent.address_country_code = result.Response.View[0].Result[0].Location.Address.Country
            this.newEvent.address_city = result.Response.View[0].Result[0].Location.Address.City
            this.newEvent.address_lat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude
            this.newEvent.address_long = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude
            this.showSuggestions = false;

            setTimeout(function(){
              this.address_siggestions = {}
              this.showSuggestions = true;
            }.bind(this), 300);
            
          }, error => {
            console.error(error);
          });
    },
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
          this.newEvent.date = this.time_init;
          console.log("Pushing Event", this.newEvent);
          this.$store.dispatch('createEvent', this.newEvent);
          this.$router.push('/eventos');
        }
      }
    },
    isMobile() {
      return ( screen.width <= 760 ) ? true : false ;
    }
  },
  watch: {
    address: function(newValue, oldValue) {
      if(this.showSuggestions){
        if(newValue.length > 3){
          if(newValue != oldValue){
            this.address = newValue;
              this.showSuggestions = true;
              console.log("Searching for", newValue.replace(/[ /_]/g, '+'));
              fetch(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=4F2y36xDz6ZYDdx9UppWVPlbdsGAxirK-FWVWH03Vb8&query=${newValue.replace(/[ /_]/g, '+')}&beginHighlight=<span>&endHighlight=</span>`)
              .then(result => result.json())
              .then(result => {
                  console.log( result );
                  this.address_siggestions = []
                  if( result.suggestions.length > 0 ){
                    let self = this;
                    result.suggestions.forEach(element => {
                      self.address_siggestions.push({
                        label: element.label,
                        locationId: element.locationId
                      });
                    });
                  }
                }, error => {
                    console.error(error);
                    this.address_siggestions = []
                });  
          } 
        }
      }
    }
  }
}
</script>

<style>

</style>

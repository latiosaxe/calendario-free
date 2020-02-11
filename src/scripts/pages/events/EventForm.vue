<template>
  <div>
      <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Nombre <span>*</span></label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Super evento" required v-model="event.name">
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Imagen <span>*</span></label>
                  <div class="control">
                    <div v-if="event.image && typeof event.image === 'string'">
                      <img :src="event.image" />
                      <button @click.prevent="removeImage()" class="button is-warning">Eliminar Imagen</button>
                    </div>

                    <image-uploader
                      v-else
                      :debug="1"
                      :maxWidth="1024"
                      :quality="0.8"
                      outputFormat="verbose"
                      :preview="true"
                      :className="['fileinput', { 'fileinput--loaded' : imageOBJ }]"
                      :capture="false"
                      accept="image/*"
                      doNotResize="['gif', 'svg']"
                      @input="uploadImage"
                      @onUpload="startImageResize"
                      @onComplete="endImageResize"
                    ></image-uploader>
                    <!-- <input type="file" @change="uploadImage" class="input"> -->
                    <!-- <input type="text" placeholder="http:..." v-model="event.image" required="required"> -->
                  </div>
                  <p v-if="!imageOBJ && resizeLoading">Cargando Imagen</p>
                  <!-- <p class="help">Proximamente se podrán subir imagenes</p> -->
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label for="" class="label">Dirección <span>*</span></label>
                  <div class="control">
                    <input type="text" placeholder="Monumento a la Revolución" v-model="event.address_full" class="input" required/>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label for="" class="label">Ciudad <span>*</span></label>
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
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left">
                    <input class="input" type="email" placeholder="Correo de Contacto" value="" v-model="event.email">
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                  <!-- <p class="help is-danger">This email is invalid</!-->
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Organización</label>
                  <div class="control has-icons-left">
                    <input class="input" type="text" placeholder="The Urban Roosters" value="" v-model="event.organization">
                    <span class="icon is-small is-left">
                      <i class="fas fa-globe-americas"></i>
                    </span>
                  </div>
                  <p class="help">Si el nombre de la organización es diferente al nombre del evento.</p>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Sitio Web</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="http://" v-model="event.website">
                  </div>
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <label class="label">¿Dónde se compran los boletos?</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="http://" v-model="event.tickets">
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Descripción</label>
                  <div class="control">
                    <vue-editor v-model="event.description"></vue-editor>
                  </div>
                </div>
              </div>
            </div>

            <hr>

            <div class="columns">
              <div class="column">

                 <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" v-model="event.is_plaza">
                      ¿El Evento es de plaza?
                    </label>
                    <p class="help">Si no es de plaza se cuenta como evento de escenario.</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Precio inscripción</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="$500"  v-model="event.price_inscription">
                  </div>
                  <p class="help">Regularmente aplica solo a plaza.</p>
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <label class="label">Precio(s)</label>
                  <div class="control">
                    <vue-editor v-model="event.price_public"  placeholder="Entrada General..."></vue-editor>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <div class="label">Día del Evento</div>
                  <div class="control" style="position: relative">
                    <Datepicker :value="time_init" @selected="dateChanged"></Datepicker>
                    <!-- <datepicker :value="time_init"
                        @input="log"
                        :min="time_init"
                        :dayStr="dayStr"
                        :scrollbarProps="{isMobile: false}"
                        :popperProps="defaultPopperProps"/> -->
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <div class="label">Hora de Inicio</div>
                  <div class="control">
                    <input class="input" type="text" placeholder="13:00 hrs" v-model="event.date_init">
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <div class="label">Hora de Finalización</div>
                  <div class="control">
                    <input class="input" type="text" placeholder="18:00 hrs" v-model="event.date_end">
                  </div>
                </div>
              </div>
            </div>

            <hr>
            <p>Evento concluido</p>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">¿Quienes fueron los ganadores?:</label>
                        <div class="control">
                            <vue-editor v-model="event.top_four"></vue-editor>
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" v-model="event.event_18">
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
                     <button class="button is-warning is-large">
                      <span>{{ (edit)?'Editar evento':'Crear Evento' }}</span>
                      <span class="icon is-small">
                        <i class="fas fa-check"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
  </div>
</template>

<script src="https://unpkg.com/vuejs-datepicker@1.6.2/dist/locale/translations/es.js"></script>
<script>
import Datepicker from 'vuejs-datepicker';
import { VueEditor } from "vue2-editor";
import ImageUploader from 'vue-image-upload-resize'

export default {
    props: ['event', 'edit'],
    components: {
      Datepicker,
      VueEditor,
      ImageUploader
    },
    data(){
        return{
            dayStr: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            time_init: this.event.date || new Date().toString(),
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
            isM: { isMobile: true, maxHeight: 200 },

            resizeLoading: false,
            imageOBJ: false
        }
    },
    mounted(){
        console.log(this.event);
        if(this.event.address_city){
          this.address = this.event.address_city;
        }
    },
    methods: {
        removeImage(){
          this.event.image = false;
        },
        startImageResize(){
          this.resizeLoading = true;
        },
        endImageResize(){
          this.resizeLoading = false;
        },
        uploadImage(e){
          console.log(e);
          this.imageOBJ = e
          this.event.image = this.imageOBJ;
          console.log("IMAGEN", this.event.image);
        },
        dateChanged(newDate){
          this.time_init = newDate.toString();
          this.event.date = this.time_init;
          console.log("this.time_init", this.time_init);
        },
        setAddress(address){
            console.log("Set Address", address);
            fetch(`https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${address.locationId}&apiKey=4F2y36xDz6ZYDdx9UppWVPlbdsGAxirK-FWVWH03Vb8`)
                .then(result => result.json())
                .then(result => {
                    console.log( result );
                    this.event.address = address.label.replace(/<span>/g, '').replace(/<\/span>/g, '')
                    this.address = this.event.address;
                    this.event.address_country = result.Response.View[0].Result[0].Location.Address.AdditionalData[0].value
                    this.event.address_country_code = result.Response.View[0].Result[0].Location.Address.Country
                    this.event.address_city = result.Response.View[0].Result[0].Location.Address.City || result.Response.View[0].Result[0].Location.Address.AdditionalData[1].value
                    this.event.address_lat = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude
                    this.event.address_long = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                    this.showSuggestions = false;

                    setTimeout(function(){
                    this.address_siggestions = {}
                    this.showSuggestions = true;
                    this.replaceCountry();
                    }.bind(this), 250);
                    
                }, error => {
                    console.error(error);
                });
        },
        isMobile() {
            return ( screen.width <= 760 ) ? true : false ;
        },
        replaceCountry(){
            this.event.address_country.replace('República Bolivariana De Venezuela', 'Venezuela')
                                      .replace('República de Chile', 'Chile')
                                      .replace('República de El Salvador', 'El Salvador')
                                      .replace('Estado Plurinacional de Bolivia', 'Bolivia')
                                      
            this.event.address_city.replace('Comunidad de Madrid', 'Madrid')
                            .replace('Ciudad de México', 'CDMX');
            // this.event.date = this.time_init;
            // console.log("NEW DATE SETED", this.event.date);
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

<template>
  <section class="section mobile_helper">
    <div class="container">
      <template v-if="!event">
        <div class="container flyer__full_width_text">
            <p>Cargando...</p>
        </div>
      </template>
      <template v-else>
        <div class="columns is-vcentered noPaddingTop">
          <div class="column">
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><router-link to="/eventos"><span>Eventos</span></router-link></li>
                <li class="is-active"><a href="#" aria-current="page">{{event.name}}</a></li>
              </ul>
            </nav>
          </div>
          <div class="column has-text-right ">
            <a v-if="event.tickets" :href="event.tickets" class="button is-warning is-medium mobile_full_width">Comprar boletos</a>
          </div>
        </div>
      
        <div class="columns event">
          <div ref="posterWrapper" class="event__image column is-half">
            <img ref="poster" class="pointer_none" :src="getImage()" :style="{ position: styles.position, width: styles.width, top: styles.top+'px'  }"/>
          </div>
          <div class="event__content column is-half">
            <div ref="eventContent">
              <p v-if="event.is_plaza" class="help"><i class="fas fa-road" style="margin-right: 5px;"></i><strong>Evento de plaza</strong></p>
              <h1 class="title">{{ event.name }}</h1>

              <div v-if="event.top_four" class="event__content__top_four">
                <p><strong>El evento ya se llevó a cabo, estas son las posiciones:</strong></p>
                <hr />
                <div v-html="event.top_four"></div>
              </div>

              <p class="description" v-if="event.description" v-html="event.description"></p>

              <hr v-if="event.address_full">
              <vue-aos animation-class="fadeIn animated">
                <div v-if="event.address_full" class="address">
                  <p class="has-text-centered"><strong>Dirección:</strong> {{ event.address_full }}</p>
                  <p class="has-text-centered">{{ event.address_city }}, {{ event.address_country }}</p>
                </div>
              </vue-aos>
              <hr>
              <vue-aos animation-class="fadeIn animated">
                <div class="event__content__metadata">
                  <div class="event__content__metadata__element has-text-centered">
                      <i class="fas fa-calendar"></i>
                      <p>¿Cúando?</p>
                      <p>{{ event.date | date}}</p>
                  </div>
                  <div class="event__content__metadata__element has-text-centered">
                      <p>
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#000000" d="M6,2V8H6V8L10,12L6,16V16H6V22H18V16H18V16L14,12L18,8V8H18V2H6M16,16.5V20H8V16.5L12,12.5L16,16.5M12,11.5L8,7.5V4H16V7.5L12,11.5Z" />
                        </svg>
                      </p>
                      <p><span>Inicia</span></p>
                      <p>{{ (event.date_init)? event.date_init : 'No especificado'}}</p>
                  </div>
                  <div v-if="event.date_end" class="event__content__metadata__element has-text-centered">
                    <p>
                      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                          <path fill="#000000" d="M6,2V8H6V8L10,12L6,16V16H6V22H18V16H18V16L14,12L18,8V8H18V2H6Z" />
                      </svg>
                    </p>
                      <p><span>Termina</span> <i class="fas fa-hourglass-full"></i></p>
                      <p>{{ event.date_end}}</p>
                  </div>
                </div>
              </vue-aos>

              <vue-aos animation-class="fadeIn animated">
                <div class="event__content__footer">
                  <article class="message is-dark">
                    <div class="message-body">
                      <p v-if="event.price_inscription && event.price_inscription != 0"><strong>Precio de inscripción: </strong>{{ event.price_inscription }}</p>
                      <div v-if="event.price_public" v-html="event.price_public "></div>
                      <p v-else><strong>Precio al público: </strong>No especificado</p>
                      
                      <p v-if="event.website"><a class="button is-dark" :href="event.website">Sitio web</a></p>
                    </div>
                  </article>
                  <p v-if="event.email"><strong>Email de contacto: </strong>{{ event.email }}</p>
                </div>
              </vue-aos>

              <p class="event__content__age">{{ ( event.event_18 ) ? 'Evento para mayores de 18 años.' : 'Evento para todas las edades, edad mínima sugerida 3 años.' }}</p>

              <vue-aos animation-class="fadeIn animated">
                <div class="event__content__cta">
                  <div class="event__content__cta__shop">
                    <a v-if="event.tickets" :href="event.tickets" class="button is-warning is-medium">Comprar boletos</a>
                  </div>


                  <p v-if="isMobile" class="button is-dark mobile_full_width" @click="mobileShare()">
                      <span class="icon is-small">
                          <i class="fas fa-share-alt"></i>
                      </span>
                      <span>Compartir</span>
                  </p>


                  <social-sharing v-else :url="url"
                    :title="event.title"
                    :description="event.description"
                    :quote="`CalendarioFree te invita a ${event.title}. ${event.description}`"
                    hashtags="calendariofree,freestyle"
                    inline-template>
                    <div class="event__content__cta__grid">
                        <!-- <network network="email">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="#000000" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                            </svg> Email
                        </network> -->
                        <network network="facebook">
                          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#000000" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
                          </svg> Facebook
                        </network>
                        <network network="twitter">
                          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#000000" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33Z" />
                          </svg> Twitter
                        </network>
                        <network network="whatsapp">
                          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#000000" d="M16.75,13.96C17,14.09 17.16,14.16 17.21,14.26C17.27,14.37 17.25,14.87 17,15.44C16.8,16 15.76,16.54 15.3,16.56C14.84,16.58 14.83,16.92 12.34,15.83C9.85,14.74 8.35,12.08 8.23,11.91C8.11,11.74 7.27,10.53 7.31,9.3C7.36,8.08 8,7.5 8.26,7.26C8.5,7 8.77,6.97 8.94,7H9.41C9.56,7 9.77,6.94 9.96,7.45L10.65,9.32C10.71,9.45 10.75,9.6 10.66,9.76L10.39,10.17L10,10.59C9.88,10.71 9.74,10.84 9.88,11.09C10,11.35 10.5,12.18 11.2,12.87C12.11,13.75 12.91,14.04 13.15,14.17C13.39,14.31 13.54,14.29 13.69,14.13L14.5,13.19C14.69,12.94 14.85,13 15.08,13.08L16.75,13.96M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C10.03,22 8.2,21.43 6.65,20.45L2,22L3.55,17.35C2.57,15.8 2,13.97 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.72 4.54,15.31 5.46,16.61L4.5,19.5L7.39,18.54C8.69,19.46 10.28,20 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
                          </svg> Whatsapp
                        </network>
                    </div>
                  </social-sharing>
                </div>
              </vue-aos>

              <Comments :slug="slug" :user="user"/>



                <div v-if="user && user.id == event.user_id" class="has-text-right">
                  <hr>
                  <p style="margin-top: 20px;">
                      <router-link :to="`/eventos/${event.slug}/editar`" class="button is-link is-light">Editar evento</router-link> 
                  </p>
                  <p class="help">Solo el creador del evento puede editarlo</p>
                </div>

                <p style="margin-top: 15px; font-style: italic;"><small>Ni <strong>CalendarioFree</strong> ni <strong>60 Segundos freestyle</strong> organizan este evento.</small></p>


            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import Flyer from './Flyer.vue'
import VueAos from 'vue-aos'
import Comments from '../comments/Comments.vue'

 export default {
    props: ['slug'],
    metaInfo () {
      return {
        title: (this.event) ? this.event.name : 'CalendarioFree - Evento',
        meta: [
          { name: 'description', content: (this.event) ? this.event.description : '' },
          { name: 'keywords', content: (this.event) ? `${this.event.name}, eventos freestyle, calendario freestyle` : 'eventos freestyle, calendario freestyle' },

          { name: 'og:url', key: 'og:url', content: this.url },
          { name: 'og:title', key: 'og:title', content:  (this.event) ? this.event.name : 'CalendarioFree - Evento' },
          { name: 'og:description', key: 'og:description', content: (this.event) ? `El próximo ${( new Date(this.event.date).toLocaleString(['es-MX'], {month: 'short', day: '2-digit', year: 'numeric'}) )} se llevará a cabo ${this.event.name}` : ''  },
          { name: 'og:image',  key: 'og:image', content: (this.event) ? this.event.image : ''  },
          { name: 'twitter:card', content: 'summary' }
        ]
      }
    },
    components: {
        Flyer,
        Comments,
        VueAos
    },
    data(){
      return {
        url: '',
        isMobile: false,
        styles: {
          top: 0,
          width: '100%',
          position: 'static'
        },
        footerHeight: 0,
        negativeAux: 0
      }
    },
    mounted(){
      (window.innerWidth > 768) ? this.isMobile = false : this.isMobile = true
      this.url = window.location.href; 
      this.footerHeight = document.getElementById('footer').clientHeight;
      this.$analytics.logEvent("page_view");
    },
    computed: {
      event () {
        return this.$store.getters.loadedEvent(this.slug);
      },
      user(){
        return this.$store.getters.user
      } 
    },
    methods:{
      getImage(){
        return (this.event && this.event.image) ? this.event.image : '/src/images/flyer_default.png';
      },
      handleScroll (event) {
        // if( this.$refs.eventContent.clientHeight > this.$refs.poster.clientHeight){
        // console.log( this.$refs.poster.clientHeight, this.$refs.eventContent.clientHeight );
        if( this.$refs.eventContent.clientHeight > this.$refs.poster.clientHeight){
          this.styles.width = (this.$refs.poster.clientWidth > 0) ? this.$refs.poster.clientWidth + 'px' : '100%';
          // console.log( this.$refs.poster.offsetWidth )
          if( window.pageYOffset > 10 ){
            const calc =  this.$refs.eventContent.clientHeight - this.$refs.poster.clientHeight - window.pageYOffset + 13;
            // const calc = document.body.clientHeight - window.innerHeight - window.pageYOffset - this.footerHeight - document.getElementById('header').clientHeight - 105;
            // console.log("-----");
            // console.log( "Ventana", window.innerHeight)
            // console.log( "Scroll", window.pageYOffset)
            // console.log( "Footer", this.footerHeight)
            // console.log( "Contenido", this.$refs.eventContent.clientHeight)
            // console.log( "Operación", (this.$refs.eventContent.clientHeight - window.innerHeight - window.pageYOffset)  )
            // console.log( "Operación", calc )
            // if(calc < 0){ calc = 0  }
            // console.log("-----");
            // console.log( window.innerHeight, window.pageYOffset, this.footerHeight, this.$refs.eventContent.clientHeight  );
            // console.log( window.innerHeight - window.pageYOffset + this.footerHeight + 50 - this.$refs.eventContent.clientHeight );

            if( calc < 0){
              this.negativeAux = calc;
            }else{
              this.negativeAux = 0
            }
            this.styles.top = 110 + this.negativeAux;
            this.styles.position = 'fixed';
          }else{
            this.styles.position = 'static';
          }
        }
        // console.log(this.styles);
      },
      mobileShare(){
        if (navigator.share) {
            navigator.share({
                title: this.event.name,
                text: this.event.name,
                url: this.url,
                image: this.event.image,
            }).then(() => {
                console.log('Thanks for sharing!');
            })
            .catch(console.error);
        } else {
            // fallback
        }
      }
    },
    created () {
      if(window.innerWidth > 768){
        window.addEventListener('scroll', this.handleScroll);
      }
    },
    destroyed () {
      if(window.innerWidth > 768){
        window.removeEventListener('scroll', this.handleScroll);
      }
    }
  }
</script>

<style>

</style>
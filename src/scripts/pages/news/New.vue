<template>
    <div>
        <div v-if="singleNew" class="news__single">
            <section class="hero is-medium is-light is-bold">
                <div class="hero-body">
                    <div class="container">
                    <h1 class="title" v-text="singleNew.title"></h1>
                    <h2 class="subtitle">{{  singleNew.time | date }}</h2>
                    </div>
                </div>
            </section>
            <div class="container">
                <div class="news__single__wrapper">
                    <img :src="singleNew.image" />
                    <!-- <hr> -->
                    <div class="news__single__content" v-html="singleNew.content"></div>

                    <div class="news__single__share">

                        <p v-if="isMobile" class="button is-dark mobile_full_width" @click="mobileShare()">
                            <span class="icon is-small">
                                <i class="fas fa-share-alt"></i>
                            </span>
                            <span>Compartir</span>
                        </p>

                        <social-sharing v-else :url="url"
                        :title="singleNew.title"
                        :description="singleNew.description"
                        :quote="`CalendarioFree - ${singleNew.title}`"
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
                </div>
            </div>
        </div>
        <div v-else class="container flyer__full_width_text">
            <p>Cargando</p>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['slug'],
    name: 'News',
    metaInfo () {
      return {
        title: (this.singleNew) ? this.singleNew.title : 'CalendarioFree - Noticias freestyle',
        meta: [
          { name: 'description', content: (this.singleNew) ? this.singleNew.content : '' },
          { name: 'keywords', content: (this.singleNew) ? `${this.singleNew.title}, noticias freestyle, calendario freestyle` : 'noticias freestyle, calendario freestyle' },

          { name: 'og:url', content: this.url },
          { name: 'og:title', content:  (this.singleNew) ? this.singleNew.title : 'CalendarioFree - Noticias' },
          { name: 'og:description', content: (this.singleNew) ? this.singleNew.content : ''  },
          { name: 'og:image', content: (this.singleNew) ? this.singleNew.image : ''  },
          { name: 'twitter:card', content: 'summary' }
        ]
      }
    },
    computed: {
        singleNew(){
            return this.$store.getters.loadedNew(this.slug);
        }
    },
    data(){
        return {
            loading: true,
            url: '',
            isMobile: false
        }
    },
    mounted(){
        (window.innerWidth > 768) ? this.isMobile = false : this.isMobile = true
        this.url = window.location.href; 
        this.$store.dispatch('loadNews');
        this.$analytics.logEvent("page_view");
    },
    methods:{
        mobileShare(){
            if (navigator.share) {
                navigator.share({
                    title: this.singleNew.title,
                    text: this.singleNew.title,
                    url: this.url,
                    image: this.singleNew.image,
                }).then(() => {
                    console.log('Thanks for sharing!');
                })
                .catch(console.error);
            } else {
                // fallback
            }
        }
    }
}
</script>
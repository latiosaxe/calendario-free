<template>
    <div class="mobile_helper">
        <div class="section" style="padding-left:0; padding-right: 0;">
            <div class="container">
                <h1 class="title">Últimas noticias</h1>
            </div>

            <div v-if="news && news.length > 0" class="new__carousel">
                <carousel
                v-if="!loading"
                    :autoplay="false" 
                    :autoplayTimeout="5000" 
                    :autoplayHoverPause="true"
                    :center="true" 
                    :nav="false" 
                    :dots="true"
                    :autoWidth="true"
                    :loop="true"
                    :responsive="{0:{items:1,dots:false,autoWidth:false,autoHeight:true},768:{dots:true,autoWidth:true,autoHeight:false}}"
                >
                    <div v-for="singleNew in news" :key="singleNew.id" class="new__carousel__list">
                        <div class="new__carousel__list__image">
                            <img :src="singleNew.image">
                        </div>
                        <div class="new__carousel__list__content">
                            <h2 v-text="singleNew.title"></h2>
                            <p class="has-text-right">
                                <router-link class="button is-warning" :to="`/noticias/${singleNew.slug}`">Leer noticia</router-link>
                            </p>
                        </div>
                    </div>
                </carousel>
            </div>

            <div v-else class="container flyer__full_width_text">
                <p>Cargando</p>
            </div>

        </div>
        
    </div>
</template>

<script>

import carousel from 'vue-owl-carousel'

export default {
    name: 'News',
    components: { 
        carousel
    },
    computed: {
        news(){
            return this.$store.getters.loadedNews;
        }
    },
    data(){
        return {
            loading: true,
        }
    },
    mounted(){
        this.$store.dispatch('loadNews');
        this.loading = false;
        setTimeout(function(){
            if( document.querySelector(".new__carousel .new__carousel__list__image").offsetWidth == 0 ){
                this.loading = true;
                setTimeout(function(){
                    this.loading = false;
                }.bind(this), 300)
            }
        }.bind(this), 1000);
        this.$analytics.logEvent("page_view");
    }
}
</script>
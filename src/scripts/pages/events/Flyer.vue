<template>
   <div class="flyer" :class="{ 'onlyFlyer': onlyFlyer }" :style="{ 'background-image': `url(${getmIage()})` }">
        <a :href="`/eventos/${event.slug}`">
            <img v-if="event.image" class="flyer__content__mobile_image" :src="event.image">
            <p class="flyer__content__date" v-if="event.date"> {{ event.date | date }}</p>
            <div class="flyer__content">
                <h5 v-if="event.name" v-text="event.name"></h5>
                <div class="flyer__content__description" v-if="event.description" v-html="event.description"></div>
                <div class="flyer__content__metadata">
                    <div v-if="event.date_init" v-text="event.date_init"></div>
                    <div v-if="event.address_city" v-text="event.address_city"></div>
                    <div v-if="event.address_country" v-text="event.address_country"></div>
                </div>
                <!-- <div v-if="event.address_lat" class="column">{{  }}</div> -->
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'Flyer',
    props:[ 'event', 'onlyFlyer' ],
    mounted(){
    },
    methods: {
       getmIage(){
           return (this.event.image) ? this.event.image : '/src/images/flyer_default.png'
       }
    }
}
</script>
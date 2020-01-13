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
                <!-- <div v-if="event.address_lat" class="column">{{ getDistance(19.3823912, -99.1687843, event.address_lat, event.address_long, "K") }}</div> -->
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
            return `A ${dist.toFixed(1)}KM de tu lugar actual`
        }
    }
}
</script>
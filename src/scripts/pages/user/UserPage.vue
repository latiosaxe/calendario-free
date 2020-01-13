<template>
    <div>
        <section class="hero is-warning">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Tus eventos</h1>
                    <h2 class="subtitle" style="margin-bottom: 0">
                        <p>Estos son todos los eventos que haz creado.</p>
                    </h2>
                    <div v-if="user" class="create_new">
                        <!-- {{ user }} -->
                    </div>
                </div>
            </div>
        </section>
        <div class="section__container">
            <div class="container" v-if="userEvents.length > 0">
                <div class="columns is-multiline">
                    <div class="column is-one-third" v-for="event in userEvents" :key="event.id">
                        <Flyer :event="event"  :onlyFlyer="false"/>
                    </div>
                </div>
            </div>

            <div v-else class="container flyer__full_width_text">
                <p>Cargando</p>
            </div>
        </div>
    </div>
</template>

<script>
import Flyer from './../events/Flyer.vue'

export default {
    name: 'Event',
    components: {
        Flyer
    },
    computed: {
        user(){
            return this.$store.getters.user
        },
      userEvents () {
        return this.$store.getters.userEvents;
      },
    },
    data(){
        return{     
        }
    },
    methods: {
    }
}
</script>
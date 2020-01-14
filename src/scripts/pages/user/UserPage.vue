<template>
    <div>
        <section class="hero is-warning">
            <div class="hero-body">
                <div v-if="user" class="container">
                    <template v-if="user.name">
                        <h2 class="title">Hola {{ user.name || user.username }}</h2>
                        <p>¡Nos da gusto verte por acá!</p>

                         <form @submit.prevent="editUserInfo()" v-if="!updated">
                            <hr class="black">
                            <div class="columns">
                                <div class="column is-4">
                                    <div class="field">
                                        <label class="label">Nombre Real</label>
                                        <div class="control">
                                            <input v-model="userInfo.name" class="input" placeholder="Arturo"/>
                                        </div>
                                        <p class="help">Opcional</p>
                                    </div>
                                </div>
                                <div class="column is-4">
                                    <div class="field">
                                        <label class="label">Imagen de perfil</label>
                                        <div class="control">
                                            <input v-model="userInfo.profile_pic" class="input" placeholder="http://..." />
                                        </div>
                                        <p class="help">Próximamente se podrán subir imagenes</p>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column has-text-right">
                                    <button class="button is-dark" type="submit">Completar información de usuario</button>
                                </div>
                            </div>
                        </form>
                    </template>
                    <template v-else>
                        <h2 class="title">Complementa tu información</h2>
                        <form @submit.prevent="editUserInfo()" v-if="!updated">
                            <div class="columns">
                                <div class="column">
                                    <div class="field">
                                        <label class="label">Usuario</label>
                                        <div class="control">
                                            <input v-model="userInfo.username" class="input" placeholder="latiosaxe" required/>
                                        </div>
                                        <p class="help">Para poder comentar es necesario tener antes configurado un nombre de usuario. No agregues @ al principio.</p>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="field">
                                        <label class="label">Nombre Real</label>
                                        <div class="control">
                                            <input v-model="userInfo.name" class="input" placeholder="Arturo"/>
                                        </div>
                                        <p class="help">Opcional</p>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="field">
                                        <label class="label">Imagen de perfil</label>
                                        <div class="control">
                                            <input v-model="userInfo.profile_pic" class="input" placeholder="http://..." />
                                        </div>

                                        <p class="help">Próximamente se podrán subir imagenes</p>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column has-text-right">
                                    <button class="button is-dark" type="submit">Completar información de usuario</button>
                                </div>
                            </div>
                        </form>
                    </template>
                    <!-- <h1 class="title">Tus eventos</h1>
                    <h2 class="subtitle" style="margin-bottom: 0">
                        <p>Estos son todos los eventos que haz creado.</p>
                    </h2> -->
                </div>
            </div>
        </section>
        <div class="section__container">
            <div class="container" v-if="userEvents.length > 0">
                <p class="title">Estos son los eventos que haz creado.</p>
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
            const user = this.$store.getters.user;
            if(user){
                if( user.name ){ this.userInfo.name = user.name}
                if( user.profile_pic){ this.userInfo.profile_pic = user.profile_pic}
                if( user.username){ this.userInfo.username = user.username}
            }
            return user
        },
        userEvents () {
            return this.$store.getters.userEvents;
        },
    },
    data(){
        return{    
            updated: false,
            userInfo: {
                username: '',
                name: '',
                profile_pic: ''
            } 
        }
    },
    methods: {
        editUserInfo(){
            this.updated = true
            return this.$store.getters.updateUserInfo(this.userInfo);
        }
    }
}
</script>
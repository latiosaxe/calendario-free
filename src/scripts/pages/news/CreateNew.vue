<template>

    <section class="section">
    <div class="container">
      <h1 class="title">Crear noticia</h1>
      <h2 class="subtitle">
        Se cuidadoso con lo que publicas, recuerda, el respeto ante todo.
      </h2>
      <hr />
      <form @submit.prevent="createNew()">
            <div class="columns">
                <div class="column">
                    <div class="field">
                    <label class="label">Titulo</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="http://" v-model="newData.title" required="required">
                    </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                    <label class="label">Imagén</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="http://" v-model="newData.image" required="required">
                        <p class="help">Procura que la imagen tenga una proporción 1:1</p>
                    </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Contenido</label>
                        <div class="control">
                            <vue-editor v-model="newData.content" required="required"></vue-editor>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column has-text-right">
                    <button class="button is-warning" type="submit">Crear Noticia</button>
                </div>
            </div>
        </form>
    </div>
  </section>
    
</template>

<script>
import firebase from 'firebase'
import config from '../../config/config';

import { string_to_slug } from '../../helpers'
import { VueEditor } from "vue2-editor";

export default {
    name: 'CreateNew',
    components: {
        VueEditor
    },
    mounted(){
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.$router.push('/eventos');
            }
        })
    },
    data(){
        return{
            newData: {
                title: 'CAYU desvinculado de God Level.',
                content: '',
                image: 'https://instagram.fmex8-2.fna.fbcdn.net/v/t51.2885-15/e35/80554703_2599411056780274_7670411658469909688_n.jpg?_nc_ht=instagram.fmex8-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=mmtrqmDzMfQAX8ArAA2&oh=37ec706d51fd48f75a443adeff07a846&oe=5ED57378'
            }
        }
    },
    methods:{
        createNew(){
            if(this.newData.title && this.newData.content && this.newData.image){
                this.newData.slug = string_to_slug(this.newData.title);
                this.$store.dispatch('createNew', this.newData);
            }else{
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Completa todos los campos',
                    text: 'Revisa si estas llenando todos los campos.'
                });
            }
        }
    }
}
</script>

<style>

</style>
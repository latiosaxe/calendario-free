<template lang="html">
  <div>
    <section class="hero is-light">
      <div class="hero-body">
          <div class="container">
              <h1 class="title">Login</h1>
              <h2 class="subtitle" style="margin-bottom: 0">
                  <p>Para ingresar utiliza alguno de los siguientes servicios para identificarte.</p>
              </h2>
          </div>
      </div>
    </section>
    <div class="container">
      <div class="columns">
        <div class="column">
          <br/>
          <div id="firebaseui-auth-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import * as firebaseui from "firebaseui"

export default {
  name: 'auth',
  mounted() {
    var uiConfig = {
      signInSuccessUrl: '/usuario',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },{
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        }
      ]
    };
    
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  },
}
</script>

<style lang="css">
</style>



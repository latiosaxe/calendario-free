<template>
    <header id="header" class="header">
        <div class="header__fix">
            <div class="container">
                <nav class="header__fix__left">
                    <p class="level-item has-text-centered logo">
                        <router-link to="/">
                            <img v-if="isMobile" src="../../images/logosmall.png" alt="CalendarioFree Logo" />
                            <img v-else src="../../images/logo.png" alt="CalendarioFree Logo" />
                        </router-link>
                    </p>
                    <p class="level-item has-text-centered">
                        <router-link to="/eventos"><span>Eventos</span></router-link>
                    </p>
                    <p class="level-item has-text-centered">
                        <router-link to="/fms"><span v-text="(isMobile)?'FMS':'Ascenso FMS'"></span></router-link>
                    </p>
                </nav>
                <ul class="header__fix__right">
                     <li>
                         <a role="button" class="navbar-burger" :class="{ 'is-active': mobileHamburger }" @click.prevent="mobileHamburger = !mobileHamburger" aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                         <div id="navbarBasicExample" class="navbar-menu">
                            <div class="navbar-start">
                                <div class="navbar-item has-dropdown is-hoverable">
                                    <a class="navbar-link">
                                        <i class="fas fa-user"></i>
                                    </a>

                                    <div class="navbar-dropdown">
                                        <div v-if="user" class="navbar-item">
                                            <router-link to="/usuario">Mi perfil</router-link> 
                                        </div>
                                        <div v-else class="navbar-item">
                                            <router-link to="/login">Ingresar</router-link> 
                                        </div>
                                        <hr v-if="user" class="navbar-divider">
                                        <a v-if="user" class="navbar-item" @click.prevent="logout()">
                                            Salir
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="mobile_abolute" v-if="mobileHamburger">
                         <div class="navbar-dropdown">
                            <div class="navbar-item special" @click="mobileHamburger = false;">
                                <router-link v-if="user" to="/usuario">Mi perfil</router-link> 
                                <router-link v-else to="/login">Ingresar</router-link> 
                            </div>
                            <hr v-if="user" class="navbar-divider">
                            <a v-if="user" class="navbar-item" @click.prevent="mobileHamburger = false; logout()">
                                Salir
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="header__space"></div>
    </header>
  
</template>

<script>
export default {
    computed:{
        user(){
            return this.$store.getters.user
        },
        userData(){
            return this.$store.getters.userData
        }
    },
    data(){
        return {
            isMobile: false,
            mobileHamburger: false,
        }
    },
    mounted(){
        (window.innerWidth > 768) ? this.isMobile = false : this.isMobile = true
    },
    methods: {
        logout(){
            console.log("LOGOUT");
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style>

</style>
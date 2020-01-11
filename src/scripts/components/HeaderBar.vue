<template>
    <header class="header">
        <div class="header__fix">
            <div class="container">
                <nav class="header__fix__left">
                    <p class="level-item has-text-centered logo">
                        <router-link to="/">
                            <img src="../../images/logo.png" alt="CalendarioFree Logo" />
                        </router-link>
                    </p>
                    <p class="level-item has-text-centered">
                        <router-link to="/eventos"><span>Eventos</span></router-link>
                    </p>
                    <p class="level-item has-text-centered">
                        <router-link to="/noticias"><span>Noticias</span></router-link>
                    </p>
                </nav>
                <ul class="header__fix__right">
                    <li class="level-item has-text-centered">
                        <router-link to="/login">                      
                            <i class="fas fa-user"></i>
                        </router-link> 
                    </li>
                </ul>
            </div>
        </div>
        <div class="header__space"></div>
    </header>
  
</template>

<script>
export default {

}
</script>

<style>

</style>
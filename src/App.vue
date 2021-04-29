<template>
  <v-app id="app">
    <div class="container">
      <v-app-bar id="navbar" app dark>
        <div class="d-flex align-center">
          <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
          <router-link class="homeButton" to="/">Home</router-link>
        </div>

        <v-spacer></v-spacer>
        <!-- <router-link class="ceva" to="/about"> about</router-link> -->
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },
  data() {
    return {

    }
  },
};
</script>


<style lang="scss">
  @import "@/assets/styles/_variables.scss";
  #app {
    background-color: $secondary
  };
  #navbar {
    background-color: $pink;
  };
  .homeButton {
    color: white !important;
    font-size: 2em !important;
    font-weight: bold;
    text-decoration: none;
  }

// desktop
@media (min-width: 1260px) {
  .container {
      width: 1220px;
  }
}

@media (min-width: 992px) {
  .container {
      width: 1220px;
  }
}

@media (min-width: 768px) {
  .container {
      width: 1220px;
  }
}


// mobile

</style>
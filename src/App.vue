<template>
  <v-app id="app">
    <div class="container">
      <v-app-bar id="navbar" app dark>
        <div class="d-flex align-center">
          <v-img class="shrink mr-2" src="@/assets/images/cooking_crisis.png"  width="40"/>
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
  #app {
    background-color: $blue
  };
  #navbar {
    background-color: $primary;
  };


  .homeButton {
    color: white !important;
    font-size: 1.4em;
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




//font sizes
.fs-small-1 {
  @media screen and (min-width: 480px)  {
    font-size: 9px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 14px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 19px !important;
  }
}
//font-size:21
.fs-small-2 {
  @media screen and (min-width: 480px)  {
    font-size: 14px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 21px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 28px !important;
  }
}
//font-size:24
.fs-small-3 {
  @media screen and (min-width: 480px)  {
    font-size: 16px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 24px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 32px !important;
  }
}
//font-size: 28
.fs-small-4 {
  @media screen and (min-width: 480px)  {
    font-size: 19px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 28px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 37px !important;
  }
}
//font medium
//font-size:32
.fs-medium-1 {
  @media screen and (min-width: 480px)  {
    font-size: 21px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 32px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 43px !important;
  }
}
//font-size:35
.fs-medium-2 {
  @media screen and (min-width: 480px)  {
    font-size: 23px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 35px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 47px !important;
  }
}
//font-size:36
.fs-medium-3 {
  @media screen and (min-width: 480px)  {
    font-size: 24px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 36px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 48px !important;
  }
}
//font-size:40
.fs-medium-4 {
  @media screen and (min-width: 480px)  {
    font-size: 27px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 40px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 53px !important;
  }
}
//font-size:42
.fs-medium-5 {
  @media screen and (min-width: 480px)  {
    font-size: 28px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 42px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 56px !important;
  }
}
//font large 
//font-size:48
.fs-large-1 {
  @media screen and (min-width: 480px)  {
    font-size: 32px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size:  48px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 64px !important;
  }
}
//font-size:50
.fs-large-2 {
  @media screen and (min-width: 480px)  {
    font-size: 33px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 50px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 67px !important;
  }
}
//font-size: 60
.fs-large-3 {
  @media screen and (min-width: 480px)  {
    font-size: 40px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 60px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 80px !important;
  }
}
//font-size:64
.fs-large-4 {
  @media screen and (min-width: 480px)  {
    font-size: 43px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 64px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 85px !important;
  }
}
//font-size: 72
.fs-large-5 {
  @media screen and (min-width: 480px)  {
    font-size: 48px !important;
  }
  @media screen and (min-width: 1280px)  {
    font-size: 72px !important;
  }
  @media screen and (min-width: 1921px) {
    font-size: 96px !important;
  }
}





// mobile

</style>
<template>
  <div class="about">
    <h1>This is it, we are logged in!</h1>
    <h1>{{vars}}</h1>
  </div>
</template>



<script>
import vars from "@/assets/variables/_variables.js"
export default {
  mounted() {
        let a_token = localStorage.getItem("jwt_access_token")
        let r_token = localStorage.getItem("jwt_refresh_token")
        console.log(a_token)
        console.log(r_token)
        // DOM is installed
    },
  data() {
    return {
      thisVars: vars
    }
  }
}
</script>
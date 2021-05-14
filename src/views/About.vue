<template>
  <div class="about">
    <h1>This is it, we are logged in!</h1>
    <h1>{{vars}}</h1>
  </div>
</template>



<script>
import vars from "@/assets/variables/_variables.js"
import {getUserStatus} from "@/services/api_user_public.js"

export default {
  async mounted() {
        let a_token = localStorage.getItem("jwt_access_token")
        let r_token = localStorage.getItem("jwt_refresh_token")
        console.log(a_token)
        console.log(r_token)

        try {
          await getUserStatus("Rockyn99");
        } catch(err) {
          console.error(err)
        }
        // DOM is installed
    },
  data() {
    return {
      thisVars: vars
    }
  }
}
</script>
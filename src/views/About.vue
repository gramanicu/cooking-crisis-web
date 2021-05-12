<template>
  <div class="about">
    <h1>This is it, we are logged in!</h1>
    <h1>{{vars}}</h1>
  </div>
</template>



<script>
import vars from "@/assets/variables/_variables.js"
export default {
  data() {
    return {
      thisVars: vars
    }
  }
}
</script>
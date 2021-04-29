<template>
    <div>
        <h1 class="title">Welcome to Cooking Crisis</h1>
        <div class="loginContainer">
            <v-text-field  class="username" v-model="usernameValue"  placeholder="Username" dark ></v-text-field>
            <v-text-field  class="password"  v-model="passwordValue" placeholder="Password" dark type="password"></v-text-field>
            <v-btn class="loginButton" @click="show()" dark >login</v-btn>
            <h1 v-if="isLogged">m-am logat</h1>
            
        </div>
    </div>
</template>


<script>
export default {
    created() {
        // DOM is not install
    },
    mounted() {
        // DOM is installed
    },
    computed: {
        // cached functions
    },
    data() {
        return {
            usernameValue: "",
            passwordValue: "",
            isLogged: false,
        }
    },
    methods: {
        show() {
            console.log(this.usernameValue + " name and " + this.passwordValue + " this is the password");
            this.isLogged = true;
        }
    },
    destroy() {

    }
}
</script>


<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";
.title {
    margin-top: 5%;
    text-align: center;
    font-size: $font_web_large_2 !important;
    color: $white;
}
.loginContainer {
    height: 500px;
    max-width: 703px;
    width: 60%;
    margin: 5% auto 0 auto;
    border: 2px solid black;
}
.username {
    max-width: 50%;
    margin: auto;
    margin-top: 15%;
}

.password {
    max-width: 50%;
    margin: auto;
}

.loginButton {
    color: $pink !important;
    display: block;
    margin: auto;
}
</style>
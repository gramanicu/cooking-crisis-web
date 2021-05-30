<template>
    <div>
        <div class="loginContainer">
            <div class="infobox" >
                <h1 class="infoTitle fs-small-3">Welcome to Cooking Crisis</h1>
                <h2 class="infoContent fs-small-1">The video card game designed for you and <span class="cuteStyle">your friends</span><br/>We hope you will enjoy the time spent on our game <br/> Have fun  <span class="cuteStyle">^.^</span></h2>
                <img class="logoImage" src="@/assets/images/cooking_crisis.png"/>
            </div>
            <div class="infobox2" >
                <h1 class="infoTitle fs-small-3"> Sign in</h1>
                <v-text-field class="inputField" dark placeholder="Username"  v-model="usernameValue"></v-text-field>
                <v-text-field class="inputField" dark placeholder="Password" type="password" v-model="passwordValue"></v-text-field>
                <v-btn dark class="loginButton" :loading="load" @click="login()">login</v-btn>
                <p class="signOutMessage">You dont have an account?</p>
                <v-btn dark class="accountButton" @click="createAccount()" plain >create an account </v-btn>
                <v-btn dark class="forgotButton" @click="forgotPassword()" plain >cant sign in?</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import {signIn} from '../../services/users_public'
export default {
    created() {
    },
    mounted() {
    },
    data() {
        return {
            usernameValue: "",
            passwordValue: "",
            emailValue: "",
            isLogged: false,
            accessTokenUser: "",
            refTokenUser: "",
            load: false
        }
    },
    methods: {
        login() {
            //TO DO


            //const response = signIn(this.usernameValue, this.passwordValue)
            // this.usernameValue = response.body.jwt_access_token
            // this.refTokenUser = response.body.jwt_refresh_token
            // localStorage.setItem("jwt_access_token", response.body.jwt_access_token)
            // localStorage.setItem("jwt_refresh_token", response.body.jwt_refresh_token)
                    
            // if (this.usernameValue !== "") {
            //     this.isLogged = true
            //     this.$router.push("/about")
            // }
            // console.log(this.isLogged)
            this.load = !this.load;
        },
        createAccount() {
            this.$router.push("/createaccount");
        },
        forgotPassword() {
            this.$router.push("/forgotpassword");
        }
    },
    destroy() {},
}
</script>

<style scoped lang="scss">
.loginContainer {
    margin:auto;
    display: flex;
    margin-top: 2.5vw;
    justify-content: center;
    
}
.infobox {
    width: 50vw;
    height: 550px;
    background-color: $primary;
    border-radius: 5% 0 0 5%;
}
.infobox2 {
    width: 50vw;
    height: 550px;
    background-color: $pink;
    border-radius:0 5% 5% 0;
}

.infoTitle {
    margin-top: 10%;
    text-align: center;
    color: $white;
}

.infobox, .infobox2 {
    position: relative;
    max-width: 500px;
}
.infoContent {
    text-align: center;
}

.cuteStyle {
    color: $pink;
}

.logoImage {
    width: 60%;
    height: 60%;
    position: relative;
    left: 10%;
    top: 7%;

}

.inputField {
    width: 60%;
    margin: auto;
}
.loginButton {
    color: $pink !important;
    display: block;
    margin: auto;
    margin-top: 5%;
}

.signOutMessage {
    position: absolute;
    left: 10%;
    bottom: 35%;
    color: $white;
}
.accountButton {
    position: absolute;
    color: $white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    right: 10%;
    bottom: 37%;

}
.forgotButton {
    position: absolute;
    color: $white;
     right: 10%;
     bottom: 10%;
}
</style>

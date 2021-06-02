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
                <v-text-field class="inputField" tabindex="1" dark placeholder="Username" @input="clearFail" :rules="[validUsername]" required v-model="usernameValue"></v-text-field>
                <v-text-field class="inputField" tabindex="2" dark placeholder="Password" @input="clearFail"  type="password" :rules="[validPassword]" required v-model="passwordValue"></v-text-field>
                <v-btn dark class="loginButton" :loading="load" :disabled="p_invalid || u_invalid" @click="login()">login</v-btn>
                <p class="signOutMessage">You dont have an account?</p>
                <v-btn dark class="accountButton" @click="createAccount()" plain >create an account </v-btn>
                <p class="fail" v-if="fail">Your username or password is wrong</p>
                <v-btn dark class="forgotButton" @click="forgotPassword()" plain >cant sign in?</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import {signIn} from '../../services/users_public'
import {username_regexp, password_regexp} from '../../assets/constants/_constants'

export default {
    created() {
    },
    mounted() {
    },
    data() {
        return {
            load: false,
            fail: false,
            u_invalid: true,
            p_invalid: true,
            usernameValue: "",
            passwordValue: ""
        }
    },
    methods: {
        clearFail() {
            this.fail = false
        },
        validUsername(input) {
            if(input == "") {
                this.u_invalid = true;
                return "Username required";
            }

            const username_tester = new RegExp(username_regexp);

            const valid = username_tester.test(input)
            if(!valid) {
                this.u_invalid = true;
                return "Username not valid"
            }
            this.u_invalid = false;
            return true
        },
        validPassword(input) {
            if(input == "") {
                this.p_invalid = true;
                return "Password required";
            }
            const password_tester = new RegExp(password_regexp);

            const valid = password_tester.test(input)
            if(!valid) {
                this.p_invalid = true;
                return "Password not valid"
            }
            this.p_invalid = false;
            return true
        },
        async login() {
            this.load = true;
            this.fail = false;
            try {
                const response = await signIn(this.usernameValue, this.passwordValue)

                if(response != undefined) {
                    localStorage.setItem("jwt_access_token", response.jwt_access_token)
                    localStorage.setItem("jwt_refresh_token", response.jwt_refresh_token)
                    localStorage.setItem("access_expiry", response.access_expiry)

                    // Redirect
                    this.$router.push("/main");
                } else {
                    this.fail = true
                }
            } catch (err) {
                this.fail = true
                throw new Error(err)
            }

            this.load = false;
        },
        createAccount() {
            this.$router.push("/signup");
        },
        forgotPassword() {
            this.$router.push("/forgot");
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
.fail {
    color: $blue;  
    margin-top: 13%;
    font-size: 20px !important;
    text-align: center;
}
</style>

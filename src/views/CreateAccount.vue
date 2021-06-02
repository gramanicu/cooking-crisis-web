<template>
    <div>
        <div class="containter">
            <h1 class="some-title">Create an account</h1>
            <div class="inputs">
                <v-text-field tabindex="1" class="inputField" dark label="Username" :error-messages="user_errors" v-model="usernameValue"></v-text-field>
                <v-text-field tabindex="2" class="inputField" dark label="Email" :rules="[validEmail]"  v-model="emailValue"></v-text-field>
                <v-text-field tabindex="3" class="inputField" dark label="Password" :rules="[validPassword]" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" v-model="passwordValue"></v-text-field>
                <v-text-field tabindex="4" class="inputField" dark label="Re-enter password" :rules="[validRepeated]" :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append=" show2 = !show2" v-model="passwordValueAgain"></v-text-field>
            </div>
            <v-btn dark large class="createButton" @click="createAccount()" :disabled="p_invalid || u_invalid || e_invalid || r_invalid" :loading="load">create account</v-btn>
        </div>
    </div>
</template>




<script>
import {doesUserExist, signUp} from '../services/users_public'
import {username_regexp, password_regexp, email_regexp} from '../assets/constants/_constants'
export default {
    created() {
    },
    mounted() {
    },
    data() {
        return {
            load: false,
            show: false,
            show2: false,
            usernameValue: "",
            emailValue: "",
            passwordValue: "",
            passwordValueAgain: "",
            u_invalid: true,
            p_invalid: true,
            e_invalid: true,
            r_invalid: true,
            user_errors: []
        }
    },
    watch: {
        async usernameValue () {
            if(this.usernameValue == "") {
                this.u_invalid = true;
                this.user_errors[0] = "Username required";
            } else {
                const username_tester = new RegExp(username_regexp);
                const valid = username_tester.test(this.usernameValue)
                if(!valid) {
                    this.u_invalid = true;
                    this.user_errors[0] = "Username not valid"
                } else {
                    const exists = await doesUserExist(this.usernameValue);

                    if(exists ==  true) {
                        this.u_invalid = true;
                        this.user_errors = []
                        this.user_errors[0] = "Username in use"
                    } else {
                        this.u_invalid = false;
                        this.user_errors = []
                    }
                }
            }
        }
    },
    methods: {
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
        validRepeated(input) {
            if(input == "") {
                this.r_invalid = true;
                return "Passwords must be written again"
            }
            if(input != this.passwordValue) {
                this.r_invalid = true
                return "Passwords do not match"
            }
            this.r_invalid = false
            return true
        },
        validEmail(input) {
            if(input == "") {
                this.e_invalid = true;
                return "Email required";
            }
            const email_tester = new RegExp(email_regexp);

            const valid = email_tester.test(input)
            if(!valid) {
                this.e_invalid = true;
                return "Email not valid"
            }
            this.e_invalid = false;
            return true
        },
        async createAccount() {
            this.load = true
            const res = await signUp(this.usernameValue, this.emailValue, this.passwordValue);
            this.load = false

            if(res == true) {
                this.$router.push("/validate");
            } else {
                this.usernameValue = ""
                this.emailValue = ""
                this.passwordValue = ""
                this.passwordValueAgain = ""
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.containter {
    margin: auto;
    margin-top: 2.5vw;
    width: 50vw;
    height: 550px;
    max-width: 1000px;
    background-color: $pink;
    border-radius: 8% 0% 10% 10%;
}

.some-title {
    text-align: center;
    color: $white;
    padding-top: 2.5%;
}
.inputField {
    width: 60%;
    margin: auto;
}
.inputs {
    margin: auto;
    margin-top: 5%
}
.createButton {
    display: block;
    margin: auto;
    margin-top: 5%;
    background-color: $blue !important; 
    color: $white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
}

</style>
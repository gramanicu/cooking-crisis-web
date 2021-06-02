<template>
    <div>
        <div class="containter">
            <h1 class="some-title">Manage your an account</h1>
            <h2 class="some-title2">{{user_info.name}} - {{user_info.email}}</h2>
            <div class="inputs">
                <v-text-field tabindex="1" class="inputField" dark label="Old Password" :rules="[validOldPassword]" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" v-model="passwordValue"></v-text-field>
                <v-text-field tabindex="2" class="inputField" dark label="New password" :rules="[validNewPassword]" :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append=" show2 = !show2" v-model="passwordValueNew"></v-text-field>
                <v-text-field tabindex="3" class="inputField" dark label="Re-enter password" :rules="[validRepeated]" :type="show3 ? 'text' : 'password'" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" @click:append=" show3 = !show3" v-model="passwordValueAgain"></v-text-field>
            </div>
            <p class="message" v-if="c_error">Couldn't change password</p>
            <v-btn dark large class="updatePassword" @click="updatePassword()" :disabled="p_invalid || n_invalid || r_invalid" :loading="load">update password</v-btn>
            <v-btn dark class="returnButton" @click="returnMain()" plain >Go back</v-btn>
        </div>
    </div>
</template>




<script>
import { password_regexp } from '../assets/constants/_constants'
import { changePassword, getAccountData } from '../services/users_private';
import { getAccessToken} from "../services/users_public"
export default {
    async created() {
        getAccountData(localStorage.getItem("jwt_access_token")).then((data) => {
            if(data != undefined) {
                this.user_info.name = data.name;
                this.user_info.email = data.email;
                this.user_info.status = data.status;
                this.user_info.elo = data.elo;
                this.user_info.created_at = data.created_at;
            } else {
                this.$router.push("/");
            }
        });

        const ref_token = localStorage.getItem("jwt_refresh_token");
        const data = await getAccessToken(ref_token)

        if(data != undefined) {
            localStorage.setItem("jwt_access_token", data.jwt_access_token)
            localStorage.setItem("access_expiry", data.access_expiry)
        }
    },
    mounted() {
    },
    data() {
        return {
            load: false,
            show: false,
            show2: false,
            show3: false,
            passwordValue: "",
            passwordValueAgain: "",
            passwordValueNew: "",
            n_invalid: true,
            p_invalid: true,
            r_invalid: true,
            c_error: false,
            user_info: {
                name: "",
                email: "",
                status: 0,
                elo: 0,
                created_at: ""
            }
        }
    },
    methods: {
        validOldPassword(input) {
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
        validNewPassword(input) {
            if(input == "") {
                this.n_invalid = true;
                return "Password required";
            }
            const password_tester = new RegExp(password_regexp);

            const valid = password_tester.test(input)
            if(!valid) {
                this.n_invalid = true;
                return "Password not valid"
            }
            this.n_invalid = false;
            return true
        },
        validRepeated(input) {
            if(input == "") {
                this.r_invalid = true;
                return "Passwords must be written again"
            }
            if(input != this.passwordValueNew) {
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
        async updatePassword() {
            this.load = true
            const res = await changePassword(localStorage.getItem("jwt_access_token"), this.passwordValue, this.passwordValueNew, this.passwordValueAgain)
            this.load = false

            if(!res) {
                this.passwordValueNew = ""
                this.passwordValue = ""
                this.passwordValueAgain = ""
            }
            this.c_error = !res;
        },
        returnMain() {
            this.$router.push("/main");
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
.some-title2 {
    text-align: center;
    color: $white;
    padding-top: 3.5%;
}
.inputField {
    width: 60%;
    margin: auto;
}
.inputs {
    margin: auto;
    margin-top: 5%
}
.updatePassword {
    display: block;
    margin: auto;
    margin-top: 5%;
    background-color: $blue !important; 
    color: $white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
}
.returnButton {
    font-size: 20px;
    position: absolute;
    color: $white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    right: 20%;
    bottom: 20%;

}
.message {
    color: $blue;  
    margin-top: 40px;
    font-size: 20px !important;
    text-align: center;
    left: 20%;
}

</style>
<template>
    <div>
        <div class="containter">
            <h1 class="some-title">Create an account</h1>
            <div class="inputs">
                <v-text-field class="inputField" dark label="Username"  :rules="rules.name" v-model="usernameValue"></v-text-field>
                <v-text-field class="inputField" dark label="Email" :rules="[...rules.name, ...rules.email]"  v-model="emailValue"></v-text-field>
                <v-text-field class="inputField" dark label="Password" :rules="rules.name" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" v-model="passwordValue"></v-text-field>
                <v-text-field class="inputField" dark label="Re-enter password" :rules="rules.name" :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append=" show2 = !show2" v-model="passwordValueAgain"></v-text-field>
            </div>
            <v-btn dark large class="createButton" @click="createAccount()" :loading="load">create account</v-btn>
        </div>
    </div>
</template>




<script>
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
            rules: {
                name: [val => (val || '').length > 0 || 'This field is required'],
                email: [v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']
            }
        
        }
    },
    methods: {
        createAccount() {
            //TO DO
            this.load = !this.load;
            setTimeout( () => {
                this.$router.push("/validate");
            } , 2000);
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
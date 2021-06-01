<template>
    <div>
        <div class="containter">
            <h1 class="some-title">Please check your email to validate your account</h1>
            <v-btn dark class="returnButton" @click="returnFun()" plain >return to main page </v-btn>
        </div>
    </div>
</template>




<script>
export default {
    methods: {
        returnFun() {
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss" scoped>
.containter {
    position: relative;
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
    padding-top: 5%;
}
.returnButton {
    font-size: 20px;
    position: absolute;
    color: $white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    right: 10%;
    bottom: 20%;

}
</style>
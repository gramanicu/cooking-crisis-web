<template>
    <div id="main">
        <div class="container">
            <div class="profile-container">profile</div>
            <div class="friend-container"> friends</div>
            <div class="game-container"> principal</div>
            <div class="info-container"> info </div>
        </div>
    </div>
</template>




<script>
export default {
    data() {
        return {
            
        
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
.container {
    position:relative;
    margin: auto;
    margin-left: 13%;
    width: 70vw;
    height: 100vh;
}
.profile-container {
    margin-top: 3%;
    margin-left: 2%;
    width: 20%;
    height: 350px;
    background-color: $pink;
    border-radius: 0 0 0 0 ;

}
.friend-container {
    margin-left: 2%;
    width: 35%;
    height: 250px;
    background-color: $primary;
    border-radius:  0 0 0 0;
}
.game-container {
    top: 20%;
    right: 22.8%;
    position: absolute;
    width: 40%;
    height: 505px;
    background-color: #F9A602;
    border-radius:  0 0 8% 0;
    z-index: 1;
}
.info-container {
    top: 6.7%;
    right: 22.8%;
    position: absolute;
    width: 40%;
    height: 500px;
    background-color: $primary;
    border-radius:   0 8%  0% 0;
    z-index: 0;
}
</style>
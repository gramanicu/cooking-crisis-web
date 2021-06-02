<template>
    <div id="main">
        <div class="container">
            <div class="profile-container">
                <h1 class="username-title" >{{username}}</h1>
                <h2 class="wins-number">Wins: 0</h2>
                <v-icon class="cute-icon" x-large color="black">mdi-account-circle </v-icon>
            </div>
            <div class="friend-container">
                <vuescroll :ops="ops">
                    <div class="friends" v-for="(friend, index) in friendList" :key="index">
                        <h2 class="friend-info">{{friend.name}} <span :class="{ text_size: true, on: friend.status === 'online' , offline: friend.status === 'offline' , busy: friend.status === 'busy', in_game: friend.status === 'in game'}"> <v-icon small :class="{ text_size: true, on: friend.status === 'online' , offline: friend.status === 'offline' , busy: friend.status === 'busy', in_game: friend.status === 'in game'}" >mdi-checkbox-blank-circle </v-icon> {{friend.status}}</span></h2>
                    </div>
                </vuescroll>
            </div>
        </div>
    </div>
</template>




<script>
import vuescroll from 'vuescroll';
export default {
    components: {
        vuescroll
    },
    data() {
        return {
            friendList: [
                {
                    name:"Dan",
                    status: "online",
                },
                {
                    name:"Joe",
                    status: "offline",
                },
                {
                    name:"Queen",
                    status: "busy",
                },
                {
                    name:"Coco",
                    status: "in game",
                },
                {
                    name:"Dan",
                    status: "online",
                },
                {
                    name:"Joe",
                    status: "offline",
                },
                {
                    name:"Queen",
                    status: "busy",
                },
                {
                    name:"Coco",
                    status: "in game",
                },
                {
                    name:"Dan",
                    status: "online",
                },
                {
                    name:"Joe",
                    status: "offline",
                },
                {
                    name:"Queen",
                    status: "busy",
                },
                {
                    name:"Coco",
                    status: "in game",
                },
                {
                    name:"Dan",
                    status: "online",
                },
                {
                    name:"Joe",
                    status: "offline",
                },
                {
                    name:"Queen",
                    status: "busy",
                },
                {
                    name:"Coco",
                    status: "in game",
                },
                
            ],
            username: "John Doe",
            ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {},
                bar: {
                    background: '#252a34',
                    keepShow: false,
                    size: '3px',
                    minSize: 0.2
                }
            }
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

//profile
.profile-container {
    margin-top: 3%;
    margin-left: 10%;
    width: 20%;
    height: 350px;
    background-color: $pink;
    border-radius: 8% 8% 8% 8%;

}
.username-title {
    color: $white;
    text-align: center;
    padding-top: 5%;
}
.wins-number {
    color: $white;
    text-align: center;
    padding-top: 5%;
}
.cute-icon {
    font-size: 10vw !important;
    padding-left: 13%;
    color: $blue !important;
}


//friends

.friends {
    width: 100% !important;
    height: 60%;
}
.friend-info {
    font-size: 18px;
    color: $white;
    padding-top: 2%;
    padding-left: 10%;
}

.friend-container {
    position: absolute;
    top: 5%;
    right: 25%;
    width: 30%;
    height: 350px;
    background-color:   #282C35;
    border-radius:  10% 0% 0% 0%;
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


//styles for status
.text_size {
    padding-left: 5px;
    font-size: 15px;
}
.offline {
    color: $white;
}
.busy {
    color: $red;
}
.on {
    color: $green;
}
.in_game {
    color: $gold;
}
</style>
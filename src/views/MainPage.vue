<template>
    <div id="main">
        <div class="container">
            <div class="profile-container">
                <h1 class="username-title" >{{user_info.name}}</h1>
                <h2 class="profile-elo-number">ELO: {{user_info.elo}}</h2>
                <v-icon class="cute-icon" x-large color="black">mdi-account-circle </v-icon>
            </div>
            <div class="friend-container">
                <vuescroll :ops="ops">
                    <div class="friends" v-for="(friend, index) in friendList" :key="index">
                        <h2 class="friend-info">  <v-icon class="friend-icon" large>mdi-account-circle </v-icon>   {{friend.name}} <span :class="{ text_size: true, on: friend.status === 'online' , offline: friend.status === 'offline' , busy: friend.status === 'busy', in_game: friend.status === 'in game'}"> <v-icon small :class="{ text_size: true, on: friend.status === 'online' , offline: friend.status === 'offline' , busy: friend.status === 'busy', in_game: friend.status === 'in game'}" >mdi-checkbox-blank-circle </v-icon> {{friend.status}}</span></h2>
                        <v-btn dark class="invite" plain> <v-icon medium>mdi-cheese</v-icon> challenge!</v-btn>
                    </div>
                </vuescroll>
            </div>
            <div class="game-container">
                <h1 class="leaderboard-title">Leaderboard</h1>
                <vuescroll :ops="ops">
                    <div class="leaderboard" v-for="(person, index) in leaderBoard" :key="index">
                        <h2 class="leaderboard-info">{{person.name}} with {{person.wins}} wins</h2>
                    </div>
                </vuescroll>
            </div>
        </div>
    </div>
</template>




<script>
import vuescroll from 'vuescroll'
import { getAccountData } from "../services/users_private"
import {getUserStatus, getAccessToken} from "../services/users_public"
// import {} from "../services/cards"
import {user_status} from "../assets/constants/_constants"
import {getFriendList, sendFriendRequest} from "../services/friends"
import * as io from "socket.io-client"
import {socket_root} from "../assets/constants/_constants"

export default {
    components: {
        vuescroll
    },
    created() {
        getAccountData(localStorage.getItem("jwt_access_token")).then((data) => {
            if(data != undefined) {
                this.user_info.name = data.name;
                this.user_info.email = data.email;
                this.user_info.status = data.status;
                this.user_info.elo = data.elo;
                this.user_info.created_at = data.created_at;
                this.reloadFriendList()
            } else {
                this.$router.push("/");
            }
        });

        this.bkg_socket.on('connect', function () {
            console.log("Connected!")
            this.bkg_socket.emit("ping", Date.now())
        }.bind(this))

        this.bkg_socket.on('notification', function (not) {
            console.log("Received a notification related to " + not.category)
            console.log("The notification is: " + not.message)
        }.bind(this))

        this.bkg_socket.on('pong', function (time) {
            console.log("Delay is " + (Date.now() - time) + "ms")
        }.bind(this))
    },
    data() {
        return {
            leaderBoard:[
                {
                    name: "JOHN",
                    wins: 6
                }
            ],


            friendList:[],
            user_info: {
                name: "",
                email: "",
                status: 0,
                elo: 0,
                created_at: ""
            },
            bkg_socket: io(socket_root+"/backbone", {
                path: "/sockets/",
                auth: {
                    token: localStorage.getItem("jwt_access_token")
                }
            }),
            mch_socket: io(socket_root+"/match", {
                path: "/sockets/",
                auth: {
                    token: localStorage.getItem("jwt_access_token")
                }
            }),
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
        async sendFriendRequest(name) {
            const res = await sendFriendRequest(localStorage.getItem("jwt_access_token"), name)
            if(res == true) {
                // Success
            } else {
                // Couldn't send request
            }
        },

        async reloadFriendList() {
            this.friendList = []
            getFriendList(localStorage.getItem("jwt_access_token")).then((data) => {
                if(data != undefined) {
                    const keys = Object.keys(user_status);

                    if(data.data.length) {
                        data.data.forEach(async (element) => {
                            this.friendList.push({
                                name: element.name,
                                status: keys[await getUserStatus(this.user_info.name)],
                            })
                        });
                    }
                } else {
                    this.$router.push("/validate");
                }
            })
        }
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
    margin-left: 16%;
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
.profile-elo-number {
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
    display: flex;
    width: 100% !important;
    height: 60%;
}
.friend-info {
    width: 100%;
    font-size: 18px;
    color: $white;
    padding-top: 5%;
    padding-left: 10%;
}
.friend-icon {
    color: inherit !important;
    padding-right: 2%;
}
.friend-container {
    position: absolute;
    top: 5%;
    right: 16%;
    width: 30%;
    height: 350px;
    background-color:   #282C35;
    border-radius:  10% 0% 0% 0%;
}
.invite {
    margin-top: 5%;
    position: absolute;
    right: 0;
    color: $white !important;
}

//leaderboard

.game-container {
    top: 45%;
    right: 33%;
    position: absolute;
    width: 50%;
    height: 305px;
    background-color: #F9A602;
    border-radius:  0 0 8% 8%;
}
.leaderboard-title {
    text-align: center;
    color: $white !important;
    padding-top: 3%;
}
.leaderboard-info {
    text-align: center;
    color: $white !important;
    padding-top: 4%;
}

.game-container .__vuescroll {
    height: 70% !important;
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
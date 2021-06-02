<template>
    <div id="main">
        <div class="container">
            <div class="navbar-container">

                <div class="profile-container">
                    
                        <div class="card">
                            <div class="cardImg">
                                <img src="https://www.w3schools.com/howto/img_avatar.png">
                            </div>
                            <div class="cardContainer">
                                <h3><b>{{user_info.name}}</b></h3> 
                                <p>ELO:  {{user_info.elo}}</p> 
                            </div>
                        </div>
                    
                </div>

                <div class="notifications-container">

                </div>

                <div class="friend-container">
                    <vuescroll :ops="ops">
                        <div class="friend" v-for="(friend, index) in friendList" :key="index">

                            <div class="friendStatus">
                                <h2 class="friend-info">  <v-icon class="friend-icon" large>mdi-account-circle </v-icon>   {{friend.name}} <span :class="{ text_size: true, on: friend.status === 'online' , offline: friend.status === 'offline' , busy: friend.status === 'busy', in_game: friend.status === 'in game'}"> <v-icon small :class="{ text_size: true, on: friend.status === 'online' , offline: friend.status === 'offline' , busy: friend.status === 'busy', in_game: friend.status === 'in game'}" >mdi-checkbox-blank-circle </v-icon> {{friend.status}}</span></h2>
                            </div>

                            <div class="friendActions">
                                <v-btn dark class="invite" plain> <v-icon class="friendChallange-icon" medium>mdi-cheese</v-icon> challenge!</v-btn>
                            </div>
                            
                        </div>
                    </vuescroll>
                </div>
            </div>

            <div class="pageContent-container">
                <div class="addFriend">
                    <input  class="addFriendInput" type="text" placeholder="   Add friend...">
                </div>
                <div class="menu">
                    <div class="menuButtonGroup">
                        <button class="menuButton">Account management</button>
                        <button class="menuButton">Leaderboard</button>
                        <button class="menuButton">Matchmacking</button>
                        <button class="menuButton">About Game</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>




<script>
import vuescroll from 'vuescroll'
import { getAccountData, signOut } from "../services/users_private"
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

        // Reload the friend list every 15 seconds
        this.timers.push(setInterval(() => {
            this.reloadFriendList()
        }, 15000))

        const access_expiry = localStorage.getItem("access_expiry") * 0.9;
        this.timers.push(setInterval(() => {
            this.refreshToken()
        }, access_expiry * 1000))

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
    beforeDestroy() {
        this.timers.forEach(timer => {
            clearInterval(timer);
        });
    },
    data() {
        return {
            leaderBoard:[],
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
            timers: [],
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

        async refreshToken() {
            const ref_token = localStorage.getItem("jwt_refresh_token");
            const data = await getAccessToken(ref_token)

            if(data != undefined) {
                localStorage.setItem("jwt_access_token", data.jwt_access_token)
                localStorage.setItem("access_expiry", data.access_expiry)
            }
        },

        async signout() {
            const res = await signOut(localStorage.getItem("jwt_access_token"));
            if(res == true) {
                localStorage.removeItem("jwt_access_token")
                localStorage.removeItem("jwt_refresh_token")
                localStorage.removeItem("access_expiry")
                this.bkg_socket.disconnect();
                this.$router.push("/");
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

// ------------------------------------ Containers


.container {
    position:relative;
    margin: auto;
    margin-top: 5%;
    width: 70vw;
    height: 80vh;
}


.navbar-container {
    position: relative;
    height: 100%;
    width: 30%;
    float: left;
}

.pageContent-container {
    position: relative;
    height: 100%;
    width: 67%;
    float: left;
    margin-left: 3%;
}

.notifications-container {
    margin-top: 3%;
    width: 100%;
    height: 10%;
    background-color: rgba(252, 252, 252, 0.075);
    border: rgba(167, 199, 202, 0.363) dotted;
}


.friend-container {
    margin-top: 3%;
    padding-top: 3%;
    right: 16%;
    background-color:   #3b414d;
    border-radius:  10% 0% 0% 0%;
    width: 100%;
    height: 70%;
    box-shadow: 5px 5px #88888823;


}






// ------------------------------------ Friend list


.friend {
    margin-top: 5%;
    margin-right: 5%;
    margin-left: 6%;
    background-color: rgba(196, 188, 188, 0.39);
    border-radius: 12% 0% 17% 0%;
    padding-top: 2%;
}

.friendStatus {
    height: 70%;
    width: 100%;
}

.friendActions {
    height: 30%;
    width: 100%;
    padding: 0;
}

.friendChallange-icon {
    font-size: 1.3vw;

}

.friendActions button {
    margin-left: 35%;
    padding: 0px;
    text-align: top
}

.friend-info {
    width: 100%;
    font-size: 15px;
    color: $white;
    padding-top: 1%;
    padding-left: 7%;
}
.friend-icon {
    color: inherit !important;
    padding-right: 2%;
}

.invite {
    right: 0;
    color: $white !important;
    font-size: 10px;
    padding: 0px;
}




// ------------------------------------ Add friend search bar

.addFriend {
    width: 80%;
    height: 10%;
    background: rgba(167, 199, 202, 0.274);
    margin-left: 7%;
}

.addFriend {
    margin-top: 3%;
    display: flex;
    justify-content: center;
    align-items: center; 
    box-shadow: 11px 7px #888888;
    border-radius: 5%;
}

.addFriend:focus {
    border: dotted rgba(224, 211, 211, 0.63);

}

.addFriendInput {
    position: relative;
    width: 90%;
    height: 70%;
    font-size: 30px;
    color: rgba(167, 199, 202, 0.827);
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    margin: auto;
    display: block;
    cursor:  copy !important;
    outline-width: 0;
    caret-color: rgb(233, 58, 140);


}

.addFriendInput:focus {
    font-family: 'Courier New', Courier, monospace;
}


// ------------------------------------ Menu

.menu {
    width: 80%;
    height: 85%;
    background: rgba(167, 199, 202, 0.827);
    margin-top: 5%;
    border-radius: 13%;
    display: flex;
    justify-content: center;
    align-items: center; 
    margin-left: 7%;

}


.menuButtonGroup {
    width: 70%;
    margin: auto;
    padding-top: 5%;

}

.menuButton {
    width: 100%;
    display: block;
    background-color: rgba(240, 221, 226, 0.747);
    font-size: 25px;
    margin-bottom: 11%;
    padding: 4%;
    border-radius: 5%;
    font-family: 'Courier New', Courier, monospace;
    box-shadow: 5px 10px #888888;

}

.menuButton:hover {
    background: rgba(240, 199, 210, 0.856);
    color: #fff;
}



// ------------------------------------ Profile overview

.profile-container {
    margin-top: 3%;
    width: 100%;
    height: 20%;
    background-color: $pink;
    border-radius: 10%;

}

.profile-title {
    height: 30%;
    display:flex;
    align-items: center;
    justify-content: center;

}

.profile-title h1 {
    font-size: 120%;
}

.profile-elo {
    height: 20%;
    display:flex;
    align-items: center;
    justify-content: center;
}

.profile-elo h2 {
    font-size: 80%;

}

.profile-picture {
    height: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1%;
}


.username-title {
    color: $white;
}

.profile-elo-number {
    color: $white;
}
.cute-icon {
    font-size: 3vw !important;
    color: $blue !important;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: $pink;
  transition: 0.3s;
  width: 100%;
  height: 100%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  position: relative;
}

.cardContainer {
  width: 50%;
  padding: 2px 16px;
  float: left;
  padding-top: 15%;
  padding-left: 10%;
}

.cardContainer h3 {
    font-family: 'Courier New', Courier, monospace;
    font-size: 23px;
    color: rgb(66, 52, 52);
}

.cardContainer p {
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    color: rgb(0, 0, 0);
    margin-left: 13%;

}

.cardImg {
    width: 50%;
    float: left;
    height: 100%;
}

.cardImg img {
    width: 100%;
    height: 100%;
}


</style>
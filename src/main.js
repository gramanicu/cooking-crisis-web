import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import VueResources from "vue-resource"
import Vuex from "vuex"

Vue.config.productionTip = false
Vue.use(VueResources)
Vue.use(Vuex)
new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount("#app")

import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import CreateAccount from "../views/CreateAccount.vue"
import ForgotPassword from "../views/ForgotPassword.vue"
import Validate from "../views/Validate.vue"
import Main from "../views/MainPage.vue"
import ActivateAccount from "../views/ActivateAccount.vue"
import ManageAccount from "../views/ManageAccount.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/signup",
        name: "CreateAccount",
        component: CreateAccount,
    },
    {
        path: "/forgot",
        name: "ForgotPassword",
        component: ForgotPassword,
    },
    {
        path: "/validate",
        name: "Validate",
        component: Validate,
    },
    {
        path: "/activate/:link",
        name: "activate",
        component: ActivateAccount,
    },
    {
        path: "/main",
        name: "Main",
        component: Main,
    },
    {
        path: "/account",
        name: "Account",
        component: ManageAccount,
    },
]

const router = new VueRouter({
    routes,
    mode: "history",
})

export default router

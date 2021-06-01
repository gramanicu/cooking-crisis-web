import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateAccount from '../views/CreateAccount.vue'
import forgotPassword from '../views/ForgotPassword.vue'
import validate from '../views/Validate.vue'
import main from '../views/mainPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createaccount',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: forgotPassword
  },
  {
    path: '/validate',
    name: 'Validate',
    component: validate
  },
  {
    path: '/main',
    name: 'Main',
    component: main
  },
]

const router = new VueRouter({
  routes
})

export default router

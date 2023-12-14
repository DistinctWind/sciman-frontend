import {createRouter, createWebHashHistory} from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import LoginView from "@/views/login/LoginView.vue";
import UserInfoView from "@/views/login/UserInfoView.vue";

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/login', component: LoginView},
    {path: '/userinfo', component: UserInfoView}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
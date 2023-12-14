import {createRouter, createWebHashHistory} from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import LoginView from "@/views/login/LoginView.vue";
import RemoteTester from "@/views/remote_test/RemoteTester.vue";

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/login', component: LoginView},
    {path: '/test', component: RemoteTester}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
import {createRouter, createWebHashHistory} from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import LoginView from "@/views/login/LoginView.vue";
import UserInfoView from "@/views/login/UserInfoView.vue";
import DebugInfo from "@/views/debug/DebugInfo.vue";
import {useStore} from "vuex";

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/login', component: LoginView},
    {path: '/userinfo', component: UserInfoView},
    {path: '/debug', component: DebugInfo}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const noLoginVisitUrl = ['/login']

router.beforeEach(async (to, from, next) => {
    if (noLoginVisitUrl.includes(to.path)) {
        next()
    } else {
        const role = useStore().state.role
        if (role === -1) {
            next('/login')
        }
        next()
    }
})

export default router
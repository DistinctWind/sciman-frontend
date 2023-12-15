import {createRouter, createWebHashHistory} from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import LoginView from "@/views/login/LoginView.vue";
import UserInfoView from "@/views/login/UserInfoView.vue";
import DebugInfo from "@/views/debug/DebugInfo.vue";
import {useStore} from "vuex";
import LayoutView from "@/views/LayoutView.vue";
import HomeView from "@/views/HomeView.vue";
import LaboratoryManagement from "@/views/laboratory/LaboratoryManagement.vue";

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/login', component: LoginView},
    {path: '/userinfo', component: UserInfoView},
    {path: '/debug', component: DebugInfo},
    {
        path: '/layout',
        component: LayoutView,
        children: [
            {path: '/home', component: HomeView},
            {path: '/laboratoryManagement', component: LaboratoryManagement}
        ]
    }
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
import {createStore} from "vuex";
import {computed} from "vue";
import router from "@/route";

const store = createStore({
    state: {
        username: '',
        id: '',
        role: -1,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        },
        setId(state, id) {
            state.id = id
        },
        setRole(state, role) {
            state.role = role
        },
        setUser(state, userInfo) {
            state.username = userInfo.username
            state.id = userInfo.id
            state.role = userInfo.role
        },
        reset(state) {
            state.username = ''
            state.id = ''
            state.role = -1
        }
    }
})

export function coreInfo() {
    const username = computed(()=>store.state.username)
    const id = computed(()=>store.state.id)
    const role = computed(()=>store.state.role)
    return {username, id, role}
}

export function resetCoreInfo() {
    store.commit('reset')
    router.push('/login')
}

export default store
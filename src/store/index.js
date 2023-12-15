import {createStore, useStore} from "vuex";
import {computed} from "vue";

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
        }
    }
})

export function coreInfo() {
    const store = useStore()
    const username = computed(()=>store.state.username)
    const id = computed(()=>store.state.id)
    const role = computed(()=>store.state.role)
    return {username, id, role}
}

export default store
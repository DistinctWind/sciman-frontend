import {createStore} from "vuex";
// import log from "@/utils/debug";

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

export default store
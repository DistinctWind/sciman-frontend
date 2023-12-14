import {createStore} from "vuex";

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
        }
    }
})

export default store
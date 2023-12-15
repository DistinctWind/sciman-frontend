import store from "@/store";

export const saveUserInfo = (info) => {
    store.commit('setUser', info)
}
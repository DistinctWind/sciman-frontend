import {saveUserInfo} from "@/utils/storeage";

export const debug = true

const log = (message) => {
    if (debug) {
        console.log(message)
    }
}

export const loginAsAdmin = () => {
    log('Login using admin account')
    const info = {
        username: 'admin',
        role: 'admin',
        id: 2
    }
    saveUserInfo(info)
}

export const debugTarget = '/secretaryManagement'

export default log
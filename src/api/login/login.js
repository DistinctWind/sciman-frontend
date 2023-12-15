import request from "@/utils/request"

export const loginVerify = (form) => {
    return request.post('/login/verify', form)
}

export const modifyPassword = (form) => {
    return request.put('/login/modifyPassword', form)
}
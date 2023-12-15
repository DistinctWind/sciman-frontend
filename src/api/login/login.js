import request from "@/utils/request"

export const loginVerify = (form) => {
    return request.post('/login/verify', form)
}
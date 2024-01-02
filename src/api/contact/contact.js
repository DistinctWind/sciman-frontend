import request from "@/utils/request";

export const getContactList = (queryParam) => {
    return request.post('/contact/list', queryParam)
}

export const getContactDetail = (id) => {
    return request.get(`/contact/${id}`)
}

export const modifyContact = (contact) => {
    return request.put('/contact/modify', contact)
}
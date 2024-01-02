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

export const deleteContact = (contactId) => {
    return request.delete(`/contact/delete/${contactId}`)
}

export const insertContactByOrgId = (contact, orgId) => {
    return request.post(`/contact/add/${orgId}`, contact)
}
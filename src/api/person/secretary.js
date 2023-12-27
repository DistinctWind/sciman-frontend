import request from "@/utils/request";

export const listSecretary = (queryParam) => {
    return request.post('/person/secretary/list', queryParam)
}

export const secretaryDetail = (id) => {
    return request.get(`/person/secretary/detail/${id}`)
}

export const modifySecretary = (secretary) => {
    return request.post('/person/secretary/modify', secretary)
}

export const deleteSecretary = (id) => {
    return request.delete(`/person/secretary/delete/${id}`)
}

export const insertSecretary = (secretary) => {
    return request.post('/person/secretary/insert', secretary)
}
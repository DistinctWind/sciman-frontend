import request from "@/utils/request";

export const listContribution = (queryParam) => {
    return request.post('/contribution/list', queryParam)
}

export const deleteContribution = (id) => {
    return request.delete('/contribution/delete/' + id)
}

export const addContribution = (contribution) => {
    return request.put('/contribution/add', contribution)
}
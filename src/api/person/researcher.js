import request from "@/utils/request";

export const listAllResearcher = (labId) => {
    return request.get('/person/researcher/listAll', {
        params: {
            laboratoryId: labId
        }
    })
}

export const listResearcher = (queryParam) => {
    return request.post('/person/researcher/list', queryParam)
}

export const researcherDetail = (id) => {
    return request.get(`/person/researcher/detail/${id}`)
}

export const modifyResearcher = (researcher) => {
    return request.post('/person/researcher/modify', researcher)
}

export const deleteResearcher = (id) => {
    return request.delete(`/person/researcher/delete/${id}`)
}

export const insertResearcher = (researcher) => {
    return request.post('/person/researcher/insert', researcher)
}
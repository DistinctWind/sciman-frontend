import request from "@/utils/request";

export const listAllResearcher = () => {
    return request.get('/person/researcher/listAll')
}

export const listResearcher = (queryParam) => {
    return request.post('/person/researcher/list', queryParam)
}
import request from "@/utils/request";

export const listSecretary = (queryParam) => {
    return request.post('/person/secretary/list', queryParam)
}
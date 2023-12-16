import request from "@/utils/request";

export const listAllResearcher = () => {
    return request.get('/person/researcher/listAll')
}
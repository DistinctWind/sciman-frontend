import request from "@/utils/request";

export const listVenue = (queryParam) => {
    return request.post('/venue/list', queryParam)
}
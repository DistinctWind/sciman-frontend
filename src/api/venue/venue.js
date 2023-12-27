import request from "@/utils/request";

export const listVenue = (queryParam) => {
    return request.post('/venue/list', queryParam)
}

export const getVenueDetail = (id) => {
    return request.get(`/venue/detail/${id}`)
}

export const modifyVenue = (venue) => {
    return request.post('/venue/modify', venue)
}
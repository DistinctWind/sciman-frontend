import request from "@/utils/request";

export const getContactList = (queryParam) => {
    return request.post('/contact/list', queryParam)
}
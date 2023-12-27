import request from "@/utils/request";

export const listStaff = (queryParam) => {
    return request.post('/person/staff/list', queryParam)
}
import request from "@/utils/request";

export const listStaff = (queryParam) => {
    return request.post('/person/staff/list', queryParam)
}

export const getStaffDetail = (id) => {
    return request.get(`/person/staff/detail/${id}`)
}

export const modifyStaff = (staff) => {
    return request.post('/person/staff/modify', staff)
}
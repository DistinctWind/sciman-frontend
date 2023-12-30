import request from "@/utils/request";

export const getOrganizationViewById = (organizationId) => {
    return request.get(`/organization/view/${organizationId}`)
}

export const listOrganization = (queryParam) => {
    return request.post('/organization/list', queryParam)
}
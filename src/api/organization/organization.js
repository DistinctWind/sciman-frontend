import request from "@/utils/request";

export const getOrganizationViewById = (organizationId) => {
    return request.get(`/organization/view/${organizationId}`)
}

export const listOrganization = (queryParam) => {
    return request.post('/organization/list', queryParam)
}

export const listAllOrganizationName = () => {
    return request.get('/organization/listAll')
}

export const modifyOrganizationPrincipleContact = (orgId, contact) => {
    return request.put(`/organization/update/principleContact/${orgId}`, contact)
}
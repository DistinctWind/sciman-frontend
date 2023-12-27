import request from "@/utils/request";

export const listAllLaboratories = () => {
    return request.get('/lab/listAll')
}

export const listAllLabIntros = () => {
    return request.get('/lab/listIntro')
}

export const listLaboratory = (param) => {
    return request.post('/lab/list', param)
}

export const modifyLaboratorySecretary = (param) => {
    return request.post('/lab/modifySecretary', param)
}

export const getOrientationOfLabId = (labId) => {
    return request.get(`/lab/queryOrientation/${labId}`)
}
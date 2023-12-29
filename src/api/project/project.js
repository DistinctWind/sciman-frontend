import request from "@/utils/request";

export const listAllProjects = () => {
    return request.get('/project/listAll')
}

export const listProject = (param) => {
    return request.post('/project/list', param)
}

export const getProjectViewOfProjectId = (projectId) => {
    return request.get(`/project/view/${projectId}`)
}

export const getProjectDetailViewOfProjectId = (projectId) => {
    return request.get(`/project/detail/${projectId}`)
}
import request from "@/utils/request";

export const listAllProjects = () => {
    return request.get('/project/listAll')
}

export const listProject = (param) => {
    return request.post('/project/list', param)
}
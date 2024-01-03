import request from "@/utils/request";

export const getAchievementList = (queryParam) => {
    return request.post('/achievement/list', queryParam)
}

export const listAllAchievement = () => {
    return request.get('/achievement/listAll')
}

export const getAchievementDetail = (id) => {
    return request.get(`/achievement/detail/${id}`)
}

export const modifyAchievement = (achievement) => {
    return request.post('/achievement/update', achievement)
}

export const deleteAchievement = (id) => {
    return request.delete(`/achievement/delete/${id}`)
}
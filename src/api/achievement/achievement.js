import request from "@/utils/request";

export const getAchievementList = (queryParam) => {
    return request.post('/achievement/list', queryParam)
}
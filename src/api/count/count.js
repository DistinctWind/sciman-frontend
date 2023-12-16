import request from "@/utils/request";

export const getCount = () => {
    return request.get('/count')
}